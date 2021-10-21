import React from "react";
import { connect } from "react-redux";
import { URL_API } from "../../helper";
import Axios from "axios";
import { NavItem, Button, Input } from "reactstrap";
import { Link, animateScroll as scroll } from "react-scroll";
import Container from "@mui/material/Container";
import moment from 'moment'

class CustomTransaction extends React.Component {
  state = {
    dbCustomTransaction: [],
    dbProduct: [],
    image: "",
    id_user: 0,
    id_prescription: 0,
    inputProduct: [
      {
        id_product: 0,
        qty: 0,
        total_price : 0
      },
    ],
    outputProduct: []
  };

  inputHandler = (index, event) => {
    const values = [...this.state.inputProduct];
    values[index][event.target.name] = event.target.value;
    this.setState({ inputProduct: values});
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("inputProduct", this.state.inputProduct);
  };
  handleAddFields = () => {
    this.setState({
      inputProduct: [...this.state.inputProduct, { id_product: 0, qty: 0 }],
    });
  };

  onBtnAddProduct =()=>{
    this.handleAddFields()
    this.mapInsertQuery()
  }

  getData = () => {
    Axios.get(`${URL_API}/admin/custom-order`)
      .then((res) => {
        this.setState({
          dbCustomTransaction: res.data.results,
        });
      })
      .catch((err) => {
        alert("Cannot Get Data");
        console.log(err);
      });
  };
  getDataProduct = () => {
    Axios.get(`${URL_API}/admin/get-product`)
      .then((res) => {
        this.setState({
          dbProduct: res.data.results,
        });
      })
      .catch((err) => {
        alert("cannot get data");
        console.log(err);
      });
  };

  insertTransaction = () => {
    const {outputProduct} = this.state
    Axios.post(`${URL_API}/admin/pay-custom`, {
      outputProduct
    })
      .then((res) => {
        alert("Please Continue to Upload Your Proof of Payment");
        console.log(res);
      })
      .catch((err) => {
        alert("Payment Error");
        console.log(err);
      });
  };

  btnPost = () => {
    this.mapInsertQuery()
    this.insertTransaction();
  };

  componentDidMount() {
    this.getData();
    this.getDataProduct();
  }
  componentDidUpdate() {
    this.getData();
  }

  onClickServe = (image1, id_user1, id_p) => {
    this.setState({ image: image1, id_user: id_user1, id_prescription: id_p });
    console.log(image1, id_user1, this.state.id_prescription);
  };

  mapInsertQuery = () => {
    for(var i =0; i < this.state.inputProduct.length; i++){
      var input = this.state.inputProduct[i]
      this.state.outputProduct.push([null, this.state.id_user, input.qty, 3000, input.total_price, moment().format("YYYY-MM-DD HH-mm-ss"),"bank transfer", "jnt", 5000, null,"unpaid", input.id_product, this.state.id_prescription])
    }
    console.log(this.state.outputProduct);
  };

  printInput = () => {
    return this.state.inputProduct.map((inputField, index) => {
      return (
        <tr key={index}>
          <Input
            className={"d-grid mx-4 my-4 form-control"}
            onChange={this.inputHandler}
            type="select"
            name="id_product"
            id="id_product"
            onChange={(event) => this.inputHandler(index, event)}
          >
            {this.state.dbProduct.map((e) => {
              return <option value={e.id_product}>{e.product_name} - ({e.product_price})</option>;
            })}
          </Input>
          <td className="align-middle">
            <input
              onChange={(event) => this.inputHandler(index, event)}
              name="qty"
              min="1"
              type="number"
            />
          </td>
          <td className="align-middle">
            <input
              onChange={(event) => this.inputHandler(index, event)}
              
          
              name="total_price"
              min="1"
              type="number"
            />
          </td>
          <td className="align-middle">
          <button
                className="btn btn-primary my-3 mx-3"
                onClick={this.handleAddFields}
              >
                {" "}
                Add Product{" "}
              </button>
          </td>
        </tr>
      );
    });
  };

  printData = () => {
    return this.state.dbCustomTransaction.map((item, index) => {
      return (
        <tr>
          <td className="align-middle">{index + 1}</td>
          <td className="align-middle">{item.username}</td>
          <td className="align-middle">{item.commentar}</td>
          <td className="align-middle">
            <img
              src={URL_API + item.prescription_img}
              alt=""
              style={{ height: "125px" }}
            />
          </td>
          <td className="align-middle">
            <Link
              onClick={() =>
                this.onClickServe(
                  item.prescription_img,
                  item.id_user,
                  item.id_prescription
                )
              }
              className="btn btn-primary"
              activeClass="active"
              to="section2"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Serve
            </Link>

            {/* <button onClick={} className={"btn btn-primary"}>Serve</button> */}
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div
        className="p-5 text-center align-center justify-content-center"
        style={{ scrollBehavior: "smooth" }}
      >
        <div class="main" id="section1" style={{ height: "800px" }}>
          <h1> custom</h1>

          <div className="row mt-5 align-center justify-content-center">
            <div className="col-9 text-center">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th>No</th>
                    <th>Username</th>
                    <th>Commentar</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{this.printData()}</tbody>
                <tfoot className="bg-light">
                  <tr>
                    <td colSpan="10">
                      <div className="d-flex flex-row justify-content-center align-items-center">
                        <button
                          className="btn btn-dark"
                          onClick={this.prevPageHandler}
                        >
                          {"<"}
                        </button>
                        <div className="text-center">page</div>
                        <button
                          disabled={this.state.dbCustomTransaction.length < 5}
                          className="btn btn-dark"
                          onClick={this.nextPageHandler}
                        >
                          {">"}
                        </button>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <div class="main" id="section2" style={{ height: "1200px" }}>
          <h2>Input</h2>
          <Link
            className="btn btn-primary my-3"
            activeClass="active"
            to="section1"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            UP
          </Link>
          <div
            style={{
              height: "600px",
              backgroundColor: "#00008B",
              borderRadius: "30px",
            }}
          >
            <img
              src={URL_API + this.state.image}
              alt=""
              className={"my-3"}
              style={{ height: "500px" }}
            />
          </div>
          <div className={"justify-content-center align-items-center"}>
            <Container>
              <h1>Input Product and </h1>

              <div className="justify-content-center align-items-center">
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>{this.printInput()}</tbody>
                </table>
              </div>

              <button className="btn btn-primary" onClick={this.btnPost}>
                post{" "}
              </button>
             
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
export default CustomTransaction;
