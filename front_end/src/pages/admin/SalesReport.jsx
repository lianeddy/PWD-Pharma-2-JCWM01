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
          <td>{item.product_name}</td>
          <td>{item.product_price}</td>
          <td>{item.qty} {item.unit}</td>
          <td>{item.tax}</td>
          <td>{item.total_price}</td>
          <td>{item.date}</td>
          {/* <td>{item.payment_method}</td> */}
          {/* <td>{item.expedition_name}</td> */}
          <td>{item.shipping_cost}</td>
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
        <div style={{ marginLeft: "380px", marginTop: "40px" }}>
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