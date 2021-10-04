import Axios from 'axios'
import React from 'react'
import {URL_API} from '../../helper'


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alertShow: 'none',
            redirect: false
        }
    }


   

    onBtnRegister = () => {
        let username = this.regisUsername.value
        let email = this.regisEmail.value
        let password = this.regisPass.value
        let confPassword = this.regisConfPass.value
        console.log(username, password)

        if (username == "" || email == "" || password == "") {
            alert('Fill in all the form')
        } else {
            Axios.post(URL_API + '/user/regis', {
                username, email, password
            })
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
        }
    }
        

      

    

    render(){
        return (
            <div className="container" >
                <div className="row">
                    <div className="col-12 text-center my-5" style={{backgroundColor:"grey"}}>
                        <h1>Register page</h1>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-4 offset-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="font-weight-bold mb-3">register</h5>
                                
                                <input type="text"
                                
                                placeholder="username"
                                className="form-control my-4"
                                ref={el => this.regisUsername = el}
                                
                                />
                                <input type="text"
                                placeholder="email"
                                className="form-control my-4"
                                ref={el => this.regisEmail = el}
                               
                                />
                                <input type="password"
                                placeholder="password"
                                className="form-control my-4"
                                ref={el => this.regisPass = el}
    
                                
                                />
                                <input type="password"
                                placeholder="password"
                                className="form-control my-4"
                                ref={el => this.regisConfPass = el}
                              
                                />
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <button onClick={this.onBtnRegister} className="btn btn-primary mt-2">
                                        REGISTER
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
export default RegisterPage