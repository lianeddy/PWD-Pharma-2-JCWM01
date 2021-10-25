import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
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
    dbProductPrice: [],
    image: "",
    id_user: 0,
    id_prescription: 0,
    id_product: 1,
    index : 0,
    capsulQty : 0,
    page : 1,
    limitPage : 0,
    maxPage : 1,
    inputProduct: [
      {
        id_product: 0,
        qty: 0,
        total_price : 0,
        product_price : 0
      },
    ],
    outputProduct: []
  };

  inputHandler = (index, event) => {
    const values = [...this.state.inputProduct];
    const name = event.target.name 
    const value = event.target.value
    values[index][event.target.name] = event.target.value;
    this.setState({ inputProduct: values, [name] : value});
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("inputProduct", this.state.inputProduct);
  };
  handleAddFields = () => {
    this.setState({
      inputProduct: [...this.state.inputProduct, { id_product: 0, qty: 0 }],  index : this.state.index + 1
    });
  };

  onBtnAddProduct =()=>{
    this.handleAddFields()
    this.mapInsertQuery()
  }

  getData = () => {
    Axios.get(`${URL_API}/admin/custom-order/${this.state.limitPage}`)
      .then((res) => {
        console.log(res.data)
        this.setState({
          dbCustomTransaction: res.data.results,
          maxPage : Math.ceil(this.state.dbCustomTransaction.length / 5)
        });
      })
      .catch((err) => {
        alert("Cannot Get Data");
        console.log(err);
      });
  };

  nextPageHandler = () => {
    this.setState({
      page: this.state.page + 1,
      limitPage: this.state.limitPage + 4,
    });
  };

  prevPageHandler = () => {
    this.setState({
      page: this.state.page - 1,
      limitPage: this.state.limitPage - 4,
    });
  };

  onBtnDelete = () =>{
    Axios.delete(`${URL_API}/admin/delete-prescription/${this.state.id_prescription}`)
      .then((res) => {
        this.getData();
        window.location.reload()
      })
      .catch((err) => {
        alert("Cannot Delete Data");
        console.log(err);
      });
  }
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
  // getDataProductPrice = () => {
  //   Axios.get(`${URL_API}/admin/get-product-price/${this.state.inputProduct[this.state.index].id_product}`)
  //     .then((res) => {
  //       this.setState({
  //         dbProductPrice : res.data.results,
  //       });
  //     })
  //     .catch((err) => {
      
  //       console.log(err);
  //     });
  // };

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
    this.onBtnDelete()
  };

  componentDidMount() {
    this.getData();
    this.getDataProduct();
    // this.getDataProductPrice();
    this.printInput()
  }
  componentDidUpdate() {
    this.getData()
  

  }

  onClickServe = (image1, id_user1, id_p) => {
    // console.log(image1, id_user1,id_p);
    this.setState({ image: image1, id_user: id_user1, id_prescription: id_p });

  };

  mapInsertQuery = () => {
    for(var i =0; i < this.state.inputProduct.length; i++){
      var input = this.state.inputProduct[i]
      this.state.outputProduct.push([null, this.state.id_user, input.qty * this.state.capsulQty, input.total_price * 0.05, input.total_price, moment().format("YYYY-MM-DD HH-mm-ss"),"bank transfer", "jnt", 5000, null,"unpaid", input.id_product, this.state.id_prescription])
    }
    console.log(this.state.outputProduct);
  };

  

  printInput = () => {
    return this.state.inputProduct.map((inputField, index) => {

      
      return (
        <tr key={index}>
          <td>
          <Input
            className={"d-grid mx-4 my-4 form-control"}
            onChange={this.inputHandler}
            type="select"
            name="id_product"
            id="id_product"
            onChange={(event) => this.inputHandler(index, event)}
          >
            
            {this.state.dbProduct.map((e) => {
      return <option value={e.id_product}>{e.product_name} - (Rp.{e.product_price / e.bottle_volume}/{e.unit})</option>;
      
    })}
          </Input>
          </td>
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
    })
    
  };

  printData = () => {
    return this.state.dbCustomTransaction && this.state.dbCustomTransaction.length ? this.state.dbCustomTransaction.map((item, index) => {
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
    }) : null
  };
  render() {
    // if (!this.props.userGlobal.username) {
    //   return <Redirect to="/" />;
    // }
    if (!this.state.dbCustomTransaction.length) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "50px" }}>
          <h2>Custom Order is Empty 😟</h2>
        </div>
      )
    }
    
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
                          disabled={this.state.page === 1}
                        className="btn btn-dark"
                        onClick={this.prevPageHandler}
                        >
                          {"<"}
                        </button>
                        <div className="text-center">page {this.state.page}</div>
                        <button
                          disabled={this.state.dbCustomTransaction.length < 4}
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
              <h1>Input Product and Qty</h1>

              <div className="justify-content-center align-items-center">
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>{this.printInput()}</tbody>
                </table>
              </div>
              Input Total Capsul : 
              <br />
              <input
              onChange={(e)=> this.setState({capsulQty : e.target.value})}
              name="total_price"
              min="1"
              type="number"
            />
            <br />

              <button className="btn btn-primary my-4" onClick={this.btnPost}>
                post{" "}
              </button>
             
            </Container>
          </div>
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
export default connect(mapStateToProps) (CustomTransaction);
