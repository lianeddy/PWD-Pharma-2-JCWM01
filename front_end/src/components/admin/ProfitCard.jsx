import React from "react";
import Axios from "axios";
import { URL_API } from "../../helper";

class ProfitCard extends React.Component {
  state = {
    totalPriceMonthly: 0,
    shippingMonthly: 0,
    taxMonthly: 0,
    restockPriceMonthly: 0,
  };

  componentDidMount() {
    this.countTotalPriceMonthly();
    this.countShippingMonthly();
    this.countTaxMonthly();
    this.countRestockPriceMonthly();
  }

  countTotalPriceMonthly = () => {
    Axios.get(`${URL_API}/admin/total-price-monthly`)
      .then((res) => {
        this.setState({
          totalPriceMonthly: parseInt(res.data.results[0].total_price),
        });
        console.log(res.data);
      })
      .catch((err) => {
        alert("Cannot Sum Total Price Monthly");
        console.log(err);
      });
  };

  countShippingMonthly = () => {
    Axios.get(`${URL_API}/admin/shipping-monthly`)
      .then((res) => {
        this.setState({
          shippingMonthly: parseInt(res.data.results[0].shipping_cost),
        });
        console.log(res.data);
      })
      .catch((err) => {
        alert("Cannot Sum Total Price Monthly");
        console.log(err);
      });
  };

  countTaxMonthly = () => {
    Axios.get(`${URL_API}/admin/tax-monthly`)
      .then((res) => {
        this.setState({ taxMonthly: parseInt(res.data.results[0].tax) });
        console.log(res.data);
      })
      .catch((err) => {
        alert("Cannot Sum Tax Monthly");
        console.log(err);
      });
  };

  countRestockPriceMonthly = () => {
    Axios.get(`${URL_API}/admin/restock-price-monthly`)
      .then((res) => {
        this.setState({
          restockPriceMonthly: parseInt(res.data.results[0].restock_price),
        });
        console.log(res.data);
      })
      .catch((err) => {
        alert("Cannot Sum Restock Price Monthly");
        console.log(err);
      });
  };

  render() {
    return (
      <div className="mx-5 my-5">
        <div
          className="card text-white bg-primary mb-3"
          style={{ width: "17rem", maxWidth: "18rem" }}
        >
          <div className="card-header">
            <h5>Profit/Loss (Monthly)</h5>
          </div>
          <div className="card-body text-dark bg-light">
            <h5 className="card-text">
              Rp
              {(
                this.state.totalPriceMonthly +
                this.state.shippingMonthly -
                (this.state.shippingMonthly +
                  this.state.taxMonthly +
                  this.state.restockPriceMonthly)
              ).toLocaleString("id")}
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfitCard;
