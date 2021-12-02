import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { URL_API } from "../../helper";
import Axios from 'axios'
import { NavItem, Button, Input } from "reactstrap";
const moment = require('moment')


class Transaction extends React.Component{

    state = {
        id_transaction : 0,
        dbTransaction : [],
        dbHistoryProduct : [],
        isDetailClicked : false,
        status : "all",
        page : 1,
        maxPage : 1,
        limitPage : 0,
        date : "",
        field : "date",
        ordered : "desc"
    }

    inputHandler = (e) =>{
      this.getData()
        const value = e.target.value 
        const name = e.target.name 
        this.setState({[name] : value})

    }


    getDataProduct = ()=>{
        Axios.get(`${URL_API}/transaction/getProductTransaction/${this.state.date}`)
        .then(res =>{
            this.setState({
                dbHistoryProduct : res.data,
            })
        })
        .catch(err =>{
            console.log(err);
        })
    }

    getData = () =>{
        if(this.state.status == "all"){

            Axios.get(`${URL_API}/admin/getAdminTransaction/${this.state.limitPage}/${this.state.field}/${this.state.ordered}`)
            .then(res =>{
                this.setState({
                    dbTransaction : res.data,
                    maxPage : Math.ceil(this.state.dbTransaction.length / 5)
                
                })
        
            })
            .catch(err =>{
                alert("cannot get data")
                console.log(err);
            })
        }else if(this.state.status == "unpaid" || "process" || "shipping" || "done"){
            Axios.get(`${URL_API}/admin/getAdminTransactionFilter/${this.state.limitPage}/${this.state.field}/${this.state.ordered}/${this.state.status}`)
            
            .then(res =>{
            
                this.setState({
                    dbTransaction : res.data,
                
                })
        
            })
            .catch(err =>{
                alert("cannot get data")
                console.log(err);
            })
        }
            
       
    }
    nextPageHandler = () =>{
        this.setState({page : this.state.page + 1 , limitPage : this.state.limitPage + 5})
        this.getData()
    }
    
    prevPageHandler = () =>{
        this.setState({page : this.state.page - 1 , limitPage : this.state.limitPage - 5})
        this.getData()
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
   
   


 

    // componentDidUpdate(){
    //     this.getData()
    // }
  

    componentDidMount() {
        this.getData()
    }

    onBtnPay = (idTr)=>{
        this.setState({id_transaction : idTr,
                    isPaidClicked : true,
                isDetailClicked : false})
        this.getData()
    }

    
    onBtnCancel = () =>{
        this.setState({
            isPaidClicked : false
        })
        this.getData()
    }
    onBtnLatest = () =>{
      this.setState({field : "date",
                  ordered : "desc"})
                  this.getData()
    }
    onBtnFinalPrice = () =>{
      this.setState({field : "final_price",
                  ordered : "desc"})
                  this.getData()
    }
    onBtnHightQty = () =>{
      this.setState({field : "total_qty",
                  ordered : "desc"})
                  this.getData()

    }

    dataProduct =()=>{
      return this.state.dbHistoryProduct.map((item)=>{
        return(

        <tr>
              <td>
              {item.product_name}
              </td>
              <td>
              ({item.qty})
              </td>
        </tr>
        )
      })
    }

    cardDetail =()=>{
        
            return(
                <div className="card-body">
          <div className="d-flex my-2 flex-row justify-content-between">
          <table className="table">
              <thead className="">
                <tr>
                  <th>Drugs Name</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {this.dataProduct()}
              </tbody>
              </table>
            
            
          </div>
        </div>
            )
        
        
    }
    onBtnDetail =(date1) =>{
        this.setState({isDetailClicked : true,
        date : date1})
        console.log(this.state.date);
        this.getDataProduct()
    }
    onBtnBackDetail = () =>{
        this.setState({isDetailClicked :false})

    }






    printData = () =>{
        return this.state.dbTransaction.map((item, index) =>{
          return(
            <tr>
              <td className="align-middle">
                  {index+1}
                </td>
                <td className="align-middle">
                    {moment(item.date).format("MMM / D / YYYY")}
                </td>
                <td className="align-middle">
                {item.username}
                </td>
                <td className="align-middle">
                {item.total_qty}
                </td>
                <td className="align-middle">
                Rp.{item.tax}
                </td>
                <td className="align-middle">
                Rp.{item.total_tp}
                </td>
                <td className="align-middle">
                {item.expedition_name}
                </td>
                <td className="align-middle">
                Rp.{item.shipping_cost}
                </td>
                <td className="align-middle">
                Rp.{item.final_price}
                </td>
                <td className="align-middle">
                {item.status}
                </td>
                <td className="align-middle">
                    {
                    <button className="btn btn-success"  onClick={() =>this.onBtnDetail(moment(item.date).format("YYYY-MM-DD hh-mm-ss"))}>Detail Product</button>
                    }
                </td>
              </tr>
          )
        })
      
      }
    render(){
        
        return(
          
            <div className="p-5 text-center">
        <h1>Admin All Transaction</h1>
        <div className="row mt-5">
          <div className="col-9 text-center">
              {"Status : "}  
          <Input
                className={" btn btn-outline-primary my-3 mx-1"}
                name = "status"
                onChange ={ this.inputHandler}
                style={{ width: "100px", borderRadius: "20px" }}
                type="select"
                id="exampleSelect"
                >
                <option value={"all"}>All</option>
                <option value={"unpaid"}>Unpaid</option>
                <option value={"process"}>Process</option>
                <option value={"shipping"}>Shipping</option>
                <option value={"done"}>Done</option>
                
                </Input>
                {"Ordered By : "} 
                <button type="button" onClick={this.onBtnLatest} class="btn btn-outline-primary mx-1" style={{borderRadius: "20px"}}>Latest</button>
                <button type="button" onClick={this.onBtnHightQty} class="btn btn-outline-primary mx-1" style={{borderRadius: "20px"}}>Highest Qty</button>
                <button type="button" onClick={this.onBtnFinalPrice}  class="btn btn-outline-primary mx-1" style={{borderRadius: "20px"}}>Highest Total Price</button>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th>no</th>
                  <th>Date</th>
                  <th>Username</th>
                  <th>Quantity</th>
                  <th>Tax</th>
                  <th>Price</th>
                  <th>Expedition</th>
                  <th>Shipping Cost</th>
                  <th>Total Price</th>
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
                  <td colSpan="11">
                    
              <div className="d-flex flex-row justify-content-center align-items-center">
                <button
                  disabled={this.state.page === 1}
                  className="btn btn-dark"
                  onClick={this.prevPageHandler}
                >
                  {"<"}
                </button>
                <div className="text-center">
                  page {this.state.page}
                </div>
                <button
                  disabled={this.state.dbTransaction.length < 5}
                  className="btn btn-dark"
                  onClick={this.nextPageHandler}
                >
                  {">"}
                </button>
              </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          {this.state.isDetailClicked ?
          <div className="card" style={{width : "300px"}}>
                <div className="card-header">
                  <strong>transaction detail</strong>
                </div>
                <div className="card-body">
                  {this.cardDetail()}
                </div>
                <button onClick={this.onBtnBackDetail} className="btn btn-primary mx-5 my-3">back</button>
              </div>
              :
              null
          }
          
        </div>
      </div>
        )
    }
    
}
export default Transaction