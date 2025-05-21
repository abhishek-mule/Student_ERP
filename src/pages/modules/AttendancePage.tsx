import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const AttendancePage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentMonth);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  // Mock attendance data
  const getAttendanceStatus = (day: number) => {
    const random = Math.random();
    if (random > 0.9) return 'absent';
    if (random > 0.8) return 'late';
    return 'present';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Attendance Record</h1>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          leftIcon={<Download size={16} />}
        >
          Download Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Monthly Calendar</CardTitle>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevMonth}
                  leftIcon={<ChevronLeft size={16} />}
                />
                <span className="font-medium">
                  {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextMonth}
                  leftIcon={<ChevronRight size={16} />}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-2 text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const status = getAttendanceStatus(day);
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
                    className={`
                      relative rounded-lg p-2 text-sm transition-colors
                      ${status === 'present' ? 'bg-success-100 text-success-700' : 
                        status === 'absent' ? 'bg-error-100 text-error-700' :
                        'bg-warning-100 text-warning-700'}
                      hover:bg-gray-100
                    `}
                  >
                    {day}
                    <div className={`
                      absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full
                      ${status === 'present' ? 'bg-success-500' : 
                        status === 'absent' ? 'bg-error-500' : 
                        'bg-warning-500'}
                    `} />
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="mb-2 text-sm font-medium text-gray-600">This Month</div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-success-50 p-3 text-center">
                    <div className="text-2xl font-bold text-success-700">85%</div>
                    <div className="text-xs text-success-600">Present</div>
                  </div>
                  <div className="rounded-lg bg-warning-50 p-3 text-center">
                    <div className="text-2xl font-bold text-warning-700">10%</div>
                    <div className="text-xs text-warning-600">Late</div>
                  </div>
                  <div className="rounded-lg bg-error-50 p-3 text-center">
                    <div className="text-2xl font-bold text-error-700">5%</div>
                    <div className="text-xs text-error-600">Absent</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 text-sm font-medium text-gray-600">Recent Activity</div>
                <div className="space-y-3">
                  {[
                    { date: '2025-03-10', status: 'present' },
                    { date: '2025-03-09', status: 'present' },
                    { date: '2025-03-08', status: 'late' },
                    { date: '2025-03-07', status: 'present' },
                    { date: '2025-03-06', status: 'absent' },
                  ].map((day, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="text-sm">{new Date(day.date).toLocaleDateString()}</div>
                      <Badge
                        variant={
                          day.status === 'present' ? 'success' :
                          day.status === 'absent' ? 'error' : 'warning'
                        }
                      >
                        {day.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendancePage;