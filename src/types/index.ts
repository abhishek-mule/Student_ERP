export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  avatar?: string;
  department?: string;
  joinedAt: Date;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  grade: string;
  section: string;
  guardianName: string;
  guardianContact: string;
  avatar?: string;
  joinedAt: Date;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  teacherId: string;
  department: string;
  subjects: string[];
  avatar?: string;
  joinedAt: Date;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: Date;
  status: 'present' | 'absent' | 'late';
  subject: string;
  remarks?: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  dueDate: Date;
  createdBy: string;
  createdAt: Date;
  grade: string;
  section: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: Date;
  status: 'pending' | 'graded';
  grade?: number;
  feedback?: string;
}

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  dueDate: Date;
  type: 'tuition' | 'activity' | 'transport' | 'other';
  status: 'paid' | 'pending' | 'overdue';
  paidAt?: Date;
  receiptNo?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  sentAt: Date;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  createdAt: Date;
  read: boolean;
}