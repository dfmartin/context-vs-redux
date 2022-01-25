import * as React from 'react'

export interface AppState {
  countOne: number
  countTwo: number
}

const AppContext = React.createContext<
  | {
      state: AppState
      setCountOne: (value: number) => void
      setCountTwo: (value: number) => void
    }
  | undefined
>(undefined)

export const AppContextProvider = React.memo((props: { children: any }) => {
  const [state, setState] = React.useState<AppState>({
    countOne: 1,
    countTwo: 1,
  })

  const setCountOne = React.useCallback(
    (value: number) => setState(s => ({ ...s, countOne: value })),
    [],
  )

  const setCountTwo = React.useCallback(
    (value: number) => setState(s => ({ ...s, countTwo: value })),
    [],
  )

  const value = React.useMemo(
    () => ({
      state: state,
      setCountOne: setCountOne,
      setCountTwo: setCountTwo,
    }),
    [state],
  )

  return <AppContext.Provider value={value} children={props.children} />
})
AppContextProvider.displayName = 'AppContextProvider'

export const useAppContext = () => {
  const ctx = React.useContext(AppContext)
  if (!ctx) {
    throw new Error('useAppState must be within an AppStateProvider')
  }
  return ctx
}
