import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  X,
  Layers,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Users,
  Building2,
  CalendarDays,
  Clock,
} from 'lucide-react';
import { ConstraintsSummary } from './TimetableConstraintsForm';

interface TimetablePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onModifyConstraints: () => void;
  onDoneAndGenerate: () => void;
  summary: ConstraintsSummary | null;
}

export const TimetablePreviewModal: React.FC<TimetablePreviewModalProps> = ({
  isOpen,
  onClose,
  onModifyConstraints,
  onDoneAndGenerate,
  summary,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shadow-indigo-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Timetable Generation Preview
              </h3>
              <p className="text-xs text-slate-500">
                Optimization Engine · Scheduling Constraints Status
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Status Message Box */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3.5">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-sm text-emerald-950">
                Constraints Captured Successfully
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                "Your requirements have been captured successfully. The automated timetable generation engine will use these constraints to create an optimized schedule. The full working generation model will be implemented in a future version."
              </p>
            </div>
          </div>

          {/* Captured Constraints Breakdown */}
          {summary && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Captured Specification Breakdown ({summary.department})
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Subjects</span>
                  </div>
                  <p className="font-bold text-slate-900 text-sm">{summary.subjectsCount} Courses</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>Faculty</span>
                  </div>
                  <p className="font-bold text-slate-900 text-sm">{summary.facultyCount} Instructors</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <Building2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Rooms & Labs</span>
                  </div>
                  <p className="font-bold text-slate-900 text-sm">
                    {summary.classroomsCount} Rooms / {summary.labsCount} Labs
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <CalendarDays className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Working Days</span>
                  </div>
                  <p className="font-bold text-slate-900 text-sm">{summary.workingDaysCount} Days / week</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <Clock className="w-3.5 h-3.5 text-purple-600" />
                    <span>Common Lunch</span>
                  </div>
                  <p className="font-bold text-slate-900 text-xs truncate">{summary.lunchBreak}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <Layers className="w-3.5 h-3.5 text-rose-600" />
                    <span>Max Consecutive</span>
                  </div>
                  <p className="font-bold text-slate-900 text-sm">{summary.maxConsecutive} Lectures max</p>
                </div>
              </div>

              {summary.additionalRequirements && (
                <div className="mt-3 p-3.5 bg-indigo-50/60 border border-indigo-100 rounded-xl text-xs text-indigo-950">
                  <span className="font-bold block text-[11px] text-indigo-900 uppercase tracking-wider mb-1">
                    Custom / Additional Requirements:
                  </span>
                  <p className="whitespace-pre-line text-slate-700 italic">
                    "{summary.additionalRequirements}"
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <p className="leading-relaxed">
              <strong>Next Development Layer:</strong> The constraint satisfaction and ML heuristic solver will take these captured parameters and execute automated slot allocation with zero clash guarantee.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <button
            onClick={onModifyConstraints}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Modify Constraints</span>
          </button>

          <button
            onClick={onDoneAndGenerate}
            className="w-full sm:w-auto px-6 py-2.5 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Done and Generate Timetable
          </button>
        </div>
      </div>
    </div>
  );
};
