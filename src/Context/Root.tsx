import * as React from 'react'
import { AppContextProvider } from './AppContext'
import { App } from './App'
export const Root = () => (
  <AppContextProvider>
    <App />
  </AppContextProvider>
)
