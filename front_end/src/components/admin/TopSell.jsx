import React from "react";
import Axios  from "axios";
import { URL_API } from "../../helper";

class TopSell extends React.Component {
  state = {
    mgMonthly: "",
    mlMonthly: "",
    btMonthly: ""
  }

  componentDidMount() {
    this.topSellMgMonthly()
    this.topSellMlMonthly()
    this.topSellBtMonthly()
  }

  topSellMgMonthly = () => {
    Axios.get(`${URL_API}/admin/mg-monthly`)
    .then(res => {
      this.setState({ mgMonthly: res.data.results[0].product_name })
      console.log(res.data)
    })
    .catch(err => {
      alert("Cannot Get Monthly mg Unit Top Seller")
      console.log(err)
    })
  }

  topSellMlMonthly = () => {
    Axios.get(`${URL_API}/admin/ml-monthly`)
    .then(res => {
      this.setState({ mlMonthly: res.data.results[0].product_name })
      console.log(res.data)
    })
    .catch(err => {
      alert("Cannot Get Monthly ml Unit Top Seller")
      console.log(err)
    })
  }

  topSellBtMonthly = () => {
    Axios.get(`${URL_API}/admin/bottle-monthly`)
    .then(res => {
      this.setState({ btMonthly: res.data.results[0].product_name })
      console.log(res.data)
    })
    .catch(err => {
      alert("Cannot Get Monthly bottle Unit Top Seller")
      console.log(err)
    })
  }

  render() {
    return (
      <div className="mx-5 my-5">
        <div className="card text-white bg-warning mb-3" style={{ width:"17rem", maxWidth: "18rem" }}>
          <div className="card-header"><h5>Top Seller (Monthly)</h5></div>
          <div className="card-body text-dark bg-light">
            <h5 className="card-text"> {this.state.mgMonthly} (mg)</h5>
            <h5 className="card-text"> {this.state.mlMonthly} (ml)</h5>
            <h5 className="card-text"> {this.state.btMonthly} (bottle)</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default TopSell;
