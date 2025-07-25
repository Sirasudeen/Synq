import React, { useEffect } from 'react'
import {Toaster} from "react-hot-toast"
import { Routes,Route,Navigate } from 'react-router-dom'
import {Loader} from 'lucide-react'
import Navbar from './components/Navbar'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import ProfilePage from './Pages/ProfilePage'
import SignUpPage from './Pages/SignUpPage'
import SettingPage from './Pages/SettingPage'
import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThemeStore'
const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore();
  const {theme} = useThemeStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    
    <div data-theme = {theme}>
        <Navbar />
        <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
        <Toaster />
    </div>
  )
}

export default App