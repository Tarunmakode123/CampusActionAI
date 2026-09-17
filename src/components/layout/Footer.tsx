import React from 'react';
import Link from 'next/link';
import { Building, Sparkles, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white">
                <Building className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="font-bold text-lg text-primaryText">Campus Action AI</span>
            </div>
            <p className="text-secondaryText text-sm max-w-md">
              Connecting students with institutional benefits, research incentives, financial support, and startup programs — turning static campus notices into actionable digital workflows.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-md">
              <ShieldCheck className="w-4 h-4 text-brand-500" />
              <span>Campus Action AI provides pre-eligibility evaluation. Final approval remains with institution authority.</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-primaryText mb-3 text-xs uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-brand-600">Home Landing</Link></li>
              <li><Link href="/benefits" className="hover:text-brand-600">Public Opportunity Catalog</Link></li>
              <li><Link href="/student/dashboard" className="hover:text-brand-600">Student Dashboard</Link></li>
              <li><Link href="/student/assistant" className="hover:text-brand-600">AI Student Assistant</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primaryText mb-3 text-xs uppercase tracking-wider">Institutional Admin</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/admin/dashboard" className="hover:text-brand-600">Admin Overview</Link></li>
              <li><Link href="/admin/benefits" className="hover:text-brand-600">Opportunity Management</Link></li>
              <li><Link href="/admin/qr-codes" className="hover:text-brand-600">Printable QR Generator</Link></li>
              <li><Link href="/admin/audit-logs" className="hover:text-brand-600">Audit & Governance Logs</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-secondaryText gap-4">
          <div>
            &copy; {new Date().getFullYear()} Campus Action AI. Built for Higher Education Institutions.
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-brand-50 text-brand-600 px-2 py-1 rounded font-medium border border-brand-200">
              IIST Demo Campus Environment
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
