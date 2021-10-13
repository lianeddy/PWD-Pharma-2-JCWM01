import React from "react";
import Axios  from "axios";
import { URL_API } from "../../helper";

class TopSellAnnual extends React.Component {
  render() {
    return (
      <div className="mx-5 my-5">
        <div className="card text-white bg-warning mb-3" style={{ width:"17rem", maxWidth: "18rem" }}>
          <div className="card-header"><h5>Top Seller (Annual)</h5></div>
          <div className="card-body text-dark bg-light">
            <h5 className="card-text">paracetamol (mg)</h5>
            <h5 className="card-text">ibuprofen (ml)</h5>
            <h5 className="card-text">valium (bottle)</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default TopSellAnnual;
