import React, { Component } from 'react';
import { Form } from 'antd';
import ReactEcharts from 'echarts-for-react';

@Form.create()
class PieChart extends Component {

  state = {
    name: null,
    value: null,
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.data) {
      const { data } = nextProps;
      const value = [];
      const name = [];
      if(data) {
        data[0].Data.forEach(item => {
          name.push(item.Name)
        })
        this.setState({
          name
        })
        data.forEach(item => {
          const arr = [];
          item.Data.forEach(array => {
            arr.push(array.Score)
          })
          value.push({
            type: 'bar',
            name: `${item.Year}年`,
            data: arr,
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: '{a}\n{c}分'
              }
            },
          })
        })
        this.setState({
          value
        })
      }
      console.log(value)
    }
  }

  getOption = () => ({
    color: ['#2e90d1', '#59dadc', '#fed54b', '#D1500A'],
    xAxis : [
      {
        type : 'category',
        data : this.state.name
      }
    ],
    yAxis: {},
    series: this.state.value
  })

  render() {
    return (
      <ReactEcharts option={this.getOption()} lazyUpdate />
    );
  }
}

export default PieChart;
