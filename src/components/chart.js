import React, { Component } from 'react';
import '../assets/styles/components/chart.css';
import PieChart from './chart-pie';
import BarChart from './chart-bar';
import LineChart from './chart-line';
import BubbleChart from './chart-bubble';
import WaffleChart from './chart-waffle';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {type: this.props.type};
  }

  buildChart() {
      switch (this.state.type) {
          case 'pie':
            return <PieChart authorsF={this.props.authorsF} authorsM={this.props.authorsM} />;
            break;
          case 'bar':
            return <BarChart layout='horizontal' data={this.props.data} authorsF={this.props.authorsF} authorsM={this.props.authorsM} />;
            break;
          case 'line':
            return <LineChart data={this.props.data} authorsF={this.props.authorsF} authorsM={this.props.authorsM} />;
            break;
          case 'bubble':
            return <BubbleChart name={this.props.name} data={this.props.data} authorsF={this.props.authorsF} authorsM={this.props.authorsM} />;
            break;
          case 'waffle':
            return <WaffleChart data={this.props.data} authorsF={this.props.authorsF} authorsM={this.props.authorsM} />;
            break;
          default:
              break;
      }
  }

  shuffleChart = (charts) => {
      this.setState(prevState => {
          let nextChartId = charts.findIndex(c => c === prevState.type) + 1;
          
          nextChartId = nextChartId === charts.length ? 0 : nextChartId;

          return {type: charts[nextChartId]};
      });
  }

  render() {
    return <section className="chart">
            {this.buildChart()}
            {/* {
              this.props.type !== 'bubble' && 
              <button className="chart__shuffleBtn" onClick={() => this.shuffleChart(['pie', 'bar', 'line'])}></button>
            } */}
          </section>;
  }
}

export default Chart;
