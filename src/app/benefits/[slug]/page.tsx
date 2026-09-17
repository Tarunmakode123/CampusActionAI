import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services } from '@/services/service-factory';
import { formatDate } from '@/lib/utils';
import {
  Building2,
  Calendar,
  CheckCircle2,
  FileText,
  ExternalLink,
  Mail,
  User,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';

interface BenefitPageProps {
  params: {
    slug: string;
  };
}

export default async function BenefitDetailPage({ params }: BenefitPageProps) {
  const oppRepo = services.getOpportunityRepository();
  const deptRepo = services.getDepartmentRepository();

  const opportunity = await oppRepo.getBySlug(params.slug);
  if (!opportunity) {
    notFound();
  }

  const department = opportunity.departmentId ? await deptRepo.getById(opportunity.departmentId) : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-secondaryText">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        <Link href="/benefits" className="hover:text-brand-600">Benefits Catalog</Link>
        <span>/</span>
        <span className="font-semibold text-primaryText truncate">{opportunity.title}</span>
      </nav>

      {/* Hero Header Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-md border border-brand-200">
              {opportunity.categoryId === 'cat-research'
                ? '🔬 Research Incentive'
                : opportunity.categoryId === 'cat-financial'
                ? '💰 Financial Support'
                : opportunity.categoryId === 'cat-startup'
                ? '🚀 Startup & Innovation'
                : '🎓 Institutional Scheme'}
            </span>
            <span className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded border border-gray-200">
              Policy Version: {opportunity.policyVersion || 'v1.0'}
            </span>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            🟢 Active Opportunity
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primaryText leading-tight">
            {opportunity.title}
          </h1>
          <p className="text-secondaryText text-base leading-relaxed">
            {opportunity.shortDescription}
          </p>
        </div>

        {/* Highlight Benefit Box */}
        <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 p-5 rounded-xl border border-orange-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-orange-900 uppercase tracking-wider">Configured Benefit / Support Value</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-brand-600 mt-0.5">{opportunity.benefitAmount}</div>
          </div>

          <Link
            href={`/scan/${opportunity.slug}`}
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-brand-500/25 transition-all hover:scale-105 shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            Check My Eligibility
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Official Source & Policy Metadata Bar */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs text-gray-600 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div>
            <span className="text-gray-400 block">Official Source:</span>
            <span className="font-semibold text-gray-800 flex items-center gap-1 mt-0.5">
              <FileText className="w-3.5 h-3.5 text-brand-500" />
              {opportunity.officialSourceTitle || 'Official Circular'}
            </span>
          </div>

          <div>
            <span className="text-gray-400 block">Last Verified Date:</span>
            <span className="font-semibold text-gray-800 flex items-center gap-1 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-brand-500" />
              {formatDate(opportunity.lastUpdated)}
            </span>
          </div>

          <div>
            <span className="text-gray-400 block">Application Deadline:</span>
            <span className="font-semibold text-gray-800 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-brand-500" />
              {formatDate(opportunity.deadline)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Full Description, Rules & Required Documents */}
        <div className="lg:col-span-2 space-y-8">
          {/* Detailed Overview */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-bold text-primaryText border-b border-gray-100 pb-3">
              Program Overview
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {opportunity.description}
            </p>
          </div>

          {/* Configured Eligibility Criteria */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-bold text-primaryText border-b border-gray-100 pb-3 flex items-center justify-between">
              <span>Configured Institutional Criteria</span>
              <span className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded font-mono">
                {opportunity.ruleSet.matchType === 'ALL' ? 'ALL CONDITIONS MUST MATCH' : 'ANY CONDITION MATCHES'}
              </span>
            </h2>

            <div className="space-y-3">
              {opportunity.ruleSet.conditions.map((cond, idx) => (
                <div key={cond.id || idx} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{cond.label}</div>
                    <div className="text-gray-500 font-mono mt-0.5">
                      Rule Logic: [{cond.field}] {cond.operator} {Array.isArray(cond.value) ? cond.value.join(', ') : String(cond.value)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Document Checklist */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-bold text-primaryText border-b border-gray-100 pb-3">
              Required Documents Checklist
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {opportunity.requiredDocuments.map((doc) => (
                <div key={doc.id} className="p-3.5 rounded-lg border border-gray-200 bg-gray-50/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-primaryText">{doc.name}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${doc.required ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-600'}`}>
                      {doc.required ? 'REQUIRED' : 'OPTIONAL'}
                    </span>
                  </div>
                  <p className="text-[11px] text-secondaryText">{doc.description}</p>
                  <div className="text-[10px] text-gray-400 font-mono">Formats: {doc.fileTypesAllowed.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Accordion */}
          {opportunity.faqs && opportunity.faqs.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h2 className="text-lg font-bold text-primaryText border-b border-gray-100 pb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-500" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {opportunity.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-gray-50 border border-gray-200 space-y-1.5">
                    <div className="font-semibold text-xs text-gray-800">Q: {faq.question}</div>
                    <div className="text-xs text-secondaryText leading-relaxed">A: {faq.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Responsible Department & Sticky CTA */}
        <div className="space-y-6">
          {/* Department Contact Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h3 className="font-bold text-sm text-primaryText border-b border-gray-100 pb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-brand-500" />
              Responsible Department
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="font-bold text-gray-800">{department?.name || 'Institutional Office'}</div>
                <div className="text-gray-500">{department?.location}</div>
              </div>

              <div className="pt-2 border-t border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <User className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                  <span>{opportunity.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                  <a href={`mailto:${opportunity.contactEmail}`} className="text-brand-600 hover:underline">
                    {opportunity.contactEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky CTA Box */}
          <div className="bg-gradient-to-b from-brand-50 to-orange-100/50 rounded-xl border border-brand-200 p-6 space-y-4">
            <h4 className="font-bold text-sm text-brand-900">Ready to verify your eligibility?</h4>
            <p className="text-xs text-brand-800 leading-relaxed">
              Campus Action AI compares your student profile against official institutional criteria in real time.
            </p>

            <Link
              href={`/scan/${opportunity.slug}`}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-sm transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Check My Eligibility Now
            </Link>

            <div className="text-[11px] text-gray-500 text-center leading-tight">
              Deterministic pre-check evaluation. Final approval subject to department verification.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
