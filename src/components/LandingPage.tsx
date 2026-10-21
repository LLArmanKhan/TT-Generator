import React from 'react';
import {
  CalendarRange,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Users,
  CheckCircle2,
  Building2,
  KeyRound,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ViewState } from '../types';

interface LandingPageProps {
  onNavigate: (view: ViewState) => void;
  onOpenDemoModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onOpenDemoModal }) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Subtle background ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-50/70 via-slate-50/40 to-transparent -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Call to actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/80 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                <span>Layer 1 Prototype · College Access Architecture</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Automated Timetable <span className="text-indigo-600">Generator</span>
              </h1>

              <p className="text-xl sm:text-2xl font-medium text-slate-700 leading-snug">
                Smart, constraint-based timetable generation for colleges.
              </p>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Automate complex timetable planning while considering faculty, classrooms, labs,
                and academic constraints. Connected seamlessly through unique college-code environments.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <button
                  onClick={() => onNavigate({ type: 'role-select-signup' })}
                  className="w-full sm:w-auto px-7 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-200/70 hover:shadow-indigo-300 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Sign Up Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate({ type: 'role-select-login' })}
                  className="w-full sm:w-auto px-7 py-3.5 text-base font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Login to College</span>
                </button>

                <button
                  onClick={onOpenDemoModal}
                  className="w-full sm:w-auto px-4 py-3.5 text-sm font-semibold text-indigo-700 hover:text-indigo-800 hover:bg-indigo-50/80 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Explore Demo Colleges</span>
                </button>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-6 grid grid-cols-3 gap-3 border-t border-slate-200/80 max-w-xl mx-auto lg:mx-0 text-left">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Multi-Role System</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">Admin · Faculty · Student</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Environment Isolation</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">Unique College Codes</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Algorithm Layer</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">ML Engine Ready</p>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Architecture Preview */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xl shadow-slate-100 relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">College-Based Access Hierarchy</h2>
                      <p className="text-[11px] text-slate-500">Unified Department Ecosystem</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md">
                    DBIT-4827
                  </span>
                </div>

                {/* Conceptual Hierarchy Tree */}
                <div className="mt-5 space-y-3.5">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-900">1. Admin (HOD / Academic Dean)</p>
                        <span className="text-[10px] text-indigo-600 font-medium">Creator</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Registers college & generates the unique code (<code className="font-mono font-semibold text-indigo-700">DBIT-4827</code>).
                      </p>
                    </div>
                  </div>

                  <div className="pl-6 border-l-2 border-dashed border-indigo-200 space-y-3">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-900">2. Faculty Members</p>
                          <span className="text-[10px] text-blue-600 font-medium">Joined via Code</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Enters <code className="font-mono text-slate-800">DBIT-4827</code> to verify department and view faculty schedule.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-900">3. Students</p>
                          <span className="text-[10px] text-emerald-600 font-medium">Access Schedules</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Enters <code className="font-mono text-slate-800">DBIT-4827</code> to access their class and lab batch timetables.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-center gap-2.5 text-xs text-amber-900">
                  <Layers className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Next Layer:</strong> Timetables generated by Admin will automatically distribute to all connected faculty and students.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Showcase Section */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Select Your Role to Begin
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Whether registering a new college department or joining with an existing College Code,
              select your role below to start.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Admin Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-sm shadow-indigo-200">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Admin</h3>
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mt-0.5">
                  College & Department Lead
                </p>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  Manage your college/department and generate timetables. Receive a unique College Code
                  upon registration to invite faculty and students.
                </p>

                <div className="mt-4 space-y-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Registers college & department</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Generates unique 4-digit code (e.g. DBIT-4827)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Oversees timetable generation in future layers</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => onNavigate({ type: 'signup-admin' })}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Register College
                </button>
                <button
                  onClick={() => onNavigate({ type: 'login-admin' })}
                  className="py-2 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Login
                </button>
              </div>
            </div>

            {/* Faculty Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-sm shadow-blue-200">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Faculty</h3>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mt-0.5">
                  Professors & Instructors
                </p>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  Access your college timetable and faculty-specific information. Connect securely using the
                  College Code provided by your college administrator.
                </p>

                <div className="mt-4 space-y-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Validates against registered College Code</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Connected to department roster</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Ready for faculty availability preferences</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => onNavigate({ type: 'signup-faculty' })}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Join as Faculty
                </button>
                <button
                  onClick={() => onNavigate({ type: 'login-faculty' })}
                  className="py-2 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Login
                </button>
              </div>
            </div>

            {/* Student Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm shadow-emerald-200">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Student</h3>
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mt-0.5">
                  Undergraduates & Batches
                </p>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  Access your college timetable and academic schedule. Join your department's space
                  instantly using your institution's College Code.
                </p>

                <div className="mt-4 space-y-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Validates with College Code</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Instant department access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Ready for class & lab batch scheduling</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => onNavigate({ type: 'signup-student' })}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Join as Student
                </button>
                <button
                  onClick={() => onNavigate({ type: 'login-student' })}
                  className="py-2 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Automated Timetable Generator · Layer 1 Prototype</p>
          <div className="flex items-center gap-4 text-slate-600">
            <span>Admin Registration</span>
            <span aria-hidden="true">·</span>
            <span>College Code Verification</span>
            <span aria-hidden="true">·</span>
            <span>Role Dashboards</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
