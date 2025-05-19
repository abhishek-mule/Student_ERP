import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, BookOpen, DollarSign, Clock, Users, FileText, Award, Bell } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import { useAuth } from '../../contexts/AuthContext';
import { assignments, attendance, fees, submissions } from '../../data/mock-data';
import { formatDate } from '../../lib/utils';

// Mock data
const performanceData = [
  { subject: 'Math', score: 85 },
  { subject: 'Science', score: 92 },
  { subject: 'English', score: 78 },
  { subject: 'History', score: 88 },
  { subject: 'Art', score: 95 },
];

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Filter data for current student
  const studentId = user?.id || '';
  const studentAttendance = attendance.filter(a => a.studentId === studentId);
  const studentAssignments = assignments.filter(a => a.grade === '10'); // Example filter for grade
  const studentSubmissions = submissions.filter(s => s.studentId === studentId);
  const studentFees = fees.filter(f => f.studentId === studentId);
  
  // Calculate statistics
  const totalClasses = studentAttendance.length;
  const presentClasses = studentAttendance.filter(a => a.status === 'present').length;
  const attendanceRate = totalClasses > 0 ? (presentClasses / totalClasses) * 100 : 0;
  
  const pendingAssignments = studentAssignments.filter(a => 
    !studentSubmissions.some(s => s.assignmentId === a.id)
  );
  
  const pendingFees = studentFees.filter(f => f.status === 'pending').length;
  
  // Card animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={item}>
          <Card hover>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-primary-100 p-3">
                  <Calendar className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                  <h3 className="text-2xl font-bold text-gray-900">{attendanceRate.toFixed(1)}%</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card hover>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-warning-100 p-3">
                  <BookOpen className="h-6 w-6 text-warning-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Assignments</p>
                  <h3 className="text-2xl font-bold text-gray-900">{pendingAssignments.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card hover>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-success-100 p-3">
                  <Award className="h-6 w-6 text-success-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Grade</p>
                  <h3 className="text-2xl font-bold text-gray-900">86%</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card hover>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-error-100 p-3">
                  <DollarSign className="h-6 w-6 text-error-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Fees</p>
                  <h3 className="text-2xl font-bold text-gray-900">{pendingFees}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Performance by Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#4F46E5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingAssignments.slice(0, 4).map((assignment) => (
                  <div key={assignment.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0">
                    <div className="mr-4 rounded-full bg-gray-100 p-2">
                      <FileText className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{assignment.title}</h4>
                      <p className="text-xs text-gray-500">{assignment.subject}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            Due: {formatDate(assignment.dueDate)}
                          </span>
                        </div>
                        <Badge size="sm" variant="warning">Pending</Badge>
                      </div>
                    </div>
                  </div>
                ))}
                
                {pendingAssignments.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">No pending assignments!</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                View all assignments
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentAttendance.slice(0, 5).map((record) => (
                  <div key={record.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-center">
                      <div className="mr-3">
                        {record.status === 'present' ? (
                          <div className="h-2 w-2 rounded-full bg-success-500"></div>
                        ) : record.status === 'absent' ? (
                          <div className="h-2 w-2 rounded-full bg-error-500"></div>
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-warning-500"></div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{record.subject}</p>
                        <p className="text-xs text-gray-500">{formatDate(record.date)}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        record.status === 'present' 
                          ? 'success' 
                          : record.status === 'absent' 
                          ? 'error' 
                          : 'warning'
                      }
                      size="sm"
                    >
                      {record.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Class Schedule - Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border border-gray-100 bg-white p-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">Mathematics</h4>
                      <p className="text-sm text-gray-500">Algebra - Room 101</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">8:00 AM - 9:30 AM</p>
                      <p className="text-sm text-gray-500">Jane Doe</p>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-100 bg-white p-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">Science</h4>
                      <p className="text-sm text-gray-500">Physics - Laboratory</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">10:00 AM - 11:30 AM</p>
                      <p className="text-sm text-gray-500">David Brown</p>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-100 bg-white p-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">English</h4>
                      <p className="text-sm text-gray-500">Literature - Room 203</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">1:00 PM - 2:30 PM</p>
                      <p className="text-sm text-gray-500">Sarah Wilson</p>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-100 bg-white p-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">History</h4>
                      <p className="text-sm text-gray-500">World History - Room 105</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">2:45 PM - 4:15 PM</p>
                      <p className="text-sm text-gray-500">Michael Thompson</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;