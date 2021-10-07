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

onBtnSave = () => {
    const {address, phone_number,full_name, gender, age} = this.state
    console.log(address, phone_number, full_name, gender, age);
    Axios.patch(`${URL_API}/user/edit/1`,{
        address ,
        phone_number,
        full_name,
        gender,
        age
    })
    .then(()=>{
        alert('Profile Change Successfully')
        
    })
    .catch(err =>{
        console.log(err);
    })
console.log(this.inputHandler);

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
                                             <td>
                                             <label htmlFor="">Username</label>
                                            <tr><div className="container my-2 " style={{backgroundColor:"white", borderRadius:"5px"}}>
                                                
                                            <FormGroup>
                                                {item.username}
                                            </FormGroup>

                                            </div></tr>
                                            <label htmlFor="">Email</label>
                                            <div className="container my-2" style={{backgroundColor:"white", borderRadius:"5px"}}>
                                            
                                            <FormGroup>
                                            {item.email}
                                            </FormGroup>

                                            </div>
                                            <label htmlFor="">Address</label>
                                            <tr><div className="container my-2" style={{backgroundColor:"white", borderRadius:"5px"}}>
                                            
                                            <FormGroup>
                                            {item.address}
                                            </FormGroup>

                                            </div></tr>
                                            <label htmlFor="">Phone Number</label>
                                            <div className="container my-2" style={{backgroundColor:"white", borderRadius:"5px"}}>
                                            
                                            <FormGroup>
                                            {item.phone_number}
                                            </FormGroup>

                                            </div>
                                            <label htmlFor="">Full Name</label>
                                            <div className="container my-2" style={{backgroundColor:"white", borderRadius:"5px"}}>
                                            
                                            <FormGroup>
                                            {item.full_name}
                                            </FormGroup>

                                            </div>
                                            <label htmlFor="">Gender</label>
                                            <div className="container my-2" style={{backgroundColor:"white", borderRadius:"5px"}}>
                                            
                                            <FormGroup>
                                            {item.gender}
                                            </FormGroup>

                                            </div>
                                            <label htmlFor="">Age</label>
                                            <div className="container my-2" style={{backgroundColor:"white", borderRadius:"5px"}}>
                                            
                                            <FormGroup>
                                            {item.age}
                                            </FormGroup>

                                            </div>
                                           
                                            
                                            
                                            
                                            
                                            
                                            
                                            <FormGroup>
                                            <Button className={"btn btn-success mx-2"} onClick={() => this.setState({ selectedID: index })}>Edit </Button><Button className ={"btn btn-primary"} >Delete</Button>
                                            </FormGroup>


                                             </td>
                                            
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
                            <label htmlFor="">username</label>
                        <Input disabled="true" type="text" name="username" innerRef={(newUsername) => this.newUsername = newUsername} defaultValue={item.username} style={{width:"300px"}}/>
                        </FormGroup>
                        <FormGroup>
                        <label htmlFor="">Email</label>
                        <Input disabled="true" type="text" name="email" innerRef={(newEmail) => this.newEmail = newEmail} defaultValue={item.email} style={{width:"300px"}} />
                        </FormGroup>
                        <FormGroup>
                        <label htmlFor="">Address</label>
                        <Input onChange={this.inputHandler} type="text" name="address"  defaultValue={item.address} style={{width:"300px"}} />
                        </FormGroup>
                        <FormGroup>
                        <label htmlFor="">Phone_Number</label>
                        <Input onChange={this.inputHandler} type="text" name="phone_number"  defaultValue={item.phone_number} style={{width:"300px"}} />
                        </FormGroup>
                        <FormGroup>
                        <label htmlFor="">Full_Name</label>
                        <Input onChange={this.inputHandler} type="text" name="full_name"  defaultValue={item.full_name} style={{width:"300px"}} />
                        </FormGroup>
                        <FormGroup>
                        <label htmlFor="">Gender</label>
                        <Input style={{width:"100px"}} onChange={this.inputHandler} type="select" name="gender" id="exampleSelect" >
                        <option value={"Pria"}>Pria</option>
                        <option value={"Wanita"}>Wanita</option>
                        </Input>
                        </FormGroup>
                        <FormGroup>
                        <label htmlFor="">Age</label>
                        <Input onChange={this.inputHandler} type="text" name="age"   defaultValue={item.age} style={{width:"300px"}} />
                        </FormGroup>
                        <FormGroup>
                        {this.state.selectedID == null ? <><Button onClick={() => this.setState({ selectedID: index })}>Edit</Button><Button>Delete</Button></> :
                        <><Button onClick={() => this.setState({ selectedID: null })}>kembali</Button><Button onClick={() => this.onBtnSave(this.state) } >Yes</Button></>}
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