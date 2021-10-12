import React from "react";

class RevenueAnnual extends React.Component {
  render() {
    return (
      <div className="mx-5 my-5">
        <div className="card text-white bg-success mb-3" style={{ width:"17rem", maxWidth: "18rem" }}>
          <div className="card-header"><h5>Revenue (Annual)</h5></div>
          <div className="card-body text-dark bg-light">
            {/* <h6 className="card-title">(Annual)</h6> */}
            <h5 className="card-text">Rp 175.000.000</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default RevenueAnnual;
