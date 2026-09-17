import React from 'react';
import Link from 'next/link';
import {
  QrCode,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Building2,
  Search,
  Compass,
  Zap,
  TrendingUp,
  GraduationCap,
  ChevronRight
} from 'lucide-react';
import { services } from '@/services/service-factory';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';

export default async function HomePage() {
  const oppRepo = services.getOpportunityRepository();
  const opportunities = await oppRepo.getAll();
  const publishedOpps = opportunities.filter((o) => o.status === 'PUBLISHED');

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-white pt-12 pb-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100 text-brand-800 text-xs font-semibold border border-brand-200">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>AI-Powered Institutional Opportunity Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primaryText tracking-tight leading-tight">
                See a Campus Benefit. <br />
                <span className="text-brand-500">Know What to Do Next.</span>
              </h1>

              <p className="text-lg sm:text-xl text-secondaryText max-w-2xl leading-relaxed">
                Campus Action AI connects students with the benefits, research incentives, financial aid, and startup support already offered by their institution — from immediate eligibility check to final application approval.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/student/dashboard"
                  className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3.5 rounded-xl shadow-md shadow-brand-500/25 transition-all hover:scale-[1.02] text-base"
                >
                  <Compass className="w-5 h-5" />
                  Explore Opportunities
                </Link>
                <Link
                  href="/scan/research-incentive"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-semibold px-6 py-3.5 rounded-xl border border-gray-300 shadow-sm transition-all hover:border-brand-300 text-base"
                >
                  <QrCode className="w-5 h-5 text-brand-500" />
                  Simulate QR Scan
                </Link>
              </div>

              <div className="pt-4 flex items-center gap-6 text-xs text-secondaryText border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  <span>Deterministic Rule Engine</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-brand-500" />
                  <span>Document Checklist</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-info" />
                  <span>Real-time Timeline Tracking</span>
                </div>
              </div>
            </div>

            {/* Right Hero Diagram / Visual Representation */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    Physical Poster to Workflow
                  </span>
                  <span className="text-[10px] bg-brand-100 text-brand-800 px-2 py-0.5 rounded font-mono">
                    LIVE DEMO
                  </span>
                </div>

                {/* Workflow Diagram Nodes */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50/50 border border-orange-100">
                    <div className="w-8 h-8 rounded-md bg-brand-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      1
                    </div>
                    <div>
                      <div className="text-xs font-bold text-primaryText">Campus Notice Poster</div>
                      <div className="text-[11px] text-secondaryText">Student spots QR on R&D notice board</div>
                    </div>
                  </div>

                  <div className="w-0.5 h-3 bg-brand-300 ml-7"></div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50/50 border border-orange-100">
                    <div className="w-8 h-8 rounded-md bg-brand-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      2
                    </div>
                    <div>
                      <div className="text-xs font-bold text-primaryText">Instant QR Deep-Link</div>
                      <div className="text-[11px] text-secondaryText">Opens /scan/research-incentive</div>
                    </div>
                  </div>

                  <div className="w-0.5 h-3 bg-brand-300 ml-7"></div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50/50 border border-orange-100">
                    <div className="w-8 h-8 rounded-md bg-brand-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      3
                    </div>
                    <div>
                      <div className="text-xs font-bold text-primaryText">Deterministic Eligibility</div>
                      <div className="text-[11px] text-secondaryText">Evaluates CGPA &gt;= 7.5 &amp; SCI paper criteria</div>
                    </div>
                  </div>

                  <div className="w-0.5 h-3 bg-brand-300 ml-7"></div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="w-8 h-8 rounded-md bg-success text-white flex items-center justify-center font-bold text-xs shrink-0">
                      4
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-900">Application & Approval</div>
                      <div className="text-[11px] text-emerald-700">Submits required docs to R&D Cell</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs font-bold text-brand-600 uppercase tracking-widest">How It Works</h2>
          <p className="text-3xl font-extrabold text-primaryText">From Notice Board to Application Approval</p>
          <p className="text-secondaryText">Five simple digital steps turning passive notices into completed student actions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            {
              step: 'STEP 1',
              title: 'See',
              desc: 'Student sees a college poster, notice, or official circular.',
              icon: Building2
            },
            {
              step: 'STEP 2',
              title: 'Scan',
              desc: 'Student scans the physical QR code with any mobile camera.',
              icon: QrCode
            },
            {
              step: 'STEP 3',
              title: 'Check',
              desc: 'Campus Action AI evaluates student academic profile against criteria.',
              icon: CheckCircle2
            },
            {
              step: 'STEP 4',
              title: 'Act',
              desc: 'Student receives clear document checklist and submits application.',
              icon: FileCheck
            },
            {
              step: 'STEP 5',
              title: 'Track',
              desc: 'Student tracks application progress on real-time vertical timeline.',
              icon: TrendingUp
            }
          ].map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-brand-300 hover:shadow-md transition-all relative space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                    {s.step}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-600 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-bold text-lg text-primaryText">{s.title}</h3>
                <p className="text-xs text-secondaryText leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-primaryText">Example Campus Opportunities</h2>
            <p className="text-sm text-secondaryText">Published institutional support programs ready for eligibility evaluation</p>
          </div>
          <Link
            href="/benefits"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            View All Benefits Catalog <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishedOpps.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      </section>

      {/* Institutional Value Section */}
      <section className="bg-gray-50 border-y border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">For College Administration</span>
              <h2 className="text-3xl font-extrabold text-primaryText">
                Turn Every Student Announcement into an Actionable Digital Service.
              </h2>
              <p className="text-secondaryText leading-relaxed">
                Colleges publish dozens of circulars annually for scholarships, research grants, and incubation funds. Campus Action AI empowers administrators to configure rules once, generate QR codes, and track real-time student engagement.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Configurable Eligibility Rule Builder (No code required)',
                  'Printable QR Posters with deep-link tracking',
                  'Multi-stage administrative review & clarification workflows',
                  'Comprehensive audit logs for governance compliance'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/admin/dashboard"
                  className="inline-flex items-center gap-2 bg-primaryText hover:bg-black text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
                >
                  <Building2 className="w-4 h-4" />
                  Open Admin Dashboard
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md space-y-4">
              <h3 className="font-bold text-base text-primaryText border-b border-gray-100 pb-3 flex items-center justify-between">
                <span>Institutional Funnel Analytics</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">DEMO SNAPSHOT</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-50/50 p-4 rounded-xl border border-brand-100">
                  <div className="text-2xl font-extrabold text-brand-600">351</div>
                  <div className="text-xs text-secondaryText font-medium mt-1">Total QR Scans</div>
                </div>
                <div className="bg-brand-50/50 p-4 rounded-xl border border-brand-100">
                  <div className="text-2xl font-extrabold text-brand-600">237</div>
                  <div className="text-xs text-secondaryText font-medium mt-1">Eligibility Checks</div>
                </div>
                <div className="bg-brand-50/50 p-4 rounded-xl border border-brand-100">
                  <div className="text-2xl font-extrabold text-brand-600">76</div>
                  <div className="text-xs text-secondaryText font-medium mt-1">Applications Started</div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                  <div className="text-2xl font-extrabold text-emerald-600">58</div>
                  <div className="text-xs text-emerald-800 font-medium mt-1">Approved Applications</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-2xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to explore Campus Action AI?</h2>
            <p className="text-brand-100 text-sm max-w-xl">
              Experience the end-to-end demo flow from student QR scanning to administrative approval.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/student/dashboard"
              className="bg-white text-brand-600 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors shadow-sm text-sm"
            >
              Enter Demo Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
