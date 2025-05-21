import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const VerifyEmailPage: React.FC = () => {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      
      if (!token) {
        setVerificationStatus('error');
        setMessage('Invalid verification link. No token provided.');
        return;
      }
      
      try {
        // Replace with your actual API endpoint
        const API_URL = 'http://localhost:8080/api';
        await axios.post(`${API_URL}/auth/verify-email`, { token });
        
        setVerificationStatus('success');
        setMessage('Your email has been successfully verified!');
      } catch (error) {
        setVerificationStatus('error');
        setMessage('Failed to verify email. The link may be expired or invalid.');
      }
    };
    
    verifyEmail();
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-purple-600 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center mb-8">
        <Heart className="h-12 w-12 text-white" />
        <h1 className="ml-2 text-3xl font-bold text-white">Web Matcha</h1>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        {verificationStatus === 'loading' && (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mb-4"></div>
            <p className="text-gray-700">{message}</p>
          </div>
        )}
        
        {verificationStatus === 'success' && (
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link to="/login">
              <Button fullWidth>
                Sign In
              </Button>
            </Link>
          </div>
        )}
        
        {verificationStatus === 'error' && (
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="space-y-3">
              <Link to="/">
                <Button fullWidth variant="outline">
                  Go to Home
                </Button>
              </Link>
              <Link to="/register">
                <Button fullWidth>
                  Sign Up Again
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;