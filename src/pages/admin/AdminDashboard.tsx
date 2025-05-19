import React from 'react';
import { motion } from 'framer-motion';
import { Users, School, DollarSign, BarChart2, TrendingUp, ArrowUp, ArrowDown, FileText, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import { useAuth } from '../../contexts/AuthContext';
import { students, teachers } from '../../data/mock-data';

// Mock data
const attendanceData = [
  { grade: '7th', attendance: 95 },
  { grade: '8th', attendance: 92 },
  { grade: '9th', attendance: 88 },
  { grade: '10th', attendance: 90 },
  { grade: '11th', attendance: 87 },
  { grade: '12th', attendance: 85 },
];

const feeCollectionData = [
  { name: 'Paid', value: 75, color: '#10b981' },
  { name: 'Pending', value: 20, color: '#f59e0b' },
  { name: 'Overdue', value: 5, color: '#ef4444' },
];

const performanceTrendData = [
  { month: 'Sep', score: 75 },
  { month: 'Oct', score: 78 },
  { month: 'Nov', score: 80 },
  { month: 'Dec', score: 82 },
  { month: 'Jan', score: 85 },
  { month: 'Feb', score: 88 },
];

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  
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
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
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
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <div className="flex items-center">
                    <h3 className="text-2xl font-bold text-gray-900">{students.length}</h3>
                    <span className="ml-2 flex items-center text-xs font-medium text-success-600">
                      <ArrowUp className="mr-1 h-3 w-3" />
                      8%
                    </span>
                  </div>
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
                  <School className="h-6 w-6 text-secondary-600" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-600">Total Teachers</p>
                  <div className="flex items-center">
                    <h3 className="text-2xl font-bold text-gray-900">{teachers.length}</h3>
                    <span className="ml-2 flex items-center text-xs font-medium text-success-600">
                      <ArrowUp className="mr-1 h-3 w-3" />
                      5%
                    </span>
                  </div>
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
                  <DollarSign className="h-6 w-6 text-accent-600" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <div className="flex items-center">
                    <h3 className="text-2xl font-bold text-gray-900">$24,500</h3>
                    <span className="ml-2 flex items-center text-xs font-medium text-error-600">
                      <ArrowDown className="mr-1 h-3 w-3" />
                      3%
                    </span>
                  </div>
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
                  <BarChart2 className="h-6 w-6 text-success-600" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-600">Average Attendance</p>
                  <div className="flex items-center">
                    <h3 className="text-2xl font-bold text-gray-900">89.5%</h3>
                    <span className="ml-2 flex items-center text-xs font-medium text-success-600">
                      <ArrowUp className="mr-1 h-3 w-3" />
                      2%
                    </span>
                  </div>
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
              <CardTitle>Student Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceTrendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Average Score']}
                      contentStyle={{ 
                        borderRadius: '8px', 
                        border: 'none', 
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
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
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Fee Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-64 items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={feeCollectionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {feeCollectionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Percentage']}
                      contentStyle={{ 
                        borderRadius: '8px', 
                        border: 'none', 
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6">
                {feeCollectionData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="mr-2 h-3 w-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-xs font-medium">
                      {entry.name}: {entry.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Staff Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teachers.map((teacher, index) => (
                <div key={teacher.id} className="flex items-center border-b border-gray-100 pb-4 last:border-0">
                  <Avatar
                    src={teacher.avatar}
                    alt={teacher.name}
                    size="md"
                    seed={teacher.id}
                    className="mr-4"
                  />
                  <div className="flex-grow">
                    <h4 className="font-medium">{teacher.name}</h4>
                    <p className="text-sm text-gray-500">
                      {teacher.department} | {teacher.subjects.join(', ')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={index % 3 === 0 ? 'success' : index % 3 === 1 ? 'warning' : 'primary'}
                    >
                      {index % 3 === 0 ? 'Active' : index % 3 === 1 ? 'Away' : 'Busy'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t">
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View all staff
            </button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Attendance by Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={attendanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="grade" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Attendance']}
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                    }}
                  />
                  <Bar dataKey="attendance" fill="#0D9488" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4 flex-shrink-0 rounded-md bg-primary-100 p-2">
                  <Calendar className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium">Staff Meeting</h4>
                  <p className="text-sm text-gray-500">
                    March 15, 2025 • 10:00 AM
                  </p>
                  <p className="mt-1 text-sm">
                    Monthly staff meeting in the conference room.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 flex-shrink-0 rounded-md bg-success-100 p-2">
                  <Calendar className="h-5 w-5 text-success-600" />
                </div>
                <div>
                  <h4 className="font-medium">Parent-Teacher Conference</h4>
                  <p className="text-sm text-gray-500">
                    March 20, 2025 • 3:00 PM
                  </p>
                  <p className="mt-1 text-sm">
                    Quarterly meeting with parents to discuss student progress.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 flex-shrink-0 rounded-md bg-warning-100 p-2">
                  <Calendar className="h-5 w-5 text-warning-600" />
                </div>
                <div>
                  <h4 className="font-medium">Annual Sports Day</h4>
                  <p className="text-sm text-gray-500">
                    April 5, 2025 • 9:00 AM
                  </p>
                  <p className="mt-1 text-sm">
                    Annual sports event at the school grounds.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t">
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View all events
            </button>
          </CardFooter>
        </Card>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex-shrink-0">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Jane Doe</span> created a new assignment 
                      <span className="font-medium text-gray-900"> Algebra Equations</span> for 
                      <span className="font-medium text-gray-900"> Class 10A</span>
                    </p>
                    <p className="text-xs text-gray-500">30 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex-shrink-0">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">David Brown</span> marked attendance for 
                      <span className="font-medium text-gray-900"> Class 11B</span>
                    </p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex-shrink-0">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">John Smith</span> processed fee payment for 
                      <span className="font-medium text-gray-900"> Mike Johnson</span>
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">System</span> generated monthly performance report for 
                      <span className="font-medium text-gray-900"> February 2025</span>
                    </p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex-shrink-0">
                    <School className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">You</span> added a new student 
                      <span className="font-medium text-gray-900"> Alex Thompson</span> to 
                      <span className="font-medium text-gray-900"> Class 10B</span>
                    </p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t">
              <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                View all activities
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;