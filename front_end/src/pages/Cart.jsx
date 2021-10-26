import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { URL_API } from "../helper";
import Axios from 'axios'
import { NavItem, Button } from "reactstrap";

class Cart extends React.Component {
  state = {
    dbcart: [],
    id_cart: 0,
    editQtyChecked: false,
    cart_qty: 0,
    total: 0,
    stock: 0,
    subtotal: 0,
    tax: 0,
    grandTotalPrice: 0,
    isCheckoutMode: false,
    paymentMethod: "",
    expedition: "",
    insertQuery: "",
    redirect: false
  };

  inputHandler = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  checkoutModeToggle = () => {
    this.setState({ isCheckoutMode: !this.state.isCheckoutMode });
  };

  getData = () => {
    Axios.get(`${URL_API}/cart/getCart/${this.props.userGlobal.id_user}`)
      .then((res) => {
        this.setState({
          dbcart: res.data.results,
          cart_qty: res.data.cart_qty,
          total: res.data.total,
          stock: res.data.stock,
        });
      })
      .catch((err) => {
        alert("Cannot Get Data");
        console.log(err);
      });
  };

  updateQty = (cartId) => {
    const { cart_qty } = this.state;
    this.setState({ editQtyChecked: false });
    Axios.patch(`${URL_API}/cart/updateQty/${cartId}`, {
      cart_qty,
    })
      .then(() => {
        this.getData();
        alert("berhasil update Quantity");
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteBtnHandler = (cartId) => {
    Axios.delete(`${URL_API}/cart/deleteCart/${cartId}`)
      .then(() => {
        alert("berhasil delete cart");
        this.getData();
        window.location.reload()
      })
      .catch(() => {
        alert("terjadi kesalahan di server");
      });
  };

  subtotalPrice = () => {
    Axios.post(`${URL_API}/cart/subtotal-price`, {
      id_user: this.props.userGlobal.id_user
    })
    .then((res) => {
      this.setState({ 
        subtotal: res.data.results[0].subtotal,
        tax: res.data.results[0].subtotal * 0.1,
        grandTotalPrice: res.data.results[0].subtotal + (res.data.results[0].subtotal * 0.1) + (this.state.dbcart.length * 10000)
      })
    })
    .catch((err) => {
      alert("Cannot Count Cart Subtotal Price")
      console.log(err)
    })
  }

  componentDidMount() {
    this.getData();
    this.subtotalPrice()
    this.mapInsertQuery()
    this.mapDeleteQuery()
  }

  payBtnHandler = () => {
    this.insertTransaction()
    this.clearCart()
    this.setState({ redirect: true })
  }

  insertTransaction = () => {
    Axios.post(`${URL_API}/cart/pay`, {
      insertQuery: this.mapInsertQuery().toString()
    })
    .then((res) => {
      alert("Please Continue to Upload Your Proof of Payment")
      console.log(res)
    })
    .catch((err) => {
      alert("Payment Error")
      console.log(err)
    })
  }

  clearCart = () => {
    Axios.patch(`${URL_API}/cart/clear-cart`, {
      deleteQuery: this.mapDeleteQuery()
    })
    .then((res) => {
      alert("Cart will be Cleared After Checkout")
      console.log(res)
    })
    .catch((err) => {
      alert("Clear Cart After Checkout Error")
      console.log(err)
    })
  }

  mapDeleteQuery = () => {
    return this.state.dbcart.map((item, index) => {
      return (
        item.id_cart
      )
    })
  }

  mapInsertQuery = () => {
    const d = new Date()

    return this.state.dbcart.map((item, index) => {
      return (
        `(null, ${this.props.userGlobal.id_user}, ${item.cart_qty}, ${item.product_price * item.cart_qty * 0.1}, ${item.product_price * item.cart_qty}, '${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}', '${this.state.paymentMethod}', '${this.state.expedition}', 10000, null, 'unpaid', ${item.id_product}, null)`
      )
    })
  }

  printData = () => {
    return this.state.dbcart.map((item, index) => {
      return (
        <tr>
          <td className="align-middle">{index + 1}</td>
          <td className="align-middle">{item.product_name}</td>
          <td className="align-middle">Rp.{(item.product_price).toLocaleString("id")}</td>
          <td className="align-middle">
            <img src={URL_API + item.product_image} alt="" style={{ height: "125px" }} />
          </td>
          <td className="align-middle">
            {!this.state.editQtyChecked ? (
              <input
                className="align-middle"
                name="cart_qty"
                min="1"
                disabled="true"
                defaultValue={item.cart_qty}
                type="number"
                style={{ width: "50px" }}
                max={item.bottle_stock}
              />
            ) : (
              <input
                className="align-middle"
                onChange={(e) => this.inputHandler(e)}
                min="1"
                name="cart_qty"
                defaultValue={item.cart_qty}
                type="number"
                style={{ width: "50px" }}
                max={item.bottle_stock}
              />
            )}
            bottle
          </td>
          <td className="align-middle">Rp.{(item.total).toLocaleString("id")}</td>
          <td className="align-middle">
            {!this.state.editQtyChecked ? (
              <>
                <button
                  className="btn btn-primary"
                  onClick={() => this.setState({ editQtyChecked: true })}
                >
                  Edit
                </button>
                <button
                  onClick={() => this.deleteBtnHandler(item.id_cart)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => this.updateQty(item.id_cart)}
                  className="btn btn-primary"
                >
                  Save
                </button>
              </>
            )}
          </td>
        </tr>
      );
    });
  };

  render() {
    if (!this.props.userGlobal.username) {
      return <Redirect to="/" />;
    }

    if (this.state.redirect) {
      return <Redirect to="/transaction" />
    }

    if (!this.state.dbcart.length) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "50px" }}>
          <h2>Your Cart is Empty</h2>
          <h2>Please Fill your Cart to Start Shopping 😊</h2>
        </div>
      )
    }

    return (
      <div className="p-5 text-center">
        <h1>Cart</h1>
        <div className="row mt-5">
          <div className="col-9 text-center">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>no</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* {this.renderCart()} */}
                {this.printData()}
              </tbody>
              <tfoot className="bg-light">
                <tr>
                  <td colSpan="9">
                    <button
                      onClick={this.checkoutModeToggle}
                      className="btn btn-success"
                    >
                      Checkout
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          {this.state.isCheckoutMode ? (
            <div className="col-3">
              {/* Form Checkout */}
              <div className="card text-left">
                <div className="card-header">
                  <strong>Order Summary</strong>
                </div>
                <div className="card-body">
                  <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                    <span className="font-weight-bold">Subtotal Price</span>
                    <span>Rp {(this.state.subtotal).toLocaleString("id")} </span>
                  </div>
                  <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                    <span className="font-weight-bold">Tax Fee (10%)</span>
                    <span>Rp {(this.state.tax).toLocaleString("id")} </span>
                  </div>
                  <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                    <span className="font-weight-bold">Shipping Cost</span>
                    <span>Rp {(this.state.dbcart.length * 10000).toLocaleString("id")} </span>
                  </div>
                  <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                    <span className="font-weight-bold">Grand Total Price</span>
                    <span>Rp {(this.state.grandTotalPrice).toLocaleString("id")} </span>
                  </div>
                </div>
                <div className="card-body border-top">
                  <label htmlFor="paymentMethod">Payment Method</label>
                  <br />
                  <select onChange={this.inputHandler} name="paymentMethod" className="custom-select" multiple>
                    <option value="bank transfer" selected>
                      Bank Transfer
                    </option>
                    <option value="gopay">Gopay</option>
                    <option value="ovo">Ovo</option>
                    <option value="paypal">Paypal</option>
                  </select>
                  <br />
                  <br />
                  {/* <input onChange={this.inputHandler} type="text" className="form-control mb-3" name="paymentMethod" /> */}
                  <label htmlFor="expedition">Shipping</label>
                  <br />
                  <select onChange={this.inputHandler} name="expedition" className="form-control">
                    <option value="jne">JNE</option>
                    <option value="j&t">J&T</option>
                    <option value="tiki">TIKI</option>
                    <option value="anteraja">Anter Aja</option>
                  </select>
                  {/* <input onChange={this.inputHandler} type="text" className="form-control" name="expedition" /> */}
                </div>
                <div className="card-footer">
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <input
                      className="form-control mx-1"
                      type="string"
                      name="payment"
                      disabled="true"
                      defaultValue={`Rp ${(this.state.grandTotalPrice).toLocaleString("id")}`}
                    />
                    <button
                      onClick={this.payBtnHandler}
                      className="btn btn-success mx-1"
                    >
                      Pay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
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

export default connect(mapStateToProps)(Cart);