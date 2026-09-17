import React from 'react';
import { services } from '@/services/service-factory';
import { QRManagementList } from '@/components/qr/QRManagementList';
import { QrCode } from 'lucide-react';

export default async function AdminQRCodesPage() {
  const qrRepo = services.getQRCodeRepository();
  const oppRepo = services.getOpportunityRepository();

  const qrRecords = await qrRepo.getAll();
  const opportunities = await oppRepo.getAll();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <QrCode className="w-3.5 h-3.5" />
          QR & Poster Management
        </div>
        <h1 className="text-3xl font-extrabold text-primaryText">
          Printable QR Poster Generator & Deep Links
        </h1>
        <p className="text-secondaryText text-sm mt-1">
          Generate high-resolution printable posters, assign physical campus campaign locations, and track real-time QR scan conversion funnels.
        </p>
      </div>

      <QRManagementList qrRecords={qrRecords} opportunities={opportunities} />
    </div>
  );
}
