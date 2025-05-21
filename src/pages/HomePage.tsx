import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const { state, logout } = useAuth();
  const { isAuthenticated, user } = state;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-purple-600">
      <div className="container mx-auto px-4 py-16">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center">
            <Heart className="text-white h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold text-white">Web Matcha</h1>
          </div>
          
          <nav>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">Welcome, {user?.firstName}</span>
                <Button variant="outline" onClick={logout} className="text-white border-white hover:bg-white/10">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link to="/login">
                  <Button variant="outline" className="text-white border-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-white text-pink-600 hover:bg-gray-100">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </header>
        
        <main className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect Match with Web Matcha
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Connect with like-minded individuals based on shared interests and compatibility.
              Start your journey to meaningful connections today.
            </p>
            
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20 shadow-xl">
              <div className="aspect-square rounded-full bg-white/20 mx-auto mb-6 flex items-center justify-center">
                <Heart className="text-white h-16 w-16" />
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-4">Why Choose Web Matcha?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-white">Smart matching based on shared interests and compatibility</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-white">Secure and private communication</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-white">Verified profiles to ensure authentic connections</p>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;