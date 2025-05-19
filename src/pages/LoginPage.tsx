import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { School } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import { isValidRole } from '../lib/utils';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const LoginPage: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  const { user } = useAuth();
  
  // If user is already logged in, redirect to their dashboard
  if (user) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }
  
  // If role is invalid, default to student
  const validRole = role && isValidRole(role) ? role : 'student';
  
  // Get background color based on role
  const getBgColor = () => {
    switch (validRole) {
      case 'admin':
        return 'bg-primary-50';
      case 'teacher':
        return 'bg-secondary-50';
      case 'student':
        return 'bg-accent-50';
      default:
        return 'bg-gray-50';
    }
  };
  
  return (
    <div className={`flex min-h-screen ${getBgColor()}`}>
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto w-full max-w-sm lg:w-96"
        >
          <motion.div variants={item}>
            <div className="flex justify-center">
              <School className="h-12 w-12 text-primary-600" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              EduERP
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Your complete educational management solution
            </p>
          </motion.div>
          
          <motion.div variants={item} className="mt-8">
            <LoginForm role={validRole} />
          </motion.div>
        </motion.div>
      </div>
      
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Educational campus"
        />
      </div>
    </div>
  );
};

export default LoginPage;