import React from 'react';
import Axios from 'axios';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { URL_API } from '../helper';


class Profile extends React.Component{
       
state = {
    address: "",
    phone_number: 0,
    full_name: "",
    gender: "",
    age: 0,
    profile_picture: "",
    role: "",
    status: "",
    pharma2 : [],
    selectedID : null

}
inputHandler = (event)=>{
    const value = event.target.value 
    const name = event.target.name 

    this.setState({[name] : value})

}




componentDidMount() {
    this.getData()
}

getData = () => {
    // Axios.get(`http://localhost:3300/user/getProfile/$this.globalState.id_user`)
    Axios.get(`http://localhost:3300/user/getProfile/1`)
        .then(res => {
            console.log(res.data)
            this.setState({ pharma2 : res.data })
        })
        .catch(err => {
            console.log(err)
        })
}

onBtnSave = (address, phoneNumber, fullName, gender) => {
    Axios.patch(`${URL_API}/user/edit/1`,{
        address,
        phoneNumber,
        fullName,
        gender
    })
    .then(()=>{
        alert('Profile Change Successfully')
        
    })
    .catch(err =>{
        console.log(err);
    })


}


printData = () => {
    return this.state.pharma2.map((item, index) => {
        if (this.state.selectedID !== index) {
            return (
                <div className="container">
                         <div className="col-12 text-center my-5">
                             PROFILE PAGE
                         </div>
                         <div className="row mt-5">
                             <div className="col-4 offset-4">
                                 <div className="card" style={{backgroundColor:"#6495ED"}}>
                                     <div className="card-body">
                                         <div className="font-weight-bold mb-3">
                                             <h5>profile</h5>
                                             <Form>
                                            <div className="container my-2 " style={{backgroundColor:"white", borderRadius:"5px"}}>
                                            <FormGroup>
                                                {item.username}
                                            </FormGroup>

                                            </div>
                                            <div className="container my-2" style={{backgroundColor:"white", borderRadius:"5px"}}>
                                            <FormGroup>
                                            {item.email}
                                            </FormGroup>

                                            </div>
                                            <div className="container my-2" style={{backgroundColor:"white", borderRadius:"5px"}}>
                                            <FormGroup>
                                            {item.address}
                                            </FormGroup>

                                            </div>
                                            <div className="container my-2" style={{backgroundColor:"white", borderRadius:"5px"}}>
                                            <FormGroup>
                                            {item.phone_number}
                                            </FormGroup>

                                            </div>
                                            <div className="container my-2" style={{backgroundColor:"white", borderRadius:"5px"}}>
                                            <FormGroup>
                                            {item.full_name}
                                            </FormGroup>

                                            </div>
                                            <div className="container my-2" style={{backgroundColor:"white", borderRadius:"5px"}}>
                                            <FormGroup>
                                            {item.gender}
                                            </FormGroup>

                                            </div>
                                            <div className="container my-2" style={{backgroundColor:"white", borderRadius:"5px"}}>
                                            <FormGroup>
                                            {item.age}
                                            </FormGroup>

                                            </div>
                                           
                                            
                                            
                                            
                                            
                                            
                                            
                                            <FormGroup>
                                            <Button onClick={() => this.setState({ selectedID: index })}>Edit </Button><Button >Delete</Button>
                                            </FormGroup>


                                        </Form>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                        
                         </div>
                  
             
                </div>
               
            )
        } else {
            return (
                <div className="container">
                         <div className="col-12 text-center my-5">
                             PROFILE PAGE
                         </div>
                         <div className="row mt-5">
                             <div className="col-4 offset-4">
                                 <div className="card" style={{backgroundColor:"#6495ED"}}>
                                     <div className="card-body">
                                         <div className="font-weight-bold mb-3">
                                             <h5>profile</h5>
                                             <Form width="90vw" className="col-md-2">
                        <FormGroup>
                        <Input disabled="true" type="text" name="username" innerRef={(newUsername) => this.newUsername = newUsername} defaultValue={item.username} style={{width:"300px"}}/>
                        </FormGroup>
                        <FormGroup>
                        <Input disabled="true" type="text" name="email" innerRef={(newEmail) => this.newEmail = newEmail} defaultValue={item.email} style={{width:"300px"}} />
                        </FormGroup>
                        <FormGroup>
                        <Input onChange={this.inputHandler} type="text" name="address" innerRef={(newAddress) => this.newAddress = newAddress} defaultValue={item.address} style={{width:"300px"}} />
                        </FormGroup>
                        <FormGroup>
                        <Input onChange={this.inputHandler} type="text" name="phoneNumber" innerRef={(newPhoneN) => this.newPhoneN = newPhoneN} defaultValue={item.phone_number} style={{width:"300px"}} />
                        </FormGroup>
                        <FormGroup>
                        <Input onChange={this.inputHandler} type="text" name="fullName" innerRef={(newFullN) => this.newFullN = newFullN} defaultValue={item.full_name} style={{width:"300px"}} />
                        </FormGroup>
                        <FormGroup>
                        <Input onChange={this.inputHandler} type="select" name="gender" id="exampleSelect" innerRef={(newGender) => this.newGender = newGender}>
                        <option value={1}>Pria</option>
                        <option value={2}>Wanita</option>
                        </Input>
                        </FormGroup>
                        <FormGroup>
                        {this.state.selectedID == null ? <><Button onClick={() => this.setState({ selectedID: index })}>Edit</Button><Button>Delete</Button></> :
                        <><Button onClick={() => this.setState({ selectedID: null })}>No</Button><Button onClick={() => this.onBtnSave(this.state)} >Yes</Button></>}
                        </FormGroup>
                  
                    </Form>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                        
                         </div>
                  
             
                </div>
               
               
            )
        }
    })
}

render() {
    //    console.log( this.posisi)
    return (
        <div className="row m-auto">
            
            <div className="col-md-10">
                <Table >
                   
                  
                    <tbody>
                        {this.printData()}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
}

const mapStateToProps = (state) => {
    return {
      userGlobal: state.user,
    }
  }



export default connect(mapStateToProps) (Profile);