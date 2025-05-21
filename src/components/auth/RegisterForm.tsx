import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

const RegisterForm: React.FC = () => {
  const { register, state } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { email, username, firstName, lastName, password, confirmPassword } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    
    if (!username) newErrors.username = 'Username is required';
    else if (username.length < 3) newErrors.username = 'Username must be at least 3 characters';
    
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const { confirmPassword, ...userData } = formData;
      await register(userData);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create your account</h2>
      
      {state.error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{state.error}</p>
        </div>
      )}
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            value={firstName}
            onChange={onChange}
            placeholder="John"
            error={errors.firstName}
          />
          
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            value={lastName}
            onChange={onChange}
            placeholder="Doe"
            error={errors.lastName}
          />
        </div>
        
        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="you@example.com"
          error={errors.email}
        />
        
        <Input
          label="Username"
          type="text"
          name="username"
          value={username}
          onChange={onChange}
          placeholder="johndoe"
          error={errors.username}
        />
        
        <Input
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="••••••••"
          error={errors.password}
        />
        
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChange}
          placeholder="••••••••"
          error={errors.confirmPassword}
        />
        
        <Button
          type="submit"
          fullWidth
          isLoading={state.isLoading}
        >
          Sign Up
        </Button>
      </form>
      
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-pink-600 hover:text-pink-500">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;