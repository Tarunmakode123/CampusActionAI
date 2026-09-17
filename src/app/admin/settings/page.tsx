import React from 'react';
import { services } from '@/services/service-factory';
import { Building2, ShieldCheck, Globe, Mail } from 'lucide-react';

export default async function AdminSettingsPage() {
  const instRepo = services.getInstitutionRepository();
  const config = await instRepo.getConfig();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
          System Settings
        </div>
        <h1 className="text-3xl font-extrabold text-primaryText">
          Institution & Persistence Configuration
        </h1>
        <p className="text-secondaryText text-sm mt-1">
          Manage campus identity, official domain credentials, and persistence mode settings.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <Building2 className="w-6 h-6 text-brand-500" />
          <div>
            <h2 className="font-bold text-lg text-primaryText">{config.name}</h2>
            <div className="text-xs text-gray-500 font-mono">Institution ID: {config.id} &bull; Code: {config.code}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <span className="text-gray-400 block">Official Website:</span>
            <span className="font-bold text-gray-800 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-brand-500" />
              {config.officialWebsite}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <span className="text-gray-400 block">Official Email:</span>
            <span className="font-bold text-gray-800 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-brand-500" />
              {config.officialEmail}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-200 space-y-2 text-xs">
          <div className="font-bold text-brand-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-500" />
            Persistence & Mode Selector Status:
          </div>
          <p className="text-brand-800">
            Currently running in <strong>DEMO MODE</strong> with local state persistence. Dual persistence mode architecture allows switching to Supabase PostgreSQL/Storage with zero client-side UI modifications.
          </p>
        </div>
      </div>
    </div>
  );
}
