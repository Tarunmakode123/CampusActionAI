'use client';

import React, { useState } from 'react';
import { QRCodeRecord, Opportunity } from '@/types';
import { PrintablePosterModal } from './PrintablePosterModal';
import { QrCode, Printer, Eye, Copy, Check, TrendingUp } from 'lucide-react';

interface QRManagementListProps {
  qrRecords: QRCodeRecord[];
  opportunities: Opportunity[];
}

export function QRManagementList({ qrRecords, opportunities }: QRManagementListProps) {
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleOpenPrintModal = (opportunityId: string) => {
    const opp = opportunities.find((o) => o.id === opportunityId || o.slug === opportunityId);
    if (opp) {
      setSelectedOpp(opp);
    }
  };

  const handleCopy = (id: string, slug: string) => {
    const url = `${window.location.origin}/scan/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="p-4">Benefit Program</th>
                <th className="p-4">Physical Campaign Location</th>
                <th className="p-4">Scans & Funnel</th>
                <th className="p-4">QR Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {qrRecords.map((qr) => {
                const opp = opportunities.find((o) => o.id === qr.opportunityId);
                const slug = opp?.slug || qr.opportunityId;

                return (
                  <tr key={qr.id} className="hover:bg-gray-50/80">
                    <td className="p-4">
                      <div className="font-bold text-primaryText">{qr.opportunityTitle}</div>
                      <div className="text-[11px] font-mono text-gray-400">ID: #{qr.id}</div>
                    </td>
                    <td className="p-4 text-gray-600">
                      {qr.campaignLocation || 'Main Campus Notice Board'}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-brand-600 flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {qr.analytics.scans} Scans
                      </div>
                      <div className="text-[11px] text-gray-500 font-mono">
                        {qr.analytics.eligibility_completed} checks &bull; {qr.analytics.application_submitted} apps
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        ACTIVE
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenPrintModal(qr.opportunityId)}
                        className="inline-flex items-center gap-1 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" /> View / Print Poster
                      </button>
                      <button
                        onClick={() => handleCopy(qr.id, slug)}
                        className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs px-2.5 py-1.5 rounded-lg transition-colors"
                      >
                        {copiedId === qr.id ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedId === qr.id ? 'Copied' : 'Copy Link'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOpp && (
        <PrintablePosterModal
          opportunity={selectedOpp}
          onClose={() => setSelectedOpp(null)}
        />
      )}
    </div>
  );
}
