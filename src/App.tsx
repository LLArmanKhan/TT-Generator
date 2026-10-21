import React, { useState, useEffect } from 'react';
import { ViewState, UserProfile, CollegeEnvironment, ToastMessage, UserRole } from './types';
import { StorageService } from './services/storage';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { RoleSelection } from './components/RoleSelection';
import { AdminSignup } from './components/AdminSignup';
import { FacultySignup } from './components/FacultySignup';
import { StudentSignup } from './components/StudentSignup';
import { AdminRegistrationSuccess } from './components/AdminRegistrationSuccess';
import { AdminLogin } from './components/AdminLogin';
import { FacultyLogin } from './components/FacultyLogin';
import { StudentLogin } from './components/StudentLogin';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { FacultyDashboard } from './components/dashboards/FacultyDashboard';
import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { DemoAccountsModal } from './components/DemoAccountsModal';
import { ToastContainer } from './components/Toast';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>({ type: 'landing' });
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentCollege, setCurrentCollege] = useState<CollegeEnvironment | null>(null);
  const [colleges, setColleges] = useState<CollegeEnvironment[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [copiedCodeNavbar, setCopiedCodeNavbar] = useState(false);

  // Initialize and load session if exists
  useEffect(() => {
    const loadedColleges = StorageService.getColleges();
    setColleges(loadedColleges);

    const sessionUser = StorageService.getCurrentSession();
    if (sessionUser) {
      const col = StorageService.findCollegeByCode(sessionUser.collegeCode);
      if (col) {
        setCurrentUser(sessionUser);
        setCurrentCollege(col);
        setCurrentView({ type: 'dashboard', user: sessionUser, college: col });
      }
    }
  }, []);

  const refreshColleges = () => {
    const fresh = StorageService.getColleges();
    setColleges(fresh);
    if (currentUser) {
      const col = StorageService.findCollegeByCode(currentUser.collegeCode);
      if (col) setCurrentCollege(col);
    }
  };

  const showToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleLogout = () => {
    StorageService.clearSession();
    setCurrentUser(null);
    setCurrentCollege(null);
    setCurrentView({ type: 'landing' });
    showToast('info', 'Logged Out', 'You have securely logged out of your session.');
  };

  const handleCopyCollegeCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeNavbar(true);
    showToast('success', 'College Code Copied', code);
    setTimeout(() => setCopiedCodeNavbar(false), 2000);
  };

  const handleRoleSelectSignup = (role: UserRole) => {
    if (role === 'admin') setCurrentView({ type: 'signup-admin' });
    else if (role === 'faculty') setCurrentView({ type: 'signup-faculty' });
    else if (role === 'student') setCurrentView({ type: 'signup-student' });
  };

  const handleRoleSelectLogin = (role: UserRole) => {
    if (role === 'admin') setCurrentView({ type: 'login-admin' });
    else if (role === 'faculty') setCurrentView({ type: 'login-faculty' });
    else if (role === 'student') setCurrentView({ type: 'login-student' });
  };

  const handleDirectDemoLogin = (user: UserProfile, college: CollegeEnvironment) => {
    StorageService.setCurrentSession(user);
    setCurrentUser(user);
    setCurrentCollege(college);
    setCurrentView({ type: 'dashboard', user, college });
    showToast('success', `Logged In as ${user.name}`, `${college.collegeName} (${user.role.toUpperCase()})`);
  };

  const handleResetData = () => {
    StorageService.resetToDemoData();
    refreshColleges();
    setCurrentUser(null);
    setCurrentCollege(null);
    setCurrentView({ type: 'landing' });
    showToast('info', 'Demo Data Reset', 'Colleges and credentials restored to default.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        currentUser={currentUser}
        currentCollege={currentCollege}
        onLogout={handleLogout}
        onOpenDemoModal={() => setDemoModalOpen(true)}
        onCopyCollegeCode={handleCopyCollegeCode}
        copiedCode={copiedCodeNavbar}
      />

      {/* Main View Router */}
      <div className="flex-1">
        {currentView.type === 'landing' && (
          <LandingPage
            onNavigate={setCurrentView}
            onOpenDemoModal={() => setDemoModalOpen(true)}
          />
        )}

        {currentView.type === 'role-select-signup' && (
          <RoleSelection
            mode="signup"
            onSelectRole={handleRoleSelectSignup}
            onBack={() => setCurrentView({ type: 'landing' })}
            onSwitchMode={() => setCurrentView({ type: 'role-select-login' })}
          />
        )}

        {currentView.type === 'role-select-login' && (
          <RoleSelection
            mode="login"
            onSelectRole={handleRoleSelectLogin}
            onBack={() => setCurrentView({ type: 'landing' })}
            onSwitchMode={() => setCurrentView({ type: 'role-select-signup' })}
          />
        )}

        {currentView.type === 'signup-admin' && (
          <AdminSignup
            onSuccess={(college) => {
              refreshColleges();
              setCurrentUser(college.admin);
              setCurrentCollege(college);
              setCurrentView({ type: 'admin-success', college });
            }}
            onBack={() => setCurrentView({ type: 'role-select-signup' })}
            onGoToLogin={() => setCurrentView({ type: 'login-admin' })}
            onShowToast={showToast}
          />
        )}

        {currentView.type === 'admin-success' && (
          <AdminRegistrationSuccess
            college={currentView.college}
            onContinue={() => {
              setCurrentView({
                type: 'dashboard',
                user: currentView.college.admin,
                college: currentView.college,
              });
            }}
            onShowToast={showToast}
          />
        )}

        {currentView.type === 'signup-faculty' && (
          <FacultySignup
            initialCollegeCode={currentView.initialCollegeCode}
            onSuccess={(user, college) => {
              refreshColleges();
              setCurrentUser(user);
              setCurrentCollege(college);
              setCurrentView({ type: 'dashboard', user, college });
            }}
            onBack={() => setCurrentView({ type: 'role-select-signup' })}
            onGoToLogin={() => setCurrentView({ type: 'login-faculty' })}
            onShowToast={showToast}
          />
        )}

        {currentView.type === 'signup-student' && (
          <StudentSignup
            initialCollegeCode={currentView.initialCollegeCode}
            onSuccess={(user, college) => {
              refreshColleges();
              setCurrentUser(user);
              setCurrentCollege(college);
              setCurrentView({ type: 'dashboard', user, college });
            }}
            onBack={() => setCurrentView({ type: 'role-select-signup' })}
            onGoToLogin={() => setCurrentView({ type: 'login-student' })}
            onShowToast={showToast}
          />
        )}

        {currentView.type === 'login-admin' && (
          <AdminLogin
            onSuccess={(user, college) => {
              refreshColleges();
              setCurrentUser(user);
              setCurrentCollege(college);
              setCurrentView({ type: 'dashboard', user, college });
            }}
            onBack={() => setCurrentView({ type: 'role-select-login' })}
            onGoToSignup={() => setCurrentView({ type: 'signup-admin' })}
            onShowToast={showToast}
          />
        )}

        {currentView.type === 'login-faculty' && (
          <FacultyLogin
            onSuccess={(user, college) => {
              refreshColleges();
              setCurrentUser(user);
              setCurrentCollege(college);
              setCurrentView({ type: 'dashboard', user, college });
            }}
            onBack={() => setCurrentView({ type: 'role-select-login' })}
            onGoToSignup={() => setCurrentView({ type: 'signup-faculty' })}
            onShowToast={showToast}
          />
        )}

        {currentView.type === 'login-student' && (
          <StudentLogin
            onSuccess={(user, college) => {
              refreshColleges();
              setCurrentUser(user);
              setCurrentCollege(college);
              setCurrentView({ type: 'dashboard', user, college });
            }}
            onBack={() => setCurrentView({ type: 'role-select-login' })}
            onGoToSignup={() => setCurrentView({ type: 'signup-student' })}
            onShowToast={showToast}
          />
        )}

        {currentView.type === 'dashboard' && currentCollege && currentUser && (
          <>
            {currentUser.role === 'admin' && (
              <AdminDashboard
                user={currentUser}
                college={currentCollege}
                onLogout={handleLogout}
                onShowToast={showToast}
              />
            )}
            {currentUser.role === 'faculty' && (
              <FacultyDashboard
                user={currentUser}
                college={currentCollege}
                onLogout={handleLogout}
                onShowToast={showToast}
              />
            )}
            {currentUser.role === 'student' && (
              <StudentDashboard
                user={currentUser}
                college={currentCollege}
                onLogout={handleLogout}
                onShowToast={showToast}
              />
            )}
          </>
        )}
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Demo Accounts and College Code Modal */}
      <DemoAccountsModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        colleges={colleges}
        onDirectLogin={handleDirectDemoLogin}
        onSelectCollegeCodeForSignup={(code) => {
          setCurrentView({ type: 'signup-faculty', initialCollegeCode: code });
        }}
        onResetData={handleResetData}
        onShowToast={showToast}
      />
    </div>
  );
}
