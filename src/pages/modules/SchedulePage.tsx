import React, { useState } from 'react';
import { Calendar, Clock, Download, ChevronLeft, ChevronRight, Users, MapPin } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const periods = ['8:00 AM', '9:30 AM', '11:00 AM', '1:00 PM', '2:30 PM', '4:00 PM'];

const SchedulePage = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');

  const mockSchedule = {
    Monday: [
      { time: '8:00 AM', subject: 'Mathematics', teacher: 'Jane Doe', room: '101', duration: '90 min' },
      { time: '9:30 AM', subject: 'Physics', teacher: 'David Brown', room: 'Lab 1', duration: '90 min' },
      { time: '11:00 AM', subject: 'Break', duration: '60 min' },
      { time: '1:00 PM', subject: 'Chemistry', teacher: 'Sarah Wilson', room: 'Lab 2', duration: '90 min' },
    ],
    Tuesday: [
      { time: '8:00 AM', subject: 'English', teacher: 'Michael Thompson', room: '202', duration: '90 min' },
      { time: '9:30 AM', subject: 'History', teacher: 'Emily Davis', room: '303', duration: '90 min' },
      { time: '11:00 AM', subject: 'Break', duration: '60 min' },
      { time: '1:00 PM', subject: 'Geography', teacher: 'Robert Johnson', room: '204', duration: '90 min' },
    ],
    // Add more days...
  };

  const prevWeek = () => {
    setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() - 7)));
  };

  const nextWeek = () => {
    setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() + 7)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Class Schedule</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setViewMode('day')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'day'
                  ? 'bg-primary-100 text-primary-800'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'week'
                  ? 'bg-primary-100 text-primary-800'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Week
            </button>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            leftIcon={<Download size={16} />}
          >
            Export Schedule
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Weekly Schedule</CardTitle>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevWeek}
                leftIcon={<ChevronLeft size={16} />}
              />
              <span className="font-medium">
                {currentWeek.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={nextWeek}
                leftIcon={<ChevronRight size={16} />}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-4">
            {days.map((day) => (
              <div key={day} className="text-center font-medium text-gray-700">
                {day}
              </div>
            ))}
            {days.map((day) => (
              <div key={day} className="space-y-2">
                {periods.map((period, index) => (
                  <div
                    key={`${day}-${period}`}
                    className={`rounded-lg border p-2 ${
                      index === 2 ? 'bg-gray-50 border-dashed' : 'bg-white'
                    }`}
                  >
                    <div className="text-xs font-medium text-gray-500">{period}</div>
                    {index !== 2 && (
                      <>
                        <div className="mt-1 font-medium">Mathematics</div>
                        <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center">
                            <Users size={12} className="mr-1" />
                            <span>Jane Doe</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin size={12} className="mr-1" />
                            <span>Room 101</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSchedule.Monday.map((slot, index) => (
                <div
                  key={index}
                  className={`rounded-lg border p-4 ${
                    slot.subject === 'Break' ? 'bg-gray-50 border-dashed' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                        <Clock size={20} />
                      </div>
                      <div>
                        <div className="font-medium">{slot.subject}</div>
                        {slot.subject !== 'Break' && (
                          <div className="text-sm text-gray-500">{slot.teacher}</div>
                        )}
                      </div>
                    </div>
                    <Badge variant="secondary">{slot.duration}</Badge>
                  </div>
                  {slot.subject !== 'Break' && (
                    <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{slot.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        <span>Room {slot.room}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Jane Doe', 'David Brown', 'Sarah Wilson', 'Michael Thompson'].map((teacher, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex items-center space-x-3">
                    <Avatar seed={`teacher-${index}`} alt={teacher} />
                    <div>
                      <div className="font-medium">{teacher}</div>
                      <div className="text-sm text-gray-500">Mathematics</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Schedule
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Room Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['101', '102', '103', 'Lab 1', 'Lab 2', 'Library'].map((room, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <div className="font-medium">Room {room}</div>
                    <div className="text-sm text-gray-500">Floor 1</div>
                  </div>
                  <Badge
                    variant={index % 3 === 0 ? 'success' : index % 3 === 1 ? 'error' : 'warning'}
                  >
                    {index % 3 === 0 ? 'Available' : index % 3 === 1 ? 'Occupied' : 'Reserved'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchedulePage;