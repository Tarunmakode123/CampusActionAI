import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services } from '@/services/service-factory';
import { formatDate } from '@/lib/utils';
import { ApplicationReviewActions } from '@/components/admin/ApplicationReviewActions';
import { ArrowLeft, User, Calendar, FileText, CheckCircle2 } from 'lucide-react';

interface AdminApplicationReviewPageProps {
  params: {
    id: string;
  };
}

export default async function AdminApplicationReviewPage({ params }: AdminApplicationReviewPageProps) {
  const appRepo = services.getApplicationRepository();
  const studentRepo = services.getStudentRepository();
  const oppRepo = services.getOpportunityRepository();

  const application = await appRepo.getById(params.id);
  if (!application) {
    notFound();
  }

  const student = await studentRepo.getProfile(application.studentId);
  const opportunity = await oppRepo.getById(application.opportunityId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Link */}
      <Link href="/admin/applications" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-brand-600">
        <ArrowLeft className="w-4 h-4" /> Back to Applications List
      </Link>

      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div>
            <div className="text-xs font-mono text-brand-600 font-bold">APPLICATION REVIEW # {application.id}</div>
            <h1 className="text-2xl font-extrabold text-primaryText mt-1">{application.opportunityTitle}</h1>
          </div>

          <span
            className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
              application.status === 'APPROVED'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : application.status === 'REQUESTED_CLARIFICATION'
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-blue-50 text-blue-800 border-blue-200'
            }`}
          >
            STATUS: {application.status.replace(/_/g, ' ')}
          </span>
        </div>

        {/* Student Profile Snapshot */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div>
            <span className="text-gray-400 block">Student Applicant:</span>
            <span className="font-bold text-gray-800 text-sm">{application.studentName}</span>
            <span className="text-[11px] text-gray-500 block">{student?.program}</span>
          </div>

          <div>
            <span className="text-gray-400 block">Academic Credentials:</span>
            <span className="font-bold text-brand-600">CGPA: {student?.cgpa}</span>
            <span className="text-[11px] text-gray-500 block">12th %: {student?.twelfthPercentage}%</span>
          </div>

          <div>
            <span className="text-gray-400 block">Research & Startup:</span>
            <span className="font-bold text-emerald-700 block">
              Pub: {student?.publicationType || 'None'}
            </span>
            <span className="text-[11px] text-gray-500">
              Startup: {student?.startupStatus ? 'Active' : 'No'}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Review Actions & Document Inspector Component */}
      <ApplicationReviewActions application={application} />

      {/* History & Audit Log */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-primaryText border-b border-gray-100 pb-3">
          Application Audit Log History
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
