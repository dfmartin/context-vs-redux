import * as React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { App } from './App'
export const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)
