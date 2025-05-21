import React, { useState } from 'react';
import { BookOpen, Users, Clock, Calendar, Search, Filter, Download } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';

const courses = [
  {
    id: 1,
    code: 'MATH101',
    name: 'Advanced Mathematics',
    instructor: 'Dr. Jane Doe',
    credits: 3,
    enrolled: 45,
    schedule: 'Mon, Wed 10:00 AM',
    status: 'ongoing',
  },
  {
    id: 2,
    code: 'PHY201',
    name: 'Physics II',
    instructor: 'Prof. David Brown',
    credits: 4,
    enrolled: 38,
    schedule: 'Tue, Thu 2:00 PM',
    status: 'ongoing',
  },
  {
    id: 3,
    code: 'CHEM101',
    name: 'General Chemistry',
    instructor: 'Dr. Sarah Wilson',
    credits: 3,
    enrolled: 42,
    schedule: 'Mon, Wed 1:00 PM',
    status: 'upcoming',
  },
  {
    id: 4,
    code: 'BIO201',
    name: 'Biology II',
    instructor: 'Prof. Michael Thompson',
    credits: 4,
    enrolled: 35,
    schedule: 'Tue, Thu 11:00 AM',
    status: 'completed',
  },
];

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredCourses = courses.filter(
    (course) =>
      (course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedStatus === 'all' || course.status === selectedStatus)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600">Manage and view your enrolled courses</p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            leftIcon={<Download size={16} />}
          >
            Export Schedule
          </Button>
          <Button className="flex items-center gap-2" leftIcon={<BookOpen size={16} />}>
            Browse Courses
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-primary-100 p-3">
                <BookOpen className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <h3 className="text-2xl font-bold text-gray-900">{courses.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-success-100 p-3">
                <Clock className="h-6 w-6 text-success-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Ongoing</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {courses.filter((c) => c.status === 'ongoing').length}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-warning-100 p-3">
                <Calendar className="h-6 w-6 text-warning-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {courses.filter((c) => c.status === 'upcoming').length}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-error-100 p-3">
                <Users className="h-6 w-6 text-error-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {courses.filter((c) => c.status === 'completed').length}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Enrolled Courses</CardTitle>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-9 pr-4 py-2 border rounded-md w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  className="border rounded-md px-2 py-2"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-4 text-sm font-medium text-gray-500">Course Code</th>
                  <th className="pb-4 text-sm font-medium text-gray-500">Course Name</th>
                  <th className="pb-4 text-sm font-medium text-gray-500">Instructor</th>
                  <th className="pb-4 text-sm font-medium text-gray-500">Schedule</th>
                  <th className="pb-4 text-sm font-medium text-gray-500">Credits</th>
                  <th className="pb-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="pb-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredCourses.map((course) => (
                  <tr key={course.id}>
                    <td className="py-4">
                      <div className="font-medium">{course.code}</div>
                    </td>
                    <td className="py-4">
                      <div className="font-medium">{course.name}</div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Avatar
                          seed={`instructor-${course.id}`}
                          alt={course.instructor}
                          size="sm"
                        />
                        <span>{course.instructor}</span>
                      </div>
                    </td>
                    <td className="py-4">{course.schedule}</td>
                    <td className="py-4">{course.credits}</td>
                    <td className="py-4">
                      <Badge
                        variant={
                          course.status === 'ongoing'
                            ? 'success'
                            : course.status === 'upcoming'
                            ? 'warning'
                            : 'primary'
                        }
                      >
                        {course.status}
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
        <CardFooter className="flex items-center justify-between border-t px-6 py-4">
          <div className="text-sm text-gray-500">Showing {filteredCourses.length} courses</div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Course Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses
                .filter((c) => c.status === 'ongoing')
                .map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-primary-100 p-2">
                        <BookOpen className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {course.code} - {course.name}
                        </div>
                        <div className="text-sm text-gray-500">{course.instructor}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{course.schedule}</div>
                      <div className="text-sm text-gray-500">{course.credits} Credits</div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="mb-2 text-sm font-medium text-gray-600">Credits Distribution</div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-primary-50 p-4 text-center">
                    <div className="text-2xl font-bold text-primary-700">14</div>
                    <div className="text-xs text-primary-600">Total Credits</div>
                  </div>
                  <div className="rounded-lg bg-success-50 p-4 text-center">
                    <div className="text-2xl font-bold text-success-700">7</div>
                    <div className="text-xs text-success-600">Completed</div>
                  </div>
                  <div className="rounded-lg bg-warning-50 p-4 text-center">
                    <div className="text-2xl font-bold text-warning-700">7</div>
                    <div className="text-xs text-warning-600">Remaining</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 text-sm font-medium text-gray-600">Course Progress</div>
                {courses.map((course) => (
                  <div key={course.id} className="mb-4 last:mb-0">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="text-sm font-medium">{course.name}</div>
                      <div className="text-sm text-gray-500">75%</div>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-primary-500"
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoursesPage;