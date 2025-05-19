import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { School, ShieldCheck, Users, Calendar, FileText, BarChart } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary-500" />,
      title: 'Student Management',
      description: 'Maintain detailed student profiles and monitor academic progress with ease.',
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary-500" />,
      title: 'Attendance Tracking',
      description: 'Track student attendance with visual reports and automatic notification system.',
    },
    {
      icon: <FileText className="h-8 w-8 text-primary-500" />,
      title: 'Assignments & Grading',
      description: 'Create, distribute, and grade assignments digitally with intuitive workflows.',
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary-500" />,
      title: 'Analytics & Reporting',
      description: 'Generate insightful reports on student performance, attendance, and more.',
    },
  ];
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <School className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold">EduERP</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/login/admin')}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="space-y-6"
            >
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Modern Education Management System
              </h1>
              <p className="text-lg md:text-xl">
                A comprehensive ERP solution designed specifically for educational institutions, 
                streamlining administrative tasks and enhancing learning experiences.
              </p>
              <div className="flex space-x-4">
                <Button 
                  variant="accent" 
                  size="lg"
                  onClick={() => navigate('/login/admin')}
                >
                  Admin Login
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => navigate('/login/teacher')}
                >
                  Teacher Login
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white text-primary-800 hover:bg-gray-100"
                  onClick={() => navigate('/login/student')}
                >
                  Student Login
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <img 
                src="https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Education" 
                className="rounded-lg shadow-xl max-h-96 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Features</h2>
            <p className="mt-4 text-lg text-gray-600">
              Designed to enhance productivity and streamline educational processes
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="h-full">
                  <CardContent className="flex flex-col items-center text-center">
                    <div className="mb-4 rounded-full bg-primary-50 p-3">
                      {feature.icon}
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-accent-500 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-accent-600 px-6 py-8 md:py-10 md:px-10 shadow-xl">
            <div className="flex flex-col items-center md:flex-row md:justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold text-white">Ready to get started?</h2>
                <p className="mt-2 text-accent-100">
                  Sign in to access your educational management dashboard.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="outline" 
                  className="bg-white text-accent-800 hover:bg-gray-100 border-0"
                  onClick={() => navigate('/login/admin')}
                >
                  Admin
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white text-accent-800 hover:bg-gray-100 border-0"
                  onClick={() => navigate('/login/teacher')}
                >
                  Teacher
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white text-accent-800 hover:bg-gray-100 border-0"
                  onClick={() => navigate('/login/student')}
                >
                  Student
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-gray-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between md:flex-row">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <School className="h-8 w-8 text-primary-500" />
                <span className="ml-2 text-xl font-bold text-white">EduERP</span>
              </div>
              <p className="mt-4 max-w-md text-sm">
                A comprehensive educational management system designed to streamline administrative tasks and enhance learning experiences.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Product</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-sm hover:text-white">Features</a></li>
                  <li><a href="#" className="text-sm hover:text-white">Pricing</a></li>
                  <li><a href="#" className="text-sm hover:text-white">Demo</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-sm hover:text-white">Documentation</a></li>
                  <li><a href="#" className="text-sm hover:text-white">Help Center</a></li>
                  <li><a href="#" className="text-sm hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-sm hover:text-white">Privacy</a></li>
                  <li><a href="#" className="text-sm hover:text-white">Terms</a></li>
                  <li><a href="#" className="text-sm hover:text-white">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row md:justify-between">
            <p className="text-sm">&copy; 2025 EduERP. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;