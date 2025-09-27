// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthContext';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
    <App />
    </AuthProvider>
  </BrowserRouter>
);
