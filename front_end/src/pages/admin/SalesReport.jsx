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
  }

  getData = () => {
    Axios.get(`${URL_API}/admin/sales`)
    .then(res => {
      this.setState({ dbreport: res.data.results })
    })
    .catch(err => {
      alert("Cannot get Data")
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

  render() {
    if (this.props.userGlobal.role !== "admin") {
      return <Redirect to="/" />
    }
  
    return (
      <>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "50px", marginBottom: "30px" }}>
          <h1>Sales Report Page</h1>
        </div>
        <div className="row m-auto" style={{ alignItems: "center", justifyContent: "center" }}>
          <div className="col-md-18">
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Transaction ID</th>
                  <th>Cart ID</th>
                  <th>Custom ID</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Tax</th>
                  <th>Total Price</th>
                  <th>Date</th>
                  <th>Payment</th>
                  <th>Expedition</th>
                  <th>Shipping Cost</th>
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
        <div>
          
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