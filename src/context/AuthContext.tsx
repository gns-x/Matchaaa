import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState } from '../types';
import axios from 'axios';

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Action types
type AuthAction = 
  | { type: 'LOGIN_SUCCESS'; payload: { user: any; token: string } }
  | { type: 'LOGIN_FAIL'; payload: string }
  | { type: 'REGISTER_SUCCESS'; payload: { user: any; token: string } }
  | { type: 'REGISTER_FAIL'; payload: string }
  | { type: 'USER_LOADED'; payload: any }
  | { type: 'AUTH_ERROR' }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'PROFILE_UPDATE_SUCCESS'; payload: any };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    case 'PROFILE_UPDATE_SUCCESS':
      return {
        ...state,
        user: { ...state.user, ...action.payload, profileCompleted: true },
        isLoading: false
      };
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: action.type === 'AUTH_ERROR' ? 'Authentication error' : action.payload
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Create context
interface AuthContextProps {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
  updateProfile: (profileData: any) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// API base URL - will need to be updated with actual backend URL
const API_URL = 'http://localhost:8080/api';

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user if token exists
  const loadUser = async () => {
    if (localStorage.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
      
      try {
        const res = await axios.get(`${API_URL}/auth/me`);
        dispatch({ type: 'USER_LOADED', payload: res.data });
      } catch (err) {
        dispatch({ type: 'AUTH_ERROR' });
      }
    } else {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  // Register user
  const register = async (userData: any) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, userData);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data
      });
      loadUser();
    } catch (err: any) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response?.data?.message || 'Registration failed'
      });
    }
  };

  // Login user
  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      });
      loadUser();
    } catch (err: any) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response?.data?.message || 'Invalid credentials'
      });
    }
  };

  // Update profile
  const updateProfile = async (profileData: any) => {
    try {
      const res = await axios.put(`${API_URL}/profile`, profileData);
      dispatch({
        type: 'PROFILE_UPDATE_SUCCESS',
        payload: res.data
      });
    } catch (err: any) {
      // We don't log out on profile update failure
      console.error('Profile update failed:', err.response?.data);
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Clear errors
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Set auth token on initial load
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
      loadUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        register,
        login,
        logout,
        loadUser,
        updateProfile,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};