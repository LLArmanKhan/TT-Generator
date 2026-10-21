import React, { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Users,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { CollegeEnvironment } from '../types';

interface AdminRegistrationSuccessProps {
  college: CollegeEnvironment;
  onContinue: () => void;
  onShowToast: (type: 'success' | 'error' | 'info', title: string, message?: string) => void;
}

export const AdminRegistrationSuccess: React.FC<AdminRegistrationSuccessProps> = ({
  college,
  onContinue,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(college.collegeCode);
    setCopied(true);
    onShowToast('success', 'Copied to Clipboard!', `College Code: ${college.collegeCode}`);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-2xl mx-auto w-full">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg text-center relative overflow-hidden">
          {/* Top celebratory decoration */}
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-sm shadow-emerald-200">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="inline-block text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-3">
            Registration Complete
          </span>

          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            College Registered Successfully!
          </h1>

          <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto">
            Your department workspace has been initialized. A unique College Code has been assigned to
            link all members belonging to this college.
          </p>

          {/* Details Card */}
          <div className="mt-8 bg-slate-50 border border-slate-200/90 rounded-2xl p-6 text-left space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200/80 gap-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                College
              </span>
              <span className="text-base font-bold text-slate-900">{college.collegeName}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200/80 gap-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Department
              </span>
              <span className="text-sm font-semibold text-slate-800">{college.department}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Admin
              </span>
              <span className="text-sm text-slate-700 font-medium">
                {college.admin.name} ({college.admin.email})
              </span>
            </div>
          </div>

          {/* Prominent College Code Display */}
          <div className="mt-6 bg-indigo-50/70 border-2 border-dashed border-indigo-300 rounded-2xl p-6">
            <p className="text-xs font-semibold text-indigo-900 uppercase tracking-wider mb-2">
              Your Unique College Code
            </p>

            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-3xl sm:text-4xl font-extrabold text-indigo-700 tracking-widest selection:bg-indigo-200">
                {college.collegeCode}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-white hover:bg-indigo-100 border border-indigo-200 rounded-xl shadow-xs transition-colors cursor-pointer"
                title="Copy College Code"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-indigo-800 mt-4 leading-relaxed font-medium max-w-md mx-auto">
              "Share this College Code with your faculty and students so they can access your college environment."
            </p>
          </div>

          {/* Access Explanation */}
          <div className="mt-6 grid grid-cols-2 gap-3 text-left">
            <div className="p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2">
              <Users className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block">Faculty access:</strong>
                Faculty will use <span className="font-mono">{college.collegeCode}</span> during registration.
              </div>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block">Student access:</strong>
                Students will use <span className="font-mono">{college.collegeCode}</span> during registration.
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onContinue}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
