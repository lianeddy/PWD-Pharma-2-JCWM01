import Axios from 'axios'
import React from 'react'
import {URL_API} from '../helper'
import {connect} from 'react-redux'



class Profil extends React.Component{
    
render(){
    return (

        <div className="container" style={{background:""}} >
            <div className="row">
                <div className="col-12 text-center my-5" >
                    <h1>Profile page</h1>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-4 offset-4">
                    <div className="card" style={{width:"400px "}}>
                        <div className="card-body" style={{width:"400px"}}>
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
                                           <input
                                    name="confPassword"
                                    onChange={this.inputHandler}
                                    placeholder="configuration password"
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
    
};
}

       

export default Profil