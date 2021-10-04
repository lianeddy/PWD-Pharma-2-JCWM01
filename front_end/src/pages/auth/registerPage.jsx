import Axios from 'axios'
import React, {useState, useEffect} from 'react'
import {URL_API} from '../../helper'


const RegisterPage = () =>{
    const [ username, setUsername] = useState('')
    const [ email, setEmail] = useState('')
    const [ password, setPassword] = useState('')
    const [ confPassword, setConfPassword] = useState('')

    const changeUsername = (e) =>{
        const value = e.target.value 
        setUsername(value)
    }

    const changeEmail = (e) =>{
        const value = e.target.value 
        setEmail(value)
    }

    const changePassword = (e) =>{
        const value = e.target.value 
        setPassword(value)
    }

    const changeConfPassword = (e) =>{
        const value = e.target.value 
        setConfPassword(value)
    }


    const onBtnRegister = (data) =>{
        let un = username
        let em = email
        let pass = password
        console.log(un, em);

        if (un == "" || em == "" || pass == ""){
            alert('fill in all the form')
        }else {
            Axios.post(URL_API + '/user/regis',{
                un, em, password
            })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        }
        
    }
   

    

    
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
                            onChange={changeUsername}
                            value={username}
                            
                            />
                            <input type="text"
                            placeholder="email"
                            className="form-control my-4"
                            onChange={changeEmail}
                            value={email}
                           
                            />
                            <input type="text"
                            placeholder="username"
                            className="form-control my-4"
                            onChange={changePassword}
                            value={password}
                            
                            />
                            <input type="text"
                            placeholder="username"
                            className="form-control my-4"
                            onChange={changeConfPassword}
                            value={confPassword}
                          
                            />
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <button onClick={onBtnRegister} className="btn btn-primary mt-2">
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
export default RegisterPage