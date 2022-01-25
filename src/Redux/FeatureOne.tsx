import React from 'react'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from './store'
import { useRenderCount } from '../renderCounter'
import '../App.css'

interface FeatureOneState {
  count: number
}

const initialFeatureOneState: FeatureOneState = {
  count: 0,
}

export const featureOneSlice = createSlice({
  name: 'featureOneState',
  initialState: initialFeatureOneState,
  reducers: {
    increment: state => {
      state.count = state.count + 1
    },
    decrement: state => {
      state.count = state.count - 1
    },
  },
})

export const FeatureOne = () => {
  const count = useAppSelector(state => state.featureOne.count)
  const dispatch = useAppDispatch()
  const renderCount = useRenderCount('feature one component')

  return (
    <div className='container'>
      <h1>Feature One</h1>
      <div>render count: {renderCount}</div>
      <div>app count: {count}</div>
      <button onClick={() => dispatch(featureOneSlice.actions.increment())}>
        increment feature count
      </button>
      <button onClick={() => dispatch(featureOneSlice.actions.decrement())}>
        decrement feature count
      </button>
    </div>
  )
}
