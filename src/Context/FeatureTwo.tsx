import React from 'react'
import { useAppContext } from './AppContext'
import { useRenderCount } from '../renderCounter'
import '../App.css'

interface FeatureTwoState {
  count: number
}

const FeatureTwoContext = React.createContext<
  | {
      state: FeatureTwoState
      setCount: (value: number) => void
    }
  | undefined
>(undefined)

const FeatureTwoProvider = (props: { children: any }) => {
  const [state, setState] = React.useState<FeatureTwoState>({ count: 0 })

  const setCount = (value: number) => setState(s => ({ ...s, count: value }))

  const value = {
    state: state,
    setCount: setCount,
  }

  return <FeatureTwoContext.Provider value={value} children={props.children} />
}

const useFeatureTwoContext = () => {
  const ctx = React.useContext(FeatureTwoContext)

  if (!ctx) {
    throw new Error('oops')
  }

  return ctx
}

export const FeatureTwoContainer = () => {
  return (
    <FeatureTwoProvider>
      <FeatureTwo />
    </FeatureTwoProvider>
  )
}
export const FeatureTwo = () => {
  const { state: appState, setCountTwo: setAppCount } = useAppContext()
  const { state, setCount } = useFeatureTwoContext()
  const renderCount = useRenderCount('Feature Two Component')

  return (
    <div className='container'>
      <h2>feature two</h2>
      <div>feature render count: {renderCount}</div>
      <div>feature count: {state.count}</div>
      <button onClick={() => setCount(state.count + 1)}>
        increment feature count
      </button>
      <div>app count two: {appState.countTwo}</div>
      <button onClick={() => setAppCount(appState.countTwo + 1)}>
        increment app count two
      </button>
    </div>
  )
}
