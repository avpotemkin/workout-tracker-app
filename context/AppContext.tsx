import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Program } from '@/types';
import { PROGRAMS } from '@/mockdata/programs';

type AppContextType = {
  selectedProgram: Program | null;
  setSelectedProgram: (program: Program | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Default to the first program
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(
    PROGRAMS.length > 0 ? PROGRAMS[0] : null
  );

  return (
    <AppContext.Provider value={{ selectedProgram, setSelectedProgram }}>
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
