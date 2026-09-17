import React from 'react';
import Link from 'next/link';
import { services } from '@/services/service-factory';
import { FileText, ArrowRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default async function StudentApplicationsListPage() {
  const appRepo = services.getApplicationRepository();
  const studentRepo = services.getStudentRepository();
  const student = await studentRepo.getProfile('stu-rahul-sharma');
  const applications = await appRepo.getByStudentId(student?.id || '');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
          Application Tracking
        </div>
        <h1 className="text-3xl font-extrabold text-primaryText">
          My Applications
        </h1>
        <p className="text-secondaryText text-sm mt-1">
          Track real-time status, document verifications, and department review logs.
        </p>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-primaryText">{app.opportunityTitle}</h3>
                  <span className="text-xs font-mono text-gray-500">#{app.id}</span>
                </div>
                <div className="text-xs text-secondaryText mt-0.5">
                  Submitted: {new Date(app.submittedAt).toLocaleDateString('en-IN')}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    app.status === 'APPROVED'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : app.status === 'REQUESTED_CLARIFICATION'
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-blue-50 text-blue-800 border-blue-200'
                  }`}
                >
                  {app.status.replace(/_/g, ' ')}
                </span>
                <Link
                  href={`/student/applications/${app.id}`}
                  className="inline-flex items-center gap-1 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-colors"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Document Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[11px] font-semibold text-gray-500 mr-2">Documents:</span>
              {app.documents.map((doc) => (
                <span key={doc.id} className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200">
                  {doc.name}: <strong className="text-brand-600">{doc.verificationStatus}</strong>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
