import React, { Component } from 'react';
import { Form } from 'antd';
import ReactEcharts from 'echarts-for-react';

@Form.create()
class HReport extends Component {

  state = {
    report: [],
    tagScore: []
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data) {
      const { data } = nextProps;
      if(data) {
        const tagScore = [];
        data.tagScore.forEach(item => {
          tagScore.push({ name: `${item.name}（${item.score}）`, max: item.score})
        })
        this.setState({
          report: data.report,
          tagScore,
        })
      }
    }
  }

  getOption = () => ({
    radar: {
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: this.state.tagScore
    },
    series: [{
      name: '',
      type: 'radar',
      data : [
        {
          value : this.state.report,
          label: {
            normal: {
              show: true,
              formatter(params) {
                return params.report;
              }
            }
          }
        },
      ]
    }]
  })

  render() {
    const { data } = this.props;
    return (
      data ? <ReactEcharts option={this.getOption()} lazyUpdate /> : ''
    );
  }
}

export default HReport;
