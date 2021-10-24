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
    this.setState({ [name]: value });
  };

  //   inputHandlerImg = (event) => {

  //     this.setState({ profile_picture: URL.createObjectURL(upload) });
  //   };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // Axios.get(`http://localhost:3300/user/getProfile/$this.props.globalState.id_user`)
    // HARDCODE
    Axios.get(`http://localhost:3300/user/getProfile/${this.props.userGlobal.id_user}`)
      .then((res) => {
        this.setState({
          pharma2: res.data,
          address: res.data.address,
          phone_number: res.data.phone_number,
          full_name: res.data.full_name,
          gender: res.data.gender,
          age: res.data.age,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onImgPreview = () => {
    if (this.state.addFile) {
      let formData = new FormData();

      formData.append("file", this.state.addFile);
      // HARDCODE
      Axios.patch(`${URL_API}/upload/uploadimg/${this.props.userGlobal.id_user}`, formData)
        .then((res) => {
          alert(res.data.message);
          this.getData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  getProfileImage = () => {
    Axios.get(`${URL_API}/upload/get`)
      .then((res) => {
        this.setState({ profile_picture: res.data.profile_picture });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onBtnSaveAll = () => {
    this.onBtnSave();
    this.onImgPreview();
    this.getData();
    window.location.reload()
  };

  onBtnAddfile = (e) => {
    if (e.target.files[0]) {
      this.setState({
        profile_picture: e.target.files[0].name,
        addFile: e.target.files[0],
      });
      let preview = document.getElementById("imgpreview");
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  onBtnSave = () => {
    const { address, phone_number, full_name, gender, age, profile_picture } =
      this.state;
    console.log(address, phone_number, full_name, gender, age, profile_picture);
    // HARDCODE
    Axios.patch(`${URL_API}/user/edit/${this.props.userGlobal.id_user}`, {
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
        this.setState({ selectedID: null });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  printData = () => {
    return this.state.pharma2.map((item, index) => {
      if (this.state.selectedID !== index) {
        return (
          <div className="container rounded mt-5 mb-5 row justify-content-center">
            <div
              className="col-md-3 border-right"
              style={{ backgroundColor: "#00008B", borderRadius: "10px" }}
            >
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  id="imgpreview"
                  className="rounded-circle mt-5"
                  width="150px"
                  src={URL_API + item.profile_picture}
                  style={{ height: "150px" }}
                />

                <span style={{ color: "white" }}> {item.full_name}</span>
              </div>
            </div>
            <div
              className="col-md-5 border-right"
              style={{ backgroundColor: "#00008B", borderRadius: "10px" }}
            >
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right" style={{ color: "white" }}>
                    Profile
                  </h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels" style={{ color: "white" }}>
                      Username
                    </label>
                    <input
                      type="text"
                      disabled="true"
                      defaultValue={item.username}
                      className="form-control"
                      placeholder="username"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels" style={{ color: "white" }}>
                      Email
                    </label>
                    <input
                      type="text"
                      disabled="true"
                      defaultValue={item.email}
                      className="form-control"
                      placeholder="surname"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels" style={{ color: "white" }}>
                      Address
                    </label>
                    <input
                      type="text-area"
                      disabled="true"
                      className="form-control"
                      placeholder="enter address"
                      defaultValue={item.address}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels" style={{ color: "white" }}>
                      Phone Number
                    </label>
                    <input
                      type="text"
                      disabled="true"
                      className="form-control"
                      placeholder="phone number"
                      defaultValue={item.phone_number}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels" style={{ color: "white" }}>
                      Fullname
                    </label>
                    <input
                      type="text"
                      disabled="true"
                      className="form-control"
                      placeholder="enter full name"
                      defaultValue={item.full_name}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels" style={{ color: "white" }}>
                      Gender
                    </label>
                    <input
                      type="text"
                      disabled="true"
                      className="form-control"
                      placeholder="enter gender"
                      defaultValue={item.gender}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels" style={{ color: "white" }}>
                      Age
                    </label>
                    <input
                      type="text"
                      disabled="true"
                      className="form-control"
                      placeholder="enter age"
                      defaultValue={item.age}
                    />
                    <div className="mt-5 text-center">
                      <button
                        className="btn btn-primary profile-button"
                        type="button"
                        onClick={() =>
                          this.setState({
                            selectedID: index,
                            profile_picture: item.profile_picture,
                          })
                        }
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
              <div
                className="col-md-3 border-right"
                style={{ backgroundColor: "#00008B", borderRadius: "10px" }}
              >
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  <img
                    id="imgpreview"
                    className="rounded-circle mt-5"
                    width="150px"
                    src={URL_API + item.profile_picture}
                    style={{ height: "150px" }}
                  />

                  <input
                    onChange={this.onBtnAddfile}
                    type="file"
                    className="form-control"
                    id="formFile"
                    accept="image/*"
                  />
                </div>
              </div>
              <div
                className="col-md-5 border-right"
                style={{ backgroundColor: "#00008B", borderRadius: "10px" }}
              >
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right" style={{ color: "white" }}>
                      Profile
                    </h4>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <label className="labels" style={{ color: "white" }}>
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        disabled="true"
                        innerRef={(newUsername) =>
                          (this.newUsername = newUsername)
                        }
                        defaultValue={item.username}
                        className="form-control"
                        placeholder="username"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels" style={{ color: "white" }}>
                        Email
                      </label>
                      <input
                        type="text"
                        disabled="true"
                        name="email"
                        defaultValue={item.email}
                        innerRef={(newEmail) => (this.newEmail = newEmail)}
                        className="form-control"
                        placeholder="surname"
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels" style={{ color: "white" }}>
                        Address
                      </label>
                      <input
                        type="text-area"
                        onChange={this.inputHandler}
                        name="address"
                        value={this.state.address}
                        className="form-control"
                        placeholder="enter address"
                        defaultValue={item.address}
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="labels" style={{ color: "white" }}>
                        Phone Number
                      </label>
                      <input
                        type="text"
                        onChange={this.inputHandler}
                        name="phone_number"
                        value={this.state.phone_number}
                        className="form-control"
                        placeholder="enter phone number"
                        defaultValue={item.phone_number}
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="labels" style={{ color: "white" }}>
                        Fullname
                      </label>
                      <input
                        type="text"
                        onChange={this.inputHandler}
                        name="full_name"
                        value={this.state.full_name}
                        className="form-control"
                        placeholder="enter full name"
                        defaultValue={item.full_name}
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="labels" style={{ color: "white" }}>
                        Gender
                      </label>
                      <FormGroup>
                        <Input
                          className={"d-grid mx-4 form-control"}
                          style={{ width: "100px" }}
                          onChange={this.inputHandler}
                          value={this.state.gender}
                          defaultValue={item.gender}
                          type="select"
                          name="gender"
                          id="exampleSelect"
                        >
                          <option value={"-"}>-</option>
                          <option value={"Pria"}>Pria</option>
                          <option value={"Wanita"}>Wanita</option>
                        </Input>
                      </FormGroup>
                    </div>
                    <div className="col-md-12">
                      <label className="labels" style={{ color: "white" }}>
                        Age
                      </label>
                      <input
                        type="text"
                        onChange={this.inputHandler}
                        className="form-control"
                        placeholder="enter age"
                        defaultValue={item.age}
                        name="age"
                      />
                      <div className="mt-5 text-center">
                        <button
                          className={"btn gap-2 col-6 my-2 btn-warning "}
                          onClick={() => this.setState({ selectedID: null })}
                        >
                          Back
                        </button>
                        <button
                          className={
                            "d-grid gap-2 col-6 my-2 btn btn btn-success"
                          }
                          onClick={() => this.onBtnSaveAll(this.state)}
                        >
                          Save Change
                        </button>
                      </div>
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
      <div className="row m-auto justify-content-center">
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
