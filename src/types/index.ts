export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  bio?: string;
  gender?: string;
  orientation?: string;
  fame?: number;
  createdAt: string;
  profileCompleted: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Picture {
  id: string;
  userId: string;
  url: string;
  isProfile: boolean;
}