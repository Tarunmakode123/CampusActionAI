'use client';

import React, { useState } from 'react';
import { Opportunity, Department } from '@/types';
import { generateAIAssistantResponse, AIResponse } from '@/lib/ai-service';
import { Bot, Send, Sparkles, ShieldCheck, FileText, User } from 'lucide-react';

interface AIAssistantChatProps {
  opportunities: Opportunity[];
  departments: Department[];
}

interface Message {
  id: string;
  sender: 'USER' | 'AI';
  text: string;
  sourceTitle?: string;
  sourceUrl?: string;
  timestamp: string;
}

export function AIAssistantChat({ opportunities, departments }: AIAssistantChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'AI',
      text: 'Hello Rahul! I am Campus Action AI Assistant. Ask me anything about financial support, research incentives, startup incubation, required documents, or department contacts.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');

  const suggestedQuestions = [
    'Am I eligible for research incentive?',
    'What documents do I need for financial aid?',
    'How do I apply for startup support?',
    'Who should I contact in R&D cell?'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'USER',
      text: query,
      timestamp: now
    };

    const aiRes: AIResponse = generateAIAssistantResponse(query, opportunities, departments);

    const aiMsg: Message = {
      id: `ai-${Date.now()}`,
      sender: 'AI',
      text: aiRes.answer,
      sourceTitle: aiRes.sourceTitle,
      sourceUrl: aiRes.sourceUrl,
      timestamp: now
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInputText('');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[650px]">
      {/* Header */}
      <div className="bg-brand-500 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm">Ask Campus Action AI</div>
            <div className="text-[11px] text-brand-100 font-medium">Grounded in IIST Verified Policies</div>
          </div>
        </div>
      </div>

      {/* Suggested Question Chips */}
      <div className="bg-gray-50 border-b border-gray-200 p-3 flex flex-wrap gap-2 text-xs">
        <span className="text-gray-500 font-medium self-center mr-1">Suggested:</span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="bg-white hover:bg-brand-50 hover:text-brand-700 text-gray-700 px-3 py-1.5 rounded-full border border-gray-200 font-medium transition-colors text-[11px]"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 max-w-2xl ${
              msg.sender === 'USER' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'USER'
                  ? 'bg-brand-500 text-white'
                  : 'bg-gray-100 text-brand-600 border border-gray-300'
              }`}
            >
              {msg.sender === 'USER' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'USER'
                  ? 'bg-brand-500 text-white rounded-tr-none'
                  : 'bg-gray-100 text-gray-800 border border-gray-200 rounded-tl-none space-y-2'
              }`}
            >
              <div>{msg.text}</div>

              {msg.sourceTitle && (
                <div className="pt-2 border-t border-gray-200 text-[10px] text-gray-500 flex items-center gap-1 font-mono">
                  <FileText className="w-3 h-3 text-brand-500" />
                  Verified Source: {msg.sourceTitle}
                </div>
              )}

              <div className="text-[9px] opacity-60 text-right mt-1">{msg.timestamp}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-gray-200 bg-white space-y-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about financial support, research incentive, documents..."
            className="flex-1 p-2.5 border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 text-gray-800"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="bg-brand-500 hover:bg-brand-600 text-white font-bold p-2.5 rounded-xl transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="text-[10px] text-gray-500 text-center flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
          <span>Campus Action AI provides guidance based on configured institutional resources. Final eligibility remains with the institution.</span>
        </div>
      </div>
    </div>
  );
}
