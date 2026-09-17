import React from 'react';
import Link from 'next/link';
import { Opportunity } from '@/types';
import { formatDate } from '@/lib/utils';
import { ArrowRight, Calendar, Building2, ExternalLink, CheckCircle2 } from 'lucide-react';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-brand-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between p-6 group">
      <div className="space-y-4">
        {/* Top Header & Category */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md border border-brand-200 uppercase tracking-wide">
            {opportunity.categoryId === 'cat-research'
              ? '🔬 Research'
              : opportunity.categoryId === 'cat-financial'
              ? '💰 Financial'
              : opportunity.categoryId === 'cat-startup'
              ? '🚀 Innovation'
              : '🎓 Institutional'}
          </span>
          {opportunity.isDemoData && (
            <span className="text-[10px] text-gray-400 font-mono bg-gray-50 px-1.5 py-0.5 rounded">
              DEMO DATA
            </span>
          )}
        </div>

        {/* Title & Short Description */}
        <div>
          <h3 className="font-bold text-lg text-primaryText group-hover:text-brand-600 transition-colors line-clamp-2">
            {opportunity.title}
          </h3>
          <p className="text-xs text-secondaryText mt-2 line-clamp-3 leading-relaxed">
            {opportunity.shortDescription}
          </p>
        </div>

        {/* Benefit Amount Pill */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-lg border border-orange-100">
          <div className="text-[11px] font-medium text-orange-800 uppercase tracking-wider">Benefit / Support Value</div>
          <div className="text-base font-extrabold text-brand-600 mt-0.5">{opportunity.benefitAmount}</div>
        </div>

        {/* Metadata info */}
        <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Eligibility Pre-check:</span>
            <span className="font-semibold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              Eligible
            </span>
          </div>
          <div className="flex items-center justify-between text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Deadline:
            </span>
            <span className="font-medium text-gray-800">{formatDate(opportunity.deadline)}</span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between gap-3">
        <Link
          href={`/benefits/${opportunity.slug}`}
          className="text-xs font-semibold text-gray-600 hover:text-brand-600 transition-colors"
        >
          View Details
        </Link>

        <Link
          href={`/scan/${opportunity.slug}`}
          className="inline-flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-all hover:scale-105"
        >
          Check Eligibility
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
