
import { supabase } from '@/integrations/supabase/client';
import { User as AppUser } from '@/types/user';

export const getUserProfile = async (userId: string): Promise<AppUser | null> => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error || !profile) {
      console.error("Error fetching user profile:", error);
      return null;
    }
    
    return {
      id: userId,
      email: '', // Will be populated by the auth context
      firstName: profile.first_name || '',
      lastName: profile.last_name || '',
      createdAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error("Error in getUserProfile:", err);
    return null;
  }
};

export const loginUser = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password
  });
};

export const registerUser = async (
  email: string, 
  password: string, 
  firstName: string, 
  lastName: string
) => {
  const authResponse = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName
      }
    }
  });
  
  if (authResponse.error) {
    throw authResponse.error;
  }
  
  if (authResponse.data.user) {
    // Update profile with first and last name
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        first_name: firstName,
        last_name: lastName
      })
      .eq('id', authResponse.data.user.id);
      
    if (updateError) {
      console.error("Error updating profile:", updateError);
    }
  }
  
  return authResponse;
};

export const logoutUser = async () => {
  return await supabase.auth.signOut();
};

export const resetUserPassword = async (email: string) => {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/account/reset-password`,
  });
};
