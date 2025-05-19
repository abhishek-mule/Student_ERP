import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        isMobile={true} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <Sidebar 
        isMobile={false} 
        isOpen={true} 
        onClose={() => {}} 
      />
      
      <div className="flex w-0 flex-1 flex-col overflow-hidden">
        <Header onMenuClick={toggleSidebar} />
        
        <main className="relative flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;