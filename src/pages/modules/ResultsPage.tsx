import React, { useState } from 'react';
import { Download, TrendingUp, Award, BookOpen, ChevronDown } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { month: 'Sep', score: 85 },
  { month: 'Oct', score: 88 },
  { month: 'Nov', score: 82 },
  { month: 'Dec', score: 91 },
  { month: 'Jan', score: 85 },
  { month: 'Feb', score: 88 },
];

const subjects = [
  { name: 'Mathematics', marks: 92, grade: 'A', status: 'excellent' },
  { name: 'Physics', marks: 88, grade: 'A', status: 'good' },
  { name: 'Chemistry', marks: 85, grade: 'A', status: 'good' },
  { name: 'Biology', marks: 90, grade: 'A', status: 'excellent' },
  { name: 'English', marks: 87, grade: 'A', status: 'good' },
  { name: 'History', marks: 89, grade: 'A', status: 'good' },
];

const ResultsPage = () => {
  const [selectedSemester, setSelectedSemester] = useState('Spring 2025');
  const cgpa = 3.85;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Results</h1>
          <p className="text-gray-600">View and analyze your academic performance</p>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          leftIcon={<Download size={16} />}
        >
          Download Transcript
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-primary-100 p-3">
                <Award className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">CGPA</p>
                <h3 className="text-2xl font-bold text-gray-900">{cgpa.toFixed(2)}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-success-100 p-3">
                <TrendingUp className="h-6 w-6 text-success-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Current Semester GPA</p>
                <h3 className="text-2xl font-bold text-gray-900">3.92</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-warning-100 p-3">
                <BookOpen className="h-6 w-6 text-warning-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Credits Completed</p>
                <h3 className="text-2xl font-bold text-gray-900">96/120</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Performance Trend</CardTitle>
                <div className="relative">
                  <button className="flex items-center rounded-md border px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    {selectedSemester}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#4F46E5"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['A', 'B', 'C', 'D', 'F'].map((grade, index) => (
                <div key={grade} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="font-medium">{grade}</div>
                    <div className="text-sm text-gray-500">
                      ({index === 0 ? '4' : index === 1 ? '2' : index === 2 ? '1' : '0'} courses)
                    </div>
                  </div>
                  <div className="flex w-32 items-center">
                    <div
                      className="h-2 rounded-full bg-primary-500"
                      style={{
                        width: `${
                          index === 0
                            ? '80'
                            : index === 1
                            ? '40'
                            : index === 2
                            ? '20'
                            : '0'
                        }%`,
                      }}
                    ></div>
                    <span className="ml-2 text-sm text-gray-500">
                      {index === 0
                        ? '80%'
                        : index === 1
                        ? '40%'
                        : index === 2
                        ? '20%'
                        : '0%'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Subject-wise Performance</CardTitle>
            <Button variant="outline" size="sm">
              View Previous Semesters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-4 text-sm font-medium text-gray-500">Subject</th>
                  <th className="pb-4 text-sm font-medium text-gray-500">Marks</th>
                  <th className="pb-4 text-sm font-medium text-gray-500">Grade</th>
                  <th className="pb-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="pb-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {subjects.map((subject, index) => (
                  <tr key={index}>
                    <td className="py-4">
                      <div className="font-medium">{subject.name}</div>
                    </td>
                    <td className="py-4">{subject.marks}/100</td>
                    <td className="py-4">
                      <Badge
                        variant={
                          subject.grade === 'A'
                            ? 'success'
                            : subject.grade === 'B'
                            ? 'primary'
                            : 'warning'
                        }
                      >
                        {subject.grade}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Badge
                        variant={
                          subject.status === 'excellent'
                            ? 'success'
                            : subject.status === 'good'
                            ? 'primary'
                            : 'warning'
                        }
                      >
                        {subject.status}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsPage;