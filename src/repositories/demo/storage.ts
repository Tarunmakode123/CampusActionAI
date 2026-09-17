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
import {
  SEED_INSTITUTION,
  SEED_CATEGORIES,
  SEED_DEPARTMENTS,
  SEED_OPPORTUNITIES,
  SEED_STUDENT,
  SEED_APPLICATIONS,
  SEED_QR_CODES,
  SEED_AUDIT_LOGS
} from './seed-data';

const STORAGE_KEYS = {
  INSTITUTION: 'ca_ai_demo_institution',
  CATEGORIES: 'ca_ai_demo_categories',
  DEPARTMENTS: 'ca_ai_demo_departments',
  OPPORTUNITIES: 'ca_ai_demo_opportunities',
  STUDENT: 'ca_ai_demo_student',
  APPLICATIONS: 'ca_ai_demo_applications',
  QR_CODES: 'ca_ai_demo_qr_codes',
  AUDIT_LOGS: 'ca_ai_demo_audit_logs'
};

class DemoStateStore {
  private inMemory: {
    institution: InstitutionConfig;
    categories: Category[];
    departments: Department[];
    opportunities: Opportunity[];
    student: StudentProfile;
    applications: Application[];
    qrCodes: QRCodeRecord[];
    auditLogs: AuditLog[];
  };

  constructor() {
    this.inMemory = {
      institution: { ...SEED_INSTITUTION },
      categories: [...SEED_CATEGORIES],
      departments: [...SEED_DEPARTMENTS],
      opportunities: [...SEED_OPPORTUNITIES],
      student: { ...SEED_STUDENT },
      applications: [...SEED_APPLICATIONS],
      qrCodes: [...SEED_QR_CODES],
      auditLogs: [...SEED_AUDIT_LOGS]
    };
    this.initFromStorage();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  private initFromStorage() {
    if (!this.isBrowser()) return;
    try {
      const inst = localStorage.getItem(STORAGE_KEYS.INSTITUTION);
      if (inst) this.inMemory.institution = JSON.parse(inst);
      else localStorage.setItem(STORAGE_KEYS.INSTITUTION, JSON.stringify(SEED_INSTITUTION));

      const opps = localStorage.getItem(STORAGE_KEYS.OPPORTUNITIES);
      if (opps) this.inMemory.opportunities = JSON.parse(opps);
      else localStorage.setItem(STORAGE_KEYS.OPPORTUNITIES, JSON.stringify(SEED_OPPORTUNITIES));

      const stu = localStorage.getItem(STORAGE_KEYS.STUDENT);
      if (stu) this.inMemory.student = JSON.parse(stu);
      else localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(SEED_STUDENT));

      const apps = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (apps) this.inMemory.applications = JSON.parse(apps);
      else localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(SEED_APPLICATIONS));

      const qrs = localStorage.getItem(STORAGE_KEYS.QR_CODES);
      if (qrs) this.inMemory.qrCodes = JSON.parse(qrs);
      else localStorage.setItem(STORAGE_KEYS.QR_CODES, JSON.stringify(SEED_QR_CODES));

      const audits = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      if (audits) this.inMemory.auditLogs = JSON.parse(audits);
      else localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(SEED_AUDIT_LOGS));

      const cats = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (cats) this.inMemory.categories = JSON.parse(cats);
      else localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(SEED_CATEGORIES));

      const depts = localStorage.getItem(STORAGE_KEYS.DEPARTMENTS);
      if (depts) this.inMemory.departments = JSON.parse(depts);
      else localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(SEED_DEPARTMENTS));
    } catch (err) {
      console.warn('Failed to read from demo localStorage store:', err);
    }
  }

  private persist(key: string, value: unknown) {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`Failed to persist key ${key} to localStorage:`, err);
    }
  }

  getInstitution(): InstitutionConfig {
    return { ...this.inMemory.institution };
  }

  setInstitution(config: Partial<InstitutionConfig>): InstitutionConfig {
    this.inMemory.institution = { ...this.inMemory.institution, ...config };
    this.persist(STORAGE_KEYS.INSTITUTION, this.inMemory.institution);
    return { ...this.inMemory.institution };
  }

  getCategories(): Category[] {
    return [...this.inMemory.categories];
  }

  getDepartments(): Department[] {
    return [...this.inMemory.departments];
  }

  addDepartment(dept: Department): Department {
    this.inMemory.departments.push(dept);
    this.persist(STORAGE_KEYS.DEPARTMENTS, this.inMemory.departments);
    return dept;
  }

  getOpportunities(): Opportunity[] {
    return [...this.inMemory.opportunities];
  }

  setOpportunities(opps: Opportunity[]) {
    this.inMemory.opportunities = [...opps];
    this.persist(STORAGE_KEYS.OPPORTUNITIES, this.inMemory.opportunities);
  }

  getStudent(): StudentProfile {
    return { ...this.inMemory.student };
  }

  setStudent(profile: StudentProfile) {
    this.inMemory.student = { ...profile };
    this.persist(STORAGE_KEYS.STUDENT, this.inMemory.student);
  }

  getApplications(): Application[] {
    return [...this.inMemory.applications];
  }

  setApplications(apps: Application[]) {
    this.inMemory.applications = [...apps];
    this.persist(STORAGE_KEYS.APPLICATIONS, this.inMemory.applications);
  }

  getQRCodes(): QRCodeRecord[] {
    return [...this.inMemory.qrCodes];
  }

  setQRCodes(qrs: QRCodeRecord[]) {
    this.inMemory.qrCodes = [...qrs];
    this.persist(STORAGE_KEYS.QR_CODES, this.inMemory.qrCodes);
  }

  getAuditLogs(): AuditLog[] {
    return [...this.inMemory.auditLogs];
  }

  addAuditLog(log: AuditLog) {
    this.inMemory.auditLogs.unshift(log);
    this.persist(STORAGE_KEYS.AUDIT_LOGS, this.inMemory.auditLogs);
  }

  resetToDefaults() {
    this.inMemory = {
      institution: { ...SEED_INSTITUTION },
      categories: [...SEED_CATEGORIES],
      departments: [...SEED_DEPARTMENTS],
      opportunities: [...SEED_OPPORTUNITIES],
      student: { ...SEED_STUDENT },
      applications: [...SEED_APPLICATIONS],
      qrCodes: [...SEED_QR_CODES],
      auditLogs: [...SEED_AUDIT_LOGS]
    };
    if (this.isBrowser()) {
      localStorage.clear();
      this.initFromStorage();
    }
  }
}

export const demoStore = new DemoStateStore();
