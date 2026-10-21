import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  Users,
  GraduationCap,
  Sparkles,
  KeyRound,
  CalendarDays,
  ArrowRight,
} from 'lucide-react';
import { CollegeEnvironment, UserProfile } from '../../types';
import {
  TimetableConstraintsForm,
  ConstraintsSummary,
} from '../timetable/TimetableConstraintsForm';
import { TimetablePreviewModal } from '../timetable/TimetablePreviewModal';
import { TimetableGenerationStatus } from '../timetable/TimetableGenerationStatus';

interface AdminDashboardProps {
  user: UserProfile;
  college: CollegeEnvironment;
  onLogout: () => void;
  onShowToast: (type: 'success' | 'error' | 'info', title: string, message?: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  college,
  onLogout,
  onShowToast,
}) => {
  const [codeValue, setCodeValue] = useState(college.collegeCode || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewSummary, setPreviewSummary] = useState<ConstraintsSummary | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [showStatusScreen, setShowStatusScreen] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const handleOpenGenerator = () => {
    setIsGenerating(true);
    setTimeout(() => {
      constraintsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleGenerateSummary = (summary: ConstraintsSummary) => {
    setPreviewSummary(summary);
    setIsPreviewModalOpen(true);
    onShowToast('success', 'Requirements Captured', 'Constraints recorded for automated scheduling engine.');
  };

  if (showStatusScreen) {
    return (
      <TimetableGenerationStatus
        summary={previewSummary}
        onReturnToDashboard={() => {
          setShowStatusScreen(false);
          setIsGenerating(false);
        }}
        onModifyConstraints={() => {
          setShowStatusScreen(false);
          setIsGenerating(true);
          setTimeout(() => {
            constraintsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }}
      />
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/60 pb-16">
      {/* Top Banner with College Info */}
      <section className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-100">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                  Admin Portal
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-500">Department Administrator</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                {user.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">{college.collegeName}</span>
                <span>/</span>
                <span>{college.department}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Timetable Generator Section */}
        <section className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-indigo-200">
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                <span>Next Development Milestone</span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight">
                Timetable Generator
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                The automated constraint satisfaction and ML optimization engine will create clash-free master timetables for{' '}
                <strong className="text-white">{college.department}</strong>.
              </p>

              <div className="pt-2 grid sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="font-semibold text-white">Constraint Processing</p>
                  <p className="text-[11px] text-slate-400 mt-1">Faculty & Lab availability rules</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="font-semibold text-white">ML Schedule Engine</p>
                  <p className="text-[11px] text-slate-400 mt-1">Zero-collision slot distribution</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="font-semibold text-white">Automatic Sync</p>
                  <p className="text-[11px] text-slate-400 mt-1">Instantly visible to department members</p>
                </div>
              </div>
            </div>

            {/* Prominent Generate Timetable Entry Card */}
            <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/5 backdrop-blur-xs rounded-2xl p-5 border border-white/10">
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-indigo-300" />
                  <span>Generate Timetable</span>
                </h3>
                <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed max-w-xl">
                  Create an optimized college timetable based on your department's requirements and scheduling constraints.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenGenerator}
                className="px-6 py-3.5 text-xs sm:text-sm font-bold text-indigo-950 bg-white hover:bg-slate-100 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-indigo-600 group-hover:rotate-12 transition-transform" />
                <span>Generate Timetable</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Expanded Timetable Constraints Form */}
          {isGenerating && (
            <div ref={constraintsRef} className="animate-in fade-in slide-in-from-top-4 duration-200">
              <TimetableConstraintsForm
                college={college}
                onGenerate={handleGenerateSummary}
                onCancel={() => setIsGenerating(false)}
              />
            </div>
          )}
        </section>

        {/* Section: College Environment Members */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                College Environment Members
              </h3>
              <p className="text-xs text-slate-500">
                All faculty and students registered in your department workspace.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <span>{college.faculty.length} Faculty</span>
              <span>·</span>
              <span>{college.students.length} Students</span>
            </div>
          </div>

          {/* College Code Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-indigo-600" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                College Code
              </h4>
            </div>
            <div className="w-full sm:w-auto">
              <input
                type="text"
                placeholder="Enter College Code"
                value={codeValue}
                onChange={(e) => setCodeValue(e.target.value.toUpperCase())}
                className="w-full sm:w-64 px-3.5 py-2 text-xs font-mono uppercase bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Faculty List */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Registered Faculty</h4>
                      <p className="text-[11px] text-slate-500">Teaching Staff ({college.faculty.length})</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded">
                    Active
                  </span>
                </div>

                {college.faculty.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500">
                    <p>No faculty registered yet.</p>
                    <p className="mt-1">
                      Faculty in the {college.collegeShortName} environment will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 divide-y divide-slate-100 max-h-60 overflow-y-auto">
                    {college.faculty.map((f) => (
                      <div key={f.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-semibold text-slate-900">{f.name}</p>
                          <p className="text-[11px] text-slate-500">{f.email}</p>
                        </div>
                        <span className="font-mono text-[11px] text-slate-400">@{f.username}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                Faculty in the {college.collegeShortName} environment will appear here.
              </div>
            </div>

            {/* Students List */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Registered Students</h4>
                      <p className="text-[11px] text-slate-500">Enrolled Batches ({college.students.length})</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded">
                    Active
                  </span>
                </div>

                {college.students.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500">
                    <p>No students enrolled yet.</p>
                    <p className="mt-1">
                      Students in the {college.collegeShortName} environment will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 divide-y divide-slate-100 max-h-60 overflow-y-auto">
                    {college.students.map((s) => (
                      <div key={s.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-semibold text-slate-900">{s.name}</p>
                          <p className="text-[11px] text-slate-500">{s.email}</p>
                        </div>
                        <span className="font-mono text-[11px] text-slate-400">@{s.username}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                Students in the {college.collegeShortName} environment will appear here.
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Timetable Generation Preview Status Modal */}
      <TimetablePreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onModifyConstraints={() => {
          setIsPreviewModalOpen(false);
          setIsGenerating(true);
        }}
        onDoneAndGenerate={() => {
          setIsPreviewModalOpen(false);
          setShowStatusScreen(true);
        }}
        summary={previewSummary}
      />
    </div>
  );
};
