import React from 'react';
import Link from 'next/link';
import { services } from '@/services/service-factory';
import { FileText, ArrowRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default async function AdminApplicationsListPage() {
  const appRepo = services.getApplicationRepository();
  const applications = await appRepo.getAll();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
            Application Review Management
          </div>
          <h1 className="text-3xl font-extrabold text-primaryText">
            Student Applications Queue
          </h1>
          <p className="text-secondaryText text-sm mt-1">
            Review student documents, verify eligibility criteria, request clarifications, and approve benefit disbursements.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="p-4">Application ID & Student</th>
                <th className="p-4">Target Opportunity</th>
                <th className="p-4">Submitted Date</th>
                <th className="p-4">Documents</th>
                <th className="p-4">Current Status</th>
                <th className="p-4 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/80">
                  <td className="p-4">
                    <div className="font-bold text-primaryText">{app.studentName}</div>
                    <div className="text-[11px] font-mono text-gray-400">#{app.id}</div>
                  </td>
                  <td className="p-4 font-semibold text-gray-800">{app.opportunityTitle}</td>
                  <td className="p-4 text-gray-500">{formatDate(app.submittedAt)}</td>
                  <td className="p-4 text-gray-600 font-mono">{app.documents.length} Uploaded</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        app.status === 'APPROVED'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : app.status === 'REQUESTED_CLARIFICATION'
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-blue-50 text-blue-800 border-blue-200'
                      }`}
                    >
                      {app.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/applications/${app.id}`}
                      className="inline-flex items-center gap-1 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition-colors"
                    >
                      Inspect & Review <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
