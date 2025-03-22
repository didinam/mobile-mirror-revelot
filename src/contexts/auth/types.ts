
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { User as AppUser } from '@/types/user';

export interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
