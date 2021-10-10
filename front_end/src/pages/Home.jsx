import React from "react";
import ProductCard from "../components/ProductCard";
import Axios from "axios";
//import { URL_API } from "../helper";

class Home extends React.Component {
  state = {
    productList: [],
    filteredProductList: [],
    page: 1,
    maxPage: 0,
    itemPerPage: 6,
    searchProductName: "",
    searchCategory: "",
    sortBy: "",
  };

  // melakukan panggilan ke API
  fetchproducts = () => {
    Axios.get("http://localhost:3300/product/get")

      .then((result) => {
        this.setState({
          productList: result.data,
          maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
          filteredProductList: result.data,
        });
      })
      .catch(() => {
        alert("Terjadi kesalahan di server");
      });
  };

  renderProducts = () => {
    const beginningIndex = (this.state.page - 1) * this.state.itemPerPage;
    let rawData = [...this.state.filteredProductList];
    const compareString = (a, b) => {
      if (a.product_name < b.product_name) {
        return -1;
      }
      if (a.product_name > b.product_name) {
        return 1;
      }
      return 0;
    };
    switch (this.state.sortBy) {
      case "lowPrice":
        rawData.sort((a, b) => a.product_price - b.product_price);
        break;
      case "highPrice":
        rawData.sort((a, b) => b.product_price - a.product_price);
        break;
      case "az":
        rawData.sort(compareString);
        break;
      case "za":
        rawData.sort((a, b) => compareString(b, a));
        break;
      default:
        rawData = [...this.state.filteredProductList];
        break;
    }

    const currentData = rawData.slice(
      beginningIndex,
      beginningIndex + this.state.itemPerPage
    );
    return currentData.map((val) => {
      return <ProductCard productData={val} />;
    });
  };
  nextPagehandler = () => {
    // console.log("Next Page Clicked");
    if (this.state.page < this.state.maxPage) {
      this.setState({ page: this.state.page + 1 });
    }
  };

  prevPagehandler = () => {
    // console.log("Previous Page Clicked");
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    }
  };

  //search dan sortby
  inputHandler = (event) => {
    // console.log("Search Product " + event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  searchButtonHandler = () => {
    const filteredProductList = this.state.productList.filter((val) => {
      return val.product_name.toLowerCase().includes(this.state.searchProductName.toLowerCase())&&
        val.category.toLowerCase().includes(this.state.searchCategory.toLowerCase());
    });
    this.setState({
      filteredProductList,
      maxPage: Math.ceil(filteredProductList.length / this.state.itemPerPage),
      page: 1,
    });
  };

  componentDidMount() {
    this.fetchproducts();
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          {/* untuk kolom yang ada disebelah kiri */}
          <div className="col-3">
            <div className="card">
              <div className="card-header">
                <strong>Filter Products</strong>
              </div>
              <div className="card-body">
                <label htmlFor="searchProductName">Name</label>
                <input
                  onChange={this.inputHandler}
                  name="searchProductName"
                  type="text"
                  className="form-control mb-3"
                />
                <label htmlFor="searchCategory">Category</label>
                <select
                  onChange={this.inputHandler}
                  name="searchCategory"
                  className="form-control"
                >
                  <option value="">All Drugs</option>
                  <option value="liquid">Liquid</option>
                  <option value="tablet">Tablet</option>
                </select>
                <button
                  onClick={this.searchButtonHandler}
                  className="btn btn-primary mt-3"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-header">
                <strong>Sort Products</strong>
              </div>
              <div className="card-body">
                <label htmlFor="sortBy">Sort by</label>
                <select
                  onChange={this.inputHandler}
                  name="sortBy"
                  className="form-control"
                >
                  <option value="">Default</option>
                  <option value="lowPrice">Lowest Price</option>
                  <option value="highPrice">Highest price</option>
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
                </select>
              </div>
            </div>
            <div className="mt-3">
              <div className="d-flex flex-row justify-content-between align-item-center">
                <button
                  disabled={this.state.page === 1}
                  onClick={this.prevPagehandler}
                  className="btn btn-dark"
                >
                  {"<"}
                </button>
                <div className="text-center">
                  page {this.state.page} of {this.state.maxPage}{" "}
                </div>
                <button
                  disabled={this.state.page === this.state.maxPage}
                  onClick={this.nextPagehandler}
                  className="btn btn-dark"
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
          {/* untuk kolom disebelah kanan */}
          <div className="col-9">
            <div className="d-flex flex-wrap flex-row text-end">
              {this.renderProducts()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
