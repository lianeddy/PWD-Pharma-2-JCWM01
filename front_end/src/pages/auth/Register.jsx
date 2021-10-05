import Axios from 'axios';
import React from 'react';
import { URL_API } from '../../helper';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
// import { registerUser } from '../../redux/actions/user'

class Register extends React.Component {
  state = {
    username : "",
    email : "",
    password : "",
    confPassword : ""
  }

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  onBtnRegister = () => {
    const {username, email, password, confPassword } = this.state;
    console.log(username, email, password, confPassword);

    if (username == "" || email == "" || password == "" || confPassword == "") {
      alert('fill in all the form')
    } else if (password !== confPassword){
      alert('password is not match')
    } else {
      Axios.post(`${URL_API}/user/register`, {
        username,
        email,
        password,
        confPassword
      })
      //proses asyncronus
      .then(() => {
        alert("berhasil mendapatkan users");
      })
      .catch(() => {
        alert("gagal mendapatkan users");
      });
    }
  }
        
  render() {
    return (
      <div className="container" >
        <div className="row">
            <div className="col-12 text-center my-5" >
                <h1>Register now!</h1>
            </div>
        </div>
        <div className="row mt-5">
          <div className="col-4 offset-4">
            <div className="card">
              <div className="card-body">
                <h5 className="font-weight-bold mb-3">Register</h5>
                  <input
                  name="username"
                  onChange={this.inputHandler}
                  placeholder="Username"
                  type="text"
                  className="form-control my-2"
                  />
                  <input
                  name="email"
                  onChange={this.inputHandler}
                  placeholder="Email"
                  type="text"
                  className="form-control my-2"
                  />
                  <input
                  name="password"
                  onChange={this.inputHandler}
                  placeholder="Password"
                  type="password"
                  className="form-control my-2"
                  />
                  <input
                  name="confPassword"
                  onChange={this.inputHandler}
                  placeholder="Confirm Password"
                  type="password"
                  className="form-control my-2"
                  />
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <button onClick={this.onBtnRegister} className="btn btn-primary mt-2">
                    Register
                  </button>
                  <Link to="/login">Or login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => {
    return {};
};
  
const mapDispatchToProps = {
// registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
  