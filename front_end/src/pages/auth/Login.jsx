import React from 'react';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { onBtnLogin } from "../../redux/actions/user";
import "../../assets/styles/background.css"

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  }

  inputHandler = (event) => {
    const value = event.target.value
    const name = event.target.name

    this.setState({ [name]: value })
  }

  render() {
    if(this.props.userGlobal.id_user) {
      return <Redirect to="/" />
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mt-4">
            <h1>Log in now!</h1>
            <p className="lead">
              Log in now and start shopping in the most affordable <strong>pharmaceutical</strong> ecommerce
            </p>
            {
              this.props.userGlobal.errMsg ?
              <div className="alert alert-danger">{this.props.userGlobal.errMsg}</div>
              : null
            }
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-4 offset-4">
            <div className="card" style={{ backgroundColor: "#6495ED" }}>
              <div className="card-body">
                <h5 className="font-weight-bold mb-3" style={{ color: "white" }}>Log in</h5>
                <input onChange={this.inputHandler} name="username" placeholder="Username" type="text" className="form-control my-2" />
                <input onChange={this.inputHandler} name="password" placeholder="Password" type="password" className="form-control my-2" />
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <button onClick={() => this.props.onBtnLogin(this.state)} className="btn btn-light mt-2">
                    <strong>Login</strong>
                  </button>
                  <Link to="/register" style={{ color: "white" }}>Or register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  }
}

const mapDispatchToProps = {
  onBtnLogin,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);