import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './routes/Login/Login.jsx';
import './global.css';
import { Navigate } from 'react-router';
import Home from './routes/Home/Home.jsx';
import { AuthContext, AuthProvider } from './Context/authContext.jsx'
import { useContext } from 'react';
import Relatorio from './routes/Relatorio/Relatorio.jsx';

const Root = () => {
    const { user } = useContext(AuthContext);

    return(
      <BrowserRouter>
        <Routes>
          {
            user ? (
              <>
                <Route path="/home" element={<Home/>}/>
                <Route path="/relatorio/:flag" element={<Relatorio/>}/>
                <Route path="*" element={<Navigate to="/home"/>}/>
              </>
            ) 
            : (
              <>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<Navigate to="/login"/>}/>
              </>
            )
          }
        </Routes>
      </BrowserRouter>
    )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        <Root/>
      </AuthProvider>
  </StrictMode>
)
