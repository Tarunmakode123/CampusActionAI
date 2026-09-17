import React from 'react';
import { services } from '@/services/service-factory';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { Compass, Search } from 'lucide-react';

export default async function StudentOpportunitiesPage() {
  const oppRepo = services.getOpportunityRepository();
  const opportunities = await oppRepo.getAll();
  const published = opportunities.filter((o) => o.status === 'PUBLISHED');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
          Opportunities Directory
        </div>
        <h1 className="text-3xl font-extrabold text-primaryText">
          Campus Benefits & Institutional Schemes
        </h1>
        <p className="text-secondaryText text-sm mt-1">
          Explore official support programs published by IIST Demo Campus.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {published.map((opp) => (
          <OpportunityCard key={opp.id} opportunity={opp} />
        ))}
      </div>
    </div>
  );
}
