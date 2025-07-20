import { StrictMode } from 'react'
import {BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import HomePage from './Pages/HomePage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import SettingPage from './Pages/SettingPage.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
