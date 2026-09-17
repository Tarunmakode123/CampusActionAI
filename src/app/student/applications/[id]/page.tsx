import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services } from '@/services/service-factory';
import { formatDate } from '@/lib/utils';
import { ClarificationReplyForm } from '@/components/applications/ClarificationReplyForm';
import {
  FileText,
  CheckCircle2,
  Clock,
  UserCheck,
  Building2,
  FileCheck,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

interface ApplicationDetailPageProps {
  params: {
    id: string;
  };
}

export default async function StudentApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const appRepo = services.getApplicationRepository();
  const application = await appRepo.getById(params.id);

  if (!application) {
    notFound();
  }

  // Define full timeline stages
  const timelineStages = [
    { key: 'SUBMITTED', title: 'Application Submitted', desc: 'Submitted by student via QR Portal' },
    { key: 'FACULTY_VERIFICATION', title: 'Faculty Verification', desc: 'Department faculty advisor verification' },
    { key: 'DEPARTMENT_REVIEW', title: 'Department / R&D Cell Review', desc: 'Institutional committee review' },
    { key: 'APPROVED', title: 'Final Institutional Approval', desc: 'Approved for benefit disbursement' }
  ];

  const getStageState = (stageKey: string) => {
    if (application.status === 'APPROVED' || application.status === 'COMPLETED') return 'COMPLETED';
    if (application.status === stageKey) return 'CURRENT';

    const stageOrder = ['SUBMITTED', 'UNDER_REVIEW', 'FACULTY_VERIFICATION', 'DEPARTMENT_REVIEW', 'APPROVED'];
    const currentIdx = stageOrder.indexOf(application.status);
    const targetIdx = stageOrder.indexOf(stageKey);

    if (currentIdx >= targetIdx) return 'COMPLETED';
    return 'PENDING';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Link */}
      <Link href="/student/applications" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-brand-600">
        <ArrowLeft className="w-4 h-4" /> Back to My Applications
      </Link>

      {/* Application Overview Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div>
            <div className="text-xs font-mono text-brand-600 font-bold">APPLICATION ID: #{application.id}</div>
            <h1 className="text-2xl font-extrabold text-primaryText mt-1">{application.opportunityTitle}</h1>
          </div>

          <span
            className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
              application.status === 'APPROVED'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : application.status === 'REQUESTED_CLARIFICATION'
                ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                : 'bg-blue-50 text-blue-800 border-blue-200'
            }`}
          >
            STATUS: {application.status.replace(/_/g, ' ')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-600 pt-1">
          <div>
            <span className="text-gray-400 block">Student Applicant:</span>
            <span className="font-semibold text-gray-800">{application.studentName}</span>
          </div>
          <div>
            <span className="text-gray-400 block">Submission Date:</span>
            <span className="font-semibold text-gray-800">{formatDate(application.submittedAt)}</span>
          </div>
          <div>
            <span className="text-gray-400 block">Last Activity:</span>
            <span className="font-semibold text-gray-800">{formatDate(application.updatedAt)}</span>
          </div>
        </div>
      </div>

      {/* Interactive Clarification Form if Requested */}
      {application.status === 'REQUESTED_CLARIFICATION' && application.clarificationNote && (
        <ClarificationReplyForm
          applicationId={application.id}
          clarificationNote={application.clarificationNote}
          existingReply={application.studentClarificationReply}
        />
      )}

      {/* Vertical Timeline Tracker */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-primaryText border-b border-gray-100 pb-3">
          Vertical Application Workflow Timeline
        </h2>

        <div className="space-y-6 relative pl-4 border-l-2 border-brand-200 ml-3">
          {timelineStages.map((stg) => {
            const state = getStageState(stg.key);
            return (
              <div key={stg.key} className="relative pl-6">
                <div
                  className={`absolute -left-[25px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    state === 'COMPLETED'
                      ? 'bg-success text-white'
                      : state === 'CURRENT'
                      ? 'bg-brand-500 text-white ring-4 ring-brand-100'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {state === 'COMPLETED' ? <CheckCircle2 className="w-4 h-4" /> : '●'}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-primaryText">{stg.title}</span>
                    {state === 'CURRENT' && (
                      <span className="text-[10px] font-bold bg-brand-100 text-brand-800 px-2 py-0.5 rounded">
                        CURRENT STAGE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-secondaryText">{stg.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Uploaded Documents Verification Inspection */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-primaryText border-b border-gray-100 pb-3">
          Uploaded Documents & Verification Status
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {application.documents.map((doc) => (
            <div key={doc.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-primaryText">{doc.name}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
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
              {doc.fileName && (
                <div className="text-[11px] text-gray-500 font-mono flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-brand-500" />
                  {doc.fileName}
                </div>
              )}
              {doc.feedback && (
                <div className="text-[11px] text-gray-600 bg-white p-2 rounded border border-gray-200 mt-1">
                  Remark: {doc.feedback}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Audit & Status History Log */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-primaryText border-b border-gray-100 pb-3">
          Activity & Audit Log History
        </h2>

        <div className="space-y-3 text-xs">
          {application.statusHistory.map((log) => (
            <div key={log.id} className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-gray-800">{log.updatedBy}</span>: {log.comment}
              </div>
              <span className="text-gray-400 font-mono text-[11px] shrink-0">
                {new Date(log.updatedAt).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
