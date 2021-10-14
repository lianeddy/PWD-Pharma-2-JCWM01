import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { URL_API } from "../helper";
import Axios from 'axios'
import { NavItem, Button } from "reactstrap";


class Transaction extends React.Component{

    state = {
        id_transaction : 0,
        dbTransaction : [],
        isPaidClicked : false,
        status : "",
        image : ""
    }

    previewFile = (e) =>{
        if(e.target.files[0]){
            this.setState({image : e.target.files[0].name, addFile : e.target.files[0]})
            let preview = document.getElementById("image")
            preview.src = URL.createObjectURL(e.target.files[0])
        }
    }

    getData = () =>{
        Axios.get(`${URL_API}/transaction/getTransaction/1`)
        .then(res =>{
            this.setState({
                dbTransaction : res.data,
                status : res.data.status
            })

        })
        .catch(err =>{
            alert("cannot get data")
            console.log(err);
        })
    }

    onBtnUploadPayment = () =>{
        if(this.state.addFile){
            let formData = new FormData()

            formData.append('file', this.state.addFile)
            Axios.patch(`${URL_API}/upload/uploadPayment/${this.state.id_transaction}`, formData)
            .then((res)=>{
                alert(res.data.message)
                this.setState({isPaidClicked : false})
                this.getData()
            })
            .catch((err)=>{
                console.log(err);
            })
        }

    }

    componentDidMount() {
        this.getData()
    }

    onBtnPay = (idTr)=>{
        this.setState({id_transaction : idTr,
                    isPaidClicked : true})
        this.getData()
    }
    onBtnCancel = () =>{
        this.setState({
            isPaidClicked : false
        })
    }






    printData = () =>{
        return this.state.dbTransaction.map((item, index) =>{
            
          
          return(
            <tr>
              <td className="align-middle">
                  {index+1}
                </td>
                <td className="align-middle">
                  {item.date}
                </td>
                <td className="align-middle">
                {item.qty}
                </td>
                <td className="align-middle">
                {item.tax}
                </td>
                <td className="align-middle">
                {item.total_price}
                </td>
                <td className="align-middle">
                {item.expedition_name}
                </td>
                <td className="align-middle">
                {item.shipping_cost}
                </td>
                <td className="align-middle">
                {item.status}
                </td>
                <td className="align-middle">
                    {
                    item.status == "unpaid" ? 
                    <button className="btn btn-primary" onClick={() =>this.onBtnPay(item.id_transaction)} >pay</button> :
               null
                    }
                </td>
              </tr>
          )
           })
      
      }
    render(){
        return(
            <div className="p-5 text-center">
        <h1>Transaction</h1>
        <div className="row mt-5">
          <div className="col-9 text-center">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>no</th>
                  <th>Date</th>
                  <th>Quantity</th>
                  <th>Total Tax</th>
                  <th>Total Price</th>
                  <th>Expedition</th>
                  <th>Shipping Cost</th>
                  <th>Status</th>
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
                    
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          {
              this.state.isPaidClicked ? (
                <div className="col-md-3 p-4 text-white text-left" style={{backgroundColor:"#00008B", borderRadius: "30px"}}>
                <form>
                    
                    <div className="form-group">
                        <label htmlFor="description">Image</label>
                        <div>
                                       <img 
                                       
                                       id = "image"
                                       alt=""
                                       className= "img-thumbnail d-grid gap-2 col-9 mx-auto" 
                                       style={{width:"700px", height:"500px", backgroundColor:"white"}}/>
                                   </div>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="img">Image</label>
                        <input type="file" className="form-control" id="img" aria-describedby="emailHelp" onChange= {this.previewFile} />
                    </div>
                </form>
                <button type="button" onClick={this.onBtnUploadPayment}  className="btn btn-primary float-right" >Add Data</button>
                <button type="button"  onClick={this.onBtnCancel} className="btn btn-warning float-right mx-3" >Cancel</button>
            </div>
              ) : null
          }
         
          
        </div>
      </div>
        )
    }
    
}
export default Transaction