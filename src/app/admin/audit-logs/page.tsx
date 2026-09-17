import React from 'react';
import { services } from '@/services/service-factory';
import { History, ShieldCheck, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default async function AdminAuditLogsPage() {
  const auditRepo = services.getAuditRepository();
  const logs = await auditRepo.getAll();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <History className="w-3.5 h-3.5" />
          Governance & Audit Logs
        </div>
        <h1 className="text-3xl font-extrabold text-primaryText">
          Institutional Audit History
        </h1>
        <p className="text-secondaryText text-sm mt-1">
          Complete, immutable log of administrative actions, eligibility rule updates, document verifications, and approvals.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Action</th>
                <th className="p-4">Performed By</th>
                <th className="p-4">Target Resource</th>
                <th className="p-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/80">
                  <td className="p-4 font-mono text-gray-500">
                    {new Date(log.timestamp).toLocaleString('en-IN')}
                  </td>
                  <td className="p-4">
                    <span className="bg-brand-50 text-brand-700 font-bold px-2 py-0.5 rounded border border-brand-200">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 text-gray-800 font-bold">{log.performedBy}</td>
                  <td className="p-4 font-mono text-gray-600">
                    {log.targetType}: {log.targetId}
                  </td>
                  <td className="p-4 text-secondaryText max-w-md">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
