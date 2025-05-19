import React, { useState } from 'react';
import { Menu, Bell, MessageSquare, Search, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { useAuth } from '../../contexts/AuthContext';
import { notifications } from '../../data/mock-data';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const unreadNotifications = notifications.filter(
    n => n.userId === user?.id && !n.read
  );
  
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };
  
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
      <div className="flex items-center">
        <button
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 md:hidden"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>
        
        <div className="ml-2 md:ml-0 relative max-w-md hidden md:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 focus:outline-none"
            onClick={toggleNotifications}
          >
            <Bell size={22} />
            {unreadNotifications.length > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-error-500 text-xs text-white">
                {unreadNotifications.length}
              </span>
            )}
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
              >
                <div className="py-2 px-3 border-b border-gray-100">
                  <h3 className="text-sm font-medium">Notifications</h3>
                </div>
                <div className="max-h-72 overflow-y-auto py-2">
                  {unreadNotifications.length > 0 ? (
                    unreadNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 border-l-4 border-primary-500"
                      >
                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                        <p className="text-xs text-gray-500">
                          {notification.message}
                        </p>
                        <div className="mt-1 flex justify-between">
                          <p className="text-xs text-gray-400">
                            {new Date(notification.createdAt).toLocaleDateString()}
                          </p>
                          <Badge size="sm" variant={notification.type as any}>
                            {notification.type}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <p className="text-sm text-gray-500">No new notifications</p>
                    </div>
                  )}
                </div>
                {unreadNotifications.length > 0 && (
                  <div className="border-t border-gray-100 py-2 px-3 text-center">
                    <button className="text-xs font-medium text-primary-600 hover:text-primary-800">
                      Mark all as read
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="relative">
          <button
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 focus:outline-none"
          >
            <MessageSquare size={22} />
          </button>
        </div>
        
        <div className="relative">
          <button
            className="flex items-center space-x-2 rounded-full text-sm focus:outline-none"
            onClick={toggleUserMenu}
          >
            <Avatar
              src={user?.avatar}
              alt={user?.name || 'User'}
              size="sm"
              seed={user?.id}
            />
            <span className="hidden md:block font-medium text-gray-700">
              {user?.name}
            </span>
            <ChevronDown size={16} className="hidden md:block text-gray-500" />
          </button>
          
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => navigate(`/${user?.role}/profile`)}
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => navigate(`/${user?.role}/settings`)}
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  Sign out
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;