import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import BarChart from "../../components/admin/BarChart";
import RevenueCard from "../../components/admin/RevenueCard";
import RevenueAnnual from "../../components/admin/RevenueAnnual";
import ExpensesCard from "../../components/admin/ExpensesCard";
import ExpensesAnnual from "../../components/admin/ExpensesAnnual";
import ProfitCard from "../../components/admin/ProfitCard";
import ProfitAnnual from "../../components/admin/ProfitAnnual";

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
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <RevenueAnnual />
          <ExpensesAnnual/>
          <ProfitAnnual />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "50px" }}>
          <BarChart />
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