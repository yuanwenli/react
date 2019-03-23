import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

class HReport extends Component {

  state = {
    report: [],
    tagScore: []
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data) {
      this.setState({
        report: nextProps.data.report,
        tagScore: nextProps.data.tagScore,
      });
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
