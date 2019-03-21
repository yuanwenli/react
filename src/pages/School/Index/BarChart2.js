import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

class PieChart extends Component {

  state = {
    name: null,
    value: null,
  }

  static getDerivedStateFromProps(nextProps) {
    if(nextProps.data) {
      const { data } = nextProps;
      const name = [];
      const value = [];
      data.forEach(item => {
        if(nextProps.type === 'score') {
          name.push(item.GRADENAME);
        }else {
          name.push(item.Name);
        }
        value.push(item.AverageScore);
      })
      return {
        name,
        value
      }
    }
    return null;
  }

  getOption = () => ({
    color: ['#3398DB'],
    tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      top: '6%',
      left: '3%',
      right: '4%',
      containLabel: true
    },
    label: {
      show: true,
      position: 'top',
    },
    xAxis: {
      type: 'category',
      data: this.state.name
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: this.state.value,
      type: 'bar'
    }]
  })

  render() {
    return (
      <ReactEcharts option={this.getOption()} lazyUpdate />
    );
  }
}

export default PieChart;
