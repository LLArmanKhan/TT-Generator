import { CollegeEnvironment, UserProfile, UserRole } from '../types';

const STORAGE_KEY_COLLEGES = 'attg_colleges_v1';
const STORAGE_KEY_AUTH = 'attg_current_auth_v1';

// Seed initial realistic colleges for prototype demonstration
const INITIAL_COLLEGES: CollegeEnvironment[] = [
  {
    collegeCode: 'DBIT-4827',
    collegeName: 'Don Bosco Institute of Technology',
    collegeShortName: 'DBIT',
    department: 'Computer Engineering',
    admin: {
      id: 'admin-dbit-1',
      name: 'Dr. Rajesh Sharma',
      email: 'admin.comp@dbit.ac.in',
      username: 'dbit_admin',
      role: 'admin',
      collegeCode: 'DBIT-4827',
      collegeName: 'Don Bosco Institute of Technology',
      department: 'Computer Engineering',
      createdAt: '2026-02-15T09:00:00Z',
    },
    faculty: [
      {
        id: 'faculty-dbit-1',
        name: 'Prof. Ananya Roy',
        email: 'ananya.roy@dbit.ac.in',
        username: 'prof_ananya',
        role: 'faculty',
        collegeCode: 'DBIT-4827',
        collegeName: 'Don Bosco Institute of Technology',
        department: 'Computer Engineering',
        createdAt: '2026-02-16T10:30:00Z',
      },
      {
        id: 'faculty-dbit-2',
        name: 'Prof. Vikram Deshmukh',
        email: 'vikram.d@dbit.ac.in',
        username: 'prof_vikram',
        role: 'faculty',
        collegeCode: 'DBIT-4827',
        collegeName: 'Don Bosco Institute of Technology',
        department: 'Computer Engineering',
        createdAt: '2026-02-17T11:15:00Z',
      },
    ],
    students: [
      {
        id: 'student-dbit-1',
        name: 'Rohan Mehta',
        email: 'rohan.m@student.dbit.ac.in',
        username: 'rohan_22',
        role: 'student',
        collegeCode: 'DBIT-4827',
        collegeName: 'Don Bosco Institute of Technology',
        department: 'Computer Engineering',
        createdAt: '2026-02-18T14:20:00Z',
      },
      {
        id: 'student-dbit-2',
        name: 'Sneha Patil',
        email: 'sneha.p@student.dbit.ac.in',
        username: 'sneha_patil',
        role: 'student',
        collegeCode: 'DBIT-4827',
        collegeName: 'Don Bosco Institute of Technology',
        department: 'Computer Engineering',
        createdAt: '2026-02-19T16:00:00Z',
      },
    ],
    createdAt: '2026-02-15T09:00:00Z',
  },
  {
    collegeCode: 'SPIT-7314',
    collegeName: 'Sardar Patel Institute of Technology',
    collegeShortName: 'SPIT',
    department: 'Information Technology',
    admin: {
      id: 'admin-spit-1',
      name: 'Dr. Jayesh Mehta',
      email: 'hod.it@spit.ac.in',
      username: 'spit_admin',
      role: 'admin',
      collegeCode: 'SPIT-7314',
      collegeName: 'Sardar Patel Institute of Technology',
      department: 'Information Technology',
      createdAt: '2026-03-01T08:00:00Z',
    },
    faculty: [
      {
        id: 'faculty-spit-1',
        name: 'Prof. Priya Kulkarni',
        email: 'priya.k@spit.ac.in',
        username: 'prof_priya',
        role: 'faculty',
        collegeCode: 'SPIT-7314',
        collegeName: 'Sardar Patel Institute of Technology',
        department: 'Information Technology',
        createdAt: '2026-03-02T10:00:00Z',
      },
    ],
    students: [
      {
        id: 'student-spit-1',
        name: 'Aarav Joshi',
        email: 'aarav.j@student.spit.ac.in',
        username: 'aarav_j',
        role: 'student',
        collegeCode: 'SPIT-7314',
        collegeName: 'Sardar Patel Institute of Technology',
        department: 'Information Technology',
        createdAt: '2026-03-03T12:00:00Z',
      },
    ],
    createdAt: '2026-03-01T08:00:00Z',
  },
];

export class StorageService {
  static getColleges(): CollegeEnvironment[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_COLLEGES);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY_COLLEGES, JSON.stringify(INITIAL_COLLEGES));
        return INITIAL_COLLEGES;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_COLLEGES;
    }
  }

  static saveColleges(colleges: CollegeEnvironment[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_COLLEGES, JSON.stringify(colleges));
    } catch (err) {
      console.error('Failed to save colleges to localStorage', err);
    }
  }

  static findCollegeByCode(code: string): CollegeEnvironment | undefined {
    if (!code) return undefined;
    const cleanCode = code.trim().toUpperCase();
    const colleges = this.getColleges();
    return colleges.find((c) => c.collegeCode.toUpperCase() === cleanCode);
  }

  static generateCollegeCode(shortName: string): string {
    const cleanShort = (shortName.trim().toUpperCase().replace(/[^A-Z0-9]/g, '') || 'COLLEGE').slice(0, 8);
    const existingColleges = this.getColleges();

    let code = '';
    let exists = true;
    let attempts = 0;

    while (exists && attempts < 100) {
      attempts++;
      const random4Digit = Math.floor(1000 + Math.random() * 9000);
      code = `${cleanShort}-${random4Digit}`;
      exists = existingColleges.some((c) => c.collegeCode.toUpperCase() === code);
    }

    return code;
  }

  static registerAdminCollege(params: {
    collegeName: string;
    collegeShortName: string;
    department: string;
    adminName: string;
    email: string;
    username: string;
  }): CollegeEnvironment {
    const collegeCode = this.generateCollegeCode(params.collegeShortName);
    const now = new Date().toISOString();

    const adminUser: UserProfile = {
      id: `admin-${Date.now()}`,
      name: params.adminName.trim(),
      email: params.email.trim().toLowerCase(),
      username: params.username.trim(),
      role: 'admin',
      collegeCode,
      collegeName: params.collegeName.trim(),
      department: params.department.trim(),
      createdAt: now,
    };

    const newCollege: CollegeEnvironment = {
      collegeCode,
      collegeName: params.collegeName.trim(),
      collegeShortName: params.collegeShortName.trim().toUpperCase(),
      department: params.department.trim(),
      admin: adminUser,
      faculty: [],
      students: [],
      createdAt: now,
    };

    const colleges = this.getColleges();
    colleges.unshift(newCollege);
    this.saveColleges(colleges);
    this.setCurrentSession(adminUser);

    return newCollege;
  }

  static registerFaculty(params: {
    name: string;
    email: string;
    username: string;
    collegeCode: string;
  }): { user: UserProfile; college: CollegeEnvironment } {
    const colleges = this.getColleges();
    const cleanCode = params.collegeCode.trim().toUpperCase();
    const collegeIndex = colleges.findIndex((c) => c.collegeCode.toUpperCase() === cleanCode);

    if (collegeIndex === -1) {
      throw new Error('Invalid College Code. Please check the College Code provided by your college administrator.');
    }

    const college = colleges[collegeIndex];
    const newUser: UserProfile = {
      id: `faculty-${Date.now()}`,
      name: params.name.trim(),
      email: params.email.trim().toLowerCase(),
      username: params.username.trim(),
      role: 'faculty',
      collegeCode: college.collegeCode,
      collegeName: college.collegeName,
      department: college.department,
      createdAt: new Date().toISOString(),
    };

    college.faculty.push(newUser);
    colleges[collegeIndex] = college;
    this.saveColleges(colleges);
    this.setCurrentSession(newUser);

    return { user: newUser, college };
  }

  static registerStudent(params: {
    name: string;
    email: string;
    username: string;
    collegeCode: string;
  }): { user: UserProfile; college: CollegeEnvironment } {
    const colleges = this.getColleges();
    const cleanCode = params.collegeCode.trim().toUpperCase();
    const collegeIndex = colleges.findIndex((c) => c.collegeCode.toUpperCase() === cleanCode);

    if (collegeIndex === -1) {
      throw new Error('Invalid College Code. Please check the College Code provided by your college administrator.');
    }

    const college = colleges[collegeIndex];
    const newUser: UserProfile = {
      id: `student-${Date.now()}`,
      name: params.name.trim(),
      email: params.email.trim().toLowerCase(),
      username: params.username.trim(),
      role: 'student',
      collegeCode: college.collegeCode,
      collegeName: college.collegeName,
      department: college.department,
      createdAt: new Date().toISOString(),
    };

    college.students.push(newUser);
    colleges[collegeIndex] = college;
    this.saveColleges(colleges);
    this.setCurrentSession(newUser);

    return { user: newUser, college };
  }

  static authenticate(
    role: UserRole,
    identifier: string,
    collegeCode?: string
  ): { user: UserProfile; college: CollegeEnvironment } | null {
    const cleanId = identifier.trim().toLowerCase();
    const colleges = this.getColleges();

    if (role === 'admin') {
      // Find admin across colleges
      for (const col of colleges) {
        if (
          col.admin.username.toLowerCase() === cleanId ||
          col.admin.email.toLowerCase() === cleanId
        ) {
          this.setCurrentSession(col.admin);
          return { user: col.admin, college: col };
        }
      }
      return null;
    }

    // For faculty and student, collegeCode is required
    if (!collegeCode) return null;
    const cleanCode = collegeCode.trim().toUpperCase();
    const col = colleges.find((c) => c.collegeCode.toUpperCase() === cleanCode);
    if (!col) return null;

    if (role === 'faculty') {
      const member = col.faculty.find(
        (f) => f.username.toLowerCase() === cleanId || f.email.toLowerCase() === cleanId
      );
      if (member) {
        this.setCurrentSession(member);
        return { user: member, college: col };
      }
      return null;
    }

    if (role === 'student') {
      const member = col.students.find(
        (s) => s.username.toLowerCase() === cleanId || s.email.toLowerCase() === cleanId
      );
      if (member) {
        this.setCurrentSession(member);
        return { user: member, college: col };
      }
      return null;
    }

    return null;
  }

  static setCurrentSession(user: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(user));
    } catch (err) {
      console.error(err);
    }
  }

  static getCurrentSession(): UserProfile | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_AUTH);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  static clearSession(): void {
    try {
      localStorage.removeItem(STORAGE_KEY_AUTH);
    } catch (err) {
      console.error(err);
    }
  }

  static resetToDemoData(): void {
    try {
      localStorage.setItem(STORAGE_KEY_COLLEGES, JSON.stringify(INITIAL_COLLEGES));
      this.clearSession();
    } catch (err) {
      console.error(err);
    }
  }
}
