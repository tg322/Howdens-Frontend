import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth, useAuthStateContext } from './auth/AuthContext.jsx'
import LoginPage from './pages/login/LoginPage.jsx'
import {Navigate, Outlet, useLocation, BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home/home.jsx'

function ProtectedRoutes(){
  const{userDetails} = useAuthStateContext();
  const location = useLocation();

  if(userDetails == null){
    return(
      <h1>LOADING</h1>
    );
  }else if(userDetails == false){
    return <Navigate to='/login' state={{from: location}} replace/>
  }else{
    return <Outlet/>
  }
}

function AppRoutes(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />}/>
        </Route>
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth>
      <AppRoutes/>
    </Auth>
  </StrictMode>,
)
