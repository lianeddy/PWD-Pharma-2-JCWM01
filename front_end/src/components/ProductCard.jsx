import React from "react";
import { Link, Redirect } from "react-router-dom";

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
    return (
      /*
      <div className="card product-card" style={{padding: 5, marginLeft: 2, marginRight: 2, marginBottom: 4}}>
        <img src={this.props.productData.product_image} alt="" />
        <div className="mt-2">
          <div>
            <h6>{this.props.productData.product_name}</h6>
            <span className="text-muted">
              Rp. {this.props.productData.product_price}
            </span>
          </div>
          <div className="d-flex flex-row justify-content-end">
            <button className="btn btn-primary mt-2">Add to cart </button>
          </div>
        </div>
      </div>
      */
      <div class="singel-publication">
        <div class="image">
          <img src={this.props.productData.product_image} alt="Publication" />
          <div class="add-cart">
            <ul>
              <li>
                <a href="#">
                  <i class="fa fa-search"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="cont">
          <div class="name">
            <Link
              to={{
                pathname: "/productDetail",
                state: { productId: this.props.productData.id_product },
              }}
            >
              <h6>{this.props.productData.product_name}</h6>
            </Link>
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
