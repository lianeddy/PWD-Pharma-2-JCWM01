import React from "react";
import Axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';

class SalesReport extends React.Component {
  state = {
    pharma2: [],
    selectedID: null
  }
  

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    Axios.get('http://localhost:3300/karyawan/get')
    .then(res => {
      this.setState({ pharma2: res.data })
    })
    .catch(err => {
      console.log(err)
    })
  }

  onBtnAdd = () => {
    // console.log({
    //   nama: this.nama.value,
    //   usia: parseInt(this.usia.value),
    //   email: this.email.value,
    //   berat: parseFloat(this.berat.value),
    //   kota: this.kota.value,
    //   tahun: this.tahun.value,
    //   idposisi: parseInt(this.posisi.value)
    // })
    Axios.post('http://localhost:3300/karyawan/add-karyawan', {
      nama: this.nama.value,
      usia: parseInt(this.usia.value),
      email: this.email.value,
      berat: parseFloat(this.berat.value),
      kota: this.kota.value,
      tahun: this.tahun.value,
      idposisi: parseInt(this.posisi.value)
    })
    .then(res => {
      console.log(res.data)
      this.getData()
    })
    .catch(err => {
      console.log(err)
    })
  }

  printData = () => {
    return this.state.pharma2.map((item, index) => {
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
          {/* <Form width="90vw" className="col-md-2">
            <FormGroup>
              <Label for="nama">Nama</Label>
              <Input type="text" name="text" id="nama" innerRef={(nama) => this.nama = nama} />
            </FormGroup>
            <FormGroup>
              <Label for="usia">Usia</Label>
              <Input type="number" id="usia" innerRef={(usia) => this.usia = usia} />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="text" id="email" innerRef={(email) => this.email = email} />
            </FormGroup>
            <FormGroup>
              <Label for="berat">Berat</Label>
              <Input type="number" name="text" id="berat" innerRef={(berat) => this.berat = berat} />
            </FormGroup>
            <FormGroup>
              <Label for="kota">Kota</Label>
              <Input type="text" name="text" id="kota" innerRef={(kota) => this.kota = kota} />
            </FormGroup>
            <FormGroup>
              <Label for="tahun">Tahun</Label>
              <Input type="text" name="text" id="tahun" innerRef={(tahun) => this.tahun = tahun} />
            </FormGroup>
            <FormGroup>
              <Label for="posisi">Posisi</Label>
              <Input type="select" name="text" id="posisi" innerRef={(posisi) => this.posisi = posisi}>
                <option value={1}>CEO</option>
                <option value={2}>CTO</option>
                <option value={3}>Manager</option>
                <option value={4}>Head of Engineer</option>
                <option value={5}>Head of Designer</option>
                <option value={6}>Engineer</option>
                <option value={7}>Designer</option>
              </Input>
            </FormGroup>
            <Button type="button" onClick={this.onBtnAdd}>Submit</Button>
          </Form> */}
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