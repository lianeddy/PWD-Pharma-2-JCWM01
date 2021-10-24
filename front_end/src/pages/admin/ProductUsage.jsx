import React from "react";
import { Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { URL_API } from "../../helper";
import Axios from "axios";
import { connect } from "react-redux";

class ProductUsage extends React.Component {
    state ={
        dbProductUsage : [],
        page : 1,
        limitPage : 0

    }

    getData = () => {
        Axios.get(`${URL_API}/admin/get-product-usage/${this.state.limitPage}`)
          .then((res) => {
            console.log(res.data)
            this.setState({
              dbProductUsage: res.data.results
            });
          })
          .catch((err) => {
            alert("Cannot Get Data");
            console.log(err);
          });
      };

      componentDidMount(){
          this.getData()
      }
      componentDidUpdate (){
          this.getData()
      }
      nextPageHandler = () => {
        this.setState({
          page: this.state.page + 1,
          limitPage: this.state.limitPage + 3,
        });
      };
    
      prevPageHandler = () => {
        this.setState({
          page: this.state.page - 1,
          limitPage: this.state.limitPage - 3,
        });
      };

      cardProduct =()=>{
          return this.state.dbProductUsage.map((item, index)=>{

              return(
                <div className="col-md-4 ftco-animate fadeInUp ftco-animated justify-content-center align-items-center">
                            <div className="block-7">
                                <div className="img">
                                    <img style={{height:"350px", width: "350px", borderTopLeftRadius:"20px", borderTopRightRadius : "20px"}}  src={URL_API + item.product_image} alt="" />
                                </div>
                                <div className="text-center p-4" style={{ backgroundColor:"#FFB6C1", borderBottomLeftRadius : "20px", borderBottomRightRadius : "20px"}}>
                                    <span className="excerpt d-block" style={{fontWeight :"bold"}}>{item.product_name}</span>
                                    <span className="price"><sup>Rp.</sup> <span class="number">{item.product_price}</span> <sub>/ml</sub></span>
                                    
                                        <li><span className="">QTY Usage = {item.total_qty} {item.unit}</span></li>
                                        <li><span className="">QTY Now = {item.stock} {item.unit}</span></li>
                                   
                                </div>
                            </div>
                        </div>
              )
          })
      }
    render (){
      if (!this.props.userGlobal.username) {
        return <Redirect to="/" />;
      }
        console.log(this.state.dbProductUsage);


        return (
            <section class="ftco-section bg-light">
            <div className="container">
                <div className="row justify-content-center pb-5 mb-3">
                    <div className="col-md-7 heading-section text-center ftco-animate fadeInUp ftco-animated">
                        <h2>Product Usage In Custom Order</h2>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center">
                    {this.cardProduct()}
                    
                </div>
               
                    
                      <div className="d-flex flex-row justify-content-center align-items-center my-4">
                        <button
                          disabled={this.state.page === 1}
                        className="btn btn-dark"
                        onClick={this.prevPageHandler}
                        >
                          {"<"}
                        </button>
                        <div className="text-center"> {" page "} {this.state.page} </div>
                        <button
                          disabled={this.state.dbProductUsage.length < 3}
                          className="btn btn-dark"
                          onClick={this.nextPageHandler}
                        >
                          {">"}
                        </button>
                      </div>
                    
                  
            </div>
            </section>
        )
    }

}
const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};


export default connect(mapStateToProps) (ProductUsage);