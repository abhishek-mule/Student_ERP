import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, School } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Alert from '../ui/Alert';
import { UserRole } from '../../lib/utils';

interface LoginFormProps {
  role: UserRole;
}

const roleInfo = {
  admin: {
    title: 'Admin Login',
    email: 'admin@eduerp.com',
    icon: <User className="h-10 w-10 text-primary-600" />,
  },
  teacher: {
    title: 'Teacher Login',
    email: 'teacher@eduerp.com',
    icon: <User className="h-10 w-10 text-secondary-600" />,
  },
  student: {
    title: 'Student Login',
    email: 'student@eduerp.com',
    icon: <School className="h-10 w-10 text-accent-600" />,
  },
};

const LoginForm: React.FC<LoginFormProps> = ({ role }) => {
  const [email, setEmail] = useState(roleInfo[role].email);
  const [password, setPassword] = useState('password');
  const [showAlert, setShowAlert] = useState(false);
  
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password, role);
      navigate(`/${role}/dashboard`);
    } catch (err) {
      setShowAlert(true);
    }
  };
  
  return (
    <div className="w-full max-w-md">
      <div className="mb-8 flex flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 mb-4">
          {roleInfo[role].icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{roleInfo[role].title}</h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your credentials to access your account
        </p>
      </div>
      
      {error && showAlert && (
        <Alert 
          variant="error" 
          dismissible 
          onDismiss={() => setShowAlert(false)}
          className="mb-4"
        >
          {error}
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
          required
        />
        
        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
          required
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <a
            href="#"
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Forgot password?
          </a>
        </div>
        
        <Button 
          type="submit" 
          fullWidth 
          isLoading={isLoading}
        >
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;