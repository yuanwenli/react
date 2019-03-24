import React, { Component } from 'react';
import CReport from './CReport';

class CReportDetail extends Component {

  render() {
    const { data } = this.props;
    return (
      data ? (
        <div>
          <h4>如图显示了你当前职业成熟度的得分情况。</h4>
          <CReport data={data.TestData} />
          <h4>从测评结果可以得出,你在职业决策态度方面：</h4>
          {
            data.Conclusion.Code.filter(item => item.State === '1').map((item, index) => <p key={index}>{item.Name}：{item.Msg}</p>)
          }
          <h4>从测评结果可以得出,你在职业决策知识方面：</h4>
          {
            data.Conclusion.Code.filter(item => item.State === '2').map((item, index) => <p key={index}>{item.Name}：{item.Msg}</p>)
          }
          <p>
            { data.Conclusion.Code.filter(item => item.State === '3').Msg }
          </p>
        </div>
      ) : ''
    )
  }
}

export default CReportDetail;
