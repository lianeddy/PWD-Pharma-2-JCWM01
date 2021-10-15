import React from "react";
import Axios  from "axios";
import { URL_API } from "../../helper";

class RevenueCard extends React.Component {
  state = {
    totalPriceMonthly: 0,
    shippingMonthly: 0
  }

  componentDidMount() {
    this.countTotalPriceMonthly()
    this.countShippingMonthly()
  }

  countTotalPriceMonthly = () => {
    Axios.get(`${URL_API}/admin/total-price-monthly`)
    .then(res => {
      this.setState({ totalPriceMonthly: parseInt(res.data.results[0].total_price) })
      console.log(res.data)
    })
    .catch(err => {
      alert("Cannot Sum Total Price Monthly")
      console.log(err)
    })
  }

  countShippingMonthly = () => {
    Axios.get(`${URL_API}/admin/shipping-monthly`)
    .then(res => {
      this.setState({ shippingMonthly: parseInt(res.data.results[0].shipping_cost) })
      console.log(res.data)
    })
    .catch(err => {
      alert("Cannot Sum Total Price Monthly")
      console.log(err)
    })
  }

  render() {
    return (
      <div className="mx-5 my-5">
        <div className="card text-white bg-success mb-3" style={{ width:"17rem", maxWidth: "18rem" }}>
          <div className="card-header"><h5>Revenue (Monthly)</h5></div>
          <div className="card-body text-dark bg-light">
            <h5 className="card-text">Rp {(this.state.totalPriceMonthly + this.state.shippingMonthly).toLocaleString("id")} </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default RevenueCard;
