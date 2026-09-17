import {
  Opportunity,
  StudentProfile,
  Application,
  Department,
  Category,
  QRCodeRecord,
  AuditLog,
  ApplicationStatus,
  DocumentVerificationStatus,
  QRAnalyticsFunnel,
  InstitutionConfig
} from '@/types';

export interface IInstitutionRepository {
  getConfig(): Promise<InstitutionConfig>;
  updateConfig(config: Partial<InstitutionConfig>): Promise<InstitutionConfig>;
}

export interface IOpportunityRepository {
  getAll(institutionId?: string): Promise<Opportunity[]>;
  getBySlug(slug: string): Promise<Opportunity | null>;
  getById(id: string): Promise<Opportunity | null>;
  create(opportunity: Omit<Opportunity, 'id' | 'lastUpdated' | 'publishedAt'>): Promise<Opportunity>;
  update(id: string, updates: Partial<Opportunity>): Promise<Opportunity>;
  delete(id: string): Promise<boolean>;
}

export interface IStudentRepository {
  getProfile(studentId: string): Promise<StudentProfile | null>;
  updateProfile(studentId: string, profile: Partial<StudentProfile>): Promise<StudentProfile>;
}

export interface IApplicationRepository {
  getAll(institutionId?: string): Promise<Application[]>;
  getByStudentId(studentId: string): Promise<Application[]>;
  getById(id: string): Promise<Application | null>;
  create(application: Omit<Application, 'id' | 'submittedAt' | 'updatedAt' | 'statusHistory'>): Promise<Application>;
  updateStatus(id: string, status: ApplicationStatus, updatedBy: string, comment?: string, clarificationNote?: string): Promise<Application>;
  updateDocumentStatus(applicationId: string, documentId: string, verificationStatus: DocumentVerificationStatus, feedback?: string): Promise<Application>;
  submitClarificationReply(applicationId: string, replyText: string): Promise<Application>;
}

export interface IDepartmentRepository {
  getAll(): Promise<Department[]>;
  getById(id: string): Promise<Department | null>;
  create(department: Omit<Department, 'id'>): Promise<Department>;
}

export interface ICategoryRepository {
  getAll(): Promise<Category[]>;
  getBySlug(slug: string): Promise<Category | null>;
}

export interface IQRCodeRepository {
  getAll(): Promise<QRCodeRecord[]>;
  getByOpportunityId(opportunityId: string): Promise<QRCodeRecord | null>;
  getById(id: string): Promise<QRCodeRecord | null>;
  create(qr: Omit<QRCodeRecord, 'id' | 'createdAt' | 'analytics'>): Promise<QRCodeRecord>;
  recordFunnelEvent(opportunityId: string, event: keyof QRAnalyticsFunnel): Promise<QRCodeRecord | null>;
}

export interface IAuditRepository {
  getAll(): Promise<AuditLog[]>;
  log(action: string, performedBy: string, targetType: string, targetId: string, previousValue?: string, newValue?: string, details?: string): Promise<AuditLog>;
}

export interface IAnalyticsRepository {
  getOverviewMetrics(): Promise<{
    totalOpportunities: number;
    activeOpportunities: number;
    totalScans: number;
    eligibilityChecks: number;
    totalApplications: number;
    pendingReviews: number;
    approvedApplications: number;
    conversionRate: number;
  }>;
}
