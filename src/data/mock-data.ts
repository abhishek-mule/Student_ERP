import { User, Student, Teacher, Attendance, Assignment, AssignmentSubmission, Fee, Message, Notification } from '../types';
import { generateAvatarUrl } from '../lib/utils';

// Mock users
export const users: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'admin@eduerp.com',
    role: 'admin',
    avatar: generateAvatarUrl('admin1'),
    department: 'Administration',
    joinedAt: new Date('2022-01-15'),
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'teacher@eduerp.com',
    role: 'teacher',
    avatar: generateAvatarUrl('teacher1'),
    department: 'Mathematics',
    joinedAt: new Date('2022-03-10'),
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'student@eduerp.com',
    role: 'student',
    avatar: generateAvatarUrl('student1'),
    joinedAt: new Date('2022-08-05'),
  },
];

// Mock students
export const students: Student[] = [
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@eduerp.com',
    studentId: 'S2023001',
    grade: '10',
    section: 'A',
    guardianName: 'Robert Johnson',
    guardianContact: '+1 234-567-8901',
    avatar: generateAvatarUrl('student1'),
    joinedAt: new Date('2022-08-05'),
  },
  {
    id: '4',
    name: 'Emily Wilson',
    email: 'emily.wilson@eduerp.com',
    studentId: 'S2023002',
    grade: '10',
    section: 'A',
    guardianName: 'Sarah Wilson',
    guardianContact: '+1 234-567-8902',
    avatar: generateAvatarUrl('student2'),
    joinedAt: new Date('2022-08-07'),
  },
  {
    id: '5',
    name: 'Alex Thompson',
    email: 'alex.thompson@eduerp.com',
    studentId: 'S2023003',
    grade: '10',
    section: 'B',
    guardianName: 'Michael Thompson',
    guardianContact: '+1 234-567-8903',
    avatar: generateAvatarUrl('student3'),
    joinedAt: new Date('2022-08-10'),
  },
];

// Mock teachers
export const teachers: Teacher[] = [
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane.doe@eduerp.com',
    teacherId: 'T2023001',
    department: 'Mathematics',
    subjects: ['Algebra', 'Calculus'],
    avatar: generateAvatarUrl('teacher1'),
    joinedAt: new Date('2022-03-10'),
  },
  {
    id: '6',
    name: 'David Brown',
    email: 'david.brown@eduerp.com',
    teacherId: 'T2023002',
    department: 'Science',
    subjects: ['Physics', 'Chemistry'],
    avatar: generateAvatarUrl('teacher2'),
    joinedAt: new Date('2022-03-15'),
  },
];

// Mock attendance
export const attendance: Attendance[] = [
  {
    id: '1',
    studentId: '3',
    date: new Date('2023-10-01'),
    status: 'present',
    subject: 'Mathematics',
  },
  {
    id: '2',
    studentId: '4',
    date: new Date('2023-10-01'),
    status: 'absent',
    subject: 'Mathematics',
    remarks: 'Called parent',
  },
  {
    id: '3',
    studentId: '5',
    date: new Date('2023-10-01'),
    status: 'late',
    subject: 'Mathematics',
    remarks: 'Late by 15 minutes',
  },
];

// Mock assignments
export const assignments: Assignment[] = [
  {
    id: '1',
    title: 'Algebra Equations',
    description: 'Solve the given set of quadratic equations.',
    subject: 'Mathematics',
    dueDate: new Date('2023-10-15'),
    createdBy: '2',
    createdAt: new Date('2023-10-01'),
    grade: '10',
    section: 'A',
  },
  {
    id: '2',
    title: 'Physics Lab Report',
    description: 'Write a report on the pendulum experiment conducted in class.',
    subject: 'Physics',
    dueDate: new Date('2023-10-20'),
    createdBy: '6',
    createdAt: new Date('2023-10-05'),
    grade: '10',
    section: 'B',
  },
];

// Mock assignment submissions
export const submissions: AssignmentSubmission[] = [
  {
    id: '1',
    assignmentId: '1',
    studentId: '3',
    submittedAt: new Date('2023-10-12'),
    status: 'graded',
    grade: 92,
    feedback: 'Excellent work on the equations!',
  },
  {
    id: '2',
    assignmentId: '1',
    studentId: '4',
    submittedAt: new Date('2023-10-14'),
    status: 'graded',
    grade: 85,
    feedback: 'Good attempt, watch your sign errors.',
  },
];

// Mock fees
export const fees: Fee[] = [
  {
    id: '1',
    studentId: '3',
    amount: 1500,
    dueDate: new Date('2023-09-30'),
    type: 'tuition',
    status: 'paid',
    paidAt: new Date('2023-09-25'),
    receiptNo: 'REC001',
  },
  {
    id: '2',
    studentId: '4',
    amount: 1500,
    dueDate: new Date('2023-09-30'),
    type: 'tuition',
    status: 'pending',
  },
  {
    id: '3',
    studentId: '3',
    amount: 200,
    dueDate: new Date('2023-10-15'),
    type: 'activity',
    status: 'pending',
  },
];

// Mock messages
export const messages: Message[] = [
  {
    id: '1',
    senderId: '2',
    receiverId: '3',
    content: 'Please submit your homework by tomorrow.',
    sentAt: new Date('2023-10-05T14:30:00'),
    read: true,
  },
  {
    id: '2',
    senderId: '3',
    receiverId: '2',
    content: 'Yes, I will submit it on time. Thank you!',
    sentAt: new Date('2023-10-05T15:15:00'),
    read: true,
  },
  {
    id: '3',
    senderId: '1',
    receiverId: '2',
    content: 'Please submit the grade reports by Friday.',
    sentAt: new Date('2023-10-06T09:45:00'),
    read: false,
  },
];

// Mock notifications
export const notifications: Notification[] = [
  {
    id: '1',
    userId: '3',
    title: 'New Assignment',
    message: 'A new Algebra assignment has been posted.',
    type: 'info',
    createdAt: new Date('2023-10-01T10:00:00'),
    read: false,
  },
  {
    id: '2',
    userId: '3',
    title: 'Assignment Graded',
    message: 'Your Algebra assignment has been graded.',
    type: 'success',
    createdAt: new Date('2023-10-12T16:30:00'),
    read: false,
  },
  {
    id: '3',
    userId: '2',
    title: 'Meeting Reminder',
    message: 'Faculty meeting tomorrow at 3 PM.',
    type: 'warning',
    createdAt: new Date('2023-10-06T11:15:00'),
    read: true,
  },
];