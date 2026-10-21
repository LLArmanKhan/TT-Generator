export type UserRole = 'admin' | 'faculty' | 'student';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  role: UserRole;
  collegeCode: string;
  collegeName: string;
  department: string;
  createdAt: string;
}

export interface CollegeEnvironment {
  collegeCode: string;
  collegeName: string;
  collegeShortName: string;
  department: string;
  admin: UserProfile;
  faculty: UserProfile[];
  students: UserProfile[];
  createdAt: string;
}

export type ViewState =
  | { type: 'landing' }
  | { type: 'role-select-signup' }
  | { type: 'role-select-login' }
  | { type: 'signup-admin' }
  | { type: 'signup-faculty'; initialCollegeCode?: string }
  | { type: 'signup-student'; initialCollegeCode?: string }
  | { type: 'admin-success'; college: CollegeEnvironment }
  | { type: 'login-admin' }
  | { type: 'login-faculty' }
  | { type: 'login-student' }
  | { type: 'dashboard'; user: UserProfile; college: CollegeEnvironment };

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}
