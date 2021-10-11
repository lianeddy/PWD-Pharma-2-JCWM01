import React from "react";
import Axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import { URL_API } from '../../helper';

class SalesReport extends React.Component {
  state = {
    dbreport: [],
    revenue: 0
    // selectedID: null
  }
  
  componentDidMount() {
    this.getData()
    this.countRevenue()
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
          <td>{item.id_transaction}</td>
          <td>{item.id_cart}</td>
          <td>{item.id_custom_order}</td>
          <td>{item.product_name}</td>
          <td>{item.product_price}</td>
          <td>{item.qty}</td>
          <td>{item.tax}</td>
          <td>{item.total_price}</td>
          <td>{item.date}</td>
          <td>{item.payment_method}</td>
          <td>{item.expedition_name}</td>
          <td>{item.shipping_cost}</td>
          <td>{item.image}</td>
          <td>{item.status}</td>
        </tr>
      )
    })
  }

  countRevenue = () => {
    Axios.get(`${URL_API}/admin/revenue`)
    .then(res => {
      this.setState({ revenue: res.data.results[0].total_revenue })
      // console.log(res.data)
    })
    .catch(err => {
      alert("Cannot Count Revenue")
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
            <Table>
              <thead className="thead-light">
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Transaction_ID</th>
                  <th>Cart_ID</th>
                  <th>Custom_ID</th>
                  <th>Productame</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Tax</th>
                  <th>Total_Price</th>
                  <th>Date</th>
                  <th>Payment</th>
                  <th>Expedition</th>
                  <th>Shipping_Cost</th>
                  <th>Image</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.printData()}
              </tbody>
            </Table>
          </div>
        </div>
        <div style={{ marginLeft: "50px" }}>
          <h3>Revenue : Rp {this.state.revenue} </h3>
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