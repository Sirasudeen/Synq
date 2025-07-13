import React, { useEffect } from 'react'
import { Routes,Route } from 'react-router-dom'
import {Loader} from 'lucide-react'
import Navbar from './components/Navbar'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import SignUpPage from './Pages/SignUpPage'
import SettingPage from './Pages/SettingPage'
import { useAuthStore } from './store/useAuthStore'
const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore();

  useEffect(()=> {
    checkAuth();
  },[checkAuth]);
  if(isCheckingAuth){
    return(
      <div className='flex items-center justify-center h-screen'>
          <Loader className='size-10 animate-spin' />
      </div>
    )
  }
  return (
    
    <div>
        <Navbar />
        <Routes>
            <Route path="/" element={authUser ? <HomePage /> : <LoginPage />} />
            <Route path="/signup" element={!authUser ? <SignUpPage /> : <HomePage />} />
            <Route path="/login" element={!authUser ? <LoginPage /> : <HomePage />} />
            {/* <Route path="/settings" element={<SettingsPage />} /> */}
            <Route path="/profile" element={authUser ? <ProfilePage /> : <LoginPage />} />

        </Routes>
    </div>
  )
}

export default App