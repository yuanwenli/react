import React, { Component } from 'react';
import { Form } from 'antd';
import ReactEcharts from 'echarts-for-react';

@Form.create()
class HReport extends Component {

  state = {
    name: null,
    score: null
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.data) {
      const { data } = nextProps;
      if(data && data.tagScore) {
        const name = []; const score = [];
        data.tagScore.forEach(item => {
          name.push(item.Name);
          score.push(item.Score);
        })
        this.setState({
          name,
          score
        })
      }
    }
  }

  getOption = () => ({
    color: ['#46b9ff'],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 1]
    },
    yAxis: {
      type: 'category',
      data: this.state.name
    },
    series: [
      {
        name: '2012年',
        type: 'bar',
        data: this.state.score
      }
    ]
  })

  render() {
    const { data } = this.props;
    return (
      data ? <ReactEcharts option={this.getOption()} lazyUpdate /> : ''
    );
  }
}

export default HReport;
