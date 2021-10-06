import Axios from 'axios'
import React from 'react'
import {URL_API} from '../../helper'
import {connect} from 'react-redux'
import {registerUser } from '../../redux/actions/user'
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
        console.log(username, email, password, confPassword);

        if(username == "" || email == "" || password == "" || confPassword == ""){
            alert('fill in all the form')
        }else if(password !== confPassword){
            alert('password is not match')
        }else{
            Axios.post(`${URL_API}/user/register`, {
                username,
                email,
                password,
                confPassword
              })
                   //proses asyncronus
                .then(() => {
                  alert("Register Success !!! check your EMAIL to verified");
                  this.setState({tryVerified : true})
                })
                .catch(() => {
                  alert("gagal mendapatkan users");
                });
        }
  
    }
        

       

    

    render(){
        return (
            
            <div className="container" >
                 
                
                <div className="row">
                    <div className="col-12 text-center my-5" >
                        <h1>Register page</h1>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-4 offset-4">
                        <div className="card" style={{backgroundColor:"#6495ED"}}>
                            <div className="card-body">
                                <h5 className="font-weight-bold mb-3">register</h5>
                                
                                        <input
                                        name="username"
                                        onChange={this.inputHandler}
                                        placeholder="username"
                                        type="text"
                                        className="form-control my-2"
                                        />
                                        <input
                                        name="email"
                                        onChange={this.inputHandler}
                                        placeholder="email"
                                        type="text"
                                        className="form-control my-2"
                                        />
                                        <input
                                        name="password"
                                        onChange={this.inputHandler}
                                        placeholder="password"
                                        type="password"
                                        className="form-control my-2"
                                        />
                                         <input
                                        name="confPassword"
                                        onChange={this.inputHandler}
                                        placeholder="configuration password"
                                        type="password"
                                        className="form-control my-2"
                                        />
                                        
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <button onClick={this.onBtnRegister} className="btn btn-primary mt-2" disabled={this.tryVerified}>
                                        {this.tryVerified ? "Check Your Email" : "Register"}
                                    </button>
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
    registerUser,
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Register);
  