
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';
import { User as AppUser } from '../types/user';

interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

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
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', currentSession.user.id)
              .single();
              
            if (profile) {
              setUser({
                id: currentSession.user.id,
                email: currentSession.user.email || '',
                firstName: profile.first_name || '',
                lastName: profile.last_name || '',
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
        supabase
          .from('profiles')
          .select('*')
          .eq('id', currentSession.user.id)
          .single()
          .then(({ data: profile, error: profileError }) => {
            if (profileError) {
              console.error("Error fetching user profile:", profileError);
              setUser(null);
            } else if (profile) {
              setUser({
                id: currentSession.user.id,
                email: currentSession.user.email || '',
                firstName: profile.first_name || '',
                lastName: profile.last_name || '',
                createdAt: currentSession.user.created_at || new Date().toISOString(),
              });
            }
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
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
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (profile) {
          setUser({
            id: data.user.id,
            email: data.user.email || '',
            firstName: profile.first_name || '',
            lastName: profile.last_name || '',
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
      // Register the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      // Update the profile with first and last name
      if (data.user) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            first_name: firstName,
            last_name: lastName
          })
          .eq('id', data.user.id);
          
        if (updateError) {
          console.error("Error updating profile:", updateError);
        }
      }
      
      return true;
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/account/reset-password`,
      });
      
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
