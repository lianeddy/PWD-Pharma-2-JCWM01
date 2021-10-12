import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

class Cart extends React.Component {
  state = {
    isCheckoutMode: true,
    paymentMethod: "",
    expedition: "",
    payment: 0,
  }

  inputHandler = (e) => {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  checkoutModeToggle = () => {
    this.setState({ isCheckoutMode: !this.state.isCheckoutMode })
  }

  render() {
    if (!this.props.userGlobal.username) {
      return <Redirect to="/" />
    }
  
    return (
      <div className="p-5 text-center">
        <h1>Cart</h1>
        <div className="row mt-5">
          <div className="col-9 text-center">
            <table className="table">
              <thead className="thead-light">
                <tr>
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
                <tr>
                  <td className="align-middle">
                    paracetamol
                  </td>
                  <td className="align-middle">
                    Rp 10000
                  </td>
                  <td className="align-middle">
                    Image Here
                  </td>
                  <td className="align-middle">
                    3 mg
                  </td>
                  <td className="align-middle">
                    Rp 30000
                  </td>
                  <td className="align-middle">
                    <button className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-light">
                <tr>
                  <td colSpan="6">
                    <button onClick={this.checkoutModeToggle} className="btn btn-success">
                      Checkout
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          {
            this.state.isCheckoutMode ?
            <div className="col-3">
              {/* Form Checkout */}
              <div className="card text-left">
                <div className="card-header">
                  <strong>Order Summary</strong>
                </div>
                <div className="card-body">
                  <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                    <span className="font-weight-bold">Subtotal Price</span>
                    <span>Rp 30000</span>
                  </div>
                  <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                    <span className="font-weight-bold">Tax Fee (10%)</span>
                    <span>Rp 3000</span>
                  </div>
                  <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                    <span className="font-weight-bold">Total Price</span>
                    <span>Rp 33000</span>
                  </div>
                </div>
                <div className="card-body border-top">
                  <label htmlFor="paymentMethod">Payment Method</label>
                  <br />
                  <select className="custom-select" multiple>
                    <option value="bank" selected>Bank Transfer</option>
                    <option value="gopay">Gopay</option>
                    <option value="ovo">Ovo</option>
                    <option value="paypal">Paypal</option>
                  </select>
                  <br />
                  <br />
                  {/* <input onChange={this.inputHandler} type="text" className="form-control mb-3" name="paymentMethod" /> */}
                  <label htmlFor="expedition">Shipping</label>
                  <br />
                  <select className="form-control">
                    <option value="jne">JNE</option>
                    <option value="jnt">J&T</option>
                    <option value="tiki">TIKI</option>
                    <option value="anteraja">Anter Aja</option>
                  </select>
                  {/* <input onChange={this.inputHandler} type="text" className="form-control" name="expedition" /> */}
                </div>
                <div className="card-footer">
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <input onChange={this.inputHandler} className="form-control mx-1" type="number" name="payment" />
                    <button onClick={this.payBtnHandler} className="btn btn-success mx-1">Pay</button>
                  </div>
                </div>
              </div>
            </div>
            : null
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user
  }
}

export default connect(mapStateToProps)(Cart);