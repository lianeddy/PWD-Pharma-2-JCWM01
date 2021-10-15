import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import Axios from 'axios';
import { URL_API } from '../../helper';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

class ChartPieBt extends PureComponent {
  state = {
    dataChart: []
  }

  componentDidMount() {
    this.getChartStats()
  }

  getChartStats = () => {
    Axios.get(`${URL_API}/admin/piechart-bt`)
      .then((res) => {
        this.setState({ dataChart: res.data.results })
        console.log(res.data.results)
      })
      .catch((err) => {
        alert("Cannot Get Pie Chart bottle Unit")
        console.log(err)
      })
  }

  printData = () => {
    return this.state.dataChart.map((item, index) => {
      return (
        {
          name : item.product_name,
          value: item.qty
        }
      )
    })
  }

  render() {
    return (
      <ResponsiveContainer width="100%" aspect={5}>
        <PieChart width={400} height={400}>
          <Pie
            data={this.printData()}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {this.state.dataChart.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default ChartPieBt;