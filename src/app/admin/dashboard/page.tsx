import React from 'react';
import Link from 'next/link';
import { services } from '@/services/service-factory';
import {
  Compass,
  QrCode,
  CheckCircle2,
  FileText,
  AlertCircle,
  TrendingUp,
  History,
  Building2,
  Plus,
  ArrowRight
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const analyticsRepo = services.getAnalyticsRepository();
  const oppRepo = services.getOpportunityRepository();
  const appRepo = services.getApplicationRepository();
  const auditRepo = services.getAuditRepository();

  const metrics = await analyticsRepo.getOverviewMetrics();
  const opportunities = await oppRepo.getAll();
  const applications = await appRepo.getAll();
  const auditLogs = await auditRepo.getAll();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" />
            Campus Administration &bull; IIST Demo Campus
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primaryText">
            Institutional Dashboard Overview
          </h1>
          <p className="text-secondaryText text-sm mt-1">
            Turn every student announcement into an actionable digital workflow.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/benefits/create"
            className="inline-flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            Create New Opportunity
          </Link>
          <Link
            href="/admin/qr-codes"
            className="inline-flex items-center gap-1.5 bg-white text-gray-700 hover:bg-gray-50 font-semibold px-4 py-2.5 rounded-xl border border-gray-200 text-xs shadow-sm transition-colors"
          >
            <QrCode className="w-4 h-4 text-brand-500" />
            Generate Printable QR
          </Link>
        </div>
      </div>

      {/* Top Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-1">
          <div className="text-xs font-medium text-secondaryText flex items-center justify-between">
            <span>Total Opportunities</span>
            <Compass className="w-4 h-4 text-brand-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-primaryText">{metrics.totalOpportunities}</div>
          <div className="text-[11px] text-brand-600 font-medium">{metrics.activeOpportunities} Active Published</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-1">
          <div className="text-xs font-medium text-secondaryText flex items-center justify-between">
            <span>Total QR Scans</span>
            <QrCode className="w-4 h-4 text-brand-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-primaryText">{metrics.totalScans}</div>
          <div className="text-[11px] text-gray-500">{metrics.eligibilityChecks} Eligibility checks</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-1">
          <div className="text-xs font-medium text-secondaryText flex items-center justify-between">
            <span>Applications Received</span>
            <FileText className="w-4 h-4 text-info" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-info">{metrics.totalApplications}</div>
          <div className="text-[11px] text-amber-600 font-medium">{metrics.pendingReviews} Pending Review</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-1">
          <div className="text-xs font-medium text-secondaryText flex items-center justify-between">
            <span>Conversion / Approvals</span>
            <CheckCircle2 className="w-4 h-4 text-success" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-success">{metrics.approvedApplications}</div>
          <div className="text-[11px] text-emerald-700 font-medium">{metrics.conversionRate}% Conversion Rate</div>
        </div>
      </div>

      {/* Main Grid: Applications Review Queue + Recent Audit Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Applications Pending Review Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="font-bold text-lg text-primaryText flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-500" />
              Pending Application Reviews
            </h2>
            <Link href="/admin/applications" className="text-xs font-semibold text-brand-600 hover:underline">
              View All Applications ({applications.length})
            </Link>
          </div>

          <div className="divide-y divide-gray-100 space-y-3">
            {applications.map((app) => (
              <div key={app.id} className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-primaryText">{app.studentName}</span>
                    <span className="text-xs font-mono text-gray-500">#{app.id}</span>
                  </div>
                  <div className="text-xs text-secondaryText mt-0.5">
                    Opportunity: <strong>{app.opportunityTitle}</strong> &bull; {app.documents.length} docs
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
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
                    href={`/admin/applications/${app.id}`}
                    className="inline-flex items-center gap-1 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Review <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log Stream */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="font-bold text-base text-primaryText flex items-center gap-2">
              <History className="w-4 h-4 text-brand-500" />
              Recent Audit Log
            </h2>
            <Link href="/admin/audit-logs" className="text-xs font-semibold text-brand-600 hover:underline">
              Logs
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            {auditLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="p-3 rounded-lg bg-gray-50 border border-gray-200 space-y-1">
                <div className="font-semibold text-gray-800 flex items-center justify-between">
                  <span>{log.action}</span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="text-[11px] text-secondaryText">{log.details}</div>
                <div className="text-[10px] text-gray-400">By: {log.performedBy}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
