import React from 'react';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { submitBtnResetEmail } from "../redux/actions/user";

class ResetPassEmail extends React.Component {
  state = {
    email: ""
  }

  inputHandler = (event) => {
    const value = event.target.value
    const name = event.target.name

    this.setState({ [name]: value })
  }

  render() {
    if(this.props.userGlobal.id_user) {
      return <Redirect to="/resetpass" />
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mt-4">
            <h1>Forgot your Password?</h1>
            <p className="lead">
              Please input your email
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
                <h5 className="font-weight-bold mb-3" style={{ color: "white" }}>Forgot Password</h5>
                <input onChange={this.inputHandler} name="email" placeholder="Email" type="text" className="form-control my-2" />
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <button onClick={() => this.props.submitBtnResetEmail(this.state)} className="btn btn-light mt-2">
                    <strong>Submit</strong>
                  </button>
                  <Link to="/login" style={{ color: "white" }}>Cancel</Link>
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
  submitBtnResetEmail
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassEmail);