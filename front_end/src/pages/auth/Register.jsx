import Axios from 'axios';
import React from 'react';
import { URL_API } from '../../helper';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
// import { registerUser } from '../../redux/actions/user'
import backgroundpharma from '../../img/pharma2.jpg'


class Register extends React.Component {
  state = {
    username : "",
    email : "",
    password : "",
    confPassword : "",
    tryVerified : false
  }

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  onBtnRegister = () => {
    const {username, email, password, confPassword } = this.state;

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
        alert("Register Success !!! check your EMAIL to verified");
        window.location.reload()
        this.setState({tryVerified : true})
      })
      .catch(() => {
        alert("gagal mendapatkan users or username sudah terdaftar");
      });
    }
  }

  render(){
    return (
      <div className="container" >
        <div className="row">
          <div className="col-12 text-center mt-4" >
            <h1>Register page</h1>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-4 offset-4">
            <div className="card" style={{backgroundColor:"#6495ED"}}>
              <div className="card-body">
                <h5 className="font-weight-bold mb-3" style={{ color: "white" }}>Register</h5>
                  <input
                  name="username"
                  onChange={this.inputHandler}
                  placeholder="Username"
                  maxLength="12"
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
                  maxLength="12"
                  placeholder="Password"
                  type="password"
                  className="form-control my-2"
                  />
                    <input
                  name="confPassword"
                  onChange={this.inputHandler}
                  placeholder="Confirm password"
                  maxLength="12"
                  type="password"
                  className="form-control my-2"
                  />
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <button onClick={this.onBtnRegister} className="btn btn-light mt-2" disabled={this.tryVerified}>
                    {this.tryVerified ? "Check Your Email" : <strong>Register</strong>}
                  </button>
                  <Link to="/login" style={{ color: "white" }}>Or login</Link>
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
  // registerUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);