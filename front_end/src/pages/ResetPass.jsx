import React from 'react';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Axios from 'axios';
import { URL_API } from '../helper';

class ResetPass extends React.Component {
  state = {
    newPass: "",
    confNewPass: "",
    redirect: false
  }

  inputHandler = (event) => {
    const value = event.target.value
    const name = event.target.name

    this.setState({ [name]: value })
  }

  submitBtnResetPass = ({newPass, confNewPass}) => {
    if (newPass == "" || confNewPass == "") {
      return alert("Fill in All the Form")
    } else if (newPass !== confNewPass) {
      alert("New Password Confirmation is not Matched")
    } else {
      Axios.patch(`${URL_API}/user/resetpass/${this.props.userGlobal.id_user}`, {
        newPass
      })
      .then(res => {
        alert("Password has been Reset")
        console.log("Password has been Reset")
        this.setState({ redirect: true })
      })
      .catch(err => {
        alert("Reset Password Failed")
        console.log(err)
      })
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mt-4">
            <h1>Reset Password</h1>
            <p className="lead">
              Please enter your new password
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
            <div className="card" style={{ backgroundColor: "#6495ED" }} >
              <div className="card-body">
                <h5 className="font-weight-bold mb-3" style={{ color: "white" }}>Reset Password</h5>
                <input onChange={this.inputHandler} name="newPass" placeholder="New password" type="password" className="form-control my-2" />
                <input onChange={this.inputHandler} name="confNewPass" placeholder="Confirm new password" type="password" className="form-control my-2" />
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <button onClick={() => this.submitBtnResetPass(this.state)} className="btn btn-light mt-2">
                    <strong>Submit</strong>
                  </button>
                  <Link to="/" style={{ color: "white" }}>Cancel</Link>
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
    userGlobal: state.user
  }
}

const mapDispatchToProps = {
  // submitBtnResetPass
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPass);