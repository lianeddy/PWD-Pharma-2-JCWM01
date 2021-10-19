import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import Axios from "axios";
import { URL_API } from '../../helper';
import moment from "moment";

class ConfirmReject extends React.Component {
  state = {
    dbtransaction: []
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    Axios.get(`${URL_API}/admin/confirm-reject`)
    .then(res => {
      this.setState({ dbtransaction: res.data.results })
    })
    .catch(err => {
      alert("Cannot Get Transaction Data")
      console.log(err)
    })
  }

  confirmBtnHandler = (transactionId) => {
    const confirmation = window.confirm("Are you sure want to confirm transaction?")
    if (confirmation) {
      Axios.patch(`${URL_API}/admin/confirm/${transactionId}`, {
        updateStatus: "shipping"
      })
      .then(() => {
        alert("Transaction Confirmed")
        this.getData()
      })
      .catch(() => {
        alert("Failed to Confirm Transaction")
      })
    } else {
      alert("Confirm Transaction Canceled")
    }
  }

  rejectBtnHandler = (transactionId) => {
    const confirm = window.confirm("Are you sure want to reject transaction?")
    if (confirm) {
      Axios.patch(`${URL_API}/admin/reject/${transactionId}`, {
        updateStatus: "reject"
      })
      .then(() => {
        alert("Transaction Rejected")
        this.getData()
      })
      .catch(() => {
        alert("Failed to Reject Transaction")
      })
    } else {
      alert("Reject Transaction Canceled")
    }
  }

  printData = () => {
    return this.state.dbtransaction.map((item, index) => {
      return (
        <tr>
          <td className="align-middle">{index+1}</td>
          <td className="align-middle">{item.username}</td>
          <td className="align-middle">{item.product_name}</td>
          <td className="align-middle">{item.product_price}</td>
          <td className="align-middle">{item.qty}</td>
          <td className="align-middle">Rp {(item.total_price).toLocaleString("id")}</td>
          <td className="align-middle">Rp {(item.tax).toLocaleString("id")}</td>
          <td className="align-middle">Rp {(item.shipping_cost).toLocaleString("id")}</td>
          <td className="align-middle">Rp {(item.total_price + item.tax + item.shipping_cost).toLocaleString("id")}</td>
          <td className="align-middle">{moment(item.date).format("MMM / D / YYYY")}</td>
          <td className="align-middle">
            <img src={URL_API + item.image} alt="" style={{ height: "125px" }} />
          </td>
          <td className="align-middle">
            <button className="btn btn-success mx-1" onClick={() => this.confirmBtnHandler(item.id_transaction)}>
              Confirm
            </button>
            <button className="btn btn-danger mx-1" onClick={() => this.rejectBtnHandler(item.id_transaction)}>
              Reject
            </button>
          </td>
        </tr>
      )
    })
  }

  render() {
    if (this.props.userGlobal.role !== "admin") {
      return <Redirect to="/" />;
    }
  
    return (
      <>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "50px", marginBottom: "20px" }}>
          <h2>Confirm or Reject User's Transaction</h2>
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
                <th>Total Price</th>
                <th>Tax</th>
                <th>Shipping Cost</th>
                <th>Grand Total</th>
                <th>Date</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.printData()}
            </tbody>
          </Table>
        </div>
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

export default connect(mapStateToProps)(ConfirmReject);