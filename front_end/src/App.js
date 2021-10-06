import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ChangePass from './pages/ChangePass';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route component={Login} path="/login" />
        <Route component={Register} path="/register"/>
        <Route component={ChangePass} path="/change-pass"/>
        <Route component={Home} path="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
