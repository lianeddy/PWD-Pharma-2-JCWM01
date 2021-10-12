import React from "react";

class RevenueCard extends React.Component {
  render() {
    return (
      <div className="mx-5 my-5">
        <div className="card text-white bg-success mb-3" style={{ width:"17rem", maxWidth: "18rem" }}>
          <div className="card-header"><h5>Revenue (Monthly)</h5></div>
          <div className="card-body text-dark bg-light">
            {/* <h6 className="card-title">(Monthly)</h6> */}
            <h5 className="card-text">Rp 40.000.000</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default RevenueCard;
