import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './page/Login';
import PasswordRecover from './page/Password-recover';
import PasswordRecoverConfirm from './page/Password-recover-confirm';
import Dashboard from './page/Dashboard';
import './App.css';
import { useEffect } from 'react';
import { useAppContext } from './componentes/reducers';



function App() {

  const { dispatch } = useAppContext();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:4000/user-check', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const content = await response.json();
        // Actualiza el estado utilizando el contexto
        dispatch({ type: 'SET_NAME', value: content.name });
      } catch (error) {
        // Maneja los errores
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  return (

      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/password-recover" element={<PasswordRecover />} />
            <Route path="/password-recover-confirm" element={<PasswordRecoverConfirm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
   
   
  );
}

export default App;
