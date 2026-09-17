import React from 'react';
import { services } from '@/services/service-factory';
import { BarChart3, TrendingUp, QrCode, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export default async function AdminAnalyticsPage() {
  const qrRepo = services.getQRCodeRepository();
  const analyticsRepo = services.getAnalyticsRepository();

  const qrRecords = await qrRepo.getAll();
  const metrics = await analyticsRepo.getOverviewMetrics();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-gray-200 pb-6">
        <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <BarChart3 className="w-3.5 h-3.5" />
          Funnel & Engagement Analytics
        </div>
        <h1 className="text-3xl font-extrabold text-primaryText">
          Campus Engagement & Conversion Analytics
        </h1>
        <p className="text-secondaryText text-sm mt-1">
          Track conversion rates from initial physical poster scan to eligibility evaluation and application submission.
        </p>
      </div>

      {/* Conversion Funnel Visualization */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
        <h2 className="font-bold text-base text-primaryText border-b border-gray-100 pb-3">
          Overall Campus Conversion Funnel
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 space-y-1">
            <div className="text-xs text-orange-900 font-bold uppercase">1. Poster QR Scans</div>
            <div className="text-3xl font-extrabold text-brand-600">{metrics.totalScans}</div>
            <div className="text-[11px] text-gray-500">100% Top of Funnel</div>
          </div>

          <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200 space-y-1">
            <div className="text-xs text-orange-900 font-bold uppercase">2. Eligibility Checks</div>
            <div className="text-3xl font-extrabold text-brand-600">{metrics.eligibilityChecks}</div>
            <div className="text-[11px] text-gray-500 font-mono">
              {metrics.totalScans > 0 ? Math.round((metrics.eligibilityChecks / metrics.totalScans) * 100) : 0}% Scan to Check
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
            <div className="text-xs text-blue-900 font-bold uppercase">3. Applications Submitted</div>
            <div className="text-3xl font-extrabold text-info">{metrics.totalApplications}</div>
            <div className="text-[11px] text-gray-500 font-mono">
              {metrics.eligibilityChecks > 0 ? Math.round((metrics.totalApplications / metrics.eligibilityChecks) * 100) : 0}% Check to App
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
            <div className="text-xs text-emerald-900 font-bold uppercase">4. Approved & Paid</div>
            <div className="text-3xl font-extrabold text-emerald-600">{metrics.approvedApplications}</div>
            <div className="text-[11px] text-emerald-700 font-mono font-bold">
              {metrics.conversionRate}% Final Conversion
            </div>
          </div>
        </div>
      </div>

      {/* Program Level Funnel Breakdown Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 font-bold text-base text-primaryText">
          Funnel Breakdown by Institutional Opportunity Program
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="p-4">Program Title</th>
                <th className="p-4">Scans</th>
                <th className="p-4">Eligibility Started</th>
                <th className="p-4">Eligibility Completed</th>
                <th className="p-4">Submitted</th>
                <th className="p-4">Approved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {qrRecords.map((qr) => (
                <tr key={qr.id} className="hover:bg-gray-50/80">
                  <td className="p-4 font-bold text-primaryText">{qr.opportunityTitle}</td>
                  <td className="p-4 font-bold text-brand-600">{qr.analytics.scans}</td>
                  <td className="p-4 text-gray-700">{qr.analytics.eligibility_started}</td>
                  <td className="p-4 text-gray-700">{qr.analytics.eligibility_completed}</td>
                  <td className="p-4 text-info font-bold">{qr.analytics.application_submitted}</td>
                  <td className="p-4 text-success font-bold">{qr.analytics.application_approved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
