import React from "react";
import Axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import { URL_API } from '../../helper';
import moment from "moment";

class SalesReport extends React.Component {
  state = {
    dbreport: [],
    revenue: 0,
    totalPrice: 0,
    shipping: 0
    // selectedID: null
  }
  
  componentDidMount() {
    this.getData()
    this.countTotalPrice()
    this.countShipping()
  }

  getData = () => {
    Axios.get(`${URL_API}/admin/sales`)
    .then(res => {
      this.setState({ dbreport: res.data.results })
    })
    .catch(err => {
      alert("Cannot Get Data")
      console.log(err)
    })
  }

  printData = () => {
    return this.state.dbreport.map((item, index) => {
      return (
        <tr>
          <td>{index+1}</td>
          <td>{item.username}</td>
          <td>{item.product_name}</td>
          <td>{item.product_price}</td>
          <td>{item.qty} {item.unit}</td>
          <td>Rp {(item.tax).toLocaleString("id")}</td>
          <td>Rp {(item.total_price).toLocaleString("id")}</td>
          <td>{moment(item.date).format("MMM / D / YYYY")}</td>
          {/* <td>{item.payment_method}</td> */}
          {/* <td>{item.expedition_name}</td> */}
          <td>Rp {(item.shipping_cost).toLocaleString("id")}</td>
        </tr>
      )
    })
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
    if (this.props.userGlobal.role !== "admin") {
      return <Redirect to="/" />
    }
  
    return (
      <>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "50px", marginBottom: "30px" }}>
          <h1>Sales Report</h1>
        </div>
        <div className="row m-auto" style={{ alignItems: "center", justifyContent: "center" }}>
          <div className="col-md-18 mx-2 text-center">
            <Table className="table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>No.</th>
                  <th>Username</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Tax</th>
                  <th>Total Price</th>
                  <th>Date</th>
                  {/* <th>Payment</th> */}
                  {/* <th>Shipping</th> */}
                  <th>Shipping Cost</th>
                </tr>
              </thead>
              <tbody>
                {this.printData()}
              </tbody>
            </Table>
          </div>
        </div>
        <div style={{ marginLeft: "360px", marginTop: "40px" }}>
          <h3>Revenue : Rp {(this.state.totalPrice + this.state.shipping).toLocaleString("id")} </h3>
          {/* {this.countRevenue()} */}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user
  }
}

export default connect(mapStateToProps)(SalesReport);