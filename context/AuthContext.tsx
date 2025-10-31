import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock user ID - hardcoded for now
const MOCK_USER_ID = "mock-user-123";
const AUTH_STORAGE_KEY = "@auth_userId";

interface AuthContextType {
  userId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing auth on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const storedUserId = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch {
        // Ignore error
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  const login = async () => {
    try {
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, MOCK_USER_ID);
      setUserId(MOCK_USER_ID);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      setUserId(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        isAuthenticated: !!userId,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
