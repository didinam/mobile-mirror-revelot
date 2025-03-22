
import React, { createContext, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User as AppUser } from '@/types/user';
import { AuthContextType, AuthProviderProps } from './types';
import { 
  getUserProfile, 
  loginUser, 
  registerUser, 
  logoutUser, 
  resetUserPassword 
} from './authApi';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        
        if (currentSession?.user) {
          // Get user profile data if logged in
          try {
            const profile = await getUserProfile(currentSession.user.id);
            
            if (profile) {
              setUser({
                ...profile,
                email: currentSession.user.email || '',
                createdAt: currentSession.user.created_at || new Date().toISOString(),
              });
            } else {
              // If no profile found, create basic user object
              setUser({
                id: currentSession.user.id,
                email: currentSession.user.email || '',
                firstName: '',
                lastName: '',
                createdAt: currentSession.user.created_at || new Date().toISOString(),
              });
            }
          } catch (err) {
            console.error("Error fetching user profile:", err);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      
      if (currentSession?.user) {
        // Get user profile data if logged in
        getUserProfile(currentSession.user.id)
          .then(profile => {
            if (profile) {
              setUser({
                ...profile,
                email: currentSession.user.email || '',
                createdAt: currentSession.user.created_at || new Date().toISOString(),
              });
            } else {
              setUser(null);
            }
            setIsLoading(false);
          })
          .catch(() => {
            setUser(null);
            setIsLoading(false);
          });
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await loginUser(email, password);
      
      if (error) {
        console.error("Supabase login error:", error);
        setError(error.message || 'An error occurred during login');
        setIsLoading(false);
        return false;
      }

      console.log("Login successful, session data:", data);
      
      // Explicitly update the user and session state here for immediate feedback
      if (data && data.user) {
        // Get user profile data
        const profile = await getUserProfile(data.user.id);
          
        if (profile) {
          setUser({
            ...profile,
            email: data.user.email || '',
            createdAt: data.user.created_at || new Date().toISOString(),
          });
        }
        
        setSession(data.session);
      }
      
      setIsLoading(false);
      return true;
    } catch (err: any) {
      console.error("Unexpected login error:", err);
      setError(err.message || 'An error occurred during login');
      setIsLoading(false);
      return false;
    }
  };

  const register = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await registerUser(email, password, firstName, lastName);
      return true;
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    await logoutUser();
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await resetUserPassword(email);
      
      if (error) {
        throw error;
      }
      
      setIsLoading(false);
      return true;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setIsLoading(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        error,
        login,
        register,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
