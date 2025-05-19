import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  School, 
  LayoutDashboard, 
  Users, 
  FileText, 
  Calendar, 
  DollarSign, 
  MessageSquare, 
  BarChart, 
  Settings, 
  LogOut, 
  ChevronRight,
  Menu,
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
  submenu?: {
    title: string;
    path: string;
  }[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    path: '/dashboard',
    roles: ['admin', 'teacher', 'student'],
  },
  {
    title: 'Students',
    icon: <Users size={20} />,
    path: '/students',
    roles: ['admin', 'teacher'],
    submenu: [
      { title: 'All Students', path: '/students' },
      { title: 'Add Student', path: '/students/add' },
    ],
  },
  {
    title: 'Teachers',
    icon: <Users size={20} />,
    path: '/teachers',
    roles: ['admin'],
    submenu: [
      { title: 'All Teachers', path: '/teachers' },
      { title: 'Add Teacher', path: '/teachers/add' },
    ],
  },
  {
    title: 'Attendance',
    icon: <Calendar size={20} />,
    path: '/attendance',
    roles: ['admin', 'teacher', 'student'],
  },
  {
    title: 'Assignments',
    icon: <FileText size={20} />,
    path: '/assignments',
    roles: ['admin', 'teacher', 'student'],
  },
  {
    title: 'Fees',
    icon: <DollarSign size={20} />,
    path: '/fees',
    roles: ['admin', 'student'],
  },
  {
    title: 'Messages',
    icon: <MessageSquare size={20} />,
    path: '/messages',
    roles: ['admin', 'teacher', 'student'],
  },
  {
    title: 'Analytics',
    icon: <BarChart size={20} />,
    path: '/analytics',
    roles: ['admin', 'teacher'],
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
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
  const userRole = user?.role || 'student';
  const filteredItems = sidebarItems.filter(item => item.roles.includes(userRole as UserRole));
  
  const toggleExpanded = (title: string) => {
    setExpandedItem(expandedItem === title ? null : title);
  };
  
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
          <div key={item.title}>
            {item.submenu ? (
              <div>
                <button
                  onClick={() => toggleExpanded(item.title)}
                  className={cn(
                    'group flex w-full items-center rounded-md py-2 px-3 text-sm font-medium',
                    location.pathname.startsWith(`/${userRole}${item.path}`)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <div className="flex flex-1 items-center">
                    <span className="mr-3">{item.icon}</span>
                    {item.title}
                  </div>
                  <ChevronRight
                    size={16}
                    className={cn(
                      'transition-transform duration-200',
                      expandedItem === item.title ? 'rotate-90' : ''
                    )}
                  />
                </button>
                
                {expandedItem === item.title && (
                  <div className="mt-1 space-y-1 pl-10">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.title}
                        to={`/${userRole}${subItem.path}`}
                        className={cn(
                          'block rounded-md py-2 px-3 text-sm font-medium',
                          location.pathname === `/${userRole}${subItem.path}`
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        )}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
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
            )}
          </div>
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