
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserMetadata: (metadata: Record<string, any>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Sesión iniciada correctamente');
    } catch (error: any) {
      console.error('Error signin in:', error);
      toast.error(error.message || 'Erro ao iniciar sesión');
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      if (error) throw error;

      // All users are automatically approved, we removed the conditional approval flow
      toast.success('Rexistro completado! Por favor, verifica o teu correo electrónico.');
    } catch (error: any) {
      console.error('Error signing up:', error);
      toast.error(error.message || 'Erro ao rexistrarse');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Check if we have a session before trying to sign out
      if (!session) {
        console.log("No active session to sign out from");
        setUser(null);
        setSession(null);
        return;
      }
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Explicitly clear user state
      setUser(null);
      setSession(null);
    } catch (error: any) {
      console.error('Error signing out:', error);
      
      // Even if sign out fails, we should clear local state to allow the user to "escape"
      setUser(null);
      setSession(null);
      
      toast.error(error.message || 'Erro ao pechar sesión');
    }
  };

  const updateUserMetadata = async (metadata: Record<string, any>) => {
    try {
      if (!user) return;
      
      const { error } = await supabase.auth.updateUser({
        data: metadata
      });
      
      if (error) throw error;
      
      toast.success('Datos actualizados correctamente');
    } catch (error: any) {
      console.error('Error updating user metadata:', error);
      toast.error(error.message || 'Erro ao actualizar os datos do usuario');
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateUserMetadata
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro dun AuthProvider');
  }
  return context;
};
