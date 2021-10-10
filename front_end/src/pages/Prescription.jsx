import React from 'react';
import Axios from 'axios';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { URL_API } from '../helper';


class Prescription extends React.Component {
    state ={
        commentar : "",
        prescription_image : ""

    }


    previewFile = (e) =>{
        if (e.target.files[0]){
            this.setState({prescription_image : e.target.files[0].name, addFile : e.target.files[0]})
            let preview = document.getElementById("prescriptionPreview")
            preview.src = URL.createObjectURL(e.target.files[0])

        }

    }

    onImageUpload = ()=>{
        if(this.state.addFile) {
            let formData = new FormData()

            let obj = {
                description : this.inputDescription.value
        }
        
        formData.append('data', JSON.stringify(obj))
        formData.append('file', this.state.addFile)
        Axios.post(`${URL_API}/upload/uploadPrescription/1`,formData)
        .then(res =>{
            alert(res.data.message)
        })
        .catch(err =>{
            console.log(err);
        })
    }
    }


    render() {
        
        return (
            <div style={{ backgroundColor: '#F8F9FA' }}>
                <div className="jumbotron mb-2 row" style={{ backgroundColor: 'white' }}>
                    <div className="col-md-6">
                        <div style={{ width: '90%' }} className="m-auto">
                            <h1 className="display-4">Your Prescription</h1>
                            <p className="lead" style={{fontSize:"30px"}}>Upload this prescription and wait for our admin to prepare your order</p>
                           <div className="dflex justify-content-left align-items-left"></div>
                           <div>
                               <img 
                               
                               id = "prescriptionPreview"
                               alt=""
                               className= "img-thumbnail d-grid gap-2 col-9 mx-auto" 
                               style={{width:"1000px", height:"500px"}}/>
                           </div>
                        </div>
                    </div>
                    <di className="col-md-3">
                    </di>
                    <div className="col-md-3 p-4 bg-dark text-white text-left" style={{borderRadius: "30px"}}>
                        <form>
                            
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea type="textarea" className="form-control" id="description" aria-describedby="emailHelp" style={{height: "300px"}} ref={elemen => this.inputDescription = elemen} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="img">Image</label>
                                <input type="file" className="form-control" id="img" aria-describedby="emailHelp" onChange= {this.previewFile} />
                            </div>
                        </form>
                        <button type="button" onClick={this.onImageUpload} className="btn btn-primary float-right" >Add Data</button>
                    </div>
                </div>
                <div className="row container m-auto">
                    
                </div>
            </div>
        );
    }

}

export default Prescription;