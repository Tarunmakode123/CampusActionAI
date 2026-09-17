import React from 'react';
import Link from 'next/link';
import { services } from '@/services/service-factory';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import {
  Compass,
  CheckCircle2,
  FileText,
  AlertCircle,
  ArrowRight,
  User,
  Sparkles,
  Bot
} from 'lucide-react';

export default async function StudentDashboardPage() {
  const oppRepo = services.getOpportunityRepository();
  const studentRepo = services.getStudentRepository();
  const appRepo = services.getApplicationRepository();

  const student = await studentRepo.getProfile('stu-rahul-sharma');
  const opportunities = await oppRepo.getAll();
  const publishedOpps = opportunities.filter((o) => o.status === 'PUBLISHED');
  const myApplications = await appRepo.getByStudentId(student?.id || '');

  const pendingActions = myApplications.filter(
    (a) => a.status === 'REQUESTED_CLARIFICATION'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            Student Dashboard &bull; {student?.program || 'B.Tech Student'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primaryText">
            Good morning, {student?.name || 'Rahul Sharma'} 👋
          </h1>
          <p className="text-secondaryText text-sm mt-1">
            Here are institutional opportunities and applications matched to your profile.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/student/assistant"
            className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 hover:bg-brand-100 font-semibold px-4 py-2.5 rounded-xl border border-brand-200 text-xs transition-colors"
          >
            <Bot className="w-4 h-4 text-brand-500" />
            Ask AI Assistant
          </Link>
          <Link
            href="/student/profile"
            className="inline-flex items-center gap-1.5 bg-white text-gray-700 hover:bg-gray-50 font-semibold px-4 py-2.5 rounded-xl border border-gray-200 text-xs shadow-sm transition-colors"
          >
            <User className="w-4 h-4 text-gray-500" />
            Academic Profile
          </Link>
        </div>
      </div>

      {/* Action Required Banner if Clarification Requested */}
      {pendingActions.length > 0 && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-center justify-between gap-4 text-amber-900">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
            <div>
              <div className="font-bold text-xs uppercase tracking-wider text-amber-800">Action Required</div>
              <div className="text-sm font-semibold mt-0.5">
                Department requested clarification for application: {pendingActions[0].opportunityTitle}
              </div>
            </div>
          </div>
          <Link
            href={`/student/applications/${pendingActions[0].id}`}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2 rounded-lg shrink-0 transition-colors"
          >
            Respond Now
          </Link>
        </div>
      )}

      {/* Top Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-secondaryText text-xs font-medium">
            <span>Published Opportunities</span>
            <Compass className="w-4 h-4 text-brand-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-primaryText">
            {publishedOpps.length}
          </div>
          <div className="text-[11px] text-gray-500">Available on campus</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-secondaryText text-xs font-medium">
            <span>Eligible Now</span>
            <CheckCircle2 className="w-4 h-4 text-success" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-success">
            {publishedOpps.length}
          </div>
          <div className="text-[11px] text-emerald-700">CGPA 8.2 & SCI paper match</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-secondaryText text-xs font-medium">
            <span>My Applications</span>
            <FileText className="w-4 h-4 text-info" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-info">
            {myApplications.length}
          </div>
          <div className="text-[11px] text-gray-500">Submitted applications</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-secondaryText text-xs font-medium">
            <span>Actions Pending</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">
            {pendingActions.length}
          </div>
          <div className="text-[11px] text-gray-500">Requires your response</div>
        </div>
      </div>

      {/* Relevant Opportunities Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-primaryText flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-500" />
            Opportunities Relevant to You
          </h2>
          <Link href="/student/opportunities" className="text-xs font-semibold text-brand-600 hover:underline">
            View All ({publishedOpps.length})
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishedOpps.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      </div>

      {/* Active Applications Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-lg font-bold text-primaryText flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-500" />
            Recent Applications Tracker
          </h2>
          <Link href="/student/applications" className="text-xs font-semibold text-brand-600 hover:underline">
            View All Applications
          </Link>
        </div>

        {myApplications.length > 0 ? (
          <div className="space-y-3">
            {myApplications.map((app) => (
              <div
                key={app.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-brand-200 bg-gray-50/50 gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-primaryText">{app.opportunityTitle}</span>
                    <span className="text-xs font-mono text-gray-500">#{app.id}</span>
                  </div>
                  <div className="text-xs text-secondaryText mt-1">
                    Submitted on {new Date(app.submittedAt).toLocaleDateString('en-IN')} &bull; {app.documents.length} documents uploaded
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      app.status === 'APPROVED'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : app.status === 'REQUESTED_CLARIFICATION'
                        ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                        : 'bg-blue-50 text-blue-800 border-blue-200'
                    }`}
                  >
                    {app.status.replace(/_/g, ' ')}
                  </span>
                  <Link
                    href={`/student/applications/${app.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
                  >
                    Track Progress <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-secondaryText text-sm">
            You haven't submitted any applications yet.
          </div>
        )}
      </div>
    </div>
  );
}
