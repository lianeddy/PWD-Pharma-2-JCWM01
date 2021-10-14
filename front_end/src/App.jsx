import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ChangePass from "./pages/ChangePass";
import Navbar from "./components/Navbar";
import ResetPassEmail from "./pages/ResetPassEmail";
import ResetPass from "./pages/ResetPass";
import VerificationPage from "./pages/auth/VerificationPage";
import Admin from "./pages/admin/Admin";
import Cart from "./pages/Cart";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Prescription from './pages/Prescription'
import SalesReport from "./pages/admin/SalesReport";
import UploadPayment from "./pages/UploadPayment";
import Transaction from "./pages/Transaction"

import { connect } from 'react-redux';
import { userKeepLogin, checkStorage } from './redux/actions/user';

class App extends React.Component {

  componentDidMount() {
    const userLocalStorage = localStorage.getItem("userDataEmmerce")

    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage)
      this.props.userKeepLogin(userData)
    } else {
      this.props.checkStorage()
    }
  }

  render() {
    if (this.props.userGlobal.storageIsChecked) {
      return (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route component={Home} path="/" exact/>
            <Route component={Login} path="/login" />
            <Route component={Register} path="/register" />
            <Route component={ChangePass} path="/change-pass" />
            <Route component={ResetPassEmail} path="/reset-pass-email" />
            <Route component={ResetPass} path="/resetpass" />
            <Route component={VerificationPage} path="/authentication/:token" />
            <Route component={Admin} path="/admin" />
            <Route component={Cart} path="/cart" />
            <Route component={History} path="/history" />
            <Route component={Profile} path="/profile" />
            <Route component={Prescription} path="/prescription"/>
            <Route component={SalesReport} path="/sales" />
            <Route component={UploadPayment} path="/upload-payment" />
            <Route component={Transaction} path="/transaction" />
          </Switch>
        </BrowserRouter>
      )
    }

    return (
      <div>
        Loading...
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user
  }
}

const mapDispatchToProps = {
  userKeepLogin,
  checkStorage
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
