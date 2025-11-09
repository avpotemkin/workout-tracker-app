import { Program, ProgramId } from '@/types'
import * as api from '@/services/api'
import { useAppContext } from '@/context/AppContext'

export function usePrograms() {
  const { setPrograms, selectedProgram, setSelectedProgram } = useAppContext()

  const addProgram = async (program: Program) => {
    const createdProgram = await api.createProgram(program)
    setPrograms((prevPrograms) => [...prevPrograms, createdProgram])
  }

  const updateProgram = async (
    programId: ProgramId,
    updatedProgram: Program
  ) => {
    const updated = await api.updateProgram(programId, updatedProgram)
    setPrograms((prevPrograms) =>
      prevPrograms.map((p) => (p.id === programId ? updated : p))
    )
    if (selectedProgram?.id === programId) {
      setSelectedProgram(updated)
    }
  }

  return { addProgram, updateProgram }
}
