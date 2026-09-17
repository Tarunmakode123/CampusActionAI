'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Building,
  CheckCircle2,
  Menu,
  X,
  Compass,
  FileText,
  Bot,
  User,
  LayoutDashboard,
  QrCode,
  BarChart3,
  Layers,
  History
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [role, setRole] = useState<'STUDENT' | 'ADMIN' | 'PUBLIC'>('PUBLIC');

  useEffect(() => {
    if (pathname.startsWith('/admin')) {
      setRole('ADMIN');
    } else if (pathname.startsWith('/student')) {
      setRole('STUDENT');
    } else {
      setRole('PUBLIC');
    }
  }, [pathname]);

  const navLinks =
    role === 'ADMIN'
      ? [
          { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { href: '/admin/benefits', label: 'Opportunities', icon: Compass },
          { href: '/admin/applications', label: 'Applications', icon: FileText },
          { href: '/admin/qr-codes', label: 'QR Generator', icon: QrCode },
          { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
          { href: '/admin/audit-logs', label: 'Audit Logs', icon: History }
        ]
      : role === 'STUDENT'
      ? [
          { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { href: '/student/opportunities', label: 'Opportunities', icon: Compass },
          { href: '/student/applications', label: 'My Applications', icon: FileText },
          { href: '/student/assistant', label: 'AI Assistant', icon: Bot },
          { href: '/student/profile', label: 'Profile', icon: User }
        ]
      : [
          { href: '/benefits', label: 'Explore Benefits', icon: Compass },
          { href: '/student/dashboard', label: 'Student Portal', icon: User },
          { href: '/admin/dashboard', label: 'Admin Portal', icon: Layers }
        ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <div className="relative flex items-center justify-center">
                <Building className="w-5 h-5 text-white stroke-[2.2]" />
                <Sparkles className="w-2.5 h-2.5 text-brand-100 absolute -top-1 -right-1" />
              </div>
            </div>
            <div>
              <div className="font-bold text-lg text-primaryText tracking-tight flex items-center gap-1">
                Campus Action <span className="text-brand-500 font-extrabold">AI</span>
              </div>
              <div className="text-[10px] text-secondaryText leading-none font-medium hidden sm:block">
                Turn Campus Benefits into Student Action
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-600 font-semibold'
                      : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-500' : 'text-gray-400'}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            {role === 'PUBLIC' ? (
              <Link
                href="/student/dashboard"
                className="inline-flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white font-medium text-sm px-4 py-2 rounded-lg shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Check Eligibility
              </Link>
            ) : (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                {role === 'ADMIN' ? 'Admin Portal' : 'Student Portal'}
              </span>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 text-brand-500" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/student/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-brand-500 text-white font-medium py-2.5 rounded-lg shadow-sm"
            >
              Explore Demo Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
