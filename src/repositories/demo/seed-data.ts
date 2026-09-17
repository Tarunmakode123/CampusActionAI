import {
  InstitutionConfig,
  Category,
  Department,
  Opportunity,
  StudentProfile,
  Application,
  QRCodeRecord,
  AuditLog
} from '@/types';

export const SEED_INSTITUTION: InstitutionConfig = {
  id: 'inst-iist-demo',
  name: 'IIST Demo Campus',
  code: 'IIST-DEMO',
  logoUrl: '/logo.png',
  officialWebsite: 'https://iist.demo.edu.in',
  officialEmail: 'contact@iist.demo.edu.in',
  dataLastVerifiedAt: '2026-09-15T10:00:00Z',
  mode: 'DEMO',
  isDemoEnvironment: true
};

export const SEED_CATEGORIES: Category[] = [
  {
    id: 'cat-financial',
    name: 'Financial Support',
    slug: 'financial-support',
    description: 'Merit-based assistance, fee support, and student welfare schemes',
    iconName: 'Coins'
  },
  {
    id: 'cat-research',
    name: 'Research & R&D',
    slug: 'research',
    description: 'Cash rewards for indexed journal papers, patents, and conference grants',
    iconName: 'Microscope'
  },
  {
    id: 'cat-startup',
    name: 'Innovation & Startup',
    slug: 'startup-innovation',
    description: 'Incubation support, prototype grants, and seed funding for student ventures',
    iconName: 'Rocket'
  },
  {
    id: 'cat-career',
    name: 'Career & Placement',
    slug: 'career-placement',
    description: 'Skill development, certification reimbursements, and placement support',
    iconName: 'Briefcase'
  },
  {
    id: 'cat-internship',
    name: 'Internship Assistance',
    slug: 'internship',
    description: 'Stipend top-ups and industrial training sponsorship',
    iconName: 'GraduationCap'
  }
];

export const SEED_DEPARTMENTS: Department[] = [
  {
    id: 'dept-rnd',
    name: 'Research & Development Cell',
    code: 'RND-CELL',
    contactEmail: 'rnd-support@iist.demo.edu.in',
    contactPerson: 'Dr. A. K. Sharma (Dean R&D)',
    location: 'Block C, Room 302'
  },
  {
    id: 'dept-fa',
    name: 'Financial Aid & Scholarship Office',
    code: 'FA-CELL',
    contactEmail: 'financial-aid@iist.demo.edu.in',
    contactPerson: 'Prof. Meenakshi Rao (Welfare Officer)',
    location: 'Admin Block, Desk 12'
  },
  {
    id: 'dept-startup',
    name: 'Center for Innovation & Incubation (CIIC)',
    code: 'CIIC-CELL',
    contactEmail: 'incubation@iist.demo.edu.in',
    contactPerson: 'Er. Rajesh Varma (Incubation Manager)',
    location: 'Innovation Hub, 1st Floor'
  }
];

export const SEED_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-research-incentive',
    institutionId: 'inst-iist-demo',
    slug: 'research-incentive',
    title: 'Research Incentive & Publication Reward Scheme',
    categoryId: 'cat-research',
    shortDescription: 'Cash rewards up to ₹70,000 per student/year for publishing in indexed journals (SCI/Scopus).',
    description: 'The Research Incentive Scheme aims to foster a high-impact research culture among undergraduate and postgraduate students. Eligible students receive direct financial incentives for papers published in SCI/Scopus indexed journals where IIST is affiliated.',
    benefitAmount: 'Up to ₹70,000/year (₹50,000 for SCI, ₹25,000 for Scopus)',
    deadline: '2026-11-30',
    departmentId: 'dept-rnd',
    contactPerson: 'Dr. A. K. Sharma (Dean R&D)',
    contactEmail: 'rnd-support@iist.demo.edu.in',
    ruleSet: {
      matchType: 'ALL',
      conditions: [
        {
          id: 'rule-cgpa-75',
          field: 'cgpa',
          operator: '>=',
          value: 7.5,
          label: 'Current CGPA must be at least 7.5'
        },
        {
          id: 'rule-year-234',
          field: 'year',
          operator: 'IN',
          value: [2, 3, 4],
          label: 'Must be enrolled in 2nd, 3rd, or 4th year'
        },
        {
          id: 'rule-publication-true',
          field: 'researchPublication',
          operator: 'IS_TRUE',
          value: true,
          label: 'Must have at least 1 accepted/published research paper'
        }
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-id-card',
        name: 'Student ID Card',
        description: 'Clear scanned copy of valid IIST Student ID',
        required: true,
        fileTypesAllowed: ['PDF', 'PNG', 'JPG']
      },
      {
        id: 'doc-pub-pdf',
        name: 'Publication PDF',
        description: 'Published paper copy showing title, authors, and IIST affiliation',
        required: true,
        fileTypesAllowed: ['PDF']
      },
      {
        id: 'doc-doi-proof',
        name: 'DOI / Indexing Proof',
        description: 'Acceptance letter or Web of Science / Scopus screenshot showing DOI',
        required: true,
        fileTypesAllowed: ['PDF', 'PNG', 'JPG']
      },
      {
        id: 'doc-bank-passbook',
        name: 'Bank Passbook / Cancelled Cheque',
        description: 'For direct benefit transfer into student account',
        required: true,
        fileTypesAllowed: ['PDF', 'PNG', 'JPG']
      }
    ],
    faqs: [
      {
        question: 'Can co-authored papers apply for full incentive?',
        answer: 'If all student co-authors are from IIST, the incentive is shared equally among co-authors.'
      },
      {
        question: 'How long does approval take after submission?',
        answer: 'R&D Cell processes verified applications within 14 working days of faculty recommendation.'
      }
    ],
    status: 'PUBLISHED',
    effectiveFrom: '2026-01-01',
    effectiveUntil: '2026-12-31',
    policyVersion: 'v2.4-2026',
    lastUpdated: '2026-09-10T14:30:00Z',
    officialSourceTitle: 'R&D Circular No. IIST/RND/2026/08',
    officialSourceUrl: 'https://iist.demo.edu.in/circulars/rnd-2026-08.pdf',
    sourceType: 'CIRCULAR',
    publishedAt: '2026-09-01T09:00:00Z',
    updatedBy: 'Dr. A. K. Sharma',
    isDemoData: true
  },
  {
    id: 'opp-financial-assistance',
    institutionId: 'inst-iist-demo',
    slug: 'financial-assistance',
    title: 'Merit-Cum-Means Financial Support Scheme',
    categoryId: 'cat-financial',
    shortDescription: 'Institutional financial aid up to ₹64,000/year for deserving academic performers.',
    description: 'Provides tuition reimbursement and study material grants to full-time undergraduate students based on 12th percentage academic merit and demonstrated financial need.',
    benefitAmount: 'Up to ₹64,000/year tuition reimbursement',
    deadline: '2026-10-15',
    departmentId: 'dept-fa',
    contactPerson: 'Prof. Meenakshi Rao (Welfare Officer)',
    contactEmail: 'financial-aid@iist.demo.edu.in',
    ruleSet: {
      matchType: 'ALL',
      conditions: [
        {
          id: 'rule-12th-75',
          field: 'twelfthPercentage',
          operator: '>=',
          value: 75,
          label: '12th Grade Board Marks must be >= 75%'
        },
        {
          id: 'rule-cgpa-70',
          field: 'cgpa',
          operator: '>=',
          value: 7.0,
          label: 'Current College CGPA must be >= 7.0'
        }
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-id-card',
        name: 'Student ID Card',
        description: 'Valid college identity card copy',
        required: true,
        fileTypesAllowed: ['PDF', 'PNG', 'JPG']
      },
      {
        id: 'doc-12th-marksheet',
        name: '12th Marksheet',
        description: 'Verified 12th Board marksheet',
        required: true,
        fileTypesAllowed: ['PDF']
      },
      {
        id: 'doc-income-certificate',
        name: 'Income Certificate',
        description: 'Annual family income certificate issued by competent authority',
        required: true,
        fileTypesAllowed: ['PDF']
      }
    ],
    faqs: [
      {
        question: 'Can first year students apply?',
        answer: 'Yes! First year students are evaluated based on their 12th percentage and entrance merit.'
      }
    ],
    status: 'PUBLISHED',
    effectiveFrom: '2026-07-01',
    effectiveUntil: '2027-06-30',
    policyVersion: 'v1.8-2026',
    lastUpdated: '2026-08-20T10:15:00Z',
    officialSourceTitle: 'Student Welfare Assistance Guidelines 2026',
    officialSourceUrl: 'https://iist.demo.edu.in/welfare/policy-2026.pdf',
    sourceType: 'POLICY_DOC',
    publishedAt: '2026-08-25T11:00:00Z',
    updatedBy: 'Prof. Meenakshi Rao',
    isDemoData: true
  },
  {
    id: 'opp-startup-support',
    institutionId: 'inst-iist-demo',
    slug: 'startup-support',
    title: 'Student Venture Seed Fund & Incubation Support',
    categoryId: 'cat-startup',
    shortDescription: 'Incubation space, legal mentoring, and prototype seed funding up to ₹40 Lakhs/year.',
    description: 'The CIIC Student Venture Initiative offers campus-based startup teams access to seed funding, rapid prototyping labs, intellectual property assistance, and free co-working space.',
    benefitAmount: 'Up to ₹40 Lakhs/year per incubate team',
    deadline: '2026-12-15',
    departmentId: 'dept-startup',
    contactPerson: 'Er. Rajesh Varma (Incubation Manager)',
    contactEmail: 'incubation@iist.demo.edu.in',
    ruleSet: {
      matchType: 'ALL',
      conditions: [
        {
          id: 'rule-year-234',
          field: 'year',
          operator: 'IN',
          value: [2, 3, 4],
          label: 'Student lead must be in 2nd, 3rd, or 4th year'
        },
        {
          id: 'rule-startup-true',
          field: 'startupStatus',
          operator: 'IS_TRUE',
          value: true,
          label: 'Must have an active startup idea/proposal'
        }
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-id-card',
        name: 'Team Lead Student ID',
        description: 'Copy of IIST Student ID',
        required: true,
        fileTypesAllowed: ['PDF', 'PNG']
      },
      {
        id: 'doc-pitch-deck',
        name: 'Startup Pitch Deck (PDF)',
        description: 'Problem, Solution, Target Market, Tech Stack, and Budget Plan',
        required: true,
        fileTypesAllowed: ['PDF']
      },
      {
        id: 'doc-proto-link',
        name: 'Prototype Demo Video / GitHub Link Document',
        description: 'Document containing demo link or repository access',
        required: false,
        fileTypesAllowed: ['PDF']
      }
    ],
    faqs: [
      {
        question: 'Do I need a registered company (Pvt Ltd) to apply?',
        answer: 'No! Pre-incubation teams can apply with a working prototype proposal.'
      }
    ],
    status: 'PUBLISHED',
    effectiveFrom: '2026-04-01',
    effectiveUntil: '2027-03-31',
    policyVersion: 'v3.0-2026',
    lastUpdated: '2026-09-02T16:00:00Z',
    officialSourceTitle: 'CIIC Incubation Rules & Grants 2026',
    officialSourceUrl: 'https://iist.demo.edu.in/incubation/scheme-2026',
    sourceType: 'WEBSITE',
    publishedAt: '2026-09-05T08:30:00Z',
    updatedBy: 'Er. Rajesh Varma',
    isDemoData: true
  }
];

export const SEED_STUDENT: StudentProfile = {
  id: 'stu-rahul-sharma',
  institutionId: 'inst-iist-demo',
  studentId: 'STU-2026-8842',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@iist.demo.edu.in',
  phone: '+91 98765 43210',
  branch: 'Computer Science & Artificial Intelligence',
  program: 'B.Tech AI & ML',
  year: 3,
  semester: 5,
  cgpa: 8.2,
  tenthPercentage: 92.4,
  twelfthPercentage: 88.6,
  pcmPercentage: 90.2,
  researchPublication: true,
  publicationType: 'SCI',
  patentStatus: false,
  startupStatus: true,
  skills: ['Python', 'TypeScript', 'Machine Learning', 'Next.js', 'PyTorch']
};

export const SEED_APPLICATIONS: Application[] = [
  {
    id: 'app-CA-2026-00142',
    institutionId: 'inst-iist-demo',
    opportunityId: 'opp-research-incentive',
    studentId: 'stu-rahul-sharma',
    studentName: 'Rahul Sharma',
    opportunityTitle: 'Research Incentive & Publication Reward Scheme',
    status: 'UNDER_REVIEW',
    submittedAt: '2026-09-16T11:20:00Z',
    updatedAt: '2026-09-16T14:45:00Z',
    statusHistory: [
      {
        id: 'hist-1',
        status: 'SUBMITTED',
        updatedBy: 'Rahul Sharma (Student)',
        updatedAt: '2026-09-16T11:20:00Z',
        comment: 'Application submitted through QR Portal.'
      },
      {
        id: 'hist-2',
        status: 'UNDER_REVIEW',
        updatedBy: 'Dr. A. K. Sharma (R&D Cell)',
        updatedAt: '2026-09-16T14:45:00Z',
        comment: 'Assigned to R&D verification officer.'
      }
    ],
    documents: [
      {
        id: 'adoc-1',
        documentDefId: 'doc-id-card',
        name: 'Student ID Card',
        fileUrl: '/demo-docs/student-id.pdf',
        fileName: 'Rahul_Sharma_ID.pdf',
        verificationStatus: 'VERIFIED',
        feedback: 'Valid student ID verified.',
        uploadedAt: '2026-09-16T11:15:00Z'
      },
      {
        id: 'adoc-2',
        documentDefId: 'doc-pub-pdf',
        name: 'Publication PDF',
        fileUrl: '/demo-docs/paper-sci.pdf',
        fileName: 'IEEE_Paper_Rahul_2026.pdf',
        verificationStatus: 'VERIFIED',
        feedback: 'Paper confirmed in IEEE Transactions on AI.',
        uploadedAt: '2026-09-16T11:17:00Z'
      },
      {
        id: 'adoc-3',
        documentDefId: 'doc-doi-proof',
        name: 'DOI / Indexing Proof',
        fileUrl: '/demo-docs/doi-proof.png',
        fileName: 'DOI_Indexing_Proof.png',
        verificationStatus: 'UNDER_REVIEW',
        uploadedAt: '2026-09-16T11:18:00Z'
      },
      {
        id: 'adoc-4',
        documentDefId: 'doc-bank-passbook',
        name: 'Bank Passbook / Cancelled Cheque',
        fileUrl: '/demo-docs/bank-passbook.pdf',
        fileName: 'Bank_Account_Details.pdf',
        verificationStatus: 'VERIFIED',
        uploadedAt: '2026-09-16T11:19:00Z'
      }
    ]
  }
];

export const SEED_QR_CODES: QRCodeRecord[] = [
  {
    id: 'qr-research-incentive',
    institutionId: 'inst-iist-demo',
    opportunityId: 'opp-research-incentive',
    opportunityTitle: 'Research Incentive & Publication Reward Scheme',
    campaignLocation: 'R&D Department Notice Board (Block C)',
    status: 'ACTIVE',
    createdAt: '2026-09-01T10:00:00Z',
    analytics: {
      scans: 96,
      eligibility_started: 71,
      eligibility_completed: 64,
      application_started: 38,
      application_submitted: 21,
      application_approved: 17
    }
  },
  {
    id: 'qr-financial-assistance',
    institutionId: 'inst-iist-demo',
    opportunityId: 'opp-financial-assistance',
    opportunityTitle: 'Merit-Cum-Means Financial Support Scheme',
    campaignLocation: 'Main Academic Lobby & Admin Desk',
    status: 'ACTIVE',
    createdAt: '2026-08-25T11:30:00Z',
    analytics: {
      scans: 182,
      eligibility_started: 140,
      eligibility_completed: 125,
      application_started: 80,
      application_submitted: 41,
      application_approved: 32
    }
  },
  {
    id: 'qr-startup-support',
    institutionId: 'inst-iist-demo',
    opportunityId: 'opp-startup-support',
    opportunityTitle: 'Student Venture Seed Fund & Incubation Support',
    campaignLocation: 'Innovation Hub Entrance & Library',
    status: 'ACTIVE',
    createdAt: '2026-09-05T09:00:00Z',
    analytics: {
      scans: 73,
      eligibility_started: 55,
      eligibility_completed: 48,
      application_started: 29,
      application_submitted: 14,
      application_approved: 9
    }
  }
];

export const SEED_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'audit-1',
    institutionId: 'inst-iist-demo',
    action: 'PUBLISH_OPPORTUNITY',
    performedBy: 'Dr. A. K. Sharma',
    targetType: 'OPPORTUNITY',
    targetId: 'opp-research-incentive',
    timestamp: '2026-09-01T09:00:00Z',
    details: 'Published Research Incentive Scheme (v2.4-2026).'
  },
  {
    id: 'audit-2',
    institutionId: 'inst-iist-demo',
    action: 'UPDATE_ELIGIBILITY_RULE',
    performedBy: 'Prof. Meenakshi Rao',
    targetType: 'OPPORTUNITY',
    targetId: 'opp-financial-assistance',
    timestamp: '2026-09-10T11:15:00Z',
    details: 'Updated 12th percentage threshold to 75% for merit evaluation.'
  },
  {
    id: 'audit-3',
    institutionId: 'inst-iist-demo',
    action: 'CREATE_QR_CODE',
    performedBy: 'Admin Assistant',
    targetType: 'QR_CODE',
    targetId: 'qr-research-incentive',
    timestamp: '2026-09-01T10:00:00Z',
    details: 'Generated printable QR Code for R&D Notice Board.'
  }
];
