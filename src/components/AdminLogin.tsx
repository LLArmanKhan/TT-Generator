import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, ArrowLeft, Eye, EyeOff, Sparkles } from 'lucide-react';
import { StorageService } from '../services/storage';
import { CollegeEnvironment, UserProfile } from '../types';

interface AdminLoginProps {
  onSuccess: (user: UserProfile, college: CollegeEnvironment) => void;
  onBack: () => void;
  onGoToSignup: () => void;
  onShowToast: (type: 'success' | 'error' | 'info', title: string, message?: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onSuccess,
  onBack,
  onGoToSignup,
  onShowToast,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUseDemo = (demoUser: string) => {
    setIdentifier(demoUser);
    setPassword('admin123');
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      setError('Please provide your Username/Email and password.');
      return;
    }

    setLoading(true);
    setError(null);

    const result = StorageService.authenticate('admin', identifier);
    if (!result) {
      setError('Invalid admin credentials. Please verify your username or email.');
      onShowToast('error', 'Login Failed', 'Admin credentials not found.');
      setLoading(false);
      return;
    }

    onShowToast('success', 'Welcome Back!', `Logged in as Admin: ${result.user.name}`);
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
            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mx-auto mb-3 shadow-sm shadow-indigo-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
            <p className="text-xs text-slate-500 mt-1">
              Sign in to manage your college department timetable environment
            </p>
          </div>

          {/* Demo account quick selector */}
          <div className="mt-4 p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl text-xs flex items-center justify-between">
            <span className="text-indigo-900 font-medium">Demo Admin:</span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => handleUseDemo('dbit_admin')}
                className="px-2 py-1 bg-white border border-indigo-200 rounded text-indigo-700 font-mono text-[11px] hover:bg-indigo-100 transition-colors cursor-pointer"
              >
                dbit_admin
              </button>
              <button
                type="button"
                onClick={() => handleUseDemo('spit_admin')}
                className="px-2 py-1 bg-white border border-indigo-200 rounded text-indigo-700 font-mono text-[11px] hover:bg-indigo-100 transition-colors cursor-pointer"
              >
                spit_admin
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
                Username or Official Email
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. dbit_admin or admin@dbit.ac.in"
                required
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-200 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In as Admin'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Need to register a new college?{' '}
            <button
              onClick={onGoToSignup}
              className="font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-2 cursor-pointer"
            >
              Register College here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
