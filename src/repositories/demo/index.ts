import {
  IInstitutionRepository,
  IOpportunityRepository,
  IStudentRepository,
  IApplicationRepository,
  IDepartmentRepository,
  ICategoryRepository,
  IQRCodeRepository,
  IAuditRepository,
  IAnalyticsRepository
} from '../interfaces';
import {
  InstitutionConfig,
  Opportunity,
  StudentProfile,
  Application,
  Department,
  Category,
  QRCodeRecord,
  AuditLog,
  ApplicationStatus,
  DocumentVerificationStatus,
  QRAnalyticsFunnel
} from '@/types';
import { demoStore } from './storage';

export class DemoInstitutionRepository implements IInstitutionRepository {
  async getConfig(): Promise<InstitutionConfig> {
    return demoStore.getInstitution();
  }
  async updateConfig(config: Partial<InstitutionConfig>): Promise<InstitutionConfig> {
    return demoStore.setInstitution(config);
  }
}

export class DemoCategoryRepository implements ICategoryRepository {
  async getAll(): Promise<Category[]> {
    return demoStore.getCategories();
  }
  async getBySlug(slug: string): Promise<Category | null> {
    const cats = demoStore.getCategories();
    return cats.find((c) => c.slug === slug) || null;
  }
}

export class DemoDepartmentRepository implements IDepartmentRepository {
  async getAll(): Promise<Department[]> {
    return demoStore.getDepartments();
  }
  async getById(id: string): Promise<Department | null> {
    const depts = demoStore.getDepartments();
    return depts.find((d) => d.id === id) || null;
  }
  async create(department: Omit<Department, 'id'>): Promise<Department> {
    const newDept: Department = {
      ...department,
      id: `dept-${Date.now()}`
    };
    return demoStore.addDepartment(newDept);
  }
}

export class DemoOpportunityRepository implements IOpportunityRepository {
  async getAll(): Promise<Opportunity[]> {
    return demoStore.getOpportunities();
  }
  async getBySlug(slug: string): Promise<Opportunity | null> {
    const opps = demoStore.getOpportunities();
    return opps.find((o) => o.slug === slug) || null;
  }
  async getById(id: string): Promise<Opportunity | null> {
    const opps = demoStore.getOpportunities();
    return opps.find((o) => o.id === id) || null;
  }
  async create(opportunity: Omit<Opportunity, 'id' | 'lastUpdated' | 'publishedAt'>): Promise<Opportunity> {
    const opps = demoStore.getOpportunities();
    const newOpp: Opportunity = {
      ...opportunity,
      id: `opp-${Date.now()}`,
      lastUpdated: new Date().toISOString(),
      publishedAt: new Date().toISOString()
    };
    opps.unshift(newOpp);
    demoStore.setOpportunities(opps);
    return newOpp;
  }
  async update(id: string, updates: Partial<Opportunity>): Promise<Opportunity> {
    const opps = demoStore.getOpportunities();
    const index = opps.findIndex((o) => o.id === id);
    if (index === -1) throw new Error(`Opportunity ${id} not found`);
    opps[index] = {
      ...opps[index],
      ...updates,
      lastUpdated: new Date().toISOString()
    };
    demoStore.setOpportunities(opps);
    return opps[index];
  }
  async delete(id: string): Promise<boolean> {
    const opps = demoStore.getOpportunities();
    const filtered = opps.filter((o) => o.id !== id);
    demoStore.setOpportunities(filtered);
    return true;
  }
}

export class DemoStudentRepository implements IStudentRepository {
  async getProfile(studentId: string): Promise<StudentProfile | null> {
    const stu = demoStore.getStudent();
    if (stu.studentId === studentId || stu.id === studentId) return stu;
    return stu;
  }
  async updateProfile(studentId: string, profile: Partial<StudentProfile>): Promise<StudentProfile> {
    const stu = demoStore.getStudent();
    const updated = { ...stu, ...profile };
    demoStore.setStudent(updated);
    return updated;
  }
}

export class DemoApplicationRepository implements IApplicationRepository {
  async getAll(): Promise<Application[]> {
    return demoStore.getApplications();
  }
  async getByStudentId(studentId: string): Promise<Application[]> {
    const apps = demoStore.getApplications();
    return apps.filter((a) => a.studentId === studentId || a.studentId === 'stu-rahul-sharma');
  }
  async getById(id: string): Promise<Application | null> {
    const apps = demoStore.getApplications();
    return apps.find((a) => a.id === id) || null;
  }
  async create(application: Omit<Application, 'id' | 'submittedAt' | 'updatedAt' | 'statusHistory'>): Promise<Application> {
    const apps = demoStore.getApplications();
    const now = new Date().toISOString();
    const newApp: Application = {
      ...application,
      id: `app-CA-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      submittedAt: now,
      updatedAt: now,
      statusHistory: [
        {
          id: `hist-${Date.now()}`,
          status: application.status || 'SUBMITTED',
          updatedBy: application.studentName,
          updatedAt: now,
          comment: 'Application submitted by student.'
        }
      ]
    };
    apps.unshift(newApp);
    demoStore.setApplications(apps);
    return newApp;
  }
  async updateStatus(id: string, status: ApplicationStatus, updatedBy: string, comment?: string, clarificationNote?: string): Promise<Application> {
    const apps = demoStore.getApplications();
    const index = apps.findIndex((a) => a.id === id);
    if (index === -1) throw new Error(`Application ${id} not found`);

    const now = new Date().toISOString();
    const historyItem = {
      id: `hist-${Date.now()}`,
      status,
      updatedBy,
      updatedAt: now,
      comment: comment || `Status updated to ${status}`
    };

    apps[index] = {
      ...apps[index],
      status,
      updatedAt: now,
      clarificationNote: clarificationNote !== undefined ? clarificationNote : apps[index].clarificationNote,
      statusHistory: [historyItem, ...apps[index].statusHistory]
    };

    demoStore.setApplications(apps);
    return apps[index];
  }
  async updateDocumentStatus(applicationId: string, documentId: string, verificationStatus: DocumentVerificationStatus, feedback?: string): Promise<Application> {
    const apps = demoStore.getApplications();
    const appIndex = apps.findIndex((a) => a.id === applicationId);
    if (appIndex === -1) throw new Error(`Application ${applicationId} not found`);

    const docIndex = apps[appIndex].documents.findIndex((d) => d.id === documentId || d.documentDefId === documentId);
    if (docIndex !== -1) {
      apps[appIndex].documents[docIndex] = {
        ...apps[appIndex].documents[docIndex],
        verificationStatus,
        feedback: feedback || apps[appIndex].documents[docIndex].feedback
      };
    }
    apps[appIndex].updatedAt = new Date().toISOString();
    demoStore.setApplications(apps);
    return apps[appIndex];
  }
  async submitClarificationReply(applicationId: string, replyText: string): Promise<Application> {
    const apps = demoStore.getApplications();
    const index = apps.findIndex((a) => a.id === applicationId);
    if (index === -1) throw new Error(`Application ${applicationId} not found`);

    const now = new Date().toISOString();
    apps[index] = {
      ...apps[index],
      status: 'UNDER_REVIEW',
      studentClarificationReply: replyText,
      updatedAt: now,
      statusHistory: [
        {
          id: `hist-${Date.now()}`,
          status: 'UNDER_REVIEW',
          updatedBy: `${apps[index].studentName} (Student)`,
          updatedAt: now,
          comment: `Clarification reply provided: "${replyText}"`
        },
        ...apps[index].statusHistory
      ]
    };
    demoStore.setApplications(apps);
    return apps[index];
  }
}

export class DemoQRCodeRepository implements IQRCodeRepository {
  async getAll(): Promise<QRCodeRecord[]> {
    return demoStore.getQRCodes();
  }
  async getByOpportunityId(opportunityId: string): Promise<QRCodeRecord | null> {
    const qrs = demoStore.getQRCodes();
    return qrs.find((q) => q.opportunityId === opportunityId) || null;
  }
  async getById(id: string): Promise<QRCodeRecord | null> {
    const qrs = demoStore.getQRCodes();
    return qrs.find((q) => q.id === id) || null;
  }
  async create(qr: Omit<QRCodeRecord, 'id' | 'createdAt' | 'analytics'>): Promise<QRCodeRecord> {
    const qrs = demoStore.getQRCodes();
    const newQR: QRCodeRecord = {
      ...qr,
      id: `qr-${Date.now()}`,
      createdAt: new Date().toISOString(),
      analytics: {
        scans: 0,
        eligibility_started: 0,
        eligibility_completed: 0,
        application_started: 0,
        application_submitted: 0,
        application_approved: 0
      }
    };
    qrs.unshift(newQR);
    demoStore.setQRCodes(qrs);
    return newQR;
  }
  async recordFunnelEvent(opportunityId: string, event: keyof QRAnalyticsFunnel): Promise<QRCodeRecord | null> {
    const qrs = demoStore.getQRCodes();
    const index = qrs.findIndex((q) => q.opportunityId === opportunityId || q.id === opportunityId);
    if (index === -1) return null;
    qrs[index].analytics[event] += 1;
    demoStore.setQRCodes(qrs);
    return qrs[index];
  }
}

export class DemoAuditRepository implements IAuditRepository {
  async getAll(): Promise<AuditLog[]> {
    return demoStore.getAuditLogs();
  }
  async log(action: string, performedBy: string, targetType: string, targetId: string, previousValue?: string, newValue?: string, details?: string): Promise<AuditLog> {
    const newLog: AuditLog = {
      id: `audit-${Date.now()}`,
      institutionId: 'inst-iist-demo',
      action,
      performedBy,
      targetType,
      targetId,
      timestamp: new Date().toISOString(),
      previousValue,
      newValue,
      details
    };
    demoStore.addAuditLog(newLog);
    return newLog;
  }
}

export class DemoAnalyticsRepository implements IAnalyticsRepository {
  async getOverviewMetrics() {
    const opps = demoStore.getOpportunities();
    const qrs = demoStore.getQRCodes();
    const apps = demoStore.getApplications();

    const activeOpps = opps.filter((o) => o.status === 'PUBLISHED').length;
    let totalScans = 0;
    let eligibilityChecks = 0;
    let approved = 0;
    let pending = 0;

    qrs.forEach((q) => {
      totalScans += q.analytics.scans;
      eligibilityChecks += q.analytics.eligibility_completed;
    });

    apps.forEach((a) => {
      if (a.status === 'APPROVED' || a.status === 'COMPLETED') approved++;
      if (a.status === 'SUBMITTED' || a.status === 'UNDER_REVIEW' || a.status === 'FACULTY_VERIFICATION' || a.status === 'DEPARTMENT_REVIEW' || a.status === 'REQUESTED_CLARIFICATION') pending++;
    });

    const conversionRate = totalScans > 0 ? Math.round((approved / totalScans) * 100) : 0;

    return {
      totalOpportunities: opps.length,
      activeOpportunities: activeOpps,
      totalScans,
      eligibilityChecks,
      totalApplications: apps.length,
      pendingReviews: pending,
      approvedApplications: approved,
      conversionRate
    };
  }
}
