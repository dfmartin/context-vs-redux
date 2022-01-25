import React from 'react'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from './store'
import { useRenderCount } from '../renderCounter'
import '../App.css'

interface FeatureTwoState {
  count: number
}

const initialFeatureTwoState: FeatureTwoState = {
  count: 0,
}

export const featureTwoSlice = createSlice({
  name: 'featureTwoState',
  initialState: initialFeatureTwoState,
  reducers: {
    increment: state => {
      state.count = state.count + 1
    },
    decrement: state => {
      state.count = state.count - 1
    },
  },
})

export const FeatureTwo = () => {
  const count = useAppSelector(state => state.featureTwo.count)
  const dispatch = useAppDispatch()
  const renderCount = useRenderCount('feature one component')

  return (
    <div className='container'>
      <h1>Feature Two</h1>
      <div>render count: {renderCount}</div>
      <div>feature count: {count}</div>
      <button onClick={() => dispatch(featureTwoSlice.actions.increment())}>
        increment feature count
      </button>
      <button onClick={() => dispatch(featureTwoSlice.actions.decrement())}>
        decrement feature count
      </button>
      <FeatureTwoChild />
    </div>
  )
}

const FeatureTwoChild = () => {
  const count = useAppSelector(state => state.featureTwo.count)
  const featureOneCount = useAppSelector(state => state.featureOne.count)
  const dispatch = useAppDispatch()
  const renderCount = useRenderCount('feature one component')

  return (
    <div className='container'>
      <h1>Feature Two Child</h1>
      <div>render count: {renderCount}</div>
      <div>feature two count: {count}</div>
      <div>feature count one: {featureOneCount}</div>
      {/* <button onClick={() => dispatch(featureTwoSlice.actions.increment())}>
          increment feature count
        </button>
        <button onClick={() => dispatch(featureTwoSlice.actions.decrement())}>
          decrement feature count
        </button> */}
    </div>
  )
}
