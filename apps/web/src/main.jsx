import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {GlobalProvider} from "global-context"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
)
