import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { Program } from '@/types'
import * as api from '@/services/api'
import { useAuth } from './AuthContext'

type AppContextType = {
  selectedProgram: Program | null
  setSelectedProgram: (program: Program | null) => void
  programs: Program[]
  setPrograms: React.Dispatch<React.SetStateAction<Program[]>>
  isLoading: boolean
  hasError: boolean
  errorMessage: string | null
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [programs, setPrograms] = useState<Program[]>([])
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [hasLoadedInitialData, setHasLoadedInitialData] = useState(false)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false)
      setHasLoadedInitialData(false)
      setSelectedProgram(null)
      setPrograms([])
      return
    }

    if (hasLoadedInitialData) {
      return
    }

    async function loadPrograms() {
      try {
        setIsLoading(true)
        setHasError(false)

        const fetchedPrograms = await api.fetchPrograms()
        setPrograms(fetchedPrograms)

        if (fetchedPrograms.length === 0) {
          setIsLoading(false)
          setHasLoadedInitialData(true)
          return
        }

        let userData
        try {
          userData = await api.fetchUserData()
        } catch {
          // Continue with default behavior if user data fetch fails
        }

        let programToSelect: Program | null = null

        if (userData?.currentProgramId) {
          const foundProgram = fetchedPrograms.find(
            (p) => p.id === userData.currentProgramId
          )
          if (foundProgram) {
            programToSelect = foundProgram
          }
        }

        if (!programToSelect) {
          programToSelect = fetchedPrograms[0]
        }

        setSelectedProgram(programToSelect)
        setHasLoadedInitialData(true)
      } catch (error) {
        setHasError(true)
        setErrorMessage(
          error instanceof Error ? error.message : 'Failed to load programs'
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadPrograms()
  }, [isAuthenticated, hasLoadedInitialData])

  const handleSetSelectedProgram = useCallback(
    async (program: Program | null) => {
      setSelectedProgram(program)

      if (isAuthenticated) {
        try {
          await api.updateUserData({
            currentProgramId: program?.id || null,
          })
        } catch {
          // Silently fail - don't disrupt user experience
        }
      }
    },
    [isAuthenticated]
  )

  return (
    <AppContext.Provider
      value={{
        selectedProgram,
        setSelectedProgram: handleSetSelectedProgram,
        programs,
        setPrograms,
        isLoading,
        hasError,
        errorMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
