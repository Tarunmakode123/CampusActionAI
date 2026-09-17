import { Opportunity, Department } from '@/types';

export interface AIResponse {
  answer: string;
  sourceTitle?: string;
  sourceUrl?: string;
  lastUpdated?: string;
  confidence: 'HIGH' | 'MEDIUM' | 'FALLBACK';
}

export function generateAIAssistantResponse(
  query: string,
  opportunities: Opportunity[],
  departments: Department[]
): AIResponse {
  const normalizedQuery = query.toLowerCase().trim();

  // 1. Research Incentive query matching
  if (
    normalizedQuery.includes('research') ||
    normalizedQuery.includes('publication') ||
    normalizedQuery.includes('sci') ||
    normalizedQuery.includes('scopus') ||
    normalizedQuery.includes('paper reward')
  ) {
    const opp = opportunities.find((o) => o.slug === 'research-incentive' || o.id === 'opp-research-incentive');
    if (opp) {
      return {
        answer: `Under the ${opp.title}, eligible students receive up to ₹70,000/year for publishing in indexed journals (₹50,000 for SCI and ₹25,000 for Scopus). Requirements include a minimum CGPA of 7.5 and enrollment in 2nd, 3rd, or 4th year. Required documents: Student ID Card, Publication PDF, DOI proof, and Bank account details. Contact ${opp.contactPerson} (${opp.contactEmail}) for queries.`,
        sourceTitle: opp.officialSourceTitle || 'R&D Circular No. IIST/RND/2026/08',
        sourceUrl: opp.officialSourceUrl,
        lastUpdated: opp.lastUpdated,
        confidence: 'HIGH'
      };
    }
  }

  // 2. Financial Assistance query matching
  if (
    normalizedQuery.includes('financial assistance') ||
    normalizedQuery.includes('fee support') ||
    normalizedQuery.includes('tuition') ||
    normalizedQuery.includes('scholarship') ||
    normalizedQuery.includes('merit')
  ) {
    const opp = opportunities.find((o) => o.slug === 'financial-assistance' || o.id === 'opp-financial-assistance');
    if (opp) {
      return {
        answer: `The ${opp.title} provides tuition assistance up to ₹64,000/year. Evaluation is based on achieving >= 75% in 12th board exams and maintaining a CGPA >= 7.0 in college. Required documents: Student ID Card, 12th Marksheet, and Family Income Certificate. Submissions are managed by ${opp.contactPerson} (${opp.contactEmail}).`,
        sourceTitle: opp.officialSourceTitle || 'Student Welfare Assistance Guidelines 2026',
        sourceUrl: opp.officialSourceUrl,
        lastUpdated: opp.lastUpdated,
        confidence: 'HIGH'
      };
    }
  }

  // 3. Startup Support query matching
  if (
    normalizedQuery.includes('startup') ||
    normalizedQuery.includes('incubation') ||
    normalizedQuery.includes('pitch') ||
    normalizedQuery.includes('venture') ||
    normalizedQuery.includes('grant') ||
    normalizedQuery.includes('40 lakh')
  ) {
    const opp = opportunities.find((o) => o.slug === 'startup-support' || o.id === 'opp-startup-support');
    if (opp) {
      return {
        answer: `The ${opp.title} offers up to ₹40 Lakhs/year seed funding, co-working space, and IP guidance for student ventures. Eligible student leads must be in 2nd, 3rd, or 4th year with an active startup proposal. Required documents: Student ID and Startup Pitch Deck (PDF). Contact ${opp.contactPerson} at ${opp.contactEmail}.`,
        sourceTitle: opp.officialSourceTitle || 'CIIC Incubation Rules & Grants 2026',
        sourceUrl: opp.officialSourceUrl,
        lastUpdated: opp.lastUpdated,
        confidence: 'HIGH'
      };
    }
  }

  // 4. "Why am I eligible?" query
  if (normalizedQuery.includes('why am i eligible') || normalizedQuery.includes('eligibility check')) {
    return {
      answer: `Eligibility is determined deterministically by comparing your academic profile (CGPA, Year, Branch, Publications, 12th %) against the rules configured by the institution for each opportunity. You can click 'Check My Eligibility' on any opportunity card to run an instant check.`,
      confidence: 'MEDIUM'
    };
  }

  // 5. Contact or department queries
  if (normalizedQuery.includes('contact') || normalizedQuery.includes('department') || normalizedQuery.includes('who')) {
    const deptList = departments.map((d) => `${d.name} (${d.contactPerson}: ${d.contactEmail})`).join('; ');
    return {
      answer: `Institutional contact points: ${deptList}.`,
      confidence: 'MEDIUM'
    };
  }

  // 6. Mandatory Fallback when institutional info is unavailable
  return {
    answer: `I don't have enough verified institutional information to answer that question. Please contact the responsible department directly.`,
    confidence: 'FALLBACK'
  };
}
