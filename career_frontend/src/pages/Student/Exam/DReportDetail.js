import React, { Component } from 'react';
import { Table, Tag } from 'antd';
import DReport from './DReport';

class DReportDetail extends Component {

  columns = () => [
    {
      title: '类型',
      dataIndex: 'Name',
      width: 150,
      key: 'Name',
    },
    {
      title: '典型特征',
      dataIndex: 'Str.Features',
      key: 'Features',
    },{
      title: '代表性职业',
      dataIndex: 'Str.Option',
      key: 'Behavior',
    },
  ]

  render() {
    const { data } = this.props;
    return (
      data ? (
        <div>
          <h4>你的多元智能测试得分如下图所示</h4>
          <DReport data={data.TestData} />
          <h4 style={{marginTop: 20}}>从图中可以看出你的优势智力是：{data.Conclusion.ThreeCode.map(item => <Tag key={item.Name} color="#2db7f5">{item.Name}</Tag>)}</h4>
          { <Table columns={this.columns()} rowKey="Name" dataSource={data.Conclusion.ThreeCode} pagination={false} /> }
        </div>
      ) : ''
    )
  }
}

export default DReportDetail;
