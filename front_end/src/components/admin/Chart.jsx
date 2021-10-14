import React, { PureComponent } from 'react';
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
    
  }

  data = [
    {
      name: 'January',
      ProfitOrLoss: 4000,
      Revenue: 4500,
      Expenses: 2400,
    },
    {
      name: 'February',
      ProfitOrLoss: -3000,
      Revenue: 2000,
      Expenses: 2210,
    },
    {
      name: 'March',
      ProfitOrLoss: -2000,
      Revenue: -1800,
      Expenses: 2290,
    },
    {
      name: 'April',
      ProfitOrLoss: 2780,
      Revenue: 3908,
      Expenses: 2000,
    },
    {
      name: 'May',
      ProfitOrLoss: -1890,
      Revenue: 4800,
      Expenses: 2181,
    },
    {
      name: 'June',
      ProfitOrLoss: 2390,
      Revenue: -3800,
      Expenses: 2500,
    },
    {
      name: 'July',
      ProfitOrLoss: 3490,
      Revenue: 4300,
      Expenses: 2100,
    },
    {
      name: 'August',
      ProfitOrLoss: 3490,
      Revenue: 4300,
      Expenses: 2100,
    },
    {
      name: 'September',
      ProfitOrLoss: 3490,
      Revenue: 4300,
      Expenses: 2100,
    },
    {
      name: 'October',
      ProfitOrLoss: 3490,
      Revenue: 4300,
      Expenses: 2100,
    },
  ];

  render() {
    return (
      <ResponsiveContainer width="100%" aspect={3}>
        <BarChart
          width={500}
          height={300}
          data={this.data}
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