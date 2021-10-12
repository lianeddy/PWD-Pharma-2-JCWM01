import React from "react";

class TopSell extends React.Component {
  render() {
    return (
      <div className="mx-5 my-5">
        <div className="card text-white bg-warning mb-3" style={{ width:"17rem", maxWidth: "18rem" }}>
          <div className="card-header"><h5>Top Seller (Monthly)</h5></div>
          <div className="card-body text-dark bg-light">
            {/* <h6 className="card-title">(Monthly)</h6> */}
            <h5 className="card-text">ibuprofen (mg)</h5>
            <h5 className="card-text">drugs b (ml)</h5>
            <h5 className="card-text">drugs c (bottle)</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default TopSell;
