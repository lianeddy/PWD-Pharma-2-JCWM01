import React from "react";
import { connect } from 'react-redux';
import Axios from 'axios'
import ProductCard from '../components/ProductCard'


class Home extends React.Component {
  state = {
    productList: [],
    categoryList: [],
    page: 1,
    maxPage: 0,
    itemPerPage: 6,
    searchProductName: "",
    searchCategory: "",
    sortProduct: "",
  }



   fetchProducts = () => {
    Axios.get(`http://localhost:3300/product/get?page=${this.state.page-1}&product_name=${this.props.userGlobal.searchProduct}`)
      .then((result) => {
        this.setState({productList: result.data},this.fetchMaxPage())
      })
      .catch(() => {
        alert("Terjadi kesalahan server");
      });
  };


  fetchCategoryList=()=>{
    Axios.get(`http://localhost:3300/product/get-category`)
    .then((result)=>{
      this.setState({categoryList:result.data})
    })
    .catch((err)=>{
      alert(err)
    })
  }


  fetchMaxPage = ()=>{
    Axios.get(`http://localhost:3300/product/get-max-page?category=${this.state.searchCategory}&product_name=${this.props.userGlobal.searchProduct}`)
    .then((result)=>{
      this.setState({maxPage: Math.ceil((result.data[0])/this.state.itemPerPage)})
      console.log("checkMaxPage", this.state.maxPage);
    })
  }


  renderProducts = () => {
    let rawData = [...this.state.productList];
    return rawData.map((val) => {
      return <ProductCard productData={val} />;
    });
  };


  clearFilter=()=>{
    this.setState({searchCategory:""})
    this.fetchProducts()
  }


  componentDidUpdate(prevProps){
    if (prevProps.userGlobal.searchProduct !== this.props.userGlobal.searchProduct){
      this.fetchFilterProduct()
    }
  }


  componentDidMount() {
    this.fetchProducts();
    this.fetchCategoryList()
    this.fetchMaxPage()
    console.log(this.props.userGlobal.searchProduct);
  }

  nextPageHandler = () => {
    this.setState({page : this.state.page +1 }, this.fetchProducts)
  };

  prevPageHandler = () => {
    this.setState({page: this.state.page -1}, this.fetchProducts)
  };

  inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };


   sortHandler=(event)=>{
    const value = event.target.value

    this.setState({sortProduct : value}, this.fetchFilterProduct)
  }

  fetchFilterProduct=()=>{
    console.log("sortby",this.state.sortProduct);
    console.log("category",this.state.searchCategory);
    console.log("product_name",this.props.userGlobal.searchProduct);
    this.fetchMaxPage()

    Axios.get(`http://localhost:3300/product/get?page=${this.state.page-1}&sortby=${this.state.sortProduct}&category=${this.state.searchCategory}&product_name=${this.props.userGlobal.searchProduct}`)
    .then((result)=>{
      this.setState({productList: result.data})
    })
    .catch((err)=>{
      alert(err)
    })
  }

    render(){
    return(
      <div className=" mt-4 mb-5 container-style">
        
        <div className="row">
          <div className="col-2 filter-bar">
            <div>
              <button className="btn btn-dark btn-sm filter" onClick={this.fetchFilterProduct}><p>Filter</p></button>
              <button className="btn btn-light btn-sm ms-2 filter" onClick={this.clearFilter}><p>Reset Filter</p></button>
            </div>
          </div>

          <div className="col-10 ">
              <div className="d-flex flex-direction-row align-items-center justify-content-between mb-3">
                <div className="d-flex flex-direction-row align-items-center justify-content-start col-4 px-3">
                  <select onChange={this.sortHandler} name="sortProduct" className="form-control filter-style">
                    <option value="">SORT BY</option>
                    <option value="price_asc">Lowest price</option>
                    <option value="price_desc">Highest price</option>
                    <option value="name_asc">A to Z</option>
                    <option value="name_desc">Z to A</option>
                  </select>
                </div>
                <div className="col-4 "> </div>
                <div className="d-flex flex-direction-row align-items-center justify-content-end col-4 px-5">
                  <p>{this.state.productList.length} item(s)</p>
                </div>
              </div>

              {
                this.state.productList.length===0 ?
                <div className="d-flex align-items-center flex-row justify-content-center mt-5">
                  <h4>sorry error page!</h4>
                </div>
                :
                <>
                <div className="d-flex flex-wrap  align-items-center flex-row justify-content-start">
                  {/* Render Products Here */}
                  {this.renderProducts()}
                </div>
                  <div className="d-flex flex-direction-row align-items-center justify-content-between mt-3">
                    <div className="col-4"></div>
                    <div className="col-4 d-flex flex-direction-row align-items-center justify-content-center"> 
                      <button disabled={this.state.page===1} onClick={this.prevPageHandler} className="btn btn-sm btn-dark">
                        {"<"}
                      </button>
                      <p className="text-center text-page my-0 mx-2">Page {this.state.page} of {this.state.maxPage}</p>
                      <button disabled={this.state.page===this.state.maxPage}  onClick={this.nextPageHandler} className="btn btn-sm btn-dark">
                        {">"}
                      </button>
                    </div>
                    <div className="col-4"></div>
                  </div>
                </>
              }
          </div>


        </div>
      </div>
    )
  }
  }

const mapStateToProps =(state)=> {
    return{
        userGlobal: state.user,
    }
};

export default connect(mapStateToProps)(Home);
