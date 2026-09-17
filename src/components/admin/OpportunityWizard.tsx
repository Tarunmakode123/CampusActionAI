'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { services } from '@/services/service-factory';
import {
  Opportunity,
  EligibilityCondition,
  FieldName,
  RuleOperator,
  SourceType,
  OpportunityStatus
} from '@/types';
import { Plus, Trash2, CheckCircle2, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

export function OpportunityWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('cat-research');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [benefitAmount, setBenefitAmount] = useState('');
  const [deadline, setDeadline] = useState('2026-12-31');
  const [departmentId, setDepartmentId] = useState('dept-rnd');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  // Source info
  const [officialSourceTitle, setOfficialSourceTitle] = useState('');
  const [officialSourceUrl, setOfficialSourceUrl] = useState('');
  const [sourceType, setSourceType] = useState<SourceType>('CIRCULAR');
  const [policyVersion, setPolicyVersion] = useState('v1.0-2026');

  // Rule set state
  const [matchType, setMatchType] = useState<'ALL' | 'ANY'>('ALL');
  const [conditions, setConditions] = useState<EligibilityCondition[]>([
    {
      id: 'cond-1',
      field: 'cgpa',
      operator: '>=',
      value: 7.5,
      label: 'Minimum CGPA threshold'
    }
  ]);

  // Documents
  const [documents, setDocuments] = useState([
    { id: 'doc-1', name: 'Student ID Card', description: 'Valid college ID', required: true, fileTypesAllowed: ['PDF', 'PNG'] },
    { id: 'doc-2', name: 'Academic Marksheet / Proof', description: 'Marksheet or DOI proof', required: true, fileTypesAllowed: ['PDF'] }
  ]);

  const addCondition = () => {
    setConditions([
      ...conditions,
      {
        id: `cond-${Date.now()}`,
        field: 'year',
        operator: 'IN',
        value: [2, 3, 4],
        label: 'Eligible academic years'
      }
    ]);
  };

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const updateCondition = (index: number, field: keyof EligibilityCondition, val: unknown) => {
    const updated = [...conditions];
    updated[index] = { ...updated[index], [field]: val };
    setConditions(updated);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const handleSubmit = async (publishStatus: OpportunityStatus) => {
    setIsSubmitting(true);
    try {
      const oppRepo = services.getOpportunityRepository();
      const auditRepo = services.getAuditRepository();
      const qrRepo = services.getQRCodeRepository();

      const newOpp = await oppRepo.create({
        institutionId: 'inst-iist-demo',
        slug: slug || `opp-${Date.now()}`,
        title: title || 'Untitled Campus Benefit',
        categoryId,
        shortDescription,
        description,
        benefitAmount: benefitAmount || 'Configured Institutional Support',
        deadline,
        departmentId,
        contactPerson: contactPerson || 'Department Admin',
        contactEmail: contactEmail || 'admin@iist.demo.edu.in',
        ruleSet: {
          matchType,
          conditions
        },
        requiredDocuments: documents,
        faqs: [
          { question: 'Who can apply?', answer: 'Enrolled students meeting configured criteria.' }
        ],
        status: publishStatus,
        effectiveFrom: new Date().toISOString().split('T')[0],
        effectiveUntil: deadline,
        policyVersion,
        officialSourceTitle: officialSourceTitle || 'Official Circular',
        officialSourceUrl: officialSourceUrl || 'https://iist.demo.edu.in',
        sourceType,
        updatedBy: 'Campus Administrator',
        isDemoData: true
      });

      // Create QR Code record for new opportunity
      await qrRepo.create({
        institutionId: 'inst-iist-demo',
        opportunityId: newOpp.id,
        opportunityTitle: newOpp.title,
        campaignLocation: 'Main Academic Notice Board',
        status: 'ACTIVE'
      });

      // Audit Log
      await auditRepo.log(
        'CREATE_OPPORTUNITY',
        'Campus Administrator',
        'OPPORTUNITY',
        newOpp.id,
        undefined,
        publishStatus,
        `Created opportunity '${newOpp.title}' with status ${publishStatus}`
      );

      router.push('/admin/benefits');
    } catch (err) {
      console.error('Failed to create opportunity:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Step Indicator Bar */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step === s
                  ? 'bg-brand-500 text-white shadow-sm'
                  : step > s
                  ? 'bg-success text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
            </div>
            <span className={`text-xs font-semibold hidden sm:inline ${step === s ? 'text-brand-600' : 'text-gray-500'}`}>
              {s === 1 ? 'Basic Info' : s === 2 ? 'Policy Source' : s === 3 ? 'Eligibility Rules' : 'Review & Publish'}
            </span>
          </div>
        ))}
      </div>

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-primaryText">1. Basic Opportunity Information</h2>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 block">Opportunity Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Student Research Incentive Scheme 2026"
              className="w-full p-2.5 border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 block">Category:</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg text-xs font-medium"
              >
                <option value="cat-research">Research & R&D</option>
                <option value="cat-financial">Financial Support</option>
                <option value="cat-startup">Innovation & Startup</option>
                <option value="cat-career">Career & Placement</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 block">Benefit Support Amount:</label>
              <input
                type="text"
                value={benefitAmount}
                onChange={(e) => setBenefitAmount(e.target.value)}
                placeholder="e.g. Up to ₹70,000 per year"
                className="w-full p-2.5 border border-gray-300 rounded-lg text-xs font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 block">Short Description:</label>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Brief 1-line summary for opportunity card"
              className="w-full p-2.5 border border-gray-300 rounded-lg text-xs"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 block">Full Institutional Description:</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed guidelines, objectives, and eligibility instructions..."
              className="w-full p-2.5 border border-gray-300 rounded-lg text-xs"
            />
          </div>

          <div className="flex justify-end pt-3">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 bg-brand-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm"
            >
              Next: Policy Source <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Policy Source & Dates */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-primaryText">2. Official Policy Source & Dates</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 block">Official Circular / Policy Title:</label>
              <input
                type="text"
                value={officialSourceTitle}
                onChange={(e) => setOfficialSourceTitle(e.target.value)}
                placeholder="e.g. Circular No. IIST/RND/2026/08"
                className="w-full p-2.5 border border-gray-300 rounded-lg text-xs"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 block">Source Document Type:</label>
              <select
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value as SourceType)}
                className="w-full p-2.5 border border-gray-300 rounded-lg text-xs font-medium"
              >
                <option value="CIRCULAR">CIRCULAR</option>
                <option value="POLICY_DOC">POLICY DOC</option>
                <option value="WEBSITE">WEBSITE</option>
                <option value="POSTER">POSTER</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 block">Official Source URL:</label>
              <input
                type="url"
                value={officialSourceUrl}
                onChange={(e) => setOfficialSourceUrl(e.target.value)}
                placeholder="https://iist.demo.edu.in/circulars/doc.pdf"
                className="w-full p-2.5 border border-gray-300 rounded-lg text-xs"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 block">Policy Version:</label>
              <input
                type="text"
                value={policyVersion}
                onChange={(e) => setPolicyVersion(e.target.value)}
                placeholder="v2.4-2026"
                className="w-full p-2.5 border border-gray-300 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-1.5 bg-brand-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm"
            >
              Next: Eligibility Rule Builder <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Visual Eligibility Rule Builder */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-primaryText">3. Visual Eligibility Rule Builder</h2>
              <p className="text-xs text-secondaryText">Configure evaluation logic deterministically without writing code.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Logic Match:</span>
              <select
                value={matchType}
                onChange={(e) => setMatchType(e.target.value as 'ALL' | 'ANY')}
                className="text-xs font-bold p-1.5 rounded border border-gray-300 bg-gray-50 text-brand-700"
              >
                <option value="ALL">ALL CONDITIONS MUST MATCH (AND)</option>
                <option value="ANY">ANY CONDITION MATCHES (OR)</option>
              </select>
            </div>
          </div>

          {/* Condition Cards */}
          <div className="space-y-3">
            {conditions.map((cond, idx) => (
              <div key={cond.id || idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-600">Condition #{idx + 1}</span>
                  <button
                    onClick={() => removeCondition(idx)}
                    disabled={conditions.length === 1}
                    className="text-gray-400 hover:text-red-600 disabled:opacity-30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-1">Target Field:</label>
                    <select
                      value={cond.field}
                      onChange={(e) => updateCondition(idx, 'field', e.target.value as FieldName)}
                      className="w-full p-2 border border-gray-300 rounded text-xs"
                    >
                      <option value="cgpa">Current CGPA</option>
                      <option value="year">Academic Year</option>
                      <option value="twelfthPercentage">12th Percentage</option>
                      <option value="researchPublication">Research Publication</option>
                      <option value="startupStatus">Startup Status</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-500 block mb-1">Operator:</label>
                    <select
                      value={cond.operator}
                      onChange={(e) => updateCondition(idx, 'operator', e.target.value as RuleOperator)}
                      className="w-full p-2 border border-gray-300 rounded text-xs"
                    >
                      <option value=">=">&gt;= (Greater Than / Equal)</option>
                      <option value="<=">&lt;= (Less Than / Equal)</option>
                      <option value="==">== (Equal To)</option>
                      <option value="IN">IN (Member of List)</option>
                      <option value="IS_TRUE">IS TRUE (Boolean)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-500 block mb-1">Value / Requirement:</label>
                    <input
                      type="text"
                      value={Array.isArray(cond.value) ? cond.value.join(', ') : String(cond.value)}
                      onChange={(e) => updateCondition(idx, 'value', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-gray-500 block mb-1">Student-facing Explanation Label:</label>
                  <input
                    type="text"
                    value={cond.label}
                    onChange={(e) => updateCondition(idx, 'label', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-xs"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={addCondition}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 px-3 py-2 rounded-lg border border-brand-200"
            >
              <Plus className="w-4 h-4" /> Add Another Condition
            </button>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="inline-flex items-center gap-1.5 bg-brand-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm"
            >
              Next: Review & Publish <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Review & Publish */}
      {step === 4 && (
        <div className="space-y-6">
          <h2 className="text-base font-bold text-primaryText">4. Review & Publish Opportunity</h2>

          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2 text-xs">
            <div className="font-bold text-sm text-primaryText">{title || 'Untitled Opportunity'}</div>
            <div className="text-secondaryText">{shortDescription}</div>
            <div className="text-brand-600 font-bold mt-1">Value: {benefitAmount}</div>
            <div className="text-gray-500">Configured Conditions: {conditions.length} criteria</div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <div className="flex items-center gap-3">
              <button
                disabled={isSubmitting}
                onClick={() => handleSubmit('DRAFT')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs px-4 py-2.5 rounded-lg transition-colors"
              >
                Save Draft
              </button>
              <button
                disabled={isSubmitting}
                onClick={() => handleSubmit('PUBLISHED')}
                className="bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-md transition-all"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Opportunity & Generate QR'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
