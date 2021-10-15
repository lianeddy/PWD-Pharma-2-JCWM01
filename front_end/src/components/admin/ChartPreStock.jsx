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

class ChartPreStock extends PureComponent {
  state = {
    dataChart: [],
    stockPrice: 0
  }

  componentDidMount() {
    this.getChartStats()
    this.countStockPrice()
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

  printData = () => {
    return this.state.dataChart.map((item, index) => {
      if (item.month === "January") {
        return (
          {
            name : "January",
            ProfitOrLoss: item.profit_or_loss,
            Revenue: item.total_revenue,
            Expenses: - (item.total_expenses + this.state.stockPrice),
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

  countStockPrice = () => {
    Axios.get(`${URL_API}/admin/stock-price`)
    .then(res => {
      this.setState({ stockPrice: parseInt(res.data.results[0].stock_price) })
      console.log(res.data)
    })
    .catch(err => {
      alert("Cannot Sum Stock Price")
      console.log(err)
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

export default ChartPreStock;