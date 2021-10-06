import React from 'react';
import Axios from 'axios';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import { connect } from 'react-redux';


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
    Axios.get(`http://localhost:3300/user/getProfile/2`)
        .then(res => {
            console.log(res.data)
            this.setState({ pharma2 : res.data })
        })
        .catch(err => {
            console.log(err)
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
                                            <FormGroup>
                                                {index + 1}
                                            </FormGroup>
                                            <FormGroup>
                                                {item.username}
                                            </FormGroup>
                                            <FormGroup>
                                            {item.email}
                                            </FormGroup>
                                            <FormGroup>
                                            {item.address}
                                            </FormGroup>
                                            <FormGroup>
                                            {item.phone_number}
                                            </FormGroup>
                                            <FormGroup>
                                            {item.full_name}
                                            </FormGroup>
                                            <FormGroup>
                                            {item.gender}
                                            </FormGroup>
                                            <FormGroup>
                                            {item.age}
                                            </FormGroup>
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
                        <Input type="text" name="text" innerRef={(newUsername) => this.newUsername = newUsername} defaultValue={item.username} style={{width:"300px"}}/>
                        </FormGroup>
                        <FormGroup>
                        <Input type="text" name="text" innerRef={(newEmail) => this.newEmail = newEmail} defaultValue={item.email} style={{width:"300px"}} />
                        </FormGroup>
                        <FormGroup>
                        <Input type="text" name="text" innerRef={(newAddress) => this.newAddress = newAddress} defaultValue={item.address} style={{width:"300px"}} />
                        </FormGroup>
                        <FormGroup>
                        <Input type="text" name="text" innerRef={(newPhoneN) => this.newPhoneN = newPhoneN} defaultValue={item.phone_number} style={{width:"300px"}} />
                        </FormGroup>
                        <FormGroup>
                        <Input type="text" name="text" innerRef={(newFullN) => this.newFullN = newFullN} defaultValue={item.full_name} style={{width:"300px"}} />
                        </FormGroup>
                        <FormGroup>
                        <Input type="select" name="select" id="exampleSelect" innerRef={(newGender) => this.newGender = newGender}>
                        <option value={1}>Pria</option>
                        <option value={2}>Wanita</option>
                        </Input>
                        </FormGroup>
                        <FormGroup>
                        {this.state.selectedID == null ? <><Button onClick={() => this.setState({ selectedID: index })}>Edit</Button><Button>Delete</Button></> :
                        <><Button onClick={() => this.setState({ selectedID: null })}>No</Button><Button >Yes</Button></>}
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