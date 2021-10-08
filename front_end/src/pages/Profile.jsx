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
    Axios.get(`http://localhost:3300/user/getProfile/2`)
        .then(res => {
            console.log(res.data)
            this.setState({ pharma2 : res.data })
            this.setState({address : res.data.address})
            this.setState({phone_number : res.data.phone_number})
            this.setState({full_name : res.data.full_name})
            this.setState({gender : res.data.gender})
            this.setState({age : res.data.age})
            this.setState({profile_picture : res.data.profile_picture})
        })
        .catch(err => {
            console.log(err)
        })
}



onBtnSave = () => {
    const {address, phone_number,full_name, gender, age} = this.state
    console.log(address, phone_number, full_name, gender, age);
    Axios.patch(`${URL_API}/user/edit/2`,{
        address ,
        phone_number,
        full_name,
        gender,
        age
    })
    .then(()=>{
        alert('Profile Change Successfully')
        this.getData()
        
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
                                             {/* image */}
                                       
                                             
                                             <h5>profile</h5>
                                             <Form>
                                           
                                             <label className={"d-grid gap-2 col-9 mx-auto"}>Username</label>
                                            
                                                
                                            <FormGroup>
                                            <Input className={"d-grid gap-2 col-6 mx-auto"} disabled="true" type="text"  defaultValue={item.username} style={{width:"300px"}}/>
                                            </FormGroup>

                                            
                                            <label className={"d-grid gap-2 col-9 mx-auto"}>Email</label>
                                            
                                            
                                            <FormGroup>
                                            <Input className={"d-grid gap-2 col-6 mx-auto"} disabled="true" type="text"  defaultValue={item.email} style={{width:"300px"}}/>
                                            </FormGroup>

                                            
                                            <label className={"d-grid gap-2 col-9 mx-auto"}>Address</label>
                                        
                                            
                                            <FormGroup>
                                            <Input className={"d-grid gap-2 col-6 mx-auto"} disabled="true" type="text"  defaultValue={item.address} style={{width:"300px"}}/>
                                            </FormGroup>

                                            
                                            <label className={"d-grid gap-2 col-9 mx-auto"}>Phone Number</label>
                                            
                                            
                                            <FormGroup>
                                            <Input className={"d-grid gap-2 col-6 mx-auto"} disabled="true" type="text"  defaultValue={item.phone_number} style={{width:"300px"}}/>
                                            </FormGroup>

                                            
                                            <label className={"d-grid gap-2 col-9 mx-auto"}>Full Name</label>
                                            
                                            
                                            <FormGroup>
                                            <Input className={"d-grid gap-2 col-6 mx-auto"} disabled="true" type="text"  defaultValue={item.full_name} style={{width:"300px"}}/>
                                            </FormGroup>

                                            
                                            <label className={"d-grid gap-2 col-9 mx-auto"}>Gender</label>
                                            
                                            
                                            <FormGroup>
                                            <Input className={"d-grid gap-2 col-6 mx-auto"} disabled="true" type="text"  defaultValue={item.gender} style={{width:"300px"}}/>
                                            </FormGroup>

                                            
                                            <label className={"d-grid gap-2 col-9 mx-auto"}>Age</label>
                                            
                                            
                                            <FormGroup>
                                            <Input className={"d-grid gap-2 col-6 mx-auto"} disabled="true" type="text"  defaultValue={item.age} style={{width:"300px"}}/>
                                            </FormGroup>

                                            
                                            <FormGroup>
                                            <Button className={"d-grid gap-2 col-6 mx-auto my-3"} onClick={() => this.setState({ selectedID: index })}>Edit </Button>
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
                                             <Form>
                                           
                                             <label className={"d-grid gap-2 col-9 mx-auto"}>Username</label>
                                            
                                                
                                            <FormGroup>
                                            <Input className={"d-grid gap-2 col-6 mx-auto"} disabled="true" type="text" name="username" innerRef={(newUsername) => this.newUsername = newUsername} defaultValue={item.username} style={{width:"300px"}}/>
                                            </FormGroup>

                                            
                                            <label className={"d-grid gap-2 col-9 mx-auto"}>Email</label>
                                            
                                            
                                            <FormGroup>
                                            <Input className={"d-grid gap-2 col-6 mx-auto"} disabled="true" type="text" name="email" innerRef={(newEmail) => this.newEmail = newEmail} defaultValue={item.email} style={{width:"300px"}} />
                                            </FormGroup>

                                            
                                            <label className={"d-grid gap-2 col-9 mx-auto"}>Address</label>
                                        
                                            
                                            <FormGroup>
                                            <Input className={"d-grid gap-2 col-6 mx-auto"} onChange={this.inputHandler} type="text" name="address" value={this.state.address}  defaultValue={item.address} style={{width:"300px"}} />
                                            </FormGroup>

                                            
                                            <label className={"d-grid gap-2 col-9 mx-auto"}>Phone Number</label>
                                            
                                            
                                            <FormGroup>
                                            <Input className={"d-grid gap-2 col-6 mx-auto"} onChange={this.inputHandler} type="text" name="phone_number" value={this.state.phone_number}  defaultValue={item.phone_number} style={{width:"300px"}} />
                                            </FormGroup>

                                            
                                            <label className={"d-grid gap-2 col-9 mx-auto"}>Full Name</label>
                                            
                                            
                                            <FormGroup>
                                            <Input className={"d-grid gap-2 col-6 mx-auto"} onChange={this.inputHandler} type="text" name="full_name" value={this.state.full_name}  defaultValue={item.full_name} style={{width:"300px"}} />
                                            </FormGroup>

                                            
                                            <label className={"d-grid gap-2 col-9 mx-auto"}>Gender</label>
                                            
                                            
                                            <FormGroup>
                                            <Input className={"d-grid mx-4"} style={{width:"100px"}} onChange={this.inputHandler} value={this.state.gender} type="select" name="gender" id="exampleSelect" >
                                            
                                            <option value={"-"}>-</option>
                                            <option value={"Pria"}>Pria</option>
                                            <option value={"Wanita"}>Wanita</option>
                                            </Input>
                                            </FormGroup>

                                            
                                            <label className={"d-grid gap-2 col-9 mx-auto"}>Age</label>
                                            
                                            
                                            <FormGroup>
                                            <Input className={"d-grid gap-2 col-6 mx-auto"} onChange={this.inputHandler} type="text" name="age"   defaultValue={item.age} value={this.state.age} style={{width:"300px"}} />
                                            </FormGroup>

                                            
                                            <FormGroup>
                                            {this.state.selectedID == null ? <><Button onClick={() => this.setState({ selectedID: index })}>Edit</Button><Button>Delete</Button></> :
                                             <><Button className={"d-grid gap-2 col-6 mx-auto my-2 btn warning "} onClick={() => this.setState({ selectedID: null })}>kembali</Button><Button className={"d-grid gap-2 col-6 mx-auto my-2 btn btn btn-success"} onClick={() => this.onBtnSave(this.state) } >Yes</Button></>}
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
