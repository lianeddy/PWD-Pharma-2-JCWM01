import React from "react";
import "../assets/styles/product_card.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";
import { URL_API } from "../helper";
import ProductCard from "../components/ProductCard";

class Home extends React.Component {
  state = {
    dbproduct: [],
    page: 1,
    maxPage: 1,
    limitPage: 0
  }

  componentDidMount() {
    this.getData()
  }

  // componentDidUpdate() {
  //   this.getData()
  // }

  getData = () => {
    Axios.get(`${URL_API}/admin/admin-stock/${this.state.limitPage}`)
    .then(res => {
      this.setState({ dbproduct: res.data.results, maxPage: Math.ceil(this.state.dbproduct.length / 4) })
    })
    .catch(err => {
      alert("Cannot Get Product Data")
      console.log(err)
    })
  }

  renderProducts = () => {
    return this.state.dbproduct.map((val) => {
      return <ProductCard productData={val} />
    })
  }

  nextPageHandler = () =>{
    this.setState({ page : this.state.page + 1, limitPage : this.state.limitPage + 4 });
    this.getData()
    
  }

  prevPageHandler = () =>{
    this.setState({ page : this.state.page - 1, limitPage : this.state.limitPage - 4 });
    this.getData()
     
    
  }

  render() {
    
    return (
      <>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "50px", flexDirection: "column" }}>
          <h1>Shop Now!</h1>
          <Link to="/prescription" style={{ fontSize: "30px" }} >or upload your prescription here</Link>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "50px" }}>
          {this.renderProducts()}
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
            <strong>Page {this.state.page}</strong>
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

export default Home;