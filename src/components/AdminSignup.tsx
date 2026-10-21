import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  User,
  Mail,
  Lock,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { StorageService } from '../services/storage';
import { CollegeEnvironment } from '../types';

interface AdminSignupProps {
  onSuccess: (college: CollegeEnvironment) => void;
  onBack: () => void;
  onGoToLogin: () => void;
  onShowToast: (type: 'success' | 'error' | 'info', title: string, message?: string) => void;
}

export const AdminSignup: React.FC<AdminSignupProps> = ({
  onSuccess,
  onBack,
  onGoToLogin,
  onShowToast,
}) => {
  // College Information
  const [collegeName, setCollegeName] = useState('');
  const [collegeShortName, setCollegeShortName] = useState('');
  const [department, setDepartment] = useState('');

  // Admin Account Information
  const [adminName, setAdminName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Autofill with prompt example
  const handleAutofillExample = () => {
    setCollegeName('Don Bosco Institute of Technology');
    setCollegeShortName('DBIT');
    setDepartment('Computer Engineering');
    setAdminName('Dr. Rajesh Sharma');
    setEmail('hod.comp@dbit.ac.in');
    setUsername('admin_dbit');
    setPassword('admin123');
    setConfirmPassword('admin123');
    setErrors({});
    onShowToast('info', 'Autofilled Example', 'Loaded Don Bosco Institute of Technology (DBIT)');
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // College fields
    if (!collegeName.trim()) newErrors.collegeName = 'College Name is required';
    if (!collegeShortName.trim()) {
      newErrors.collegeShortName = 'College Short Name is required (e.g. DBIT, SPIT)';
    } else if (collegeShortName.trim().length < 2 || collegeShortName.trim().length > 10) {
      newErrors.collegeShortName = 'Short name should be 2 to 10 characters';
    }

    if (!department.trim()) newErrors.department = 'Department name is required';

    // Account fields
    if (!adminName.trim()) newErrors.adminName = 'Admin Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      onShowToast('error', 'Form Incomplete', 'Please correct the highlighted fields.');
      return;
    }

    setLoading(true);

    try {
      const newCollege = StorageService.registerAdminCollege({
        collegeName,
        collegeShortName,
        department,
        adminName,
        email,
        username,
      });

      onShowToast(
        'success',
        'College Registered Successfully',
        `Unique College Code generated: ${newCollege.collegeCode}`
      );
      onSuccess(newCollege);
    } catch (err: any) {
      onShowToast('error', 'Registration Failed', err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const previewCode = collegeShortName.trim()
    ? `${collegeShortName.trim().toUpperCase()}-####`
    : 'CODE-####';

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Navigation & Back */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Role Selection</span>
          </button>

          <button
            type="button"
            onClick={handleAutofillExample}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Autofill DBIT Example</span>
          </button>
        </div>

        {/* Card Header */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-indigo-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h1 className="text-2xl font-bold text-slate-900">Admin Registration</h1>
                <span className="font-mono text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-md">
                  Preview: {previewCode}
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                Register your institution department and set up your master administrator account.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            {/* SECTION 1: College Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  1. College Information
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    College Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="e.g. Don Bosco Institute of Technology"
                    className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      errors.collegeName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.collegeName && (
                    <p className="mt-1 text-xs text-rose-600">{errors.collegeName}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      College Short Name <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400">Used for Code</span>
                  </div>
                  <input
                    type="text"
                    value={collegeShortName}
                    onChange={(e) => setCollegeShortName(e.target.value.toUpperCase())}
                    placeholder="e.g. DBIT, SPIT, IITB"
                    maxLength={10}
                    className={`w-full px-3.5 py-2.5 text-sm uppercase font-mono tracking-wider bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      errors.collegeShortName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.collegeShortName ? (
                    <p className="mt-1 text-xs text-rose-600">{errors.collegeShortName}</p>
                  ) : (
                    <p className="mt-1 text-[11px] text-slate-500">
                      Code prefix: <span className="font-mono font-medium">{collegeShortName || 'SHORT'}-####</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Department Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Computer Engineering"
                    className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      errors.department ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.department && (
                    <p className="mt-1 text-xs text-rose-600">{errors.department}</p>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 2: Admin Account Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <User className="w-4 h-4 text-indigo-600" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  2. Admin Account Information
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Admin Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      errors.adminName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.adminName && (
                    <p className="mt-1 text-xs text-rose-600">{errors.adminName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. admin@dbit.ac.in"
                    className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-600">{errors.email}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Admin Username <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. dbit_admin"
                    className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      errors.username ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.username && (
                    <p className="mt-1 text-xs text-rose-600">{errors.username}</p>
                  )}
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
                    placeholder="Minimum 6 characters"
                    className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      errors.password ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-rose-600">{errors.password}</p>
                  )}
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
                    className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      errors.confirmPassword ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-rose-600">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Note banner */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                After registration, a unique <strong>College Code</strong> will be assigned to your department.
                You can distribute this code to faculty and students to grant them access to this college environment.
              </span>
            </div>

            {/* Submit button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={onGoToLogin}
                className="text-xs text-slate-600 hover:text-slate-900 order-2 sm:order-1 cursor-pointer"
              >
                Already have an Admin account? <span className="font-semibold text-indigo-600 underline">Log in</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-200 transition-all order-1 sm:order-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Registering College...' : 'Register College & Generate Code'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
