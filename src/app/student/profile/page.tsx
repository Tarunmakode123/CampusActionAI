import React from 'react';
import { services } from '@/services/service-factory';
import { User, Award, BookOpen, GraduationCap, FileCheck } from 'lucide-react';

export default async function StudentProfilePage() {
  const studentRepo = services.getStudentRepository();
  const student = await studentRepo.getProfile('stu-rahul-sharma');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
          Student Profile
        </div>
        <h1 className="text-3xl font-extrabold text-primaryText">
          Academic & Achievement Record
        </h1>
        <p className="text-secondaryText text-sm mt-1">
          Used deterministically by Campus Action AI to calculate your benefit eligibility.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
          <div className="w-16 h-16 rounded-full bg-brand-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            RS
          </div>
          <div>
            <h2 className="text-xl font-bold text-primaryText">{student?.name}</h2>
            <div className="text-xs text-secondaryText font-mono">
              Student ID: {student?.studentId} &bull; {student?.email}
            </div>
            <div className="text-xs font-semibold text-brand-600 mt-1">
              {student?.program} ({student?.branch})
            </div>
          </div>
        </div>

        {/* Academic Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-200">
            <div className="text-xs text-gray-500">Current CGPA</div>
            <div className="text-2xl font-extrabold text-brand-600 mt-1">{student?.cgpa}</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Scale 0 - 10.0</div>
          </div>

          <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-200">
            <div className="text-xs text-gray-500">Current Year</div>
            <div className="text-2xl font-extrabold text-brand-600 mt-1">{student?.year}rd Year</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Semester {student?.semester}</div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="text-xs text-gray-500">12th Board Marks</div>
            <div className="text-2xl font-extrabold text-gray-800 mt-1">{student?.twelfthPercentage}%</div>
            <div className="text-[11px] text-gray-500 mt-0.5">PCM: {student?.pcmPercentage}%</div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="text-xs text-gray-500">10th Board Marks</div>
            <div className="text-2xl font-extrabold text-gray-800 mt-1">{student?.tenthPercentage}%</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Board Certificate</div>
          </div>
        </div>

        {/* Achievement Criteria */}
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-sm text-primaryText uppercase tracking-wider text-xs">
            Institutional Research & Startup Eligibility Credentials
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-lg border border-gray-200 bg-gray-50 text-xs">
              <div className="text-gray-500">Research Publication:</div>
              <div className="font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
                <Award className="w-4 h-4 text-success" />
                Yes ({student?.publicationType} Journal)
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-gray-200 bg-gray-50 text-xs">
              <div className="text-gray-500">Patent Filing Status:</div>
              <div className="font-bold text-gray-700 mt-0.5">
                {student?.patentStatus ? 'Active Patent' : 'None Filed'}
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-gray-200 bg-gray-50 text-xs">
              <div className="text-gray-500">Startup Venture Status:</div>
              <div className="font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
                <FileCheck className="w-4 h-4 text-success" />
                Active Venture Proposal
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
