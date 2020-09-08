import React, { Component } from 'react';
import { Form } from 'antd';
import ReactEcharts from 'echarts-for-react';

@Form.create()
class HReport extends Component {

  state = {
    y1: null,
    y2: null,
    data1: null,
    data2: null,
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data) {
      const { data } = nextProps;
      const y1 = [];
      const y2 = [];
      const data1 = [];
      const data2 = [];
      if(data) {
        data.tagScore.forEach((item, index) => {
          if (index % 2 === 0) {
            y1.push(item.name)
          } else {
            y2.push(item.name)
          }
        })
        data.report.forEach((item, index) => {
          if (index % 2 === 0) {
            data1.push(-item)
          } else {
            data2.push(item)
          }
        })
        this.setState({
          y1,
          y2,
          data1,
          data2,
        })
      }
    }
  }

  getOption = () => ({
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        show: false,
        max: 12,
        min: -12,
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: this.state.y1,
      },
      {
        type: 'category',
        axisTick: { show: false },
        axisLine: { show: false },
        data: this.state.y2
      }
    ],
    series: [
      {
        name: '收入',
        type: 'bar',
        stack: '总量',
        data: this.state.data1,
        itemStyle: {
          normal: {
            color: '#2e90d1'
          }
        }
      },
      {
        name: '支出',
        type: 'bar',
        stack: '总量',
        data: this.state.data2
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
