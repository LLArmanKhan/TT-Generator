import React from 'react';
import { CalendarRange, LogOut, Copy, Check, Sparkles, Shield, GraduationCap } from 'lucide-react';
import { UserProfile, CollegeEnvironment, ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  currentUser?: UserProfile | null;
  currentCollege?: CollegeEnvironment | null;
  onLogout: () => void;
  onOpenDemoModal: () => void;
  onCopyCollegeCode: (code: string) => void;
  copiedCode: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  currentUser,
  currentCollege,
  onLogout,
  onOpenDemoModal,
  onCopyCollegeCode,
  copiedCode,
}) => {
  const isDashboard = currentView.type === 'dashboard';
  const isLanding = currentView.type === 'landing';
  const isFaculty = currentUser?.role === 'faculty';
  const isAdmin = currentUser?.role === 'admin';
  const isStudent = currentUser?.role === 'student';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (currentUser && currentCollege) {
                onNavigate({ type: 'dashboard', user: currentUser, college: currentCollege });
              } else {
                onNavigate({ type: 'landing' });
              }
            }}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
              <CalendarRange className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 tracking-tight block text-base leading-none">
                Automated Timetable Generator
              </span>
              <span className="text-[11px] font-medium text-slate-500 block mt-1">
                College Planning System
              </span>
            </div>
          </button>
        </div>

        {/* Center: When in Dashboard, show College Context (hidden for Faculty, Code hidden for Admin and Student) */}
        {isDashboard && currentCollege && !isFaculty && (
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-1.5">
            <span className="font-medium text-slate-900">{currentCollege.collegeShortName}</span>
            <span className="text-slate-300">/</span>
            <span className="truncate max-w-[200px]">{currentCollege.department}</span>
            {!isAdmin && !isStudent && (
              <>
                <span className="text-slate-300">·</span>
                <button
                  onClick={() => onCopyCollegeCode(currentCollege.collegeCode)}
                  className="inline-flex items-center gap-1 font-mono text-[11px] bg-white border border-slate-200 text-indigo-700 px-2 py-0.5 rounded hover:border-indigo-300 transition-colors"
                  title="Click to copy College Code"
                >
                  <span>{currentCollege.collegeCode}</span>
                  {copiedCode ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-400" />
                  )}
                </button>
              </>
            )}
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Demo Accounts Helper Button (hidden for logged in users) */}
          {!currentUser && (
            <button
              onClick={onOpenDemoModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/70 rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Demo Data & Codes</span>
            </button>
          )}

          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 text-right">
                {!isFaculty && (
                  <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
                    {currentUser.role === 'admin' ? (
                      <Shield className="w-3.5 h-3.5 text-indigo-600" />
                    ) : (
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-slate-900 leading-none">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500 capitalize mt-0.5">{currentUser.role}</p>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-lg transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {!isLanding && (
                <button
                  onClick={() => onNavigate({ type: 'landing' })}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Home
                </button>
              )}
              <button
                onClick={() => onNavigate({ type: 'role-select-login' })}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate({ type: 'role-select-signup' })}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
