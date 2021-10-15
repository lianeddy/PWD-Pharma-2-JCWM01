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
    january: {},
    february: {},
    march: {},
    april: {},
    may: {},
    june: {},
    july: {},
    august: {},
    september: {},
    october: {}
  }

  componentDidMount() {
    this.januaryStats()
    this.februaryStats()
    this.marchStats()
    this.aprilStats()
    this.mayStats()
    this.juneStats()
    this.julyStats()
    this.augustStats()
    this.septemberStats()
    this.octoberStats()
  }

  januaryStats = () => {
    Axios.get(`${URL_API}/admin/january-stats`)
      .then((res) => {
        this.setState({ january: res.data.results[0] });
        console.log(res.data);
        console.log(typeof res.data.results[0])
        console.log(typeof this.state.january.total_revenue)
        console.log(typeof this.state.january.total_expenses)
        console.log(typeof this.state.january.profit_or_loss)
      })
      .catch((err) => {
        alert("Cannot Get January Sales Statistic");
        console.log(err);
      });
  };

  februaryStats = () => {
    Axios.get(`${URL_API}/admin/february-stats`)
      .then((res) => {
        this.setState({ february: res.data.results[0] });
        console.log(res.data);
      })
      .catch((err) => {
        alert("Cannot Get February Sales Statistic");
        console.log(err);
      });
  };

  marchStats = () => {
    Axios.get(`${URL_API}/admin/march-stats`)
      .then((res) => {
        this.setState({ march: res.data.results[0] });
        console.log(res.data);
      })
      .catch((err) => {
        alert("Cannot Get March Sales Statistic");
        console.log(err);
      });
  };

  aprilStats = () => {
    Axios.get(`${URL_API}/admin/april-stats`)
      .then((res) => {
        this.setState({ april: res.data.results[0] });
        console.log(res.data);
      })
      .catch((err) => {
        alert("Cannot Get April Sales Statistic");
        console.log(err);
      });
  };

  mayStats = () => {
    Axios.get(`${URL_API}/admin/may-stats`)
      .then((res) => {
        this.setState({ may: res.data.results[0] });
        console.log(res.data);
      })
      .catch((err) => {
        alert("Cannot Get May Sales Statistic");
        console.log(err);
      });
  };

  juneStats = () => {
    Axios.get(`${URL_API}/admin/june-stats`)
      .then((res) => {
        this.setState({ june: res.data.results[0] });
        console.log(res.data);
      })
      .catch((err) => {
        alert("Cannot Get June Sales Statistic");
        console.log(err);
      });
  };

  julyStats = () => {
    Axios.get(`${URL_API}/admin/july-stats`)
      .then((res) => {
        this.setState({ july: res.data.results[0] });
        console.log(res.data);
      })
      .catch((err) => {
        alert("Cannot Get July Sales Statistic");
        console.log(err);
      });
  };

  augustStats = () => {
    Axios.get(`${URL_API}/admin/august-stats`)
      .then((res) => {
        this.setState({ august: res.data.results[0] });
        console.log(res.data);
      })
      .catch((err) => {
        alert("Cannot Get August Sales Statistic");
        console.log(err);
      });
  };

  septemberStats = () => {
    Axios.get(`${URL_API}/admin/september-stats`)
      .then((res) => {
        this.setState({ september: res.data.results[0] });
        console.log(res.data);
      })
      .catch((err) => {
        alert("Cannot Get September Sales Statistic");
        console.log(err);
      });
  };

  octoberStats = () => {
    Axios.get(`${URL_API}/admin/october-stats`)
      .then((res) => {
        this.setState({ october: res.data.results[0] });
        console.log(res.data);
      })
      .catch((err) => {
        alert("Cannot Get October Sales Statistic");
        console.log(err);
      });
  };

  data = [
    // {
    //   name: 'January',
    //   ProfitOrLoss: parseInt(this.state.january.profit_or_loss),
    //   Revenue: parseInt(this.state.january.total_revenue),
    //   Expenses: parseInt(this.state.january.total_expenses),
    // },
    {
      name: 'January',
      ProfitOrLoss: 5400000,
      Revenue: 6010000,
      Expenses: -610000,
      // Expenses: -68260000,
    },
    {
      name: 'February',
      ProfitOrLoss: 5602500,
      Revenue: 6235000,
      Expenses: -632500,
    },
    {
      name: 'March',
      ProfitOrLoss: 5805000,
      Revenue: 6460000,
      Expenses: -655000,
    },
    {
      name: 'April',
      ProfitOrLoss: 5400000,
      Revenue: 6010000,
      Expenses: -610000,
    },
    {
      name: 'May',
      ProfitOrLoss: 8100000,
      Revenue: 9010000,
      Expenses: -910000,
    },
    {
      name: 'June',
      ProfitOrLoss: 8437500,
      Revenue: 9385000,
      Expenses: -947500,
    },
    {
      name: 'July',
      ProfitOrLoss: 8775000,
      Revenue: 9760000,
      Expenses: -985000,
    },
    {
      name: 'August',
      ProfitOrLoss: 900000,
      Revenue: 1010000,
      Expenses: -110000,
    },
    {
      name: 'September',
      ProfitOrLoss: 14400000,
      Revenue: 16020000,
      Expenses: -1620000,
    },
    {
      name: 'October',
      ProfitOrLoss: 4014000,
      Revenue: 4518000,
      Expenses: -504000,
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