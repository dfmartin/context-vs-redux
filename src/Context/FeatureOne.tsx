import React from 'react'
import { useAppContext } from './AppContext'
import { useRenderCount } from '../renderCounter'
import '../App.css'

interface FeatureOneState {
  count: number
}

const FeatureOneContext = React.createContext<
  | {
      state: FeatureOneState
      setCount: (value: number) => void
    }
  | undefined
>(undefined)

const FeatureOneProvider = (props: { children: any }) => {
  const [state, setState] = React.useState<FeatureOneState>({ count: 0 })

  const setCount = (value: number) => setState(s => ({ ...s, count: value }))

  const value = {
    state: state,
    setCount: setCount,
  }

  return <FeatureOneContext.Provider value={value} children={props.children} />
}

const useFeatureOneContext = () => {
  const ctx = React.useContext(FeatureOneContext)

  if (!ctx) {
    throw new Error('oops')
  }

  return ctx
}

export const FeatureOneContainer = () => {
  return (
    <FeatureOneProvider>
      <FeatureOne />
    </FeatureOneProvider>
  )
}

export const FeatureOne = () => {
  const { state: appState, setCountOne: setAppCount } = useAppContext()
  const { state, setCount } = useFeatureOneContext()
  const renderCount = useRenderCount('Feature One Component')

  return (
    <div className='container'>
      <h2>feature one</h2>
      <div>feature render count: {renderCount}</div>
      <div>feature count: {state.count}</div>
      <button onClick={() => setCount(state.count + 1)}>
        increment feature count
      </button>
      <div>app count one: {appState.countOne}</div>
      <button onClick={() => setAppCount(appState.countOne + 1)}>
        increment app count one
      </button>
    </div>
  )
}
