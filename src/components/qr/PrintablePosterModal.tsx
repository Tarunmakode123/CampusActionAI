'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Opportunity } from '@/types';
import { QrCode, Printer, Download, Copy, Check, X, Building2, Sparkles } from 'lucide-react';

interface PrintablePosterModalProps {
  opportunity: Opportunity;
  campaignLocation?: string;
  onClose: () => void;
}

export function PrintablePosterModal({ opportunity, campaignLocation, onClose }: PrintablePosterModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const scanUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/scan/${opportunity.slug}`
    : `https://campusaction.ai/scan/${opportunity.slug}`;

  useEffect(() => {
    QRCode.toDataURL(scanUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#EA580C', // Dark Orange brand color
        light: '#FFFFFF'
      }
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR generation error:', err));
  }, [scanUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(scanUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `QR_${opportunity.slug}.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative my-8">
        {/* Modal Controls Bar */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 no-print">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider flex items-center gap-1.5">
            <QrCode className="w-4 h-4" /> Printable Campus Poster Generator
          </span>
          <button onClick={onClose} className="p-1 rounded text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 no-print bg-gray-50 p-3 rounded-xl border border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" /> Print Poster (A4)
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 bg-white text-gray-700 hover:bg-gray-100 font-semibold text-xs px-3.5 py-2 rounded-lg border border-gray-300 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" /> Download QR Image
            </button>
          </div>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Link Copied!' : 'Copy Direct Deep Link'}
          </button>
        </div>

        {/* Printable Poster Layout Container */}
        <div className="printable-qr-poster bg-white border-4 border-brand-500 rounded-3xl p-8 text-center space-y-6 shadow-xl relative overflow-hidden">
          {/* Institutional Header */}
          <div className="border-b-2 border-brand-100 pb-4 space-y-1">
            <div className="flex items-center justify-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-500 text-white flex items-center justify-center font-bold text-xs">
                <Building2 className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="font-bold text-lg text-primaryText tracking-tight">IIST DEMO CAMPUS</span>
            </div>
            <div className="text-[11px] font-semibold text-brand-600 uppercase tracking-widest">
              OFFICIAL STUDENT NOTICE BOARD &bull; {campaignLocation || 'CAMPUS WIDE'}
            </div>
          </div>

          {/* Opportunity Title & Support Value */}
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-primaryText leading-tight">
              {opportunity.title}
            </h2>
            <div className="inline-block bg-orange-50 text-brand-600 text-xl font-extrabold px-4 py-1.5 rounded-xl border border-orange-200">
              {opportunity.benefitAmount}
            </div>
          </div>

          {/* QR Code Graphic Frame */}
          <div className="bg-gradient-to-b from-brand-50 to-orange-100/40 rounded-2xl p-6 border-2 border-dashed border-brand-300 inline-block mx-auto space-y-3">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="Campus Action AI QR Code" className="w-56 h-56 mx-auto rounded-xl shadow-sm" />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center text-xs text-gray-400">Generating QR...</div>
            )}
            <div className="font-extrabold text-brand-700 text-sm tracking-wide">
              Scan to Check Your Eligibility
            </div>
          </div>

          {/* Footer Branding & Disclaimer */}
          <div className="pt-2 border-t border-gray-100 space-y-1">
            <div className="text-xs font-bold text-primaryText flex items-center justify-center gap-1">
              Campus Action <span className="text-brand-500">AI</span>
            </div>
            <div className="text-[10px] text-gray-400">
              Turn Campus Benefits into Student Action &bull; *Sample Institutional Demo Data
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
