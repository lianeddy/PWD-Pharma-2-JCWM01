import React from "react";
import "../assets/styles/product_card.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";
import { URL_API } from "../helper";
import ProductCard from "../components/ProductCard";
import imageSlider1 from "../img/slider1.jpg";
import { Link as Link2, animateScroll as scroll } from "react-scroll";

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

  // componentDidUpdate(prevProps, prevState) {
  //   // only update if searchValue has changed
  //   if (prevState.dbproduct !== this.state.dbproduct) {
  //     this.getData();
  //   }
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
    // () => this.getData(e)
  }

  prevPageHandler = () =>{
    this.setState({ page : this.state.page - 1, limitPage : this.state.limitPage - 4 });
    this.getData()
    // () => this.getData(e)
  }

  render() {
    return (
      <>
        <section id="slider-part" class="slider-active">
          <div
            class="single-slider bg_cover pt-150"
            style={{
              background: `url(${imageSlider1})`,
              backgroundSize: "cover",
            }}
            data-overlay="4"
          >
            <div class="container">
              <div class="row">
                <div class="col-xl-7 col-lg-9">
                  <div class="slider-cont">
                    <h1 data-animation="bounceInLeft" data-delay="1s">
                      Choose your right medical needs
                    </h1>
                    <p data-animation="fadeInUp" data-delay="1.3s"></p>
                    <ul>
                      <li>
                        <Link to="/prescription">
                          <a
                            data-animation="fadeInUp"
                            data-delay="1.6s"
                            class="main-btn"
                            href="#"
                          >
                            Upload Prescription Here
                          </a>
                        </Link>
                        <Link2 
                          to="section2" 
                          activeClass="active"
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration={500}
                        >
                          <a
                            data-animation="fadeInUp"
                            data-delay="1.6s"
                            class="main-btn"
                            href="#"
                            style={{ marginLeft: "10px" }}
                          >
                            Buy Product
                          </a>
                        </Link2>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "50px", flexDirection: "column" }}>
          <h1>Shop Now!</h1>
          <Link to="/prescription" style={{ fontSize: "30px" }} >or upload your prescription here</Link>
        </div> */}
        <div id="section2">
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
        </div>
      </>
    )
  }
}

export default Home;