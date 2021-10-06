import React from 'react';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Axios from 'axios';
import { URL_API } from '../helper';
// import { onBtnSubmit } from "../redux/actions/user";

class ChangePass extends React.Component {
  state = {
    currentPass: "",
    newPass: "",
    confNewPass: ""
  }

  inputHandler = (event) => {
    const value = event.target.value
    const name = event.target.name

    this.setState({ [name]: value })
  }

  onBtnSubmit = ({currentPass, newPass, confNewPass}) => {
    // const {currentPass, newPass, confNewPass} = this.state
    // console.log(currentPass, newPass, confNewPass)

    if (currentPass == "" || newPass == "" || confNewPass == "" ) {
      alert("Fill in All the Form")
    } else if (newPass !== confNewPass) {
      alert("New Password Confirmation is not Matched")
    } else {
      Axios.patch(`${URL_API}/user/change/${this.props.userGlobal.id_user}`, {
        newPass,
        currentPass
      })
      .then(res => {
        alert("Password Changed Successfully")
        console.log("Password Changed Successfully")
      })
      .catch(err => {
        alert("Your Current Password is Wrong")
        console.log(err)
      })
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Change Password</h1>
            <p className="lead">
              Change Password
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-4 offset-4">
            <div className="card">
              <div className="card-body">
                <h5 className="font-weight-bold mb-3">Change Password</h5>
                <input onChange={this.inputHandler} name="currentPass" placeholder="Current password" type="password" className="form-control my-2" />
                <input onChange={this.inputHandler} name="newPass" placeholder="New password" type="password" className="form-control my-2" />
                <input onChange={this.inputHandler} name="confNewPass" placeholder="Confirm new password" type="password" className="form-control my-2" />
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <button onClick={() => this.onBtnSubmit(this.state)} className="btn btn-primary mt-2">
                    Submit
                  </button>
                  <Link to="/">Cancel</Link>
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

// const mapDispatchToProps = {
//   onBtnSubmit,
// }

export default connect(mapStateToProps)(ChangePass);