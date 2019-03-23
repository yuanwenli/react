import React, { Component } from 'react';
import { Table, Tag } from 'antd';
import HReport from './HReport';

class HReportDetail extends Component {

  columns = () => [
    {
      title: '类型',
      dataIndex: 'Name',
      width: 100,
      key: 'Name',
    },
    {
      title: '特征',
      dataIndex: 'Features',
      key: 'Features',
    },{
      title: '偏好的活动或行为',
      dataIndex: 'Behavior',
      key: 'Behavior',
    },
    {
      title: '典型职业',
      dataIndex: 'Option',
      key: 'Option',
    },

  ]

  render() {
    const { data } = this.props;

    return (
      data ? (
        <div>
          <h4>你的霍兰德类型是：{data.Conclusion.ThreeCode}</h4>
          <HReport data={data.TestData} />
          <h4>说明：</h4>
          <p>1、你适合的兴趣范畴在橙色六边形相对集中的区域。</p>
          <p>2、若橙色区域呈正六边形或接近正六边形，在霍兰德常模内属罕见情况，本报告及多边形图可能无效。</p>
          <h4>根据测评结果，你的兴趣类型为：{data.Conclusion.Str.map(item => <Tag key={item.Name} color="#2db7f5">{item.Name}</Tag>)}，其特点和偏好如下：</h4>
          { <Table columns={this.columns()} rowKey="Name" dataSource={data.Conclusion.Str} pagination={false} /> }
        </div>
      ) : ''
    )
  }
}

export default HReportDetail;
