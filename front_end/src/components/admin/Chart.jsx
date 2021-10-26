import React, { PureComponent } from 'react';
import Axios from 'axios';
import { URL_API } from '../../helper';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

// static demoUrl = 'https://codesandbox.io/s/bar-chart-with-positive-negative-i3b8b';

class Chart extends PureComponent {
  state = {
    dataChart: [],
    restockPriceMonthly: 0
  }

  componentDidMount() {
    this.getChartStats()
    this.countRestockPriceMonthly()
  }

  getChartStats = () => {
    Axios.get(`${URL_API}/admin/chart-stats`)
      .then((res) => {
        this.setState({ dataChart: res.data.results })
        console.log(res.data.results)
      })
      .catch((err) => {
        alert("Cannot Get Monthly Sales Statistic")
        console.log(err)
      })
  }

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

  printData = () => {
    return this.state.dataChart.map((item, index) => {
      if (item.month === "October") {
        return (
          {
            name : "October",
            ProfitOrLoss: item.total_price - this.state.restockPriceMonthly,
            Revenue: item.tax + item.shipping_cost + item.total_price,
            Expenses: - (item.tax + item.shipping_cost + this.state.restockPriceMonthly),
          }
        )
      }

      return (
        {
          name : item.month,
          ProfitOrLoss: item.profit_or_loss,
          Revenue: item.total_revenue,
          Expenses: - item.total_expenses,
        }
      )
    })
  }

  render() {
    return (
      <ResponsiveContainer width="100%" aspect={3}>
        <BarChart
          width={500}
          height={300}
          data={this.printData()}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="Revenue" fill="#82ca9d" />
          <Bar dataKey="Expenses" fill="#d96c5f" />
          <Bar dataKey="ProfitOrLoss" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default Chart;