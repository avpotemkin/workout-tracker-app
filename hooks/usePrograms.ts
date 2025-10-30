import { Program, ProgramId } from "@/types";
import * as api from "@/services/api";
import { useAppContext } from "@/context/AppContext";

export function usePrograms() {
  const { programs, setPrograms, selectedProgram, setSelectedProgram } =
    useAppContext();

  const addProgram = async (program: Program) => {
    try {
      const createdProgram = await api.createProgram(program);
      setPrograms((prevPrograms) => [...prevPrograms, createdProgram]);
    } catch (error) {
      throw error;
    }
  };

  const updateProgram = async (
    programId: ProgramId,
    updatedProgram: Program
  ) => {
    try {
      const updated = await api.updateProgram(programId, updatedProgram);
      setPrograms((prevPrograms) =>
        prevPrograms.map((p) => (p.id === programId ? updated : p))
      );
      if (selectedProgram?.id === programId) {
        setSelectedProgram(updated);
      }
    } catch (error) {
      throw error;
    }
  };

  return {
    addProgram,
    updateProgram,
  };
}

