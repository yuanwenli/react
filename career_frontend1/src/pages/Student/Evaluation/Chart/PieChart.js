import React, { Component } from 'react';
import { Form } from 'antd';
import ReactEcharts from 'echarts-for-react';

@Form.create()
class PieChart extends Component {

  state = {
    data: null,
    all: 0
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data) {
      const { data } = nextProps;
      let result = 0;
      result = data.ScoreData;
      this.setState({
        all: data.ScoreAll
      })
      if(result) {
        result = result.map(item => ({
          value: item.Score,
          name: `${item.Name}：${item.Score}`
        }))
        this.setState({
          data: result
        })
      }
    }
  }

  getOption = () => {
    const { data, all } = this.state;
    if(data && all) {
      return {
        title: {
          text: `${all}分` || 0,
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: 30
          }
        },
        series : [
          {
            type: 'pie',
            radius: ['35%', '50%'],
            center: ['50%', '50%'],
            data,
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              formatter: '{b}分',
              fontSize: 14,
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
    // 防止页面出现undefined
    return {
      series : [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['50%', '50%'],
          data: [],
          hoverAnimation: false,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

  render() {
    return (
      <ReactEcharts option={this.getOption()} lazyUpdate />
    );
  }
}

export default PieChart;
