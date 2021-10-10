import React from "react";
import Axios from "axios";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Table,
} from "reactstrap";
import { connect } from "react-redux";
import { URL_API } from "../helper";
import image_preview from "../../src/img/image_preview.png";

class Profile extends React.Component {
  state = {
    address: "",
    phone_number: 0,
    full_name: "",
    gender: "",
    age: 0,
    profile_picture: "",
    role: "",
    status: "",
    pharma2: [],
    selectedID: null,
  };
  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value});
  };

//   inputHandlerImg = (event) => {
    
   

//     this.setState({ profile_picture: URL.createObjectURL(upload) });
//   };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // Axios.get(`http://localhost:3300/user/getProfile/$this.props.globalState.id_user`)
    Axios.get(`http://localhost:3300/user/getProfile/1`)
      .then((res) => {
        this.setState({ pharma2: res.data });
        
        this.setState({ address: res.data.address });
        this.setState({ phone_number: res.data.phone_number });
        this.setState({ full_name: res.data.full_name });
        this.setState({ gender: res.data.gender });
        this.setState({ age: res.data.age });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onImgPreview = () =>{
      if(this.state.addFile){
          let formData = new FormData()


          
          formData.append('file', this.state.addFile)
          Axios.patch(`${URL_API}/upload/uploadimg/1`,formData)
          .then(res =>{
              alert(res.data.message)
              this.getData()
          })
          .catch(err =>{
              console.log(err);
          })
      }
  }

  getProfileImage = () =>{
      Axios.get(`${URL_API}/upload/get`)
      .then(res =>{
          this.setState({profile_picture : res.data.profile_picture})
      })
      .catch(err =>{
          console.log(err);
      })
  }

  onBtnAddImg = () =>{
    this.onBtnSave()
    this.onImgPreview()
  }

  onBtnAddfile = (e) =>{
    if (e.target.files[0]){
      this.setState({profile_picture : e.target.files[0].name, addFile : e.target.files[0]})
      let preview = document.getElementById("imgpreview")
      preview.src = URL.createObjectURL(e.target.files[0])
    }

  }

  onBtnSave = () => {
    const { address, phone_number, full_name, gender, age, profile_picture } =
      this.state;
    console.log(address, phone_number, full_name, gender, age, profile_picture);
    Axios.patch(`${URL_API}/user/edit/1`, {
      address,
      phone_number,
      full_name,
      gender,
      age,
      profile_picture,
    })
      .then(() => {
        alert("Profile Change Successfully");
        this.getData();
        this.setState({selectedID : null})
      })
      .catch((err) => {
        console.log(err);
      });
  };

  printData = () => {
    return this.state.pharma2.map((item, index) => {
      if (this.state.selectedID !== index) {
        return (
          <div className="container">
            <div className="col-12 text-center my-5">PROFILE PAGE</div>
            <div className="row mt-5">
              <div className="col-4 offset-4">
                <div className="card" style={{ backgroundColor: "#6495ED", width : "500px" }}>
                  <div className="card-body">
                    <div className="font-weight-bold mb-3">
                      {/* image */}
                      <div className="align-items-center justify-content-center">
                        
                            <img
                            name="img"
                            src= {URL_API + item.profile_picture}
                            id = "imgpreview"
                            className="justify-content-center"
                            alt=""
                            style={{
                              borderRadius: "50%",
                              width: "300px",
                              height: "300px",
                            }}
                          />


                         
                        
                      </div>

                      <div className="d-grid gap-2 col-9 ">
                        <h5>Your Profile</h5>
                      </div>

                      <Form>
                        <label className={"d-grid gap-2 my-1"}>
                          Username
                        </label>

                        <FormGroup>
                          <Input
                            className={"justify-content-center align-items-center my-1"}
                            disabled="true"
                            type="text"
                            defaultValue={item.username}
                            style={{ width: "400px" }}
                          />
                        </FormGroup>

                        <label className={"d-grid gap-2 my-1"}>
                          Email
                        </label>

                        <FormGroup>
                          <Input
                            className={"justify-content-center my-2"}
                            disabled="true"
                            type="text"
                            defaultValue={item.email}
                            style={{ width: "400px" }}
                          />
                        </FormGroup>

                        <label className={"d-grid gap-2 mx-auto"}>
                          Address
                        </label>

                        <FormGroup>
                          <Input
                            className={"justify-content-center align-items-center"}
                            disabled="true"
                            type="text"
                            defaultValue={item.address}
                            style={{ width: "400px" }}
                          />
                        </FormGroup>

                        <label className={"d-grid gap-2 mx-auto"}>
                          Phone Number
                        </label>

                        <FormGroup>
                          <Input
                            className={"justify-content-center align-items-center "}
                            disabled="true"
                            type="text"
                            defaultValue={item.phone_number}
                            style={{ width: "400px" }}
                          />
                        </FormGroup>

                        <label className={"d-grid gap-2 mx-auto"}>
                          Full Name
                        </label>

                        <FormGroup>
                          <Input
                            className={"justify-content-center align-items-center"}
                            disabled="true"
                            type="text"
                            defaultValue={item.full_name}
                            style={{ width: "400px" }}
                          />
                        </FormGroup>

                        <label className={"d-grid gap-2 mx-auto"}>
                          Gender
                        </label>

                        <FormGroup>
                          <Input
                            className={"justify-content-center align-items-center"}
                            disabled="true"
                            type="text"
                            defaultValue={item.gender}
                            style={{ width: "400px" }}
                          />
                        </FormGroup>

                        <label className={"d-grid gap-2 mx-auto"}>
                          Age
                        </label>

                        <FormGroup>
                          <Input
                            className={"justify-content-center align-items-center"}
                            disabled="true"
                            type="text"
                            defaultValue={item.age}
                            style={{ width: "400px" }}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Button
                            className="d-grid gap-2 col-6 my-2 btn btn btn-success"
                            onClick={() => this.setState({ selectedID: index, profile_picture : item.profile_picture })}
                          >
                            Edit{" "}
                          </Button>
                        </FormGroup>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="container">
            <div className="col-12 text-center my-5">PROFILE PAGE</div>
            <div className="row mt-5">
              <div className="col-4 offset-4">
                <div className="card" style={{ backgroundColor: "#6495ED", width:"500px" }}>
                  <div className="card-body">
                    <div className="font-weight-bold mb-3">
                      <div
                        className="dflex justify-content-center align-items-center"
                        style={{ height: "40vh" }}
                      >
                        <div>
                            <img
                            name="img"
                           id = "imgpreview"
                           src = {URL_API + item.profile_picture}
                            className="justify-content-center"
                            alt=""
                            style={{
                              borderRadius: "50%",
                              width: "300px",
                              height: "300px",
                            }}
                          />
                        </div>
                        <div className="my-3">
                          <label htmlFor="formFile" className="form-label">
                            Upload Image Here
                          </label>
                          <input
                            onChange={this.onBtnAddfile}
                            type="file"
                            className="form-control"
                            id="formFile"
                            accept="image/*"
                            
                          />
                        </div>
                      </div>

                      <Form>
                        <label className={"d-grid gap-2 my-1"}>
                          Username
                        </label>

                        <FormGroup>
                          <Input
                            className={"justify-content-center align-items-center"}
                            disabled="true"
                            type="text"
                            name="username"
                            innerRef={(newUsername) =>
                              (this.newUsername = newUsername)
                            }
                            defaultValue={item.username}
                            style={{ width: "400px" }}
                          />
                        </FormGroup>

                        <label className={"d-grid gap-2 my-1"}>
                          Email
                        </label>

                        <FormGroup>
                          <Input
                            className={"justify-content-center align-items-center"}
                            disabled="true"
                            type="text"
                            name="email"
                            innerRef={(newEmail) => (this.newEmail = newEmail)}
                            defaultValue={item.email}
                            style={{ width: "400px" }}
                          />
                        </FormGroup>

                        <label className={"d-grid gap-2 my-1"}>
                          Address
                        </label>

                        <FormGroup>
                          <Input
                            className={"justify-content-center align-items-center"}
                            onChange={this.inputHandler}
                            type="textarea"
                            name="address"
                            value={this.state.address}
                            defaultValue={item.address}
                            style={{ width: "400px" }}
                          />
                        </FormGroup>

                        <label className={"d-grid gap-2 my-1"}>
                          Phone Number
                        </label>

                        <FormGroup>
                          <Input
                            className={"justify-content-center align-items-center"}
                            onChange={this.inputHandler}
                            type="text"
                            name="phone_number"
                            value={this.state.phone_number}
                            defaultValue={item.phone_number}
                            style={{ width: "400px" }}
                          />
                        </FormGroup>

                        <label className={"d-grid gap-2 my-1"}>
                          Full Name
                        </label>

                        <FormGroup>
                          <Input
                            className={"justify-content-center align-items-center"}
                            onChange={this.inputHandler}
                            type="text"
                            name="full_name"
                            value={this.state.full_name}
                            defaultValue={item.full_name}
                            style={{ width: "400px" }}
                          />
                        </FormGroup>

                        <label className={"d-grid gap-2 my-1"}>
                          Gender
                        </label>

                        <FormGroup>
                          <Input
                            className={"d-grid mx-4"}
                            style={{ width: "100px" }}
                            onChange={this.inputHandler}
                            value={this.state.gender}
                            type="select"
                            name="gender"
                            id="exampleSelect"
                          >
                            <option value={"-"}>-</option>
                            <option value={"Pria"}>Pria</option>
                            <option value={"Wanita"}>Wanita</option>
                          </Input>
                        </FormGroup>

                        <label className={"d-grid gap-2 my-1"}>
                          Age
                        </label>

                        <FormGroup>
                          <Input
                            className={"justify-content-center align-items-center"}
                            onChange={this.inputHandler}
                            type="text"
                            name="age"
                            defaultValue={item.age}
                            value={this.state.age}
                            style={{ width: "400px" }}
                          />
                        </FormGroup>

                        <FormGroup>
                          {this.state.selectedID == null ? (
                            <>
                              <Button
                                onClick={() =>
                                  this.setState({ selectedID: index })
                                }
                              >
                                Edit
                              </Button>
                              <Button>Delete</Button>
                            </>
                          ) : (
                            <>
                              <Button
                                className={" gap-2 col-6 my-2 btn warning "}
                                onClick={() =>
                                  this.setState({ selectedID: null })
                                }
                              >
                                Back
                              </Button>
                              <Button
                                className={"d-grid gap-2 col-6 my-2 btn btn btn-success"}
                                onClick={() => this.onBtnAddImg(this.state)}
                              >
                                Save Change
                              </Button>
                            </>
                          )}
                        </FormGroup>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });
  };

  render() {
    //    console.log( this.posisi)
    return (
      <div className="row m-auto">
        <div className="col-md-10">
          <Table>
            <tbody>{this.printData()}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

export default connect(mapStateToProps)(Profile);
