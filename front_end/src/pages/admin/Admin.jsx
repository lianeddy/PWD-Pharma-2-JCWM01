import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import BarChart from "../../components/admin/Chart";
import RevenueCard from "../../components/admin/RevenueCard";
import RevenueAnnual from "../../components/admin/RevenueAnnual";
import ExpensesCard from "../../components/admin/ExpensesCard";
import ExpensesAnnual from "../../components/admin/ExpensesAnnual";
import ProfitCard from "../../components/admin/ProfitCard";
import ProfitAnnual from "../../components/admin/ProfitAnnual";
import Chart from "../../components/admin/Chart";
import TopSell from "../../components/admin/TopSell";
import TopSellAnnual from "../../components/admin/TopSellAnnual";

class Admin extends React.Component {
  render() {
    if (this.props.userGlobal.role !== "admin") {
      return <Redirect to="/" />
    }
  
    return (
      <>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "50px" }}>
          <h1>Admin Dashboard</h1>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <RevenueCard />
          <ExpensesCard />
          <ProfitCard />
          <TopSell />
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <RevenueAnnual />
          <ExpensesAnnual/>
          <ProfitAnnual />
          <TopSellAnnual />
        </div>
        <div className="my-4 mx-4">
          <h3 className="ml-5 mb-4">Earnings Overview</h3>
          <Chart />
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user
  }
}

export default connect(mapStateToProps)(Admin);