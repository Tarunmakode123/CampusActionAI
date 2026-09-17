export type PersistenceMode = 'DEMO' | 'LIVE';

export type UserRole = 'STUDENT' | 'ADMIN';

export interface InstitutionConfig {
  id: string;
  name: string;
  code: string;
  logoUrl?: string;
  officialWebsite: string;
  officialEmail: string;
  dataLastVerifiedAt?: string;
  mode: PersistenceMode;
  isDemoEnvironment: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  contactEmail: string;
  contactPerson: string;
  location?: string;
}

export type SourceType = 'CIRCULAR' | 'WEBSITE' | 'POLICY_DOC' | 'POSTER';

export type OpportunityStatus =
  | 'DRAFT'
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'PUBLISHED'
  | 'ARCHIVED';

export type RuleOperator =
  | '>='
  | '<='
  | '=='
  | '!='
  | 'IN'
  | 'NOT_IN'
  | 'CONTAINS'
  | 'IS_TRUE';

export type FieldName =
  | 'cgpa'
  | 'year'
  | 'branch'
  | 'tenthPercentage'
  | 'twelfthPercentage'
  | 'pcmPercentage'
  | 'researchPublication'
  | 'publicationType'
  | 'patentStatus'
  | 'startupStatus';

export interface EligibilityCondition {
  id: string;
  field: FieldName;
  operator: RuleOperator;
  value: string | number | boolean | string[] | number[];
  label: string;
}

export interface EligibilityRuleSet {
  matchType: 'ALL' | 'ANY';
  conditions: EligibilityCondition[];
}

export interface RequiredDocumentDef {
  id: string;
  name: string;
  description: string;
  required: boolean;
  fileTypesAllowed: string[];
}

export interface OpportunityFAQ {
  question: string;
  answer: string;
}

export interface Opportunity {
  id: string;
  institutionId: string;
  slug: string;
  title: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  benefitAmount: string;
  deadline: string;
  departmentId: string;
  contactPerson: string;
  contactEmail: string;
  ruleSet: EligibilityRuleSet;
  requiredDocuments: RequiredDocumentDef[];
  faqs: OpportunityFAQ[];
  status: OpportunityStatus;
  effectiveFrom: string;
  effectiveUntil: string;
  policyVersion: string;
  lastUpdated: string;
  officialSourceTitle: string;
  officialSourceUrl: string;
  sourceType: SourceType;
  publishedAt: string;
  updatedBy: string;
  isDemoData: boolean;
}

export interface StudentProfile {
  id: string;
  institutionId: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  program: string;
  year: number;
  semester: number;
  cgpa: number;
  tenthPercentage: number;
  twelfthPercentage: number;
  pcmPercentage: number;
  researchPublication: boolean;
  publicationType?: 'SCI' | 'Scopus' | 'Other' | 'None';
  patentStatus: boolean;
  startupStatus: boolean;
  skills: string[];
}

export type DocumentVerificationStatus =
  | 'NOT_UPLOADED'
  | 'UPLOADED'
  | 'UNDER_REVIEW'
  | 'VERIFIED'
  | 'REJECTED';

export interface ApplicationDocument {
  id: string;
  documentDefId: string;
  name: string;
  fileUrl?: string;
  fileName?: string;
  verificationStatus: DocumentVerificationStatus;
  feedback?: string;
  uploadedAt?: string;
}

export type ApplicationStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'FACULTY_VERIFICATION'
  | 'DEPARTMENT_REVIEW'
  | 'REQUESTED_CLARIFICATION'
  | 'APPROVED'
  | 'REJECTED'
  | 'COMPLETED';

export interface ApplicationStatusLog {
  id: string;
  status: ApplicationStatus;
  updatedBy: string;
  updatedAt: string;
  comment?: string;
}

export interface Application {
  id: string;
  institutionId: string;
  opportunityId: string;
  studentId: string;
  studentName: string;
  opportunityTitle: string;
  status: ApplicationStatus;
  clarificationNote?: string;
  studentClarificationReply?: string;
  statusHistory: ApplicationStatusLog[];
  documents: ApplicationDocument[];
  submittedAt: string;
  updatedAt: string;
}

export interface QRAnalyticsFunnel {
  scans: number;
  eligibility_started: number;
  eligibility_completed: number;
  application_started: number;
  application_submitted: number;
  application_approved: number;
}

export interface QRCodeRecord {
  id: string;
  institutionId: string;
  opportunityId: string;
  opportunityTitle: string;
  campaignLocation?: string;
  analytics: QRAnalyticsFunnel;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  institutionId: string;
  action: string;
  performedBy: string;
  targetType: string;
  targetId: string;
  timestamp: string;
  previousValue?: string;
  newValue?: string;
  details?: string;
}

export type EligibilityResultState = 'GREEN' | 'YELLOW' | 'RED';

export interface EvaluationConditionResult {
  condition: EligibilityCondition;
  passed: boolean;
  studentValue: unknown;
  explanation: string;
}

export interface EligibilityEvaluationResult {
  state: EligibilityResultState;
  passed: boolean;
  scoreLabel: string;
  disclaimer: string;
  summaryReason: string;
  conditionResults: EvaluationConditionResult[];
  nextSteps: string[];
}
