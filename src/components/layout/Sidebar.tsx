import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  School, 
  LayoutDashboard, 
  Calendar, 
  GraduationCap,
  Receipt,
  BookOpen,
  Ticket,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../lib/utils';

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}

interface SidebarItem {
  title: string;
  icon: React.ReactNode;
  path: string;
  roles: UserRole[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    path: '/dashboard',
    roles: ['admin', 'teacher', 'student'],
  },
  {
    title: 'Attendance',
    icon: <Calendar size={20} />,
    path: '/attendance',
    roles: ['admin', 'teacher', 'student'],
  },
  {
    title: 'Schedule',
    icon: <Calendar size={20} />,
    path: '/schedule',
    roles: ['admin', 'teacher', 'student'],
  },
  {
    title: 'Results',
    icon: <GraduationCap size={20} />,
    path: '/result',
    roles: ['admin', 'teacher', 'student'],
  },
  {
    title: 'Fees',
    icon: <Receipt size={20} />,
    path: '/fees',
    roles: ['admin', 'student'],
  },
  {
    title: 'Courses',
    icon: <BookOpen size={20} />,
    path: '/course',
    roles: ['admin', 'teacher', 'student'],
  },
  {
    title: 'Hall Ticket',
    icon: <Ticket size={20} />,
    path: '/hallticket',
    roles: ['student'],
  },
  {
    title: 'Notices',
    icon: <Bell size={20} />,
    path: '/notices',
    roles: ['admin', 'teacher', 'student'],
  },
  {
    title: 'Settings',
    icon: <Settings size={20} />,
    path: '/settings',
    roles: ['admin', 'teacher', 'student'],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isOpen, onClose }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const userRole = user?.role || 'student';
  const filteredItems = sidebarItems.filter(item => item.roles.includes(userRole as UserRole));
  
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '-100%' },
  };
  
  const sidebarContent = (
    <>
      <div className="flex items-center justify-between px-4 py-6">
        <div className="flex items-center">
          <School className="h-8 w-8 text-primary-600" />
          <span className="ml-2 text-xl font-bold">EduERP</span>
        </div>
        {isMobile && (
          <button onClick={onClose} className="rounded-md p-2 text-gray-500 hover:bg-gray-100">
            <X size={20} />
          </button>
        )}
      </div>
      
      <nav className="mt-5 flex-1 space-y-1 px-2">
        {filteredItems.map((item) => (
          <Link
            key={item.title}
            to={`/${userRole}${item.path}`}
            className={cn(
              'group flex items-center rounded-md py-2 px-3 text-sm font-medium',
              location.pathname === `/${userRole}${item.path}`
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            <span className="mr-3">{item.icon}</span>
            {item.title}
          </Link>
        ))}
      </nav>
      
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={logout}
          className="group flex w-full items-center rounded-md py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>
    </>
  );
  
  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75" onClick={onClose}></div>
        )}
        
        <motion.div
          initial={isOpen ? 'open' : 'closed'}
          animate={isOpen ? 'open' : 'closed'}
          variants={variants}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={cn(
            'fixed inset-y-0 left-0 z-50 w-64 flex-col bg-white shadow-lg',
            !isOpen && 'pointer-events-none'
          )}
        >
          <div className="flex h-full flex-col">
            {sidebarContent}
          </div>
        </motion.div>
      </>
    );
  }
  
  return (
    <div className="hidden md:flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      {sidebarContent}
    </div>
  );
};

export default Sidebar;