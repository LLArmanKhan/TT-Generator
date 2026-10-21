import React, { useState } from 'react';
import { GraduationCap, Mail, Lock, KeyRound, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { StorageService } from '../services/storage';
import { CollegeEnvironment, UserProfile } from '../types';

interface StudentLoginProps {
  onSuccess: (user: UserProfile, college: CollegeEnvironment) => void;
  onBack: () => void;
  onGoToSignup: () => void;
  onShowToast: (type: 'success' | 'error' | 'info', title: string, message?: string) => void;
}

export const StudentLogin: React.FC<StudentLoginProps> = ({
  onSuccess,
  onBack,
  onGoToSignup,
  onShowToast,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [collegeCode, setCollegeCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUseDemo = (username: string, code: string) => {
    setIdentifier(username);
    setPassword('student123');
    setCollegeCode(code);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password || !collegeCode.trim()) {
      setError('Please provide your Username/Email, Password, and College Code.');
      return;
    }

    setLoading(true);
    setError(null);

    // Verify if college code exists
    const college = StorageService.findCollegeByCode(collegeCode);
    if (!college) {
      setError('Invalid College Code. Please check the College Code provided by your college administrator.');
      onShowToast('error', 'Invalid College Code', 'No college environment matches this code.');
      setLoading(false);
      return;
    }

    const result = StorageService.authenticate('student', identifier, collegeCode);
    if (!result) {
      setError(`Student "${identifier}" not found in ${college.collegeShortName}. Verify your username/email or sign up.`);
      onShowToast('error', 'Login Failed', 'Student credentials not found in this college environment.');
      setLoading(false);
      return;
    }

    onShowToast('success', 'Welcome Back!', `Logged in as Student: ${result.user.name}`);
    onSuccess(result.user, result.college);
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Role Selection</span>
          </button>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="text-center pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 shadow-sm shadow-emerald-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Student Login</h1>
            <p className="text-xs text-slate-500 mt-1">
              Sign in with your College Code to view your semester lectures and lab timetables
            </p>
          </div>

          {/* Quick Demo Autofill */}
          <div className="mt-4 p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl text-xs flex items-center justify-between">
            <span className="text-emerald-900 font-medium">Demo Student:</span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => handleUseDemo('rohan_22', 'DBIT-4827')}
                className="px-2 py-1 bg-white border border-emerald-200 rounded text-emerald-700 font-mono text-[11px] hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                rohan_22 (DBIT)
              </button>
              <button
                type="button"
                onClick={() => handleUseDemo('aarav_j', 'SPIT-7314')}
                className="px-2 py-1 bg-white border border-emerald-200 rounded text-emerald-700 font-mono text-[11px] hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                aarav_j (SPIT)
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                College Code <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={collegeCode}
                onChange={(e) => setCollegeCode(e.target.value.toUpperCase())}
                placeholder="e.g. DBIT-4827"
                required
                className="w-full px-3.5 py-2.5 text-sm font-mono uppercase font-semibold bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Username or Student Email
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. rohan_22 or rohan@student.dbit.ac.in"
                required
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm shadow-emerald-200 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Validating...' : 'Sign In as Student'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Don't have a student account yet?{' '}
            <button
              onClick={onGoToSignup}
              className="font-semibold text-emerald-600 hover:text-emerald-700 underline underline-offset-2 cursor-pointer"
            >
              Register here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
