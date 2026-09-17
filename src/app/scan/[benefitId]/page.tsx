import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services } from '@/services/service-factory';
import { QrCode, Sparkles, ArrowRight, Building2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { EligibilityWizardModal } from '@/components/eligibility/EligibilityWizardModal';

interface ScanPageProps {
  params: {
    benefitId: string;
  };
}

export default async function ScanPage({ params }: ScanPageProps) {
  const oppRepo = services.getOpportunityRepository();
  const qrRepo = services.getQRCodeRepository();
  const studentRepo = services.getStudentRepository();

  let opportunity = await oppRepo.getBySlug(params.benefitId);
  if (!opportunity) {
    opportunity = await oppRepo.getById(params.benefitId);
  }

  if (!opportunity) {
    notFound();
  }

  // Record funnel scan event
  await qrRepo.recordFunnelEvent(opportunity.id, 'scans');
  const student = await studentRepo.getProfile('stu-rahul-sharma');

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-brand-50/40 via-white to-white">
      <div className="max-w-xl w-full bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden space-y-6">
        {/* Physical Campus Poster Simulation Frame Header */}
        <div className="bg-brand-500 text-white p-6 text-center relative">
          <div className="inline-flex items-center gap-1.5 bg-brand-600/80 text-brand-100 text-xs font-mono px-3 py-1 rounded-full mb-2">
            <QrCode className="w-3.5 h-3.5" />
            PHYSICAL POSTER QR SCAN DETECTED
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {opportunity.title}
          </h1>
          <p className="text-xs text-brand-100 mt-1">
            Official Institution Announcement &bull; IIST Demo Campus
          </p>
        </div>

        {/* Poster Content Summary Body */}
        <div className="p-6 space-y-6">
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 space-y-1">
            <div className="text-xs font-bold text-orange-900 uppercase">Configured Institutional Benefit</div>
            <div className="text-2xl font-extrabold text-brand-600">{opportunity.benefitAmount}</div>
          </div>

          <p className="text-xs text-secondaryText leading-relaxed">
            {opportunity.shortDescription}
          </p>

          <div className="bg-gray-50 p-3.5 rounded-lg border border-gray-200 text-xs space-y-2">
            <div className="font-semibold text-gray-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-500" />
              Automated Pre-Check Information:
            </div>
            <p className="text-gray-600 text-[11px] leading-normal">
              Campus Action AI will evaluate your student profile against official institutional criteria configured by {opportunity.contactPerson}.
            </p>
          </div>

          {/* Interactive Eligibility Wizard Component */}
          {student && (
            <EligibilityWizardModal opportunity={opportunity} student={student} />
          )}

          <div className="pt-2 text-center">
            <Link
              href={`/benefits/${opportunity.slug}`}
              className="text-xs font-semibold text-gray-500 hover:text-brand-600 underline"
            >
              View Full Program Details & Official Circular
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
