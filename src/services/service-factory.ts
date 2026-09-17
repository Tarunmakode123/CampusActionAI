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
} from '@/repositories/interfaces';
import {
  DemoInstitutionRepository,
  DemoOpportunityRepository,
  DemoStudentRepository,
  DemoApplicationRepository,
  DemoDepartmentRepository,
  DemoCategoryRepository,
  DemoQRCodeRepository,
  DemoAuditRepository,
  DemoAnalyticsRepository
} from '@/repositories/demo';

class ServiceFactory {
  private institutionRepo: IInstitutionRepository;
  private opportunityRepo: IOpportunityRepository;
  private studentRepo: IStudentRepository;
  private applicationRepo: IApplicationRepository;
  private departmentRepo: IDepartmentRepository;
  private categoryRepo: ICategoryRepository;
  private qrCodeRepo: IQRCodeRepository;
  private auditRepo: IAuditRepository;
  private analyticsRepo: IAnalyticsRepository;

  constructor() {
    // Mode resolution configured safely on server / service boundary
    // Default mode: DEMO
    this.institutionRepo = new DemoInstitutionRepository();
    this.opportunityRepo = new DemoOpportunityRepository();
    this.studentRepo = new DemoStudentRepository();
    this.applicationRepo = new DemoApplicationRepository();
    this.departmentRepo = new DemoDepartmentRepository();
    this.categoryRepo = new DemoCategoryRepository();
    this.qrCodeRepo = new DemoQRCodeRepository();
    this.auditRepo = new DemoAuditRepository();
    this.analyticsRepo = new DemoAnalyticsRepository();
  }

  getInstitutionRepository(): IInstitutionRepository {
    return this.institutionRepo;
  }
  getOpportunityRepository(): IOpportunityRepository {
    return this.opportunityRepo;
  }
  getStudentRepository(): IStudentRepository {
    return this.studentRepo;
  }
  getApplicationRepository(): IApplicationRepository {
    return this.applicationRepo;
  }
  getDepartmentRepository(): IDepartmentRepository {
    return this.departmentRepo;
  }
  getCategoryRepository(): ICategoryRepository {
    return this.categoryRepo;
  }
  getQRCodeRepository(): IQRCodeRepository {
    return this.qrCodeRepo;
  }
  getAuditRepository(): IAuditRepository {
    return this.auditRepo;
  }
  getAnalyticsRepository(): IAnalyticsRepository {
    return this.analyticsRepo;
  }
}

export const services = new ServiceFactory();
