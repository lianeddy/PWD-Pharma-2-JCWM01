import React from "react";
import Axios from "axios";
import { URL_API } from "../../helper";

class ExpensesCard extends React.Component {
  state = {
    shippingMonthly: 0,
    taxMonthly: 0,
    restockPriceMonthly: 0,
  };

  componentDidMount() {
    this.countShippingMonthly();
    this.countTaxMonthly();
    this.countRestockPriceMonthly();
  }

  countShippingMonthly = () => {
    Axios.get(`${URL_API}/admin/shipping-monthly`)
      .then((res) => {
        this.setState({
          shippingMonthly: parseInt(res.data.results[0].shipping_cost),
        });
        console.log(res.data);
      })
      .catch((err) => {
        alert("Cannot Sum Shipping Monthly");
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
          className="card text-white bg-danger mb-3"
          style={{ width: "17rem", maxWidth: "18rem" }}
        >
          <div className="card-header">
            <h5>Expenses (Monthly)</h5>
          </div>
          <div className="card-body text-dark bg-light">
            <h5 className="card-text">
              Rp
              {(
                this.state.shippingMonthly +
                this.state.taxMonthly +
                this.state.restockPriceMonthly
              ).toLocaleString("id")}
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default ExpensesCard;
