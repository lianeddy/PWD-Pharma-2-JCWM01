import React from "react";
import Axios  from "axios";
import { URL_API } from "../../helper";

class TopSellAnnual extends React.Component {
  state = {
    mg: "",
    ml: "",
    bt: ""
  }

  componentDidMount() {
    this.topSellMg()
    this.topSellMl()
    this.topSellBt()
  }

  topSellMg = () => {
    Axios.get(`${URL_API}/admin/mg`)
    .then(res => {
      this.setState({ mg: res.data.results[0].product_name })
      console.log(res.data)
    })
    .catch(err => {
      alert("Cannot Get mg Unit Top Seller")
      console.log(err)
    })
  }

  topSellMl = () => {
    Axios.get(`${URL_API}/admin/ml`)
    .then(res => {
      this.setState({ ml: res.data.results[0].product_name })
      console.log(res.data)
    })
    .catch(err => {
      alert("Cannot Get ml Unit Top Seller")
      console.log(err)
    })
  }

  topSellBt = () => {
    Axios.get(`${URL_API}/admin/bottle`)
    .then(res => {
      this.setState({ bt: res.data.results[0].product_name })
      console.log(res.data)
    })
    .catch(err => {
      alert("Cannot Get bottle Unit Top Seller")
      console.log(err)
    })
  }

  render() {
    return (
      <div className="mx-5 my-5">
        <div className="card text-white bg-warning mb-3" style={{ width:"17rem", maxWidth: "18rem" }}>
          <div className="card-header"><h5>Top Seller (Annual)</h5></div>
          <div className="card-body text-dark bg-light">
            <h5 className="card-text"> {this.state.mg} (mg)</h5>
            <h5 className="card-text"> {this.state.ml} (ml)</h5>
            <h5 className="card-text"> {this.state.bt} (bottle)</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default TopSellAnnual;
