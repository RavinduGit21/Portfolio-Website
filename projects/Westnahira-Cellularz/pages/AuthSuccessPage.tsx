import React, { useEffect } from 'react';
import type { User } from '../types';

interface AuthSuccessPageProps {
  onLoginSuccess: (data: { user: User; token: string }) => void;
  navigate: (path: string) => void;
}

const AuthSuccessPage: React.FC<AuthSuccessPageProps> = ({ onLoginSuccess, navigate }) => {

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userParam = urlParams.get('user');

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        
        // Store token in localStorage
        localStorage.setItem('token', token);
        
        // Call the login success callback
        onLoginSuccess({ user, token });
        
        // Redirect to home page
        navigate('/');
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/login?error=oauth_failed');
      }
    } else {
      // If no token/user data, redirect to login
      navigate('/login?error=oauth_failed');
    }
  }, [navigate, onLoginSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-primary mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">Completing sign-in...</p>
      </div>
    </div>
  );
};

export default AuthSuccessPage;
