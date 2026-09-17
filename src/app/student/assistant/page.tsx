import React from 'react';
import { services } from '@/services/service-factory';
import { AIAssistantChat } from '@/components/assistant/AIAssistantChat';

export default async function StudentAssistantPage() {
  const oppRepo = services.getOpportunityRepository();
  const deptRepo = services.getDepartmentRepository();

  const opportunities = await oppRepo.getAll();
  const departments = await deptRepo.getAll();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
          AI Student Assistant
        </div>
        <h1 className="text-3xl font-extrabold text-primaryText">
          Ask Campus Action AI
        </h1>
        <p className="text-secondaryText text-sm mt-1">
          Instant guidance grounded in official institutional rules, document requirements, and circulars.
        </p>
      </div>

      <AIAssistantChat opportunities={opportunities} departments={departments} />
    </div>
  );
}
