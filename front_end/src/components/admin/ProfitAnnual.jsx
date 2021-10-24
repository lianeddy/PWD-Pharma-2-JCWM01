import React from "react";
import Axios  from "axios";
import { URL_API } from "../../helper";

class ProfitAnnual extends React.Component {
  state = {
    totalPrice: 0,
    shipping: 0,
    tax: 0,
    stockPrice: 0,
    // restockPrice: 0
  }

  componentDidMount() {
    this.countTotalPrice()
    this.countShipping()
    this.countTax()
    this.countStockPrice()
    // this.countRestockPrice()
  }

  countTotalPrice = () => {
    Axios.get(`${URL_API}/admin/total-price`)
    .then(res => {
      this.setState({ totalPrice: res.data.results[0].total_price })
      // console.log(res.data)
    })
    .catch(err => {
      alert("Cannot Sum Total Price")
      console.log(err)
    })
  }

  countShipping = () => {
    Axios.get(`${URL_API}/admin/shipping`)
    .then(res => {
      this.setState({ shipping: res.data.results[0].total_shipping })
      // console.log(res.data)
    })
    .catch(err => {
      alert("Cannot Sum Total Shipping")
      console.log(err)
    })
  }

  countTax = () => {
    Axios.get(`${URL_API}/admin/tax`)
    .then(res => {
      this.setState({ tax: parseInt(res.data.results[0].tax) })
      console.log(res.data)
    })
    .catch(err => {
      alert("Cannot Sum Tax")
      console.log(err)
    })
  }

  countStockPrice = () => {
    Axios.get(`${URL_API}/admin/stock-price`)
    .then(res => {
      this.setState({ stockPrice: parseInt(res.data.results[0].stock_price) })
      console.log(res.data)
    })
    .catch(err => {
      alert("Cannot Sum Stock Price")
      console.log(err)
    })
  }

  // countRestockPrice = () => {
  //   Axios.get(`${URL_API}/admin/restock-price`)
  //   .then(res => {
  //     this.setState({ restockPrice: parseInt(res.data.results[0].restcok_price) })
  //     console.log(res.data)
  //   })
  //   .catch(err => {
  //     alert("Cannot Sum Restock Price")
  //     console.log(err)
  //   })
  // }

  render() {
    return (
      <div className="mx-5 my-5">
        <div className="card text-white bg-primary mb-3" style={{ width:"17rem", maxWidth: "18rem" }}>
          <div className="card-header"><h5 style={{ color: "white" }}>Profit/Loss (Annual)</h5></div>
          <div className="card-body text-dark bg-light">
            <h5 className="card-text">Rp {((this.state.totalPrice + (this.state.totalPrice * 0.1) + this.state.shipping) - (this.state.shipping + this.state.tax + this.state.stockPrice)).toLocaleString("id")} </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfitAnnual;
