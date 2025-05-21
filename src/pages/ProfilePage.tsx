import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileForm from '../components/profile/ProfileForm';

const ProfilePage: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!state.isAuthenticated && !state.isLoading) {
      navigate('/login');
    }
  }, [state.isAuthenticated, state.isLoading, navigate]);

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Profile</h1>
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;