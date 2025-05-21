import React, { useState } from 'react';
import {
  User,
  Lock,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Phone,
  Home,
  Calendar,
  Save,
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import { useAuth } from '../../contexts/AuthContext';

const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    newsUpdates: true,
    assignmentReminders: true,
    attendanceAlerts: true,
    feeReminders: true,
    examSchedules: true,
  });

  const handleNotificationChange = (setting: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof notificationSettings],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-1">
          <CardContent className="p-4">
            <nav className="space-y-1">
              {[
                { id: 'profile', icon: User, label: 'Profile' },
                { id: 'security', icon: Shield, label: 'Security' },
                { id: 'notifications', icon: Bell, label: 'Notifications' },
                { id: 'appearance', icon: Palette, label: 'Appearance' },
                { id: 'language', icon: Globe, label: 'Language' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center space-x-3 rounded-lg px-4 py-2 text-sm font-medium ${
                    activeTab === item.id
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-3">
          {activeTab === 'profile' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar
                      src={user?.avatar}
                      alt={user?.name || ''}
                      size="xl"
                      seed={user?.id}
                    />
                    <div>
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                      <p className="mt-1 text-xs text-gray-500">
                        JPG, GIF or PNG. Max size of 800K
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        defaultValue={user?.name}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        defaultValue={user?.email}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        type="tel"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                      <input
                        type="date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    ></textarea>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-4 border-t px-6 py-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">{user?.email}</div>
                        <div className="text-sm text-gray-500">Primary Email</div>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">+1 234 567 890</div>
                        <div className="text-sm text-gray-500">Primary Phone</div>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Home className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">123 Main St, City, Country</div>
                        <div className="text-sm text-gray-500">Primary Address</div>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Change Password</h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Authenticator App</div>
                          <div className="text-sm text-gray-500">
                            Use an authenticator app to generate one-time codes
                          </div>
                        </div>
                        <Button variant="outline">Enable</Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Login History</h3>
                    <div className="mt-4 space-y-4">
                      {[
                        {
                          device: 'Windows PC - Chrome',
                          location: 'New York, USA',
                          time: '2 hours ago',
                          status: 'current',
                        },
                        {
                          device: 'iPhone 12 - Safari',
                          location: 'New York, USA',
                          time: '1 day ago',
                          status: 'success',
                        },
                        {
                          device: 'MacBook Pro - Chrome',
                          location: 'New York, USA',
                          time: '3 days ago',
                          status: 'success',
                        },
                      ].map((session, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg border p-4"
                        >
                          <div>
                            <div className="font-medium">{session.device}</div>
                            <div className="text-sm text-gray-500">
                              {session.location} • {session.time}
                            </div>
                          </div>
                          {session.status === 'current' ? (
                            <Badge variant="success">Current Session</Badge>
                          ) : (
                            <Button variant="outline" size="sm">
                              Logout
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4 border-t px-6 py-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Notification Channels</h3>
                    <div className="mt-4 space-y-4">
                      {[
                        {
                          id: 'emailNotifications',
                          label: 'Email Notifications',
                          description: 'Receive notifications via email',
                        },
                        {
                          id: 'pushNotifications',
                          label: 'Push Notifications',
                          description: 'Receive notifications on your device',
                        },
                        {
                          id: 'smsNotifications',
                          label: 'SMS Notifications',
                          description: 'Receive notifications via SMS',
                        },
                      ].map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between rounded-lg border p-4"
                        >
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-sm text-gray-500">{item.description}</div>
                          </div>
                          <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={notificationSettings[item.id as keyof typeof notificationSettings]}
                              onChange={() => handleNotificationChange(item.id)}
                            />
                            <span
                              className={`${
                                notificationSettings[item.id as keyof typeof notificationSettings]
                                  ? 'bg-primary-600'
                                  : 'bg-gray-200'
                              } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Notification Types</h3>
                    <div className="mt-4 space-y-4">
                      {[
                        {
                          id: 'newsUpdates',
                          label: 'News & Updates',
                          description: 'Important news and updates about the institution',
                        },
                        {
                          id: 'assignmentReminders',
                          label: 'Assignment Reminders',
                          description: 'Reminders about upcoming assignments and deadlines',
                        },
                        {
                          id: 'attendanceAlerts',
                          label: 'Attendance Alerts',
                          description: 'Alerts about attendance status and updates',
                        },
                        {
                          id: 'feeReminders',
                          label: 'Fee Reminders',
                          description: 'Reminders about fee payments and due dates',
                        },
                        {
                          id: 'examSchedules',
                          label: 'Exam Schedules',
                          description: 'Updates about exam schedules and changes',
                        },
                      ].map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between rounded-lg border p-4"
                        >
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-sm text-gray-500">{item.description}</div>
                          </div>
                          <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={notificationSettings[item.id as keyof typeof notificationSettings]}
                              onChange={() => handleNotificationChange(item.id)}
                            />
                            <span
                              className={`${
                                notificationSettings[item.id as keyof typeof notificationSettings]
                                  ? 'bg-primary-600'
                                  : 'bg-gray-200'
                              } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4 border-t px-6 py-4">
                <Button variant="outline">Reset to Default</Button>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Theme</h3>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {['Light', 'Dark', 'System'].map((theme) => (
                        <div
                          key={theme}
                          className="flex cursor-pointer items-center justify-center rounded-lg border p-4 hover:border-primary-500"
                        >
                          {theme}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Color Scheme</h3>
                    <div className="mt-4 grid grid-cols-6 gap-4">
                      {['Blue', 'Green', 'Purple', 'Red', 'Orange', 'Pink'].map((color) => (
                        <div
                          key={color}
                          className="flex h-10 cursor-pointer items-center justify-center rounded-lg border hover:border-primary-500"
                        >
                          <div
                            className="h-6 w-6 rounded-full"
                            style={{
                              backgroundColor:
                                color === 'Blue'
                                  ? '#3B82F6'
                                  : color === 'Green'
                                  ? '#10B981'
                                  : color === 'Purple'
                                  ? '#8B5CF6'
                                  : color === 'Red'
                                  ? '#EF4444'
                                  : color === 'Orange'
                                  ? '#F97316'
                                  : '#EC4899',
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Font Size</h3>
                    <div className="mt-4">
                      <input
                        type="range"
                        min="12"
                        max="20"
                        step="1"
                        defaultValue="16"
                        className="w-full"
                      />
                      <div className="mt-2 flex justify-between text-sm text-gray-500">
                        <span>Small</span>
                        <span>Medium</span>
                        <span>Large</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4 border-t px-6 py-4">
                <Button variant="outline">Reset to Default</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === 'language' && (
            <Card>
              <CardHeader>
                <CardTitle>Language & Region</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Language</h3>
                    <div className="mt-4">
                      <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Time Zone</h3>
                    <div className="mt-4">
                      <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                        <option>(GMT-05:00) Eastern Time</option>
                        <option>(GMT-06:00) Central Time</option>
                        <option>(GMT-07:00) Mountain Time</option>
                        <option>(GMT-08:00) Pacific Time</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Date Format</h3>
                    <div className="mt-4">
                      <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY/MM/DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4 border-t px-6 py-4">
                <Button variant="outline">Reset to Default</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;