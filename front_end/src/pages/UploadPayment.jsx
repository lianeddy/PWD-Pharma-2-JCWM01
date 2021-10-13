import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

class UploadPayment extends React.Component {
    state = {
      image: "",
      doneUpload : false
    }



    previewFile = (e) =>{
      if (e.target.files[0]){
          this.setState({prescription_image : e.target.files[0].name, addFile : e.target.files[0]})
          let preview = document.getElementById("prescriptionPreview")
          preview.src = URL.createObjectURL(e.target.files[0])

      }

  }
  render() {
    
  
    return (
      <div style={{ backgroundColor: '#F8F9FA' }}>
      <div className="jumbotron mb-2 row" style={{ backgroundColor: 'white' }}>
          <div className="col-md-6">
              <div style={{ width: '90%' }} className="m-auto">
                  <h1 className="display-4">Upload Proof Of Payment</h1>
                  <br />
                  <br />
                  <br />
                  
                  <p className="lead" style={{fontSize:"30px"}}>- Unpaid Order will be canceled after 6 hours</p>
                  <p className="lead" style={{fontSize:"30px"}}>- Up</p>
                  <p className="lead" style={{fontSize:"30px"}}>- Upload this prescription</p>
                  <p className="lead" style={{fontSize:"30px"}}>- Upload this prescription</p>
                  <p className="lead" style={{fontSize:"30px"}}>- Upload this prescription</p>
                  <p className="lead" style={{fontSize:"30px"}}>- Upload this prescription</p>
                  <p className="lead" style={{fontSize:"30px"}}>- Upload this prescription</p>
                  <p className="lead" style={{fontSize:"30px"}}>- Upload this prescription</p>
                  
                 <div className="dflex justify-content-left align-items-left"></div>
                 <div>
                     
                 </div>
              </div>
          </div>
          <di className="col-md-3">
          </di>
          <div className="col-md-3 p-4 text-white text-left justify-content-center align-items-center " style={{backgroundColor:"#00008B", borderRadius: "30px"}}>
              <form>
                  
                      <label htmlFor="description">Image:   </label>
                  <div className="form-group">
                      <img 
                     
                     id = "prescriptionPreview"
                     alt=""
                     className= "img-thumbnail d-grid gap-2 col-9 mx-auto" 
                     style={{width:"700px", height:"500px", backgroundColor:"white"}}/>
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user
  }
}

export default connect(mapStateToProps)(UploadPayment);