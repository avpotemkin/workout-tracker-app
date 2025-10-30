import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Program } from "@/types";
import * as api from "@/services/api";

type AppContextType = {
  selectedProgram: Program | null;
  setSelectedProgram: (program: Program | null) => void;
  programs: Program[];
  setPrograms: React.Dispatch<React.SetStateAction<Program[]>>;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch programs on mount
  useEffect(() => {
    async function loadPrograms() {
      try {
        setIsLoading(true);
        setHasError(false);
        const fetchedPrograms = await api.fetchPrograms();
        setPrograms(fetchedPrograms);
        // Default to the first program
        if (fetchedPrograms.length > 0 && !selectedProgram) {
          setSelectedProgram(fetchedPrograms[0]);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error loading programs:", error);
        setHasError(true);
        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load programs"
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadPrograms();
  }, []);

  return (
    <AppContext.Provider
      value={{
        selectedProgram,
        setSelectedProgram,
        programs,
        setPrograms,
        isLoading,
        hasError,
        errorMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
