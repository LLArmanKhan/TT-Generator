import React from 'react';
import { ShieldCheck, Users, GraduationCap, ArrowLeft, ArrowRight } from 'lucide-react';
import { UserRole, ViewState } from '../types';

interface RoleSelectionProps {
  mode: 'signup' | 'login';
  onSelectRole: (role: UserRole) => void;
  onBack: () => void;
  onSwitchMode: () => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({
  mode,
  onSelectRole,
  onBack,
  onSwitchMode,
}) => {
  const isSignup = mode === 'signup';

  const roles = [
    {
      id: 'admin' as UserRole,
      title: 'Admin',
      badge: 'Institution / Department Head',
      color: 'indigo',
      icon: ShieldCheck,
      description: isSignup
        ? 'Manage your college/department and generate timetables.'
        : 'Sign in to configure department timetables and manage college codes.',
      actionText: isSignup ? 'Register College' : 'Login as Admin',
      note: isSignup ? 'Generates unique College Code' : 'Username/Email + Password',
    },
    {
      id: 'faculty' as UserRole,
      title: 'Faculty',
      badge: 'Teaching Faculty & Professors',
      color: 'blue',
      icon: Users,
      description: isSignup
        ? 'Access your college timetable and faculty-specific information.'
        : 'Sign in to access your teaching schedule and faculty portal.',
      actionText: isSignup ? 'Register as Faculty' : 'Login as Faculty',
      note: 'Requires College Code',
    },
    {
      id: 'student' as UserRole,
      title: 'Student',
      badge: 'Undergraduate / Postgraduate',
      color: 'emerald',
      icon: GraduationCap,
      description: isSignup
        ? 'Access your college timetable and academic schedule.'
        : 'Sign in to view your semester lectures, labs, and classroom allocations.',
      actionText: isSignup ? 'Register as Student' : 'Login as Student',
      note: 'Requires College Code',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Navigation & Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors mb-4 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Home</span>
          </button>

          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {isSignup ? 'How are you signing up?' : 'Login as'}
            </h1>
            <p className="text-slate-600 text-sm mt-1.5">
              {isSignup
                ? 'Select your designated role to set up your account or register your college department.'
                : 'Choose your role to access your college timetable workspace.'}
            </p>
          </div>
        </div>

        {/* 3 Role Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {roles.map((role) => {
            const Icon = role.icon;
            const isIndigo = role.color === 'indigo';
            const isBlue = role.color === 'blue';
            const isEmerald = role.color === 'emerald';

            return (
              <div
                key={role.id}
                onClick={() => onSelectRole(role.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectRole(role.id);
                  }
                }}
                className={`group relative bg-white border rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between text-left focus-visible:outline-none focus-visible:ring-2 ${
                  isIndigo
                    ? 'border-slate-200 hover:border-indigo-400 focus-visible:ring-indigo-500'
                    : isBlue
                    ? 'border-slate-200 hover:border-blue-400 focus-visible:ring-blue-500'
                    : 'border-slate-200 hover:border-emerald-400 focus-visible:ring-emerald-500'
                }`}
              >
                <div>
                  {/* Icon & Role Name */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                        isIndigo
                          ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                          : isBlue
                          ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                          : 'bg-emerald-600 text-white shadow-sm shadow-emerald-200'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {role.note}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {role.title}
                  </h2>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">{role.badge}</p>

                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                  <span
                    className={
                      isIndigo
                        ? 'text-indigo-600'
                        : isBlue
                        ? 'text-blue-600'
                        : 'text-emerald-600'
                    }
                  >
                    {role.actionText}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                      isIndigo
                        ? 'text-indigo-600'
                        : isBlue
                        ? 'text-blue-600'
                        : 'text-emerald-600'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Switch mode footer */}
        <div className="mt-8 text-center text-xs text-slate-500">
          {isSignup ? (
            <p>
              Already have an account?{' '}
              <button
                onClick={onSwitchMode}
                className="font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-2 cursor-pointer"
              >
                Log in instead
              </button>
            </p>
          ) : (
            <p>
              Don't have an account or college registered yet?{' '}
              <button
                onClick={onSwitchMode}
                className="font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-2 cursor-pointer"
              >
                Sign up here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
