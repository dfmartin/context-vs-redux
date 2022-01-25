import * as React from 'react'
import { useAppContext } from './AppContext'
import { useRenderCount } from '../renderCounter'
import { FeatureOneContainer } from './FeatureOne'
import { FeatureTwoContainer } from './FeatureTwo'
import '../App.css'

export const App = () => {
  const { state, setCountOne, setCountTwo } = useAppContext()
  const renderCount = useRenderCount('App Component')

  return (
    <div className='container'>
      <h1>Context App</h1>
      <div>render count: {renderCount}</div>
      <div>app state count one: {state.countOne}</div>
      <button onClick={() => setCountOne(state.countOne + 1)}>
        increment app count one
      </button>
      <div>app state count two: {state.countTwo}</div>
      <button onClick={() => setCountTwo(state.countTwo + 1)}>
        increment app count two
      </button>
      <FeatureOneContainer />
      <FeatureTwoContainer />
    </div>
  )
}

App.displayName = 'AppComponent'
