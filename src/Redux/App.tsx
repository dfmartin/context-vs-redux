import React from 'react'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from './store'
import { FeatureOne } from './FeatureOne'
import { FeatureTwo } from './FeatureTwo'
import { useRenderCount } from '../renderCounter'

import '../App.css'

interface AppState {
  count: number
}

const initialAppState: AppState = {
  count: 0,
}

export const appSlice = createSlice({
  name: 'appState',
  initialState: initialAppState,
  reducers: {
    increment: state => {
      state.count = state.count + 1
    },
    decrement: state => {
      state.count = state.count - 1
    },
  },
})

export const App = () => {
  const count = useAppSelector(state => state.app.count)
  const dispatch = useAppDispatch()
  const renderCount = useRenderCount('app component')

  return (
    <div className='container'>
      <h1>Redux App</h1>
      <div>render count: {renderCount}</div>

      <div>app count: {count}</div>
      <button onClick={() => dispatch(appSlice.actions.increment())}>
        increment app count
      </button>
      <button onClick={() => dispatch(appSlice.actions.decrement())}>
        decrement app count
      </button>
      <FeatureOne />
      <FeatureTwo />
    </div>
  )
}
