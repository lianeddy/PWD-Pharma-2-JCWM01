import React from "react";
import Axios from "axios";
import { URL_API } from "../helper";
import { connect } from "react-redux";

class ProductDetail extends React.Component {
  state = {
    dbproduct: {},
    quantity: 1,
    productId: 0,
    dbcart: []
  }

  getProduct = () => {
    Axios.get(`${URL_API}/product/product-detail/${this.state.productId}`)
    .then(res => {
      this.setState({ dbproduct: res.data.results[0] })
    })
    .catch(err => {
      alert("Cannot Get Product Data")
      console.log(err)
    })
  }

  getCart = () => {
    Axios.get(`${URL_API}/cart/get-user-cart/${this.props.userGlobal.id_user}`)
    .then(res => {
      this.setState({ dbcart: res.data.results })
    })
    .catch(err => {
      alert("Cannot Get Cart Data")
      console.log(err)
    })
  }

  qtyBtnHandler = (action) => {
    if (action === "increment") {
      this.setState({ quantity: this.state.quantity + 1 })
    } else if (action === "decrement" && this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 })
    }
  }

  addToCartHandler = () => {
    const findProduct = this.state.dbcart.find(val => val.id_product == this.state.productId)

    if (findProduct) {
      Axios.patch(`${URL_API}/cart/patch-cart`, {
        cart_qty: this.state.quantity + findProduct.cart_qty,
        id_cart: findProduct.id_cart
      })
      .then(res => {
        alert("Add Item's Quantity to Cart Succeed")
        this.getCart()
      })
      .catch(err => {
        alert("Add Item's Quantity to Cart Failed")
        console.log(err)
      })
    } else {
      Axios.post(`${URL_API}/cart/add-cart/${this.props.userGlobal.id_user}`, {
        id_product: this.state.productId,
        cart_qty: this.state.quantity
      })
      .then(res => {
        alert("Add New Item to Cart Succeed")
        this.getCart()
      })
      .catch(err => {
        alert("Add New Item to Cart Failed")
        console.log(err)
      })
    }
  }

  componentDidMount() {
    if (window.location.pathname.length == 16) {
      this.setState({ productId: parseInt(window.location.pathname.slice(16, 17)) })
    } else {
      this.setState({ productId: parseInt(window.location.pathname.slice(16, 18)) })
    }
    
    this.getCart()
  }
  
  componentDidUpdate() {
    this.getProduct()
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-6">
            <img 
              style={{ width: "100%" }} 
              src={URL_API + this.state.dbproduct.product_image} 
              alt="" 
            />
          </div>
          <div className="col-6 d-flex flex-column justify-content-center">
            <h4>{this.state.dbproduct.product_name}</h4>
            <h5>Rp {this.state.dbproduct.product_price}</h5>
            <p>
              {this.state.dbproduct.description}
            </p>
            <div className="d-flex flex-row align-items-center">
              <button onClick={() => this.qtyBtnHandler("decrement")} className="btn btn-primary mr-4">
                -
              </button>
              {this.state.quantity}
              <button onClick={() => this.qtyBtnHandler("increment")} className="btn btn-primary mx-4">
                +
              </button>
            </div>
            <button onClick={this.addToCartHandler} disabled={this.props.userGlobal.role !== "user"} className="btn btn-success mt-3">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  }
}

export default connect(mapStateToProps)(ProductDetail);