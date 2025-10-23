import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Program } from '@/types';
import { fetchPrograms } from '@/lib/api';

type AppContextType = {
  selectedProgram: Program | null;
  setSelectedProgram: (program: Program | null) => void;
  programs: Program[];
  addProgram: (program: Program) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchPrograms()
      .then((data) => {
        if (!mounted) return;
        setPrograms(data);
        if (!selectedProgram && data.length > 0) {
          setSelectedProgram(data[0]);
        }
      })
      .catch((e) => console.warn('Failed to load programs', e));
    return () => {
      mounted = false;
    };
  }, []);

  const addProgram = (program: Program) => {
    setPrograms((prevPrograms) => [...prevPrograms, program]);
  };

  return (
    <AppContext.Provider value={{ 
      selectedProgram, 
      setSelectedProgram, 
      programs, 
      addProgram 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
