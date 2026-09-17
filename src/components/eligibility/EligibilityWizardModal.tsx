'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Opportunity, StudentProfile, EligibilityEvaluationResult } from '@/types';
import { evaluateEligibility } from '@/lib/eligibility-engine';
import { services } from '@/services/service-factory';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileCheck,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface EligibilityWizardModalProps {
  opportunity: Opportunity;
  student: StudentProfile;
}

export function EligibilityWizardModal({ opportunity, student }: EligibilityWizardModalProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<Partial<StudentProfile>>({ ...student });
  const [evaluationResult, setEvaluationResult] = useState<EligibilityEvaluationResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const conditions = opportunity.ruleSet.conditions || [];

  const handleNext = () => {
    if (currentStep < conditions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Evaluate
      const mergedStudent: StudentProfile = {
        ...student,
        ...formData
      };
      const result = evaluateEligibility(opportunity.ruleSet, mergedStudent);
      setEvaluationResult(result);
      // Record funnel event
      const qrRepo = services.getQRCodeRepository();
      qrRepo.recordFunnelEvent(opportunity.id, 'eligibility_completed');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleStartApplication = async () => {
    setIsSubmitting(true);
    try {
      const appRepo = services.getApplicationRepository();
      const qrRepo = services.getQRCodeRepository();

      // Create new application
      const newApp = await appRepo.create({
        institutionId: opportunity.institutionId,
        opportunityId: opportunity.id,
        studentId: student.id,
        studentName: student.name,
        opportunityTitle: opportunity.title,
        status: 'SUBMITTED',
        documents: opportunity.requiredDocuments.map((docDef) => ({
          id: `adoc-${Date.now()}-${docDef.id}`,
          documentDefId: docDef.id,
          name: docDef.name,
          verificationStatus: 'UPLOADED',
          uploadedAt: new Date().toISOString()
        }))
      });

      // Record funnel event
      await qrRepo.recordFunnelEvent(opportunity.id, 'application_submitted');

      // Navigate to application detail tracking
      router.push(`/student/applications/${newApp.id}`);
    } catch (err) {
      console.error('Failed to create application:', err);
      setIsSubmitting(false);
    }
  };

  const currentCondition = conditions[currentStep];

  return (
    <div className="bg-white rounded-xl border border-brand-200 p-6 shadow-sm space-y-6">
      {!evaluationResult ? (
        /* Questionnaire Wizard Steps */
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-500" />
              Eligibility Pre-Check Questionnaire
            </span>
            <span className="text-xs font-medium text-gray-500 font-mono">
              Step {currentStep + 1} of {conditions.length || 1}
            </span>
          </div>

          {conditions.length > 0 && currentCondition ? (
            <div className="space-y-4 py-2">
              <div className="font-semibold text-sm text-primaryText">
                {currentCondition.label}
              </div>

              {/* Input matching condition field type */}
              {currentCondition.field === 'cgpa' && (
                <div className="space-y-2">
                  <label className="text-xs text-secondaryText block">Enter your current CGPA:</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.cgpa ?? 8.2}
                    onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              )}

              {currentCondition.field === 'year' && (
                <div className="space-y-2">
                  <label className="text-xs text-secondaryText block">Select your current academic year:</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => setFormData({ ...formData, year: yr })}
                        className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                          formData.year === yr
                            ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-brand-300'
                        }`}
                      >
                        {yr}
                        {yr === 1 ? 'st' : yr === 2 ? 'nd' : yr === 3 ? 'rd' : 'th'} Year
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentCondition.field === 'researchPublication' && (
                <div className="space-y-2">
                  <label className="text-xs text-secondaryText block">Do you have an accepted/published research paper?</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, researchPublication: true, publicationType: 'SCI' })}
                      className={`py-2.5 rounded-lg text-xs font-bold border transition-all ${
                        formData.researchPublication === true
                          ? 'bg-brand-500 text-white border-brand-500'
                          : 'bg-white text-gray-700 border-gray-200'
                      }`}
                    >
                      Yes, Published
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, researchPublication: false, publicationType: 'None' })}
                      className={`py-2.5 rounded-lg text-xs font-bold border transition-all ${
                        formData.researchPublication === false
                          ? 'bg-brand-500 text-white border-brand-500'
                          : 'bg-white text-gray-700 border-gray-200'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              )}

              {currentCondition.field === 'twelfthPercentage' && (
                <div className="space-y-2">
                  <label className="text-xs text-secondaryText block">Enter your 12th Board Marks (%):</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={formData.twelfthPercentage ?? 88.6}
                    onChange={(e) => setFormData({ ...formData, twelfthPercentage: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              )}

              {currentCondition.field === 'startupStatus' && (
                <div className="space-y-2">
                  <label className="text-xs text-secondaryText block">Do you have an active startup idea or prototype proposal?</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, startupStatus: true })}
                      className={`py-2.5 rounded-lg text-xs font-bold border transition-all ${
                        formData.startupStatus === true
                          ? 'bg-brand-500 text-white border-brand-500'
                          : 'bg-white text-gray-700 border-gray-200'
                      }`}
                    >
                      Yes, Active Startup
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, startupStatus: false })}
                      className={`py-2.5 rounded-lg text-xs font-bold border transition-all ${
                        formData.startupStatus === false
                          ? 'bg-brand-500 text-white border-brand-500'
                          : 'bg-white text-gray-700 border-gray-200'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-4 text-xs text-gray-600">
              Ready to calculate eligibility based on your student profile.
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center gap-1 text-xs font-medium px-3 py-2 rounded-lg transition-colors ${
                currentStep === 0
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm transition-all"
            >
              {currentStep < conditions.length - 1 ? (
                <>
                  Next Step <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Evaluate Eligibility <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Evaluation Results Card */
        <div className="space-y-6">
          {/* Result Banner */}
          <div
            className={`p-5 rounded-xl border space-y-2 ${
              evaluationResult.state === 'GREEN'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : evaluationResult.state === 'YELLOW'
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            <div className="flex items-center gap-2">
              {evaluationResult.state === 'GREEN' ? (
                <CheckCircle2 className="w-6 h-6 text-success shrink-0" />
              ) : evaluationResult.state === 'YELLOW' ? (
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 shrink-0" />
              )}
              <h3 className="font-extrabold text-lg">{evaluationResult.scoreLabel}</h3>
            </div>

            <p className="text-xs font-medium leading-relaxed">
              {evaluationResult.summaryReason}
            </p>

            <div className="pt-2 text-[11px] font-semibold text-gray-700 bg-white/70 p-2.5 rounded-lg border border-gray-200/50 flex items-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <span>{evaluationResult.disclaimer}</span>
            </div>
          </div>

          {/* Condition Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Why? Rule Evaluation Breakdown</h4>
            <div className="space-y-2">
              {evaluationResult.conditionResults.map((cRes, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 ${
                    cRes.passed
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                      : 'bg-red-50/50 border-red-200 text-red-900'
                  }`}
                >
                  {cRes.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-bold">{cRes.condition.label}</div>
                    <div className="text-[11px] opacity-90 mt-0.5">{cRes.explanation}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps Checklist */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Recommended Next Steps</h4>
            <ul className="space-y-1.5 text-xs text-gray-700">
              {evaluationResult.nextSteps.map((step, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-brand-100 text-brand-700 text-[10px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action CTA */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setEvaluationResult(null)}
              className="text-xs font-semibold text-gray-600 hover:text-brand-600"
            >
              Re-run Answers
            </button>

            {evaluationResult.passed && (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleStartApplication}
                className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all hover:scale-105 disabled:opacity-50"
              >
                {isSubmitting ? 'Starting Application...' : 'Start Application Now'}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
