import React from "react";
import { Link } from "react-router-dom";
import Axios from 'axios'

import "../css/edubin/slick.css";
import "../css/edubin/animate.css";
import "../css/edubin/nice-select.css";
import "../css/edubin/jquery.nice-number.min.css";
import "../css/edubin/magnific-popup.css";
import "../css/edubin/bootstrap.min.css";
import "../css/edubin/default.css";
import "../css/edubin/style.css";
import "../css/edubin/responsive.css";

class ProductCard extends React.Component {
  
  state = {
    productDetail: [],
    sizeList: [],
    pickSizeToogle: [],
    addToggle: false,
    productQty: 1,
    selected : 1,
  }

  inputHandler = (event) => {
    const value = event.target.value
    const name = event.target.name

    this.setState({[name] : value})
  }

  fetchSize = (val) => {
    Axios.get(`http://localhost:3300/product/get-product-size?id_product=${val.id_product}`)
    
    .then((result) => {
      this.setState({productDetails: result.data})

      this.state.productDetail.map((val) => {
        this.setState({sizeList: [...this.state.sizeList,val.size]})
      })
    })
    .catch((err) => {
      alert(err)
    })
  }

  sizeRender = () => {
        console.log(this.state.sizeList)
       
    }

    pickSizeToggle = () => {
        this.fetchSize(this.props.productData)
        this.setState({pickSizeToggle: true})
        this.setState({selected:this.props.productData.id_product})
        console.log(this.state.selected)
    }

    addToggle = () => {
        this.setState({addToggle: true})
        //kirim ke cart(update cart)
    }

    cancelToggle = () => {
        this.setState({pickSizeToggle: false})
        this.setState({addToggle: false})
        this.setState({sizeList:[]})
    }

    addQuantity = () => {
        this.setState({productQty: this.state.productQty + 1})
    }
    
      deleteQuantity = () => {
        this.setState({productQty: this.state.productQty - 1})
    }


  render() {
    console.log(this.props)
    return (
      <div class="singel-publication">
        <div class="image">
             <img src={this.props.productData.product_image} alt="Publication" />
                 <div class="add-cart">
            <ul>
              <li>
                <a href="#">
          <Link
              to={ `/product-detail/${this.props.productData.id_product}`} >
                  <i class="fa fa-search"></i>
              </Link>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="cont">
          <div class="name">
            <h6>{this.props.productData.product_name}</h6>
            <span>
              {this.props.productData.stock} {this.props.productData.unit}
            </span>
          </div>
          <div class="button text-right">
            <a href="#" class="main-btn">
              Rp. {this.props.productData.product_price}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
