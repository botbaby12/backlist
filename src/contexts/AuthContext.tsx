import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  isDummy: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DUMMY_EMAILS = ['bennett@backlist.io'];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('backlist_user');
    return saved ? JSON.parse(saved) : null;
  });

  const signIn = async (email: string, password: string): Promise<boolean> => {
    const isDummy = DUMMY_EMAILS.includes(email.toLowerCase());

    if (isDummy) {
      const userData: User = { email, isDummy: true };
      setUser(userData);
      localStorage.setItem('backlist_user', JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('backlist_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signOut }}>
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
