import React from 'react';
import {
  CalendarRange,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Cpu,
  Layers,
  Building2,
  Users,
  BookOpen,
  CalendarDays,
  ShieldCheck,
} from 'lucide-react';
import { ConstraintsSummary } from './TimetableConstraintsForm';

interface TimetableGenerationStatusProps {
  summary: ConstraintsSummary | null;
  onReturnToDashboard: () => void;
  onModifyConstraints?: () => void;
}

export const TimetableGenerationStatus: React.FC<TimetableGenerationStatusProps> = ({
  summary,
  onReturnToDashboard,
  onModifyConstraints,
}) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/70 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="max-w-3xl w-full space-y-6">
        {/* Main Status Hero Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden text-center">
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-56 bg-gradient-to-b from-indigo-50/80 via-blue-50/40 to-transparent -z-10 pointer-events-none rounded-t-3xl" />

          {/* Central Animated Illustration / Icon */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex items-center justify-center shadow-lg shadow-indigo-200 group">
              <CalendarRange className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-sm">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span>Implementation Phase Active</span>
            </span>
          </div>

          {/* Main Headings */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            We're Working on Your Timetable Generator
          </h1>

          {/* Reassuring Paragraphs */}
          <div className="mt-5 space-y-4 max-w-2xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed">
            <p className="font-medium text-slate-800">
              Your timetable requirements and constraints have been successfully captured. Our automated timetable generation system is currently under development, and we're working on bringing the complete scheduling engine to life.
            </p>

            <p className="text-sm text-slate-600">
              The project is currently in its implementation phase. Once the system is fully ready, you will be able to generate optimized timetables automatically based on your requirements.
            </p>

            <p className="text-sm text-slate-500">
              We're working hard to complete the implementation soon. Thank you for your patience — your automated timetable experience is coming shortly!
            </p>
          </div>

          {/* Implementation Progress Pipeline */}
          <div className="mt-8 pt-8 border-t border-slate-100 max-w-xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 text-left">
              Engine Pipeline Status
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left text-xs">
              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between gap-1">
                <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Phase 1 · Verified</span>
                </span>
                <span className="font-bold text-slate-900">Constraints Specification</span>
                <span className="text-[11px] text-slate-500">Requirements saved</span>
              </div>

              <div className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-200 flex flex-col justify-between gap-1">
                <span className="text-[10px] font-bold text-indigo-700 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                  <span>Phase 2 · Active</span>
                </span>
                <span className="font-bold text-slate-900">ML Heuristic Engine</span>
                <span className="text-[11px] text-slate-500">Under development</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-1">
                <span className="text-[10px] font-bold text-slate-400">Phase 3 · Upcoming</span>
                <span className="font-bold text-slate-700">Automated Timetables</span>
                <span className="text-[11px] text-slate-500">Clash-free schedule</span>
              </div>
            </div>
          </div>

          {/* Captured Constraints Summary Card */}
          {summary && (
            <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 text-left max-w-xl mx-auto space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">
                  Captured Requirements for {summary.department}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                  Ready for Engine
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 pt-1">
                <div>
                  <span className="text-[10px] text-slate-400 block">Subjects</span>
                  <strong className="text-slate-800">{summary.subjectsCount} Courses</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Faculty</span>
                  <strong className="text-slate-800">{summary.facultyCount} Members</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Rooms & Labs</span>
                  <strong className="text-slate-800">{summary.classroomsCount + summary.labsCount} Venues</strong>
                </div>
              </div>

              {summary.additionalRequirements && (
                <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-600 italic">
                  <strong>Custom rule:</strong> "{summary.additionalRequirements.slice(0, 100)}
                  {summary.additionalRequirements.length > 100 ? '...' : ''}"
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onReturnToDashboard}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Return to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onModifyConstraints && (
              <button
                onClick={onModifyConstraints}
                className="w-full sm:w-auto px-5 py-3.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Modify Constraints
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
