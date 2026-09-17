import React from 'react';
import { services } from '@/services/service-factory';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { Compass, Search, Filter } from 'lucide-react';

export default async function BenefitsCatalogPage() {
  const oppRepo = services.getOpportunityRepository();
  const catRepo = services.getCategoryRepository();

  const opportunities = await oppRepo.getAll();
  const categories = await catRepo.getAll();
  const publishedOpps = opportunities.filter((o) => o.status === 'PUBLISHED');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md border border-brand-200">
          <Compass className="w-3.5 h-3.5" />
          Institutional Opportunities Catalog
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primaryText tracking-tight">
          Explore Campus Benefits & Support Programs
        </h1>
        <p className="text-secondaryText text-base max-w-3xl">
          Official financial assistance, research publication rewards, incubation seed funds, and student welfare schemes published by IIST Demo Campus.
        </p>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-1">Categories:</span>
          <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-brand-500 text-white shadow-sm cursor-pointer">
            All Programs ({publishedOpps.length})
          </span>
          {categories.map((cat) => (
            <span
              key={cat.id}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 cursor-pointer transition-colors"
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      {/* Grid of Opportunities */}
      {publishedOpps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishedOpps.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <Compass className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-700">No active opportunities found</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto mt-1">
            No published institutional benefits are currently active.
          </p>
        </div>
      )}
    </div>
  );
}
