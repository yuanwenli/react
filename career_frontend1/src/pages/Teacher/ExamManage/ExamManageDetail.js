import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ classReport }) => ({
  classReportDetail: classReport.classReportDetail,
}))
class ExamManageDetail extends Component {

  componentDidMount() {
    this.getListData()
  }

  columns = () => [
    {
      title: '学生名称',
      dataIndex: 'UserName',
      key: 'UserName',
    },
    {
      title: '性别',
      dataIndex: 'Sex',
      key: 'Sex',
    },
    {
      title: '测评次数',
      dataIndex: 'Count',
      key: 'Count',
    },
    {
      title: '测评时间（分钟）',
      dataIndex: 'Time',
      key: 'Time',
    }
  ]

  getListData = () => {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'classReport/reqCommon',
      service: 'getClassReportDetail',
      payload: {
        ClassId: location.query.classId,
        EvaluationId: location.query.id,
      }
    })
  }

  handlePageChange = pagination => {
    const { current } = pagination;
    const { queryPage } = this.state;
    if (current !== queryPage) {
      this.getListData(current);
    }
  };

  render() {

    const { classReportDetail } = this.props;

    return(
      <PageHeaderWrapper back="true" title="测评详情">
        <div style={{padding: 20, background: '#fff'}}>
          <h4>测评名称：{classReportDetail.EvaluationName}</h4>
          <h4>当前班级：{classReportDetail.ClassName}</h4>
          <h4>已测人数：{classReportDetail.Num}</h4>
          { classReportDetail && classReportDetail.StudentData?<Table pagination={{total: classReportDetail.Num}} columns={this.columns()} rowKey="StudentId" dataSource={classReportDetail.StudentData} onChange={this.handlePageChange} />:<Table pagination={{total: 0}} columns={this.columns()} dataSource={[]} />}
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default ExamManageDetail;
