import React from "react";
import { Link } from "react-router-dom";

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
