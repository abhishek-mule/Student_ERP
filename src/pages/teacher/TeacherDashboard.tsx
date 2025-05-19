import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Clock, FileText, CheckCircle, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import { useAuth } from '../../contexts/AuthContext';
import { students, attendance, assignments, submissions } from '../../data/mock-data';
import { formatDate } from '../../lib/utils';

// Mock data
const attendanceData = [
  { name: 'Present', value: 85, color: '#10b981' },
  { name: 'Late', value: 10, color: '#f59e0b' },
  { name: 'Absent', value: 5, color: '#ef4444' },
];

const performanceTrendData = [
  { month: 'Sep', avgScore: 78 },
  { month: 'Oct', avgScore: 82 },
  { month: 'Nov', avgScore: 79 },
  { month: 'Dec', avgScore: 85 },
  { month: 'Jan', avgScore: 88 },
  { month: 'Feb', avgScore: 90 },
];

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Filtered data
  const teacherId = user?.id || '';
  const assignedAssignments = assignments.filter(a => a.createdBy === teacherId);
  const pendingSubmissions = submissions.filter(s => 
    s.status === 'pending' && 
    assignedAssignments.some(a => a.id === s.assignmentId)
  );
  
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
          <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
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
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <h3 className="text-2xl font-bold text-gray-900">{students.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card hover>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-secondary-100 p-3">
                  <Calendar className="h-6 w-6 text-secondary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Classes Today</p>
                  <h3 className="text-2xl font-bold text-gray-900">4</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card hover>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-accent-100 p-3">
                  <FileText className="h-6 w-6 text-accent-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Assignments</p>
                  <h3 className="text-2xl font-bold text-gray-900">{assignedAssignments.length}</h3>
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
                  <CheckCircle className="h-6 w-6 text-warning-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Grades</p>
                  <h3 className="text-2xl font-bold text-gray-900">{pendingSubmissions.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-64 items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Percentage']}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6">
                {attendanceData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="mr-2 h-3 w-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-xs font-medium">{entry.name}: {entry.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Student Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceTrendData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Average Score']}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="avgScore"
                      stroke="#4F46E5"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Class Schedule - Today</CardTitle>
              <Badge variant="primary">4 Classes</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 rounded-lg border border-gray-100 bg-white p-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-800">
                    <span className="text-sm font-medium">8:00</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">Mathematics - 10A</h3>
                    <p className="text-sm text-gray-500">Room 101</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">90 min</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 rounded-lg border border-gray-100 bg-white p-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-800">
                    <span className="text-sm font-medium">10:00</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">Mathematics - 10B</h3>
                    <p className="text-sm text-gray-500">Room 102</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">90 min</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 rounded-lg border border-gray-100 bg-white p-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-800">
                    <span className="text-sm font-medium">1:00</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">Mathematics - 11A</h3>
                    <p className="text-sm text-gray-500">Room 205</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">90 min</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 rounded-lg border border-gray-100 bg-white p-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-800">
                    <span className="text-sm font-medium">2:45</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">Mathematics - 11B</h3>
                    <p className="text-sm text-gray-500">Room 206</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">90 min</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Assignments Due Soon</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto">
              <div className="space-y-4">
                {assignedAssignments.slice(0, 3).map((assignment) => (
                  <div key={assignment.id} className="border-b border-gray-100 pb-4 last:border-0">
                    <h4 className="font-medium">{assignment.title}</h4>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {assignment.grade} {assignment.section} - {assignment.subject}
                      </span>
                      <span className="text-xs font-medium text-error-600">
                        Due: {formatDate(assignment.dueDate)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Avatar
                            key={i}
                            seed={`student-${i}`}
                            alt={`Student ${i}`}
                            size="xs"
                            className="border-2 border-white"
                          />
                        ))}
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-xs">
                          +{students.length - 3}
                        </div>
                      </div>
                      <Badge variant={
                        new Date(assignment.dueDate) < new Date() 
                          ? 'error' 
                          : new Date(assignment.dueDate).getTime() - new Date().getTime() < 86400000 * 3
                          ? 'warning'
                          : 'primary'
                      }>
                        {new Date(assignment.dueDate) < new Date() 
                          ? 'Overdue' 
                          : new Date(assignment.dueDate).getTime() - new Date().getTime() < 86400000 * 3
                          ? 'Due Soon'
                          : 'Upcoming'}
                      </Badge>
                    </div>
                  </div>
                ))}
                
                {assignedAssignments.length === 0 && (
                  <div className="py-6 text-center">
                    <p className="text-sm text-gray-500">No assignments due soon</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t">
              <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                View all assignments
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4 mt-1 flex-shrink-0">
                  <Activity className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    You created a new assignment <span className="font-semibold">Algebra Equations</span>
                  </p>
                  <p className="text-xs text-gray-500">30 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1 flex-shrink-0">
                  <Activity className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    You marked <span className="font-semibold">Mike Johnson's</span> assignment as graded
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1 flex-shrink-0">
                  <Activity className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    You recorded attendance for <span className="font-semibold">Class 10A</span>
                  </p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1 flex-shrink-0">
                  <Activity className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    You sent a message to <span className="font-semibold">Emily Wilson</span>
                  </p>
                  <p className="text-xs text-gray-500">Yesterday at 3:45 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Student Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.slice(0, 4).map((student) => (
                <div key={student.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-center">
                    <Avatar
                      src={student.avatar}
                      alt={student.name}
                      size="sm"
                      seed={student.id}
                      className="mr-3"
                    />
                    <div>
                      <h4 className="text-sm font-medium">{student.name}</h4>
                      <p className="text-xs text-gray-500">
                        ID: {student.studentId} | Grade: {student.grade}{student.section}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <span className="mr-2 text-sm font-medium text-gray-900">
                        {75 + Math.floor(Math.random() * 20)}%
                      </span>
                      <div 
                        className={`h-2 w-16 rounded-full ${
                          Math.random() > 0.7 
                            ? 'bg-success-500' 
                            : Math.random() > 0.4 
                            ? 'bg-warning-500' 
                            : 'bg-error-500'
                        }`}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {Math.floor(Math.random() * 5) + 1}/5 assignments completed
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t">
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View all students
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;