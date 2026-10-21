import React, { useState } from 'react';
import {
  Users,
  CalendarDays,
  CalendarClock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  LayoutDashboard,
  ShieldCheck,
} from 'lucide-react';
import { CollegeEnvironment, UserProfile } from '../../types';

interface FacultyDashboardProps {
  user: UserProfile;
  college: CollegeEnvironment;
  onLogout: () => void;
  onShowToast: (type: 'success' | 'error' | 'info', title: string, message?: string) => void;
}

export const FacultyDashboard: React.FC<FacultyDashboardProps> = ({
  user,
  college,
  onLogout,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timetable'>('overview');

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/60 pb-16">
      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200 pt-8 pb-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-100">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                  Faculty Portal
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-500">Instructor Account</span>
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

        {/* Navigation Tabs: Overview & Timetable */}
        <div className="max-w-7xl mx-auto flex items-center gap-4 border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-2 font-semibold text-xs sm:text-sm transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('timetable')}
            className={`pb-3 px-2 font-semibold text-xs sm:text-sm transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'timetable'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>Timetable</span>
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {activeTab === 'overview' && (
          <>
            {/* Timetable Card */}
            <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-blue-200">
                  <CalendarDays className="w-3.5 h-3.5 text-blue-300" />
                  <span>Academic Schedule Module</span>
                </div>

                <h2 className="text-3xl font-extrabold tracking-tight">Timetable</h2>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Once the department administrator (<strong className="text-white">{college.admin.name}</strong>)
                  generates the schedule for <strong>{college.department}</strong>, your individualized faculty teaching slots,
                  assigned classrooms, lab batches, and subject allocations will appear here in real-time.
                </p>

                <div className="pt-2 grid sm:grid-cols-3 gap-3 text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="font-semibold text-white">Faculty Availability</p>
                    <p className="text-[11px] text-slate-400 mt-1">Submit your preferred teaching hours</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="font-semibold text-white">Personal Schedule</p>
                    <p className="text-[11px] text-slate-400 mt-1">Weekly lecture & lab timetable view</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="font-semibold text-white">Department Sync</p>
                    <p className="text-[11px] text-slate-400 mt-1">Directly tied to department schedule</p>
                  </div>
                </div>

                {/* Open Timetable Action */}
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('timetable')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-xs transition-all cursor-pointer group"
                  >
                    <CalendarDays className="w-4 h-4 text-blue-600" />
                    <span>Open Timetable</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </section>

            {/* Environment Overview */}
            <section className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <p className="text-xs font-medium text-slate-500">Institution</p>
                <p className="text-sm font-bold text-slate-900 mt-1">{college.collegeName}</p>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">Short: {college.collegeShortName}</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <p className="text-xs font-medium text-slate-500">Department</p>
                <p className="text-sm font-bold text-slate-900 mt-1">{college.department}</p>
                <p className="text-xs text-slate-500 mt-0.5">Admin: {college.admin.name}</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <p className="text-xs font-medium text-slate-500">Department Network</p>
                <p className="text-sm font-bold text-slate-900 mt-1">
                  {college.faculty.length} Faculty · {college.students.length} Students
                </p>
              </div>
            </section>
          </>
        )}

        {/* Dedicated Timetable Section */}
        {activeTab === 'timetable' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Top Bar with Back Button */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 px-3.5 py-2 rounded-xl transition-colors cursor-pointer shadow-2xs"
              >
                <ArrowLeft className="w-4 h-4 text-slate-500" />
                <span>Back to Overview</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{college.department}</span>
                <span>·</span>
                <span>Faculty Schedule</span>
              </div>
            </div>

            {/* Empty-State Main Card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-14 shadow-lg text-center relative overflow-hidden">
              {/* Subtle Ambient Background Gradient */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-48 bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-transparent -z-10 pointer-events-none rounded-t-3xl" />

              {/* Central Schedule Icon / Illustration */}
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-blue-200">
                  <CalendarDays className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-blue-700 shadow-xs">
                  <Clock className="w-4 h-4" />
                </div>
              </div>

              {/* Reassuring Status Pill */}
              <div className="flex justify-center mb-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/80 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Awaiting Publication</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                No Timetable Published Yet
              </h2>

              {/* Primary Informational Message */}
              <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                Your admin has not published any timetable yet. Once the admin updates and publishes the timetable, it will automatically be available here.
              </p>

              {/* Reassuring Contextual Cards */}
              <div className="mt-8 pt-8 border-t border-slate-100 max-w-2xl mx-auto grid sm:grid-cols-3 gap-3 text-left">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-1.5">
                  <div className="flex items-center gap-1.5 text-slate-700 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>System Normal</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal">
                    Department infrastructure and faculty profiles are active and ready.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-1.5">
                  <div className="flex items-center gap-1.5 text-slate-700 text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Admin Release</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal">
                    Schedule generation is managed by department admin ({college.admin.name}).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-1.5">
                  <div className="flex items-center gap-1.5 text-slate-700 text-xs font-semibold">
                    <CalendarClock className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Automatic Sync</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal">
                    Your teaching slots and venue assignments will appear here directly.
                  </p>
                </div>
              </div>

              {/* Return Button */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
