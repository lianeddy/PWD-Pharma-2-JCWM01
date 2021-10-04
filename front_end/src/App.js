import React from 'react';
import logo from './logo.svg';
import './App.css';
import RegisterPage from './pages/auth/RegisterPage'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Switch>
    <Route component={RegisterPage} path="/register"/>
   
    </Switch>
    </BrowserRouter>
  
  );
}

export default App;
