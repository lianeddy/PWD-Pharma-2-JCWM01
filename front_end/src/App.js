import React from "react";

import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import VerificationPage from "./pages/auth/VerificationPage";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={Login} path="/login" />
        <Route component={Register} path="/register" />
        <Route component={ProductDetail} path="/product-detail/:productId" />
        <Route component={VerificationPage} path="/authentication/:token" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
