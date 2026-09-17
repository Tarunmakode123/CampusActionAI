'use client';

import React, { useState } from 'react';
import { Application, DocumentVerificationStatus } from '@/types';
import { services } from '@/services/service-factory';
import { CheckCircle2, XCircle, HelpCircle, FileCheck, Send } from 'lucide-react';

interface ApplicationReviewActionsProps {
  application: Application;
}

export function ApplicationReviewActions({ application }: ApplicationReviewActionsProps) {
  const [showClarificationModal, setShowClarificationModal] = useState(false);
  const [clarificationNote, setClarificationNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateStatus = async (status: 'APPROVED' | 'REJECTED') => {
    if (!confirm(`Are you sure you want to mark application #${application.id} as ${status}?`)) return;
    setIsSubmitting(true);
    try {
      const appRepo = services.getApplicationRepository();
      const auditRepo = services.getAuditRepository();
      const qrRepo = services.getQRCodeRepository();

      await appRepo.updateStatus(
        application.id,
        status,
        'Campus Administrator',
        `Application ${status.toLowerCase()} by administrative officer.`
      );

      if (status === 'APPROVED') {
        await qrRepo.recordFunnelEvent(application.opportunityId, 'application_approved');
      }

      await auditRepo.log(
        'REVIEW_APPLICATION',
        'Campus Administrator',
        'APPLICATION',
        application.id,
        application.status,
        status,
        `Application #${application.id} updated to ${status}`
      );

      window.location.reload();
    } catch (err) {
      console.error('Failed to update status:', err);
      setIsSubmitting(false);
    }
  };

  const handleRequestClarification = async () => {
    if (!clarificationNote.trim()) return;
    setIsSubmitting(true);
    try {
      const appRepo = services.getApplicationRepository();
      const auditRepo = services.getAuditRepository();

      await appRepo.updateStatus(
        application.id,
        'REQUESTED_CLARIFICATION',
        'Campus Administrator',
        `Department requested clarification: "${clarificationNote}"`,
        clarificationNote
      );

      await auditRepo.log(
        'REQUEST_CLARIFICATION',
        'Campus Administrator',
        'APPLICATION',
        application.id,
        application.status,
        'REQUESTED_CLARIFICATION',
        `Clarification note sent: ${clarificationNote}`
      );

      setShowClarificationModal(false);
      window.location.reload();
    } catch (err) {
      console.error('Failed to request clarification:', err);
      setIsSubmitting(false);
    }
  };

  const handleDocVerify = async (docId: string, status: DocumentVerificationStatus) => {
    try {
      const appRepo = services.getApplicationRepository();
      await appRepo.updateDocumentStatus(application.id, docId, status, `Verified as ${status} by admin.`);
      window.location.reload();
    } catch (err) {
      console.error('Failed to update document status:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Document Inspector & Verifier */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-primaryText border-b border-gray-100 pb-3 flex items-center justify-between">
          <span>Submitted Document Verification Inspector</span>
          <span className="text-xs font-mono text-gray-500">{application.documents.length} Items</span>
        </h2>

        <div className="space-y-3">
          {application.documents.map((doc) => (
            <div key={doc.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-gray-800">{doc.name}</div>
                <div className="text-[11px] font-mono text-gray-500 mt-0.5">{doc.fileName || 'No file reference'}</div>
                <div className="mt-1">
                  Status:{' '}
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                      doc.verificationStatus === 'VERIFIED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : doc.verificationStatus === 'REJECTED'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {doc.verificationStatus}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDocVerify(doc.id, 'VERIFIED')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded text-xs transition-colors"
                >
                  Verify Document
                </button>
                <button
                  onClick={() => handleDocVerify(doc.id, 'REJECTED')}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded text-xs transition-colors"
                >
                  Reject Document
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Status Review Actions */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-primaryText border-b border-gray-100 pb-3">
          Administrative Decision Actions
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          <button
            disabled={isSubmitting || application.status === 'APPROVED'}
            onClick={() => handleUpdateStatus('APPROVED')}
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            Approve Application
          </button>

          <button
            disabled={isSubmitting}
            onClick={() => setShowClarificationModal(true)}
            className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all disabled:opacity-50"
          >
            <HelpCircle className="w-4 h-4" />
            Request Clarification
          </button>

          <button
            disabled={isSubmitting || application.status === 'REJECTED'}
            onClick={() => handleUpdateStatus('REJECTED')}
            className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all disabled:opacity-50"
          >
            <XCircle className="w-4 h-4" />
            Reject Application
          </button>
        </div>
      </div>

      {/* Clarification Request Modal */}
      {showClarificationModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-200 max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-primaryText">Request Clarification from Student</h3>
            <p className="text-xs text-secondaryText">
              Specify missing documents or additional verification required. The student will be notified on their dashboard timeline.
            </p>

            <textarea
              rows={4}
              value={clarificationNote}
              onChange={(e) => setClarificationNote(e.target.value)}
              placeholder="e.g. Please re-upload a clear copy of your bank passbook showing IFSC code..."
              className="w-full p-3 border border-gray-300 rounded-lg text-xs"
              required
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowClarificationModal(false)}
                className="text-xs font-semibold text-gray-600 hover:text-gray-800 px-3 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestClarification}
                disabled={isSubmitting || !clarificationNote.trim()}
                className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                Send Clarification Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
