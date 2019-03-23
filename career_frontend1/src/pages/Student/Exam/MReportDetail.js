import React, { Component } from 'react';
import MReport from './MReport';

class MReportDetail extends Component {

  render() {
    const { data } = this.props;
    return (
      data ? (
        <div>
          <h4>MBTI倾向图</h4>
          <MReport data={data.TestData} />
          <h4>类型解读</h4>
          <p>{data.Conclusion.Str.Features}</p>
          <h4>适合领域</h4>
          <p>{data.Conclusion.Str.Field}</p>
          <h4>典型职业</h4>
          <p>{data.Conclusion.Str.Option}</p>
          <h4>对你的总体描述</h4>
          <p>{data.Conclusion.Str.Describe}</p>
          <h4>气质类型</h4>
          <p>{data.Conclusion.Str.Style}</p>
        </div>
      ) : ''
    )
  }
}

export default MReportDetail;
