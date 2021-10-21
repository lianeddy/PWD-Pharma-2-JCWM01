import React from "react";
import Axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import { URL_API } from '../../helper';
import moment from "moment";

class Stock extends React.Component {
  state = {
    dbproduct: [],
    page: 1,
    maxPage: 1,
    limitPage: 0
  }
  
  componentDidMount() {
    this.getData()
  }

  componentDidUpdate() {
    this.getData()
  }

  getData = () => {
    Axios.get(`${URL_API}/admin/admin-stock/${this.state.limitPage}`)
    .then(res => {
      this.setState({ dbproduct: res.data.results, maxPage: Math.ceil(this.state.dbproduct.length / 4) })
    })
    .catch(err => {
      alert("Cannot Get Data")
      console.log(err)
    })
  }

  printData = () => {
    return this.state.dbproduct.map((item, index) => {
      return (
        <tr>
          <td className="align-middle">{item.id_product}</td>
          <td className="align-middle">{item.product_name}</td>
          <td className="align-middle">
            <img src={URL_API + item.product_image} alt="" style={{ height: "125px" }} />
          </td>
          <td className="align-middle">{(item.stock).toLocaleString("id")} {item.unit}</td>
          <td className="align-middle">{(Math.ceil(item.stock / item.bottle_volume)).toLocaleString("id")} bottle(s)</td>
          <td className="align-middle">{item.bottle_volume}</td>
          <td className="align-middle">{moment(item.expired_date).format("D MMM YYYY")}</td>
        </tr>
      )
    })
  }

  nextPageHandler = () =>{
    this.setState({ page : this.state.page + 1, limitPage : this.state.limitPage + 4 })
  }

  prevPageHandler = () =>{
    this.setState({ page : this.state.page - 1, limitPage : this.state.limitPage - 4 })
  }

  render() {
    if (this.props.userGlobal.role !== "admin") {
      return <Redirect to="/" />
    }
  
    return (
      <>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "30px", marginBottom: "30px" }}>
          <h1>Product List and Stock</h1>
        </div>
        <div className="row m-auto" style={{ alignItems: "center", justifyContent: "center" }}>
          <div className="col-md-18 mx-2 text-center">
            <Table className="table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>No.</th>
                  <th>Product</th>
                  <th>Image</th>
                  <th>Raw Material Stock</th>
                  <th>Bottle Stock</th>
                  <th>Bottle Volume</th>
                  <th>Expired Date</th>
                </tr>
              </thead>
              <tbody>
                {this.printData()}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center my-2">
          <button
            disabled={this.state.page === 1}
            className="btn btn-dark"
            onClick={this.prevPageHandler}
          >
            {"<"}
          </button>
          <div className="text-center mx-3 my-3">
            Page {this.state.page}
          </div>
          <button
            disabled={this.state.dbproduct.length < 4}
            className="btn btn-dark"
            onClick={this.nextPageHandler}
          >
            {">"}
          </button>
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

export default connect(mapStateToProps)(Stock);