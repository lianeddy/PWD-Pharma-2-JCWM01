import React from "react";
import Axios  from "axios";
import { URL_API } from "../../helper";

class TopSell extends React.Component {
  state = {
    mgMonthly: 0,
    mlMonthly: 0,
    btMonthly: 0
  }

  componentDidMount() {
    // this.topSellMgMonthly()
    // this.topSellMlMonthly()
    // this.topSellBtMonthly()
  }

  topSellMgMonthly = () => {
    Axios.get(`${URL_API}/admin/mg-monthly`)
    .then(res => {
      this.setState({ mgMonthly: parseInt(res.data.results[0].product_name) })
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
      this.setState({ mlMonthly: parseInt(res.data.results[0].product_name) })
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
      this.setState({ btMonthly: parseInt(res.data.results[0].product_name) })
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
            <h5 className="card-text">ibuprofen (mg)</h5>
            <h5 className="card-text">valium (ml)</h5>
            <h5 className="card-text">amoxocillin (bottle)</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default TopSell;
