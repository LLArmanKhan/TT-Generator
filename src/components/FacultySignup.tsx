import React, { useState, useEffect } from 'react';
import {
  Users,
  CheckCircle2,
  AlertCircle,
  Building2,
  ArrowLeft,
  KeyRound,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { StorageService } from '../services/storage';
import { CollegeEnvironment, UserProfile } from '../types';

interface FacultySignupProps {
  initialCollegeCode?: string;
  onSuccess: (user: UserProfile, college: CollegeEnvironment) => void;
  onBack: () => void;
  onGoToLogin: () => void;
  onShowToast: (type: 'success' | 'error' | 'info', title: string, message?: string) => void;
}

export const FacultySignup: React.FC<FacultySignupProps> = ({
  initialCollegeCode = '',
  onSuccess,
  onBack,
  onGoToLogin,
  onShowToast,
}) => {
  const [facultyName, setFacultyName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [collegeCode, setCollegeCode] = useState(initialCollegeCode);

  const [verifiedCollege, setVerifiedCollege] = useState<CollegeEnvironment | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Validate college code whenever it changes or on blur
  const handleVerifyCode = (codeToTest?: string) => {
    const code = (codeToTest !== undefined ? codeToTest : collegeCode).trim().toUpperCase();
    if (!code) {
      setVerifiedCollege(null);
      setVerificationError(null);
      return false;
    }

    const found = StorageService.findCollegeByCode(code);
    if (found) {
      setVerifiedCollege(found);
      setCollegeName(found.collegeName);
      setVerificationError(null);
      onShowToast('success', 'College Verified Successfully', `${found.collegeName} (${found.department})`);
      return true;
    } else {
      setVerifiedCollege(null);
      setVerificationError('Invalid College Code. Please check the College Code provided by your college administrator.');
      return false;
    }
  };

  useEffect(() => {
    if (initialCollegeCode) {
      handleVerifyCode(initialCollegeCode);
    }
  }, [initialCollegeCode]);

  const handleUseDemoCode = (code: string) => {
    setCollegeCode(code);
    handleVerifyCode(code);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!facultyName.trim()) newErrors.facultyName = 'Faculty Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!collegeCode.trim()) {
      newErrors.collegeCode = 'College Code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      onShowToast('error', 'Form Incomplete', 'Please check the required fields.');
      return;
    }

    // Must verify college code
    const isCodeValid = handleVerifyCode();
    if (!isCodeValid) {
      onShowToast('error', 'Invalid College Code', 'Please enter a valid College Code from your administrator.');
      return;
    }

    setSubmitting(true);
    try {
      const result = StorageService.registerFaculty({
        name: facultyName,
        email,
        username,
        collegeCode,
      });

      onShowToast(
        'success',
        'Faculty Account Created',
        `Welcome ${result.user.name} to ${result.college.collegeName}`
      );
      onSuccess(result.user, result.college);
    } catch (err: any) {
      onShowToast('error', 'Registration Failed', err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Navigation & Back */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Role Selection</span>
          </button>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500">Quick code:</span>
            <button
              type="button"
              onClick={() => handleUseDemoCode('DBIT-4827')}
              className="px-2 py-0.5 font-mono text-[11px] bg-white border border-slate-200 text-blue-700 hover:bg-blue-50 rounded transition-colors"
            >
              DBIT-4827
            </button>
            <button
              type="button"
              onClick={() => handleUseDemoCode('SPIT-7314')}
              className="px-2 py-0.5 font-mono text-[11px] bg-white border border-slate-200 text-blue-700 hover:bg-blue-50 rounded transition-colors"
            >
              SPIT-7314
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-200">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Faculty Registration</h1>
              <p className="text-sm text-slate-600 mt-1">
                Enter your details and the College Code provided by your college administrator to join
                your department.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Step 1: College Code Verification (Prominent) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-blue-600" />
                  <span>College Code Verification <span className="text-rose-500">*</span></span>
                </label>
                <span className="text-[11px] text-slate-500">e.g. DBIT-4827</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={collegeCode}
                  onChange={(e) => {
                    const val = e.target.value.toUpperCase();
                    setCollegeCode(val);
                    if (verificationError) setVerificationError(null);
                  }}
                  onBlur={() => handleVerifyCode()}
                  placeholder="Enter Code (e.g. DBIT-4827)"
                  className="flex-1 px-3.5 py-2.5 text-sm font-mono uppercase font-semibold tracking-wider bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleVerifyCode()}
                  className="px-4 py-2.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors cursor-pointer"
                >
                  Verify Code
                </button>
              </div>

              {/* Verified Success Box */}
              {verifiedCollege && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-900 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">College Verified Successfully</p>
                    <p className="mt-0.5 text-emerald-800">
                      <strong>{verifiedCollege.collegeName}</strong> — Department of {verifiedCollege.department}
                    </p>
                  </div>
                </div>
              )}

              {/* Verification Error Box */}
              {verificationError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-900 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Invalid College Code</p>
                    <p className="mt-0.5 text-rose-700">{verificationError}</p>
                  </div>
                </div>
              )}
            </div>

            {/* College Name Display / Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                College Name <span className="text-slate-400 font-normal">(Auto-populated upon code verification)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={collegeName || (verifiedCollege ? verifiedCollege.collegeName : '')}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="Will be verified by College Code"
                  readOnly={!!verifiedCollege}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                    verifiedCollege
                      ? 'bg-slate-100 text-slate-800 border-slate-200 cursor-not-allowed'
                      : 'bg-white border-slate-300'
                  }`}
                />
                <Building2 className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              </div>
            </div>

            {/* Personal Details */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Faculty Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={facultyName}
                  onChange={(e) => setFacultyName(e.target.value)}
                  placeholder="e.g. Prof. Arvind Joshi"
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.facultyName ? 'border-rose-400' : 'border-slate-300'
                  }`}
                />
                {errors.facultyName && (
                  <p className="mt-1 text-xs text-rose-600">{errors.facultyName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. arvind.joshi@dbit.ac.in"
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-rose-400' : 'border-slate-300'
                  }`}
                />
                {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Username <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. prof_arvind"
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.username ? 'border-rose-400' : 'border-slate-300'
                  }`}
                />
                {errors.username && <p className="mt-1 text-xs text-rose-600">{errors.username}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Password <span className="text-rose-500">*</span>
                  </label>
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
                  placeholder="Min 6 characters"
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? 'border-rose-400' : 'border-slate-300'
                  }`}
                />
                {errors.password && <p className="mt-1 text-xs text-rose-600">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.confirmPassword ? 'border-rose-400' : 'border-slate-300'
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-rose-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={onGoToLogin}
                className="text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Already have a Faculty account?{' '}
                <span className="font-semibold text-blue-600 underline">Log in</span>
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-200 transition-all cursor-pointer disabled:opacity-50"
              >
                {submitting ? 'Registering...' : 'Register as Faculty'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
