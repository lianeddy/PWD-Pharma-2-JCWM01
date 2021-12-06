import React from "react";
import "../assets/styles/product_card.css";
import { Link } from "react-router-dom";
import { URL_API } from "../helper";

class ProductCard extends React.Component {
  render() {
    return (
      <Link to={`/product-detail/${this.props.productData.id_product}`} >
        <div className="card product-card border-info" style={{ backgroundColor: "#171923", borderRadius: "35px" }}>
          <img
            src={URL_API + this.props.productData.product_image}
            alt=""
            style={{ borderRadius: "70px", marginBottom: "10px" }}
          />
          <div className="mt-2 text-center card-footer border-dark bg-light" style={{ borderRadius: "35px" }}>
            <div>
              <h6>{this.props.productData.product_name}</h6>
              <span className="text-muted">Rp {(this.props.productData.product_price).toLocaleString("id")}</span>
            </div>
            {/* <div className="d-flex flex-row justify-content-end">
              <Link to={`/product-detail/${this.props.productData.id_product}`} style={{ color: "light-blue" }} className="btn btn-primary mt-4">
                <h6 style={{ color: "white", fontWeight: "normal" }} >Product Detail</h6>
              </Link>
            </div> */}
          </div>
        </div>
      </Link>
    );
  }
}

export default ProductCard;