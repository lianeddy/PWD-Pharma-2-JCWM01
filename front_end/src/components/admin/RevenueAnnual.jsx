import React from "react";
import Axios  from "axios";
import { URL_API } from "../../helper";

class RevenueAnnual extends React.Component {
  state = {
    totalPrice: 0,
    shipping: 0
  }

  componentDidMount() {
    this.countTotalPrice()
    this.countShipping()
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

  render() {
    return (
      <div className="mx-5 my-5">
        <div className="card text-white bg-success mb-3" style={{ width:"17rem", maxWidth: "18rem" }}>
          <div className="card-header"><h5>Revenue (Annual)</h5></div>
          <div className="card-body text-dark bg-light">
            <h5 className="card-text">Rp {(this.state.totalPrice + this.state.shipping).toLocaleString("id")}</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default RevenueAnnual;
