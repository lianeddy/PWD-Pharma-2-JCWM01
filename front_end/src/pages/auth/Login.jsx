import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { loginUser } from "../../redux/actions/user";
import { URL_API } from "../../helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const inputEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const inputUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const inputPassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const onBtnLogin = () => {
    Axios.post(`${URL_API}/user/login`, {
      username,
      password,
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
        alert("Terjadi kesalahan di server");
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h1>Log in now!</h1>
          <p className="lead">
            Log in now and start shopping in the most affordable ecommerce
            platform
          </p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-4 offset-4">
          <div className="card">
            <div className="card-body">
              <h5 className="font-weight-bold mb-3">Log in</h5>
              <input
                onChange={inputUsername}
                name="username"
                placeholder="Username"
                type="text"
                className="form-control my-2"
              />
              <input
                onChange={inputPassword}
                name="password"
                placeholder="Password"
                type="password"
                className="form-control my-2"
              />
              <div className="d-flex flex-row justify-content-between align-items-center">
                <button className="btn btn-primary mt-2">Login</button>
                <Link to="/register">Or register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
