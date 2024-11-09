import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter as Router } from 'react-router-dom'
import { AuthenticationContext } from './Context/AuthenticationContext.jsx'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthenticationContext>
      <Router>
        <ToastContainer/>
        <App />
      </Router>
    </AuthenticationContext>
  </React.StrictMode>,
)
