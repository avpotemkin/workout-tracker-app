import React, { createContext, useContext, useState, ReactNode } from "react";
import { Program } from "@/types";
import { PROGRAMS } from "@/mockdata/programs";

type AppContextType = {
  selectedProgram: Program | null;
  setSelectedProgram: (program: Program | null) => void;
  programs: Program[];
  addProgram: (program: Program) => void;
  updateProgram: (programId: string, updatedProgram: Program) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [programs, setPrograms] = useState<Program[]>(PROGRAMS);
  // Default to the first program
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(
    programs.length > 0 ? programs[0] : null
  );

  const addProgram = (program: Program) => {
    setPrograms((prevPrograms) => [...prevPrograms, program]);
  };

  const updateProgram = (programId: string, updatedProgram: Program) => {
    setPrograms((prevPrograms) =>
      prevPrograms.map((p) => (p.id === programId ? updatedProgram : p))
    );
    if (selectedProgram?.id === programId) {
      setSelectedProgram(updatedProgram);
    }
  };

  return (
    <AppContext.Provider
      value={{
        selectedProgram,
        setSelectedProgram,
        programs,
        addProgram,
        updateProgram,
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
