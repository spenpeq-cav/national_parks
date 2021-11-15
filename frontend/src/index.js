import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import UserProvider from './context/UserContext'

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <App />
        <Footer />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);