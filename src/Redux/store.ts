import {
  createSlice,
  PayloadAction,
  configureStore,
  createReducer,
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { appSlice } from './App'
import { featureOneSlice } from './FeatureOne'
import { featureTwoSlice } from './FeatureTwo'

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    featureOne: featureOneSlice.reducer,
    featureTwo: featureTwoSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const { increment, decrement } = appSlice.actions

export const getAppCount = (state: RootState) => state.app.count

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
