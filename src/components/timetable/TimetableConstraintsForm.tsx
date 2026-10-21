import React, { useState } from 'react';
import {
  BookOpen,
  Users,
  Building2,
  CalendarDays,
  Clock,
  Layers,
  Sparkles,
  CheckCircle2,
  Sliders,
  Plus,
  Trash2,
  Edit2,
  X,
  FileText,
  RotateCcw,
} from 'lucide-react';
import { CollegeEnvironment } from '../../types';

interface TimetableConstraintsFormProps {
  college: CollegeEnvironment;
  onGenerate: (constraintsSummary: ConstraintsSummary) => void;
  onCancel: () => void;
}

export interface ConstraintsSummary {
  department: string;
  subjectsCount: number;
  facultyCount: number;
  classroomsCount: number;
  labsCount: number;
  workingDaysCount: number;
  maxConsecutive: number;
  lunchBreak: string;
  additionalRequirements?: string;
}

interface FacultyItem {
  id: string;
  name: string;
  maxDaily: number;
  maxWeekly: number;
  unavailableDay: string;
  preferredSlot: string;
}

interface BatchItem {
  id: string;
  name: string;
  size: number;
}

interface LabSessionItem {
  id: string;
  name: string;
  durationHours: string; // '1 hour' or '2 hours continuous'
  sessionsPerWeek: number; // 1, 2, or 3
  labType: string;
}

interface ClassroomItem {
  id: string;
  name: string;
  capacity: number;
  type: string;
}

interface LaboratoryItem {
  id: string;
  name: string;
  capacity: number;
  resourceInfo: string;
}

export const TimetableConstraintsForm: React.FC<TimetableConstraintsFormProps> = ({
  college,
  onGenerate,
  onCancel,
}) => {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<
    | 'academic'
    | 'faculty'
    | 'students'
    | 'curriculum'
    | 'rooms'
    | 'schedule'
    | 'preferences'
    | 'additional'
  >('academic');

  // 1. Department & Academic Information
  const [department, setDepartment] = useState(college.department || 'Computer Engineering');
  const [semester, setSemester] = useState('Semester 5');
  const [academicYear, setAcademicYear] = useState('2026-2027');
  const [subjects, setSubjects] = useState([
    { id: '1', code: 'CS501', name: 'Database Management Systems', type: 'Theory', lecturesPerWeek: 4 },
    { id: '2', code: 'CS502', name: 'Operating Systems', type: 'Theory', lecturesPerWeek: 4 },
    { id: '3', code: 'CS503', name: 'Computer Networks', type: 'Theory', lecturesPerWeek: 3 },
    { id: '4', code: 'CS504', name: 'Design & Analysis of Algorithms', type: 'Theory', lecturesPerWeek: 4 },
    { id: '5', code: 'CS505', name: 'Artificial Intelligence & ML', type: 'Theory', lecturesPerWeek: 3 },
  ]);
  const [newSubject, setNewSubject] = useState({ code: '', name: '', type: 'Theory', lecturesPerWeek: 3 });

  // 2. Faculty Information (Editable & Addable)
  const [facultyMembers, setFacultyMembers] = useState<FacultyItem[]>([
    { id: '1', name: 'Prof. Ananya Roy', maxDaily: 3, maxWeekly: 14, unavailableDay: 'Saturday', preferredSlot: 'Morning (09:00 - 13:00)' },
    { id: '2', name: 'Prof. Vikram Deshmukh', maxDaily: 3, maxWeekly: 16, unavailableDay: 'None', preferredSlot: 'Afternoon (12:00 - 17:00)' },
    { id: '3', name: 'Dr. Rajesh Sharma', maxDaily: 2, maxWeekly: 10, unavailableDay: 'Friday', preferredSlot: 'Morning (09:00 - 12:00)' },
    { id: '4', name: 'Prof. Priya Kulkarni', maxDaily: 3, maxWeekly: 14, unavailableDay: 'None', preferredSlot: 'Any' },
  ]);
  const [facultyModalOpen, setFacultyModalOpen] = useState(false);
  const [editingFacultyId, setEditingFacultyId] = useState<string | null>(null);
  const [facultyForm, setFacultyForm] = useState({
    name: '',
    maxDaily: 3,
    maxWeekly: 14,
    unavailableDay: 'None',
    preferredSlot: 'Any',
  });

  // 3. Student Batches (Editable & Addable)
  const [batches, setBatches] = useState<BatchItem[]>([
    { id: '1', name: 'Division A (Comp)', size: 75 },
    { id: '2', name: 'Division B (Comp)', size: 75 },
    { id: '3', name: 'Batch A1 (Practical)', size: 25 },
    { id: '4', name: 'Batch A2 (Practical)', size: 25 },
    { id: '5', name: 'Batch B1 (Practical)', size: 25 },
  ]);
  const [batchModalOpen, setBatchModalOpen] = useState(false);
  const [editingBatchId, setEditingBatchId] = useState<string | null>(null);
  const [batchForm, setBatchForm] = useState({ name: '', size: 30 });

  // 4. Practical / Lab Requirements (Editable & Addable)
  const [labSessions, setLabSessions] = useState<LabSessionItem[]>([
    { id: '1', name: 'DBMS Laboratory', durationHours: '2 hours continuous', sessionsPerWeek: 1, labType: 'Database Lab' },
    { id: '2', name: 'OS & Linux Kernel Lab', durationHours: '2 hours continuous', sessionsPerWeek: 1, labType: 'Systems Lab' },
    { id: '3', name: 'Networking Lab', durationHours: '2 hours continuous', sessionsPerWeek: 1, labType: 'Hardware/Network Lab' },
    { id: '4', name: 'AI & Machine Learning Lab', durationHours: '2 hours continuous', sessionsPerWeek: 1, labType: 'High Performance Computing Lab' },
  ]);
  const [labModalOpen, setLabModalOpen] = useState(false);
  const [editingLabId, setEditingLabId] = useState<string | null>(null);
  const [labForm, setLabForm] = useState({
    name: '',
    durationHours: '2 hours continuous',
    sessionsPerWeek: 1,
    labType: 'Computer Lab',
  });

  // 5. Rooms & Resources (Classrooms & Labs Editable & Addable)
  const [classrooms, setClassrooms] = useState<ClassroomItem[]>([
    { id: '1', name: 'Room 301', capacity: 75, type: 'Smart Classroom' },
    { id: '2', name: 'Room 302', capacity: 75, type: 'Standard Classroom' },
    { id: '3', name: 'LH-01', capacity: 120, type: 'Lecture Hall' },
  ]);
  const [classroomModalOpen, setClassroomModalOpen] = useState(false);
  const [editingClassroomId, setEditingClassroomId] = useState<string | null>(null);
  const [classroomForm, setClassroomForm] = useState({ name: '', capacity: 75, type: 'Standard Classroom' });

  const [laboratories, setLaboratories] = useState<LaboratoryItem[]>([
    { id: '1', name: 'Lab 1 - Systems & Networks', capacity: 30, resourceInfo: '32 Linux PCs & Cisco switches' },
    { id: '2', name: 'Lab 2 - Data Science & AI', capacity: 30, resourceInfo: '30 GPU-accelerated workstations' },
    { id: '3', name: 'Lab 3 - Database Systems', capacity: 30, resourceInfo: '30 Oracle & Postgres developer terminals' },
  ]);
  const [laboratoryModalOpen, setLaboratoryModalOpen] = useState(false);
  const [editingLaboratoryId, setEditingLaboratoryId] = useState<string | null>(null);
  const [laboratoryForm, setLaboratoryForm] = useState({ name: '', capacity: 30, resourceInfo: '30 Terminals' });

  // 6. Working Schedule (Fully Editable)
  const [workingDays, setWorkingDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [lunchStartTime, setLunchStartTime] = useState('12:30');
  const [lunchEndTime, setLunchEndTime] = useState('13:15');
  const [maxConsecutiveLectures, setMaxConsecutiveLectures] = useState(2);
  const [requiredFreePeriods, setRequiredFreePeriods] = useState(1);

  // 7. Electives & Scheduling Preferences
  const [hasElectives, setHasElectives] = useState(true);
  const [electiveBasket] = useState([
    'Cloud Computing & DevOps',
    'Cyber Security & Cryptography',
    'Mobile Application Development',
  ]);
  const [prefDifficultMornings, setPrefDifficultMornings] = useState(true);
  const [prefBalancedWorkload, setPrefBalancedWorkload] = useState(true);
  const [prefAfternoonLabs, setPrefAfternoonLabs] = useState(true);
  const [prefSpreadWeeklyDistribution, setPrefSpreadWeeklyDistribution] = useState(true);

  // 8. Additional Requirements / Custom Constraints (Free-form text)
  const [additionalRequirements, setAdditionalRequirements] = useState(
    'Keep first-year and introductory theory lectures mostly in the morning.\nAvoid scheduling difficult theory subjects consecutively.'
  );

  // Toggle Day
  const toggleDay = (day: string) => {
    if (workingDays.includes(day)) {
      if (workingDays.length > 1) {
        setWorkingDays(workingDays.filter((d) => d !== day));
      }
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };

  // --- Handlers: Subjects ---
  const handleAddSubject = () => {
    if (!newSubject.name.trim() || !newSubject.code.trim()) return;
    setSubjects([
      ...subjects,
      {
        id: `${Date.now()}`,
        code: newSubject.code.trim().toUpperCase(),
        name: newSubject.name.trim(),
        type: newSubject.type,
        lecturesPerWeek: Number(newSubject.lecturesPerWeek) || 3,
      },
    ]);
    setNewSubject({ code: '', name: '', type: 'Theory', lecturesPerWeek: 3 });
  };
  const handleRemoveSubject = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  // --- Handlers: Faculty ---
  const handleOpenAddFaculty = () => {
    setEditingFacultyId(null);
    setFacultyForm({
      name: '',
      maxDaily: 3,
      maxWeekly: 14,
      unavailableDay: 'None',
      preferredSlot: 'Any',
    });
    setFacultyModalOpen(true);
  };

  const handleOpenEditFaculty = (fac: FacultyItem) => {
    setEditingFacultyId(fac.id);
    setFacultyForm({
      name: fac.name,
      maxDaily: fac.maxDaily,
      maxWeekly: fac.maxWeekly,
      unavailableDay: fac.unavailableDay,
      preferredSlot: fac.preferredSlot,
    });
    setFacultyModalOpen(true);
  };

  const handleSaveFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facultyForm.name.trim()) return;

    if (editingFacultyId) {
      setFacultyMembers(
        facultyMembers.map((f) =>
          f.id === editingFacultyId ? { ...f, ...facultyForm, name: facultyForm.name.trim() } : f
        )
      );
    } else {
      setFacultyMembers([
        ...facultyMembers,
        {
          id: `fac-${Date.now()}`,
          ...facultyForm,
          name: facultyForm.name.trim(),
        },
      ]);
    }
    setFacultyModalOpen(false);
  };

  const handleDeleteFaculty = (id: string) => {
    setFacultyMembers(facultyMembers.filter((f) => f.id !== id));
  };

  // --- Handlers: Batches ---
  const handleOpenAddBatch = () => {
    setEditingBatchId(null);
    setBatchForm({ name: '', size: 30 });
    setBatchModalOpen(true);
  };

  const handleOpenEditBatch = (batch: BatchItem) => {
    setEditingBatchId(batch.id);
    setBatchForm({ name: batch.name, size: batch.size });
    setBatchModalOpen(true);
  };

  const handleSaveBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchForm.name.trim()) return;

    if (editingBatchId) {
      setBatches(
        batches.map((b) =>
          b.id === editingBatchId ? { ...b, name: batchForm.name.trim(), size: Number(batchForm.size) || 30 } : b
        )
      );
    } else {
      setBatches([
        ...batches,
        {
          id: `batch-${Date.now()}`,
          name: batchForm.name.trim(),
          size: Number(batchForm.size) || 30,
        },
      ]);
    }
    setBatchModalOpen(false);
  };

  const handleDeleteBatch = (id: string) => {
    setBatches(batches.filter((b) => b.id !== id));
  };

  // --- Handlers: Labs & Practicals ---
  const handleOpenAddLab = () => {
    setEditingLabId(null);
    setLabForm({
      name: '',
      durationHours: '2 hours continuous',
      sessionsPerWeek: 1,
      labType: 'Computer Lab',
    });
    setLabModalOpen(true);
  };

  const handleOpenEditLab = (lab: LabSessionItem) => {
    setEditingLabId(lab.id);
    setLabForm({
      name: lab.name,
      durationHours: lab.durationHours,
      sessionsPerWeek: lab.sessionsPerWeek,
      labType: lab.labType,
    });
    setLabModalOpen(true);
  };

  const handleSaveLab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!labForm.name.trim()) return;

    if (editingLabId) {
      setLabSessions(
        labSessions.map((l) =>
          l.id === editingLabId ? { ...l, ...labForm, name: labForm.name.trim() } : l
        )
      );
    } else {
      setLabSessions([
        ...labSessions,
        {
          id: `lab-${Date.now()}`,
          ...labForm,
          name: labForm.name.trim(),
        },
      ]);
    }
    setLabModalOpen(false);
  };

  const handleDeleteLab = (id: string) => {
    setLabSessions(labSessions.filter((l) => l.id !== id));
  };

  // Inline update for Lab Duration
  const handleUpdateLabDuration = (id: string, duration: string) => {
    setLabSessions(
      labSessions.map((l) => (l.id === id ? { ...l, durationHours: duration } : l))
    );
  };

  // Inline update for Lab Sessions per week
  const handleUpdateLabSessions = (id: string, sessions: number) => {
    setLabSessions(
      labSessions.map((l) => (l.id === id ? { ...l, sessionsPerWeek: sessions } : l))
    );
  };

  // --- Handlers: Classrooms ---
  const handleOpenAddClassroom = () => {
    setEditingClassroomId(null);
    setClassroomForm({ name: '', capacity: 75, type: 'Standard Classroom' });
    setClassroomModalOpen(true);
  };

  const handleOpenEditClassroom = (room: ClassroomItem) => {
    setEditingClassroomId(room.id);
    setClassroomForm({ name: room.name, capacity: room.capacity, type: room.type });
    setClassroomModalOpen(true);
  };

  const handleSaveClassroom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classroomForm.name.trim()) return;

    if (editingClassroomId) {
      setClassrooms(
        classrooms.map((c) =>
          c.id === editingClassroomId ? { ...c, ...classroomForm, name: classroomForm.name.trim(), capacity: Number(classroomForm.capacity) || 60 } : c
        )
      );
    } else {
      setClassrooms([
        ...classrooms,
        {
          id: `room-${Date.now()}`,
          name: classroomForm.name.trim(),
          capacity: Number(classroomForm.capacity) || 60,
          type: classroomForm.type,
        },
      ]);
    }
    setClassroomModalOpen(false);
  };

  const handleDeleteClassroom = (id: string) => {
    setClassrooms(classrooms.filter((c) => c.id !== id));
  };

  const handleUpdateClassroomCapacity = (id: string, capacity: number) => {
    setClassrooms(classrooms.map((c) => (c.id === id ? { ...c, capacity } : c)));
  };

  // --- Handlers: Laboratories ---
  const handleOpenAddLaboratory = () => {
    setEditingLaboratoryId(null);
    setLaboratoryForm({ name: '', capacity: 30, resourceInfo: '30 Terminals' });
    setLaboratoryModalOpen(true);
  };

  const handleOpenEditLaboratory = (lab: LaboratoryItem) => {
    setEditingLaboratoryId(lab.id);
    setLaboratoryForm({ name: lab.name, capacity: lab.capacity, resourceInfo: lab.resourceInfo });
    setLaboratoryModalOpen(true);
  };

  const handleSaveLaboratory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!laboratoryForm.name.trim()) return;

    if (editingLaboratoryId) {
      setLaboratories(
        laboratories.map((l) =>
          l.id === editingLaboratoryId ? { ...l, ...laboratoryForm, name: laboratoryForm.name.trim(), capacity: Number(laboratoryForm.capacity) || 30 } : l
        )
      );
    } else {
      setLaboratories([
        ...laboratories,
        {
          id: `lab-room-${Date.now()}`,
          name: laboratoryForm.name.trim(),
          capacity: Number(laboratoryForm.capacity) || 30,
          resourceInfo: laboratoryForm.resourceInfo.trim(),
        },
      ]);
    }
    setLaboratoryModalOpen(false);
  };

  const handleDeleteLaboratory = (id: string) => {
    setLaboratories(laboratories.filter((l) => l.id !== id));
  };

  const handleUpdateLaboratoryCapacity = (id: string, capacity: number) => {
    setLaboratories(laboratories.map((l) => (l.id === id ? { ...l, capacity } : l)));
  };

  // Reset to initial standards
  const handleResetDefaults = () => {
    setDepartment(college.department || 'Computer Engineering');
    setSemester('Semester 5');
    setWorkingDays(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
    setStartTime('09:00');
    setEndTime('17:00');
    setLunchStartTime('12:30');
    setLunchEndTime('13:15');
    setMaxConsecutiveLectures(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const summary: ConstraintsSummary = {
      department,
      subjectsCount: subjects.length,
      facultyCount: facultyMembers.length,
      classroomsCount: classrooms.length,
      labsCount: laboratories.length,
      workingDaysCount: workingDays.length,
      maxConsecutive: maxConsecutiveLectures,
      lunchBreak: `${lunchStartTime} - ${lunchEndTime}`,
      additionalRequirements: additionalRequirements.trim(),
    };
    onGenerate(summary);
  };

  const tabs = [
    { id: 'academic', label: '1. Department & Subjects', icon: BookOpen },
    { id: 'faculty', label: '2. Faculty Availability', icon: Users },
    { id: 'students', label: '3. Active Batches', icon: Layers },
    { id: 'curriculum', label: '4. Labs & Practicals', icon: Clock },
    { id: 'rooms', label: '5. Rooms & Resources', icon: Building2 },
    { id: 'schedule', label: '6. Working Schedule', icon: CalendarDays },
    { id: 'preferences', label: '7. Preferences', icon: Sliders },
    { id: 'additional', label: '8. Additional Requirements', icon: FileText },
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Interactive Constraint Configuration</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Configure Timetable Constraints
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Add, edit, and adjust faculty availability, student batches, lab allocations, and room capacities for{' '}
            <strong className="text-slate-800">{college.collegeName}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Standards</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Navigable Section Selector */}
      <div className="mt-6 flex flex-wrap gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/70">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {/* TAB 1: Department & Academic Information */}
        {activeTab === 'academic' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Department Name</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Academic Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option>Semester 1</option>
                  <option>Semester 2</option>
                  <option>Semester 3</option>
                  <option>Semester 4</option>
                  <option>Semester 5</option>
                  <option>Semester 6</option>
                  <option>Semester 7</option>
                  <option>Semester 8</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Academic Year</label>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Subjects List */}
            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Department Subjects & Courses</h4>
                  <p className="text-xs text-slate-500">Configured courses and required weekly lecture quotas.</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg">
                  {subjects.length} Subjects
                </span>
              </div>

              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white overflow-hidden">
                {subjects.map((sub) => (
                  <div key={sub.id} className="p-3.5 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded">
                        {sub.code}
                      </span>
                      <div>
                        <p className="font-semibold text-slate-900">{sub.name}</p>
                        <p className="text-[11px] text-slate-500">{sub.type} Course</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-slate-600 font-medium">
                        {sub.lecturesPerWeek} Lectures / week
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSubject(sub.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer"
                        title="Remove subject"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Subject row */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Code (e.g. CS506)"
                  value={newSubject.code}
                  onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                  className="px-3 py-2 text-xs font-mono uppercase bg-white border border-slate-300 rounded-xl sm:w-28 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Subject Name (e.g. Cloud Computing)"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none"
                />
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={newSubject.lecturesPerWeek}
                  onChange={(e) => setNewSubject({ ...newSubject, lecturesPerWeek: Number(e.target.value) })}
                  className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl sm:w-24 focus:outline-none"
                  title="Lectures per week"
                />
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Subject</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Faculty Information (Add, Edit, Delete) */}
        {activeTab === 'faculty' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Faculty Availability & Workload</h4>
                <p className="text-xs text-slate-500">
                  Manage faculty teaching quotas, unavailable days, and preferred scheduling slots.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddFaculty}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Faculty</span>
              </button>
            </div>

            <div className="space-y-3">
              {facultyMembers.map((fac) => (
                <div key={fac.id} className="p-4 border border-slate-200 rounded-2xl bg-white shadow-2xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                        {fac.name[0]}
                      </div>
                      <span className="font-bold text-slate-900 text-sm">{fac.name}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEditFaculty(fac)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteFaculty(fac.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete faculty"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="block text-slate-400 text-[11px] font-medium">Max Daily</span>
                      <p className="font-semibold text-slate-800">{fac.maxDaily} Lectures / day</p>
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[11px] font-medium">Max Weekly</span>
                      <p className="font-semibold text-slate-800">{fac.maxWeekly} Lectures / week</p>
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[11px] font-medium">Unavailable Day</span>
                      <p className={`font-semibold ${fac.unavailableDay === 'None' ? 'text-slate-500' : 'text-rose-600'}`}>
                        {fac.unavailableDay}
                      </p>
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[11px] font-medium">Preferred Slot</span>
                      <p className="font-semibold text-indigo-700">{fac.preferredSlot}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Active Batches / Student Batches (Add, Edit, Delete) */}
        {activeTab === 'students' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Active Batches & Divisions</h4>
                <p className="text-xs text-slate-500">
                  Define student divisions and practical lab batches with custom sizes.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddBatch}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Batch</span>
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {batches.map((b) => (
                <div key={b.id} className="p-4 border border-slate-200 rounded-2xl bg-white shadow-2xs flex flex-col justify-between gap-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-sm text-slate-900 block">{b.name}</span>
                      <span className="text-xs font-medium text-slate-500">{b.size} Students</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEditBatch(b)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Edit batch"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBatch(b.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete batch"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Division / Lab Group</span>
                    <span className="font-mono text-indigo-700">Capacity: {b.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Labs & Practicals (Editable Durations, Sessions, Add, Delete) */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Practical & Laboratory Requirements</h4>
                <p className="text-xs text-slate-500">
                  Select continuous duration (1 hr vs 2 hrs continuous) and weekly frequency per batch.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddLab}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Lab / Practical</span>
              </button>
            </div>

            <div className="space-y-3">
              {labSessions.map((lab) => (
                <div key={lab.id} className="p-4 border border-slate-200 rounded-2xl bg-white shadow-2xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <span className="font-bold text-sm text-slate-900">{lab.name}</span>
                      <p className="text-xs text-slate-500 mt-0.5">Assigned Facility: {lab.labType}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEditLab(lab)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteLab(lab.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 pt-1">
                    {/* Practical Duration (Editable between 1 hour and 2 hours continuous) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Practical Duration (Continuous block)
                      </label>
                      <select
                        value={lab.durationHours}
                        onChange={(e) => handleUpdateLabDuration(lab.id, e.target.value)}
                        className="w-full px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="1 hour">1 hour</option>
                        <option value="2 hours continuous">2 hours continuous</option>
                      </select>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Determines the continuous scheduling block required on the timetable.
                      </p>
                    </div>

                    {/* Sessions per batch per week (Editable between 1, 2, or 3 sessions) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Sessions per Batch per Week
                      </label>
                      <select
                        value={lab.sessionsPerWeek}
                        onChange={(e) => handleUpdateLabSessions(lab.id, Number(e.target.value))}
                        className="w-full px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value={1}>1 session per batch per week</option>
                        <option value={2}>2 sessions per batch per week</option>
                        <option value={3}>3 sessions per batch per week</option>
                      </select>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Frequency required for each sub-batch in this subject.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Rooms & Resources (Editable Capacities, Add, Delete) */}
        {activeTab === 'rooms' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Classrooms, Labs & Resource Capacities</h4>
              <p className="text-xs text-slate-500">
                Directly adjust room seating capacities or add/delete teaching venues.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Classrooms */}
              <div className="border border-slate-200 rounded-2xl p-4 sm:p-5 bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Classrooms ({classrooms.length})
                    </h5>
                    <p className="text-[11px] text-slate-500">Lectures & theory teaching halls</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleOpenAddClassroom}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-indigo-700 bg-white border border-indigo-200 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Classroom</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {classrooms.map((room) => (
                    <div key={room.id} className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-900 text-xs">{room.name}</p>
                          <p className="text-[11px] text-slate-400">{room.type}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEditClassroom(room)}
                            className="p-1 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                            title="Edit classroom"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteClassroom(room.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete classroom"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Directly Editable Capacity */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <label className="text-[11px] text-slate-500 font-medium">Capacity (Seats):</label>
                        <input
                          type="number"
                          min="10"
                          max="300"
                          value={room.capacity}
                          onChange={(e) => handleUpdateClassroomCapacity(room.id, Number(e.target.value))}
                          className="w-20 px-2 py-1 text-right text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Laboratories */}
              <div className="border border-slate-200 rounded-2xl p-4 sm:p-5 bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Laboratories ({laboratories.length})
                    </h5>
                    <p className="text-[11px] text-slate-500">Computer centers & hardware facilities</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleOpenAddLaboratory}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-indigo-700 bg-white border border-indigo-200 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Laboratory</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {laboratories.map((lab) => (
                    <div key={lab.id} className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-900 text-xs">{lab.name}</p>
                          <p className="text-[11px] text-slate-400 truncate max-w-[200px]">{lab.resourceInfo}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEditLaboratory(lab)}
                            className="p-1 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                            title="Edit laboratory"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteLaboratory(lab.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete laboratory"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Directly Editable Capacity */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <label className="text-[11px] text-slate-500 font-medium">Capacity (Seats):</label>
                        <input
                          type="number"
                          min="5"
                          max="150"
                          value={lab.capacity}
                          onChange={(e) => handleUpdateLaboratoryCapacity(lab.id, Number(e.target.value))}
                          className="w-20 px-2 py-1 text-right text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: Working Schedule (Editable Times & Days) */}
        {activeTab === 'schedule' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Working Schedule & Operating Hours</h4>
              <p className="text-xs text-slate-500">
                Configure weekly teaching days, daily opening/closing hours, and lunch breaks.
              </p>
            </div>

            {/* Operating Days of the Week */}
            <div className="p-4 sm:p-5 border border-slate-200 rounded-2xl bg-white space-y-3">
              <label className="block text-xs font-bold text-slate-800">
                Operating Days of the Week (Click to Enable / Disable)
              </label>
              <div className="flex flex-wrap gap-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => {
                  const isSelected = workingDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-slate-300'}`} />
                      <span>{day}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-500">
                Currently configured for <strong>{workingDays.length} active working days</strong>.
              </p>
            </div>

            {/* Start / End Time & Lunch Breaks */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border border-slate-200 rounded-2xl bg-white space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">Day Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <p className="text-[10px] text-slate-400">Institutional first period</p>
              </div>

              <div className="p-4 border border-slate-200 rounded-2xl bg-white space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">Day End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <p className="text-[10px] text-slate-400">Institutional closing hour</p>
              </div>

              <div className="p-4 border border-slate-200 rounded-2xl bg-white space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">Common Lunch Start</label>
                <input
                  type="time"
                  value={lunchStartTime}
                  onChange={(e) => setLunchStartTime(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <p className="text-[10px] text-slate-400">Recess commencement</p>
              </div>

              <div className="p-4 border border-slate-200 rounded-2xl bg-white space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">Common Lunch End</label>
                <input
                  type="time"
                  value={lunchEndTime}
                  onChange={(e) => setLunchEndTime(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <p className="text-[10px] text-slate-400">Recess conclusion</p>
              </div>
            </div>

            {/* Fatigue Limits */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 rounded-2xl bg-white space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  Max Consecutive Lectures for Faculty
                </label>
                <input
                  type="number"
                  min="1"
                  max="4"
                  value={maxConsecutiveLectures}
                  onChange={(e) => setMaxConsecutiveLectures(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
                <p className="text-[11px] text-slate-500">
                  Mandatory rest or free slot enforced after {maxConsecutiveLectures} back-to-back lectures.
                </p>
              </div>

              <div className="p-4 border border-slate-200 rounded-2xl bg-white space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  Required Free Periods per Day
                </label>
                <input
                  type="number"
                  min="0"
                  max="3"
                  value={requiredFreePeriods}
                  onChange={(e) => setRequiredFreePeriods(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
                <p className="text-[11px] text-slate-500">
                  Daily buffer allocated for faculty research and student guidance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: Preferences & Electives */}
        {activeTab === 'preferences' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Optimization Preferences & Soft Constraints</h4>
              <p className="text-xs text-slate-500">
                Algorithm scheduling heuristics for pedagogical quality.
              </p>
            </div>

            {/* Electives */}
            <div className="p-4 border border-slate-200 rounded-2xl bg-white space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Elective Subject Clustering</h5>
                  <p className="text-[11px] text-slate-500">
                    Schedule parallel slots across divisions for elective subject choices.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={hasElectives}
                  onChange={(e) => setHasElectives(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                />
              </div>

              {hasElectives && (
                <div className="pt-2 flex flex-wrap gap-2 text-xs text-indigo-800">
                  {electiveBasket.map((el, i) => (
                    <span key={i} className="px-2.5 py-1 bg-indigo-50 border border-indigo-200 rounded-lg">
                      {el}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Scheduling Preferences Checkboxes */}
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-2.5">
              <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefDifficultMornings}
                  onChange={(e) => setPrefDifficultMornings(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-indigo-600 rounded"
                />
                <div>
                  <strong className="block text-slate-900">Prioritize Heavy Theory Subjects in Morning Slots</strong>
                  <span className="text-[11px] text-slate-500">
                    Algorithms, Mathematics, and Theory courses scheduled before lunch.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefAfternoonLabs}
                  onChange={(e) => setPrefAfternoonLabs(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-indigo-600 rounded"
                />
                <div>
                  <strong className="block text-slate-900">Place Continuous Practical Sessions in Afternoon Windows</strong>
                  <span className="text-[11px] text-slate-500">
                    Schedules continuous lab batches during post-lunch 13:30 - 17:00 periods.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefBalancedWorkload}
                  onChange={(e) => setPrefBalancedWorkload(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-indigo-600 rounded"
                />
                <div>
                  <strong className="block text-slate-900">Enforce Even Daily Workload for Batches</strong>
                  <span className="text-[11px] text-slate-500">
                    Avoids overload spikes on single days.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefSpreadWeeklyDistribution}
                  onChange={(e) => setPrefSpreadWeeklyDistribution(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-indigo-600 rounded"
                />
                <div>
                  <strong className="block text-slate-900">Even Subject Spacing Across the Week</strong>
                  <span className="text-[11px] text-slate-500">
                    Avoids placing two lectures of the same subject on the same day for a division.
                  </span>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* TAB 8: Additional Requirements / Custom Constraints */}
        {activeTab === 'additional' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Additional Requirements & Custom Constraints</h4>
              <p className="text-xs text-slate-500">
                Enter any departmental rules, special instructions, or constraints not covered by the standard forms.
              </p>
            </div>

            <div className="p-4 border border-slate-200 rounded-2xl bg-white space-y-3">
              <label className="block text-xs font-bold text-slate-800">
                Custom Constraints (Free-form text)
              </label>
              <textarea
                rows={6}
                value={additionalRequirements}
                onChange={(e) => setAdditionalRequirements(e.target.value)}
                placeholder="Enter any additional timetable requirements or constraints..."
                className="w-full p-3.5 text-xs leading-relaxed bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <p className="text-[11px] text-slate-400">
                Example: <em>"Keep first-year lectures mostly in the morning. Avoid scheduling difficult theory subjects consecutively."</em>
              </p>
            </div>
          </div>
        )}

        {/* Persistent Bottom Section: Also previewing Additional Requirements if in other tabs */}
        {activeTab !== 'additional' && (
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="truncate max-w-md">
              Additional custom constraints entered: {additionalRequirements.trim() ? 'Yes (configured)' : 'None'}
            </span>
            <button
              type="button"
              onClick={() => setActiveTab('additional')}
              className="text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer underline underline-offset-2"
            >
              Edit Additional Requirements
            </button>
          </div>
        )}

        {/* Submit Actions */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Interactive constraints across 8 categories configured</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 sm:flex-none px-7 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-200 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Timetable</span>
            </button>
          </div>
        </div>
      </form>

      {/* --- MODAL: Add / Edit Faculty --- */}
      {facultyModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                {editingFacultyId ? 'Edit Faculty Details' : 'Add New Faculty Member'}
              </h3>
              <button
                type="button"
                onClick={() => setFacultyModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveFaculty} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Faculty Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prof. Rohit Sharma"
                  value={facultyForm.name}
                  onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Max Daily Lectures</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={facultyForm.maxDaily}
                    onChange={(e) => setFacultyForm({ ...facultyForm, maxDaily: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Max Weekly Lectures</label>
                  <input
                    type="number"
                    min="2"
                    max="28"
                    value={facultyForm.maxWeekly}
                    onChange={(e) => setFacultyForm({ ...facultyForm, maxWeekly: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Unavailable Day / Slot</label>
                <select
                  value={facultyForm.unavailableDay}
                  onChange={(e) => setFacultyForm({ ...facultyForm, unavailableDay: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                >
                  <option>None</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Preferred Time Slot</label>
                <select
                  value={facultyForm.preferredSlot}
                  onChange={(e) => setFacultyForm({ ...facultyForm, preferredSlot: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                >
                  <option>Any</option>
                  <option>Morning (09:00 - 13:00)</option>
                  <option>Afternoon (12:00 - 17:00)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFacultyModalOpen(false)}
                  className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
                >
                  {editingFacultyId ? 'Save Changes' : 'Add Faculty'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: Add / Edit Batch --- */}
      {batchModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                {editingBatchId ? 'Edit Student Batch' : 'Add Student Batch / Division'}
              </h3>
              <button
                type="button"
                onClick={() => setBatchModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBatch} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Batch / Division Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Division C (Comp) or Batch A3"
                  value={batchForm.name}
                  onChange={(e) => setBatchForm({ ...batchForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Batch Size (Students)</label>
                <input
                  type="number"
                  min="5"
                  max="150"
                  value={batchForm.size}
                  onChange={(e) => setBatchForm({ ...batchForm, size: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setBatchModalOpen(false)}
                  className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
                >
                  {editingBatchId ? 'Save Changes' : 'Add Batch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: Add / Edit Lab / Practical --- */}
      {labModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                {editingLabId ? 'Edit Practical Session' : 'Add Lab / Practical'}
              </h3>
              <button
                type="button"
                onClick={() => setLabModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveLab} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Practical Session Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cloud & DevOps Lab"
                  value={labForm.name}
                  onChange={(e) => setLabForm({ ...labForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Facility / Lab Type</label>
                <input
                  type="text"
                  placeholder="e.g. Systems Lab 2"
                  value={labForm.labType}
                  onChange={(e) => setLabForm({ ...labForm, labType: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Practical Duration</label>
                <select
                  value={labForm.durationHours}
                  onChange={(e) => setLabForm({ ...labForm, durationHours: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                >
                  <option value="1 hour">1 hour</option>
                  <option value="2 hours continuous">2 hours continuous</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Sessions per Batch per Week</label>
                <select
                  value={labForm.sessionsPerWeek}
                  onChange={(e) => setLabForm({ ...labForm, sessionsPerWeek: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                >
                  <option value={1}>1 session per batch per week</option>
                  <option value={2}>2 sessions per batch per week</option>
                  <option value={3}>3 sessions per batch per week</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setLabModalOpen(false)}
                  className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
                >
                  {editingLabId ? 'Save Changes' : 'Add Practical'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: Add / Edit Classroom --- */}
      {classroomModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                {editingClassroomId ? 'Edit Classroom' : 'Add Classroom'}
              </h3>
              <button
                type="button"
                onClick={() => setClassroomModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveClassroom} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Classroom Name / Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Room 303 or Hall B"
                  value={classroomForm.name}
                  onChange={(e) => setClassroomForm({ ...classroomForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Number of Seats / Capacity</label>
                <input
                  type="number"
                  min="10"
                  max="350"
                  value={classroomForm.capacity}
                  onChange={(e) => setClassroomForm({ ...classroomForm, capacity: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Room Type</label>
                <select
                  value={classroomForm.type}
                  onChange={(e) => setClassroomForm({ ...classroomForm, type: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                >
                  <option>Standard Classroom</option>
                  <option>Smart Classroom</option>
                  <option>Lecture Hall</option>
                  <option>Seminar Hall</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setClassroomModalOpen(false)}
                  className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
                >
                  {editingClassroomId ? 'Save Changes' : 'Add Classroom'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: Add / Edit Laboratory --- */}
      {laboratoryModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                {editingLaboratoryId ? 'Edit Laboratory' : 'Add Laboratory'}
              </h3>
              <button
                type="button"
                onClick={() => setLaboratoryModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveLaboratory} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Laboratory Name / Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lab 4 - Mobile App Lab"
                  value={laboratoryForm.name}
                  onChange={(e) => setLaboratoryForm({ ...laboratoryForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Number of Seats / Capacity</label>
                <input
                  type="number"
                  min="5"
                  max="150"
                  value={laboratoryForm.capacity}
                  onChange={(e) => setLaboratoryForm({ ...laboratoryForm, capacity: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Equipment / Resource Info</label>
                <input
                  type="text"
                  placeholder="e.g. 30 Mac Minis & Android Emulators"
                  value={laboratoryForm.resourceInfo}
                  onChange={(e) => setLaboratoryForm({ ...laboratoryForm, resourceInfo: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setLaboratoryModalOpen(false)}
                  className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
                >
                  {editingLaboratoryId ? 'Save Changes' : 'Add Laboratory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
