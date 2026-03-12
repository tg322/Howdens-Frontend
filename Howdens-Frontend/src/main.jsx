import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Auth, useAuthStateContext } from './auth/AuthContext.jsx'
import LoginPage from './pages/login/LoginPage.jsx'
import {Navigate, Outlet, useLocation, BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home/home.jsx'
import Layout from './global components/layout/Layout.jsx'
import {NewPortfolio} from './page components/new portfolio/NewPortfolio.jsx'

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
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />}/>
          <Route path="new_portfolio" element={<NewPortfolio />}/>
        </Route>
          
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
