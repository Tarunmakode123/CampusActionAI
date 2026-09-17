import React from 'react';
import Link from 'next/link';
import { services } from '@/services/service-factory';
import { Compass, Plus, QrCode, FileText } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default async function AdminBenefitsPage() {
  const oppRepo = services.getOpportunityRepository();
  const opportunities = await oppRepo.getAll();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
            Institutional Opportunity Management
          </div>
          <h1 className="text-3xl font-extrabold text-primaryText">
            Campus Opportunities Directory
          </h1>
          <p className="text-secondaryText text-sm mt-1">
            Create, configure eligibility rules, generate printable QRs, and manage circulars.
          </p>
        </div>

        <Link
          href="/admin/benefits/create"
          className="inline-flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          Create New Opportunity
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="p-4">Opportunity Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Support Value</th>
                <th className="p-4">Policy Version</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {opportunities.map((opp) => (
                <tr key={opp.id} className="hover:bg-gray-50/80">
                  <td className="p-4 font-bold text-primaryText">
                    <div>{opp.title}</div>
                    <div className="text-[11px] font-mono text-gray-400 font-normal">Slug: /{opp.slug}</div>
                  </td>
                  <td className="p-4 text-gray-600">{opp.categoryId}</td>
                  <td className="p-4 font-bold text-brand-600">{opp.benefitAmount}</td>
                  <td className="p-4 text-gray-500 font-mono">{opp.policyVersion}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        opp.status === 'PUBLISHED'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-gray-100 text-gray-700 border-gray-300'
                      }`}
                    >
                      {opp.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link
                      href={`/benefits/${opp.slug}`}
                      className="text-gray-500 hover:text-brand-600 font-semibold"
                    >
                      View
                    </Link>
                    <Link
                      href={`/scan/${opp.slug}`}
                      className="text-brand-600 hover:underline font-bold"
                    >
                      Test QR
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
