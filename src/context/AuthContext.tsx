import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { request } from '../services/Request';
import { tokenStorage } from '../services/TokenStorage';
import type { AuthResponse, LoginDto, RegisterDto } from '../types/Auth';
import type { User } from '../types/User';


interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (data: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      if (!tokenStorage.get()) {
        setLoading(false);
        return;
      }
      try {
        const me = await request<User>('/users/me');
        setUser(me);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    restoreSession();
  }, []);

  useEffect(() => {
    function handleUnauthorized() {
      setUser(null);
    }
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  async function login(data: LoginDto) {
    const result = await request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    tokenStorage.set(result.accessToken, true); // true = localStorage
    setUser(result.user);
  }

  async function register(data: RegisterDto) {
    const result = await request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    tokenStorage.set(result.accessToken, true);
    setUser(result.user);
  }

  async function logout() {
    try {
      await request('/auth/logout', { method: 'POST' });
    } catch {
    
    } finally {
      tokenStorage.clear();
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de un <AuthProvider>');
  }
  return ctx;
}