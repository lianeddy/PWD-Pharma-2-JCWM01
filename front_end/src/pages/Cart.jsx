import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { URL_API } from "../helper";
import Axios from 'axios'
import { NavItem, Button } from "reactstrap";

class Cart extends React.Component {
  

  state = {
    dbcart: [],
    id_cart : 0,
    editQtyChecked : false,
    cart_qty : 0,
    total : 0
  }

  inputHandler = (e) =>{
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }
  
 

  getData = () => {
    Axios.get(`${URL_API}/cart/getCart/1`)
    .then(res => {
      this.setState({
        dbcart: res.data.results,
        cart_qty : res.data.cart_qty,
        total : res.data.total })
    })
    .catch(err => {
      alert("Cannot Get Data")
      console.log(err)
    })
  }

  updateQty = (cartId) =>{
    const {cart_qty} = this.state
    this.setState({editQtyChecked : false})
    Axios.patch(`${URL_API}/cart/updateQty/${cartId}`,{
      cart_qty
    })
    .then(()=>{
      this.getData()
      alert("berhasil update Quantity")
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  deleteBtnHandler = (cartId) =>{
    Axios.delete(`${URL_API}/cart/deleteCart/${cartId}`)
    .then(()=>{

      alert('berhasil delete gambar')
      this.getData()
    })
    .catch(()=>{
      alert("terjadi kesalahan di server")
    })

  }
componentDidMount() {
  this.getData()

}

printData = () =>{
  return this.state.dbcart.map((item, index) =>{
    
    return(
      <tr>
        <td className="align-middle">
            {index + 1}
          </td>
          <td className="align-middle">
            {item.product_name}
          </td>
          <td className="align-middle">
          {item.product_price}
          </td>
          <td className="align-middle">
            <img src={item.product_image} alt="" style={{height : "125px"}}/>
          </td>
          <td className="align-middle">
            {this.state.editQtyChecked ? 
            <input onChange={(e)=> this.inputHandler(e)} name ="cart_qty"  defaultValue={item.cart_qty} type="number" style={{width : "50px"}}/>
            :
            <input name ="cart_qty" disabled="true" defaultValue={item.cart_qty} type="number" style={{width : "50px"}}/>
            
            }
          </td>
          <td className="align-middle">
          {item.total}
          </td>
          <td className="align-middle">
          {
          !this.state.editQtyChecked ?
           <><button className="btn btn-primary" onClick={() => this.setState({ editQtyChecked: true })}>Edit</button><button className="btn btn-danger">Delete</button></> :
            <><button onClick={()=> this.updateQty(item.id_cart)} className="btn btn-primary" >Save</button></>}
            
          </td>
        </tr>
    )
     })

}


  render() {
    
    



    return (
      <div className="p-5 text-center">
        <h1>Cart</h1>
        <div className="row mt-5">
          <div className="col-9 text-center">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>no</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* {this.renderCart()} */}
                {this.printData()}
              </tbody>
              <tfoot className="bg-light">
                <tr>
                  <td colSpan="6">
                    <button onClick={this.checkoutModeToggle} className="btn btn-success">
                      Checkout
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    )
 
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user
  }
}

export default connect(mapStateToProps)(Cart);