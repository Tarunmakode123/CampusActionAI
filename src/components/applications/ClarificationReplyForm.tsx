'use client';

import React, { useState } from 'react';
import { services } from '@/services/service-factory';
import { Send, CheckCircle2 } from 'lucide-react';

interface ClarificationReplyFormProps {
  applicationId: string;
  clarificationNote: string;
  existingReply?: string;
}

export function ClarificationReplyForm({ applicationId, clarificationNote, existingReply }: ClarificationReplyFormProps) {
  const [replyText, setReplyText] = useState(existingReply || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setIsSubmitting(true);
    try {
      const appRepo = services.getApplicationRepository();
      await appRepo.submitClarificationReply(applicationId, replyText);
      setSubmitted(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error('Failed to submit clarification reply:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 space-y-4">
      <div className="space-y-1">
        <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
          Clarification Requested by Department
        </span>
        <p className="text-sm font-semibold text-amber-950">
          &ldquo;{clarificationNote}&rdquo;
        </p>
      </div>

      {submitted ? (
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-100 p-3 rounded-lg border border-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-success" />
          Clarification reply submitted successfully! Updating timeline...
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="text-xs text-amber-900 block font-medium">Your Response to Department:</label>
          <textarea
            rows={3}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your explanation or updated document reference here..."
            className="w-full p-3 border border-amber-300 rounded-lg text-xs font-sans text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting || !replyText.trim()}
            className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            {isSubmitting ? 'Submitting...' : 'Submit Clarification Reply'}
          </button>
        </form>
      )}
    </div>
  );
}
