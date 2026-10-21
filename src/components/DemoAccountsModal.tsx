import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Copy,
  Check,
  ShieldCheck,
  Users,
  GraduationCap,
  Building2,
  RotateCcw,
} from 'lucide-react';
import { CollegeEnvironment, UserProfile } from '../types';
import { StorageService } from '../services/storage';

interface DemoAccountsModalProps {
  isOpen: boolean;
  onClose: () => void;
  colleges: CollegeEnvironment[];
  onDirectLogin: (user: UserProfile, college: CollegeEnvironment) => void;
  onSelectCollegeCodeForSignup: (code: string) => void;
  onResetData: () => void;
  onShowToast: (type: 'success' | 'error' | 'info', title: string, message?: string) => void;
}

export const DemoAccountsModal: React.FC<DemoAccountsModalProps> = ({
  isOpen,
  onClose,
  colleges,
  onDirectLogin,
  onSelectCollegeCodeForSignup,
  onResetData,
  onShowToast,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onShowToast('success', 'Copied to Clipboard', code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Demo Colleges & Access Codes
              </h3>
              <p className="text-xs text-slate-500">
                Instant test accounts and College Codes for evaluating Layer 1
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 leading-relaxed">
            <strong>How the College Code Works:</strong> The Admin registers a college/department (e.g., Don Bosco Institute of Technology) and receives a unique code (<code className="font-mono font-bold">DBIT-4827</code>). Faculty and Students use this code during sign up or login to join the exact same environment.
          </div>

          <div className="space-y-5">
            {colleges.map((col) => (
              <div
                key={col.collegeCode}
                className="border border-slate-200 rounded-2xl p-5 bg-white shadow-2xs hover:border-slate-300 transition-all"
              >
                {/* College Title & Code */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-indigo-600" />
                      <h4 className="text-sm font-bold text-slate-900">{col.collegeName}</h4>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Department: <span className="font-semibold text-slate-700">{col.department}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="font-mono text-sm font-bold px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg">
                      {col.collegeCode}
                    </span>
                    <button
                      onClick={() => handleCopy(col.collegeCode)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-colors cursor-pointer"
                      title="Copy code"
                    >
                      {copiedCode === col.collegeCode ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Users in this college */}
                <div className="mt-4 grid sm:grid-cols-3 gap-3">
                  {/* Admin Account */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Admin</span>
                      </div>
                      <p className="text-xs text-slate-700 font-medium truncate">{col.admin.name}</p>
                      <p className="text-[11px] font-mono text-slate-500 truncate mt-0.5">
                        @{col.admin.username}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onDirectLogin(col.admin, col);
                        onClose();
                      }}
                      className="mt-3 w-full py-1.5 px-2 text-[11px] font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
                    >
                      Login as Admin
                    </button>
                  </div>

                  {/* Faculty Account */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1">
                        <Users className="w-3.5 h-3.5 text-blue-600" />
                        <span>Faculty ({col.faculty.length})</span>
                      </div>
                      {col.faculty[0] ? (
                        <>
                          <p className="text-xs text-slate-700 font-medium truncate">
                            {col.faculty[0].name}
                          </p>
                          <p className="text-[11px] font-mono text-slate-500 truncate mt-0.5">
                            @{col.faculty[0].username}
                          </p>
                        </>
                      ) : (
                        <p className="text-xs text-slate-400 italic">No faculty yet</p>
                      )}
                    </div>

                    {col.faculty[0] ? (
                      <button
                        onClick={() => {
                          onDirectLogin(col.faculty[0], col);
                          onClose();
                        }}
                        className="mt-3 w-full py-1.5 px-2 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                      >
                        Login as Faculty
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          onSelectCollegeCodeForSignup(col.collegeCode);
                          onClose();
                        }}
                        className="mt-3 w-full py-1.5 px-2 text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Sign Up Faculty
                      </button>
                    )}
                  </div>

                  {/* Student Account */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1">
                        <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Students ({col.students.length})</span>
                      </div>
                      {col.students[0] ? (
                        <>
                          <p className="text-xs text-slate-700 font-medium truncate">
                            {col.students[0].name}
                          </p>
                          <p className="text-[11px] font-mono text-slate-500 truncate mt-0.5">
                            @{col.students[0].username}
                          </p>
                        </>
                      ) : (
                        <p className="text-xs text-slate-400 italic">No students yet</p>
                      )}
                    </div>

                    {col.students[0] ? (
                      <button
                        onClick={() => {
                          onDirectLogin(col.students[0], col);
                          onClose();
                        }}
                        className="mt-3 w-full py-1.5 px-2 text-[11px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
                      >
                        Login as Student
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          onSelectCollegeCodeForSignup(col.collegeCode);
                          onClose();
                        }}
                        className="mt-3 w-full py-1.5 px-2 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Sign Up Student
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={() => {
              if (confirm('Reset colleges and users back to original demo state?')) {
                onResetData();
              }
            }}
            className="inline-flex items-center gap-1 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
