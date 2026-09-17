import React from 'react';
import { OpportunityWizard } from '@/components/admin/OpportunityWizard';

export default function CreateOpportunityPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
          Opportunity Rule Builder Wizard
        </div>
        <h1 className="text-3xl font-extrabold text-primaryText">
          Create & Configure Campus Benefit
        </h1>
        <p className="text-secondaryText text-sm mt-1">
          Publish official institutional schemes, configure rule-based eligibility, set required documents, and generate printable QRs.
        </p>
      </div>

      <OpportunityWizard />
    </div>
  );
}
