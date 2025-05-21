import React, { useState } from 'react';
import { Bell, Search, Filter, Calendar, Users, BookOpen, Download } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';

const notices = [
  {
    id: 1,
    title: 'Mid-Term Examination Schedule',
    category: 'academic',
    department: 'All Departments',
    date: '2025-03-15',
    priority: 'high',
    content:
      'The mid-term examinations for all courses will be conducted from March 25th to April 5th, 2025. The detailed schedule has been attached below.',
    attachments: ['schedule.pdf'],
    author: 'Academic Office',
  },
  {
    id: 2,
    title: 'Annual Sports Day Registration',
    category: 'events',
    department: 'Sports',
    date: '2025-03-10',
    priority: 'medium',
    content:
      'Registration for Annual Sports Day events is now open. Students interested in participating can register through the sports portal.',
    author: 'Sports Committee',
  },
  {
    id: 3,
    title: 'Library Working Hours Update',
    category: 'general',
    department: 'Library',
    date: '2025-03-08',
    priority: 'low',
    content:
      'The library will remain open from 8:00 AM to 8:00 PM on weekdays and 9:00 AM to 5:00 PM on weekends.',
    author: 'Library Department',
  },
  {
    id: 4,
    title: 'Workshop on Machine Learning',
    category: 'workshop',
    department: 'Computer Science',
    date: '2025-03-20',
    priority: 'medium',
    content:
      'A workshop on Machine Learning basics will be conducted on March 20th. All interested students can register.',
    attachments: ['workshop_details.pdf'],
    author: 'CS Department',
  },
];

const NoticesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const filteredNotices = notices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || notice.category === selectedCategory) &&
      (selectedPriority === 'all' || notice.priority === selectedPriority)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notices & Announcements</h1>
          <p className="text-gray-600">Stay updated with the latest announcements</p>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          leftIcon={<Download size={16} />}
        >
          Export Notices
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-primary-100 p-3">
                <Bell className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Notices</p>
                <h3 className="text-2xl font-bold text-gray-900">{notices.length}</h3>
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
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {notices.filter((n) => new Date(n.date).getMonth() === new Date().getMonth()).length}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-error-100 p-3">
                <BookOpen className="h-6 w-6 text-error-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <h3 className="text-2xl font-bold text-gray-900">2</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>All Notices</CardTitle>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notices..."
                  className="pl-9 pr-4 py-2 border rounded-md w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  className="border rounded-md px-2 py-2"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="academic">Academic</option>
                  <option value="events">Events</option>
                  <option value="general">General</option>
                  <option value="workshop">Workshop</option>
                </select>
                <select
                  className="border rounded-md px-2 py-2"
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                >
                  <option value="all">All Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="rounded-lg border p-4 transition-all hover:border-primary-500 hover:shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{notice.title}</h3>
                      <Badge
                        variant={
                          notice.priority === 'high'
                            ? 'error'
                            : notice.priority === 'medium'
                            ? 'warning'
                            : 'success'
                        }
                        size="sm"
                      >
                        {notice.priority}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{notice.content}</p>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="mr-1 h-4 w-4" />
                        {notice.department}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="mr-1 h-4 w-4" />
                        {new Date(notice.date).toLocaleDateString()}
                      </div>
                      <Badge variant="secondary" size="sm">
                        {notice.category}
                      </Badge>
                    </div>
                    {notice.attachments && (
                      <div className="mt-4">
                        {notice.attachments.map((attachment, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="mr-2"
                            leftIcon={<Download size={14} />}
                          >
                            {attachment}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t px-6 py-4">
          <div className="text-sm text-gray-500">Showing {filteredNotices.length} notices</div>
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
            <CardTitle>Notice Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Academic', count: 12, icon: BookOpen },
                { name: 'Events', count: 8, icon: Calendar },
                { name: 'General', count: 5, icon: Bell },
                { name: 'Workshop', count: 3, icon: Users },
              ].map((category, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-primary-100 p-2">
                      <category.icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="font-medium">{category.name}</div>
                  </div>
                  <Badge variant="secondary">{category.count} notices</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notices.slice(0, 4).map((notice, index) => (
                <div key={index} className="flex items-start space-x-4 border-b pb-4 last:border-0">
                  <Avatar seed={`notice-${notice.id}`} alt={notice.author} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{notice.author}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(notice.date).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="mt-1 text-sm">{notice.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t">
            <Button variant="outline" size="sm" className="w-full">
              View All Updates
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default NoticesPage;