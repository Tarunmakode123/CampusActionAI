'use client';

import React, { useState, useEffect } from 'react';
import { UserCheck, ShieldAlert, User, Building2, RefreshCw } from 'lucide-react';
import { demoStore } from '@/repositories/demo/storage';

export function DemoBanner() {
  const [role, setRole] = useState<'STUDENT' | 'ADMIN'>('STUDENT');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedRole = localStorage.getItem('ca_ai_demo_role') as 'STUDENT' | 'ADMIN';
    if (storedRole) setRole(storedRole);
  }, []);

  const toggleRole = (newRole: 'STUDENT' | 'ADMIN') => {
    setRole(newRole);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ca_ai_demo_role', newRole);
      // Redirect to relevant route
      if (newRole === 'STUDENT') {
        window.location.href = '/student/dashboard';
      } else {
        window.location.href = '/admin/dashboard';
      }
    }
  };

  const resetDemoData = () => {
    if (confirm('Reset all demo data back to initial seed state?')) {
      demoStore.resetToDefaults();
      window.location.reload();
    }
  };

  if (!mounted) return null;

  return (
    <div className="bg-brand-50 border-b border-brand-200 px-4 py-2 text-xs text-brand-900 flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 font-semibold bg-brand-100 text-brand-800 px-2 py-0.5 rounded border border-brand-300">
          <ShieldAlert className="w-3.5 h-3.5 text-brand-600" />
          DEMO ENVIRONMENT
        </span>
        <span className="hidden sm:inline text-secondaryText">
          IIST Demo Campus &bull; Sample Institutional Data
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-secondaryText hidden md:inline">Quick Switcher:</span>
        <div className="inline-flex rounded-md shadow-sm bg-white p-0.5 border border-brand-200">
          <button
            onClick={() => toggleRole('STUDENT')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-medium transition-all ${
              role === 'STUDENT'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-brand-600'
            }`}
          >
            <User className="w-3 h-3" />
            Student View
          </button>
          <button
            onClick={() => toggleRole('ADMIN')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-medium transition-all ${
              role === 'ADMIN'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-brand-600'
            }`}
          >
            <Building2 className="w-3 h-3" />
            Admin View
          </button>
        </div>

        <button
          onClick={resetDemoData}
          title="Reset Demo Data"
          className="flex items-center gap-1 px-2 py-1 text-gray-500 hover:text-brand-600 hover:bg-brand-100 rounded transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="hidden lg:inline">Reset</span>
        </button>
      </div>
    </div>
  );
}
