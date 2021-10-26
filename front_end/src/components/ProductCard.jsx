import React from "react";
import "../assets/styles/product_card.css";
import { Link } from "react-router-dom";
import { URL_API } from "../helper";

class ProductCard extends React.Component {
  render() {
    return (
      <div className="card product-card">
        <img
          src={URL_API + this.props.productData.product_image}
          alt=""
        />
        <div className="mt-2">
          <div>
            <Link to={`/product-detail/${this.props.productData.id_product}`} style={{ textDecoration: "none", color: "inherit" }}>
              <h6>{this.props.productData.product_name}</h6>
            </Link> <br />
            <span className="text-muted">Rp {(this.props.productData.product_price).toLocaleString("id")}</span>
          </div>
          <div className="d-flex flex-row justify-content-end">
            <Link to={`/product-detail/${this.props.productData.id_product}`} style={{ color: "light-blue" }} className="btn btn-primary mt-4">
              <h6 style={{ color: "white", fontWeight: "normal" }} >Product Detail</h6>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;