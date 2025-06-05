import { create } from 'zustand';
import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient.ts';

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user: User | null) => set({ user }),

  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    set({ user: data.user });
  },

  register: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    set({ user: data.user });
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));

// Initialize on page load
supabase.auth.getUser().then(({ data }) => {
  useAuthStore.getState().setUser(data.user);
  useAuthStore.setState({ loading: false });
});

supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
  useAuthStore.getState().setUser(session?.user ?? null);
});
