import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import VerificationPage from './pages/auth/VerificationPage'
import Navbar from './component/Navbar';
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Switch>
        <Route component={Profile} path="/profile"/>
        <Route component={Login} path="/login" />
        <Route component={Register} path="/register"/>
        <Route component={VerificationPage} path="/authentication/:token" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
