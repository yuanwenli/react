import React, { Component } from 'react';
import { Form, Table, message } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@Form.create()
@connect(({ schoolEvaluation, loading }) => ({
  classDetail: schoolEvaluation.classDetail,
  loading: loading.models.schoolEvaluation,
}))
class EvaluationClass extends Component {

  state = {
    pageQuery: {},
    queryPage: 0,
  }

  componentDidMount() {
    this.getListData();
  }

  // 初始化表格数据
  getListData(page, queryParam) {
    const { dispatch, location } = this.props;
    const { ClassEvaluationId } = location.query;
    let { pageQuery, queryPage } = this.state;
    if (queryParam) {
      pageQuery = queryParam;
    }
    if (page || page === 0) {
      queryPage = page;
    }
    const param = {
      ...pageQuery,
      Page: queryPage,
      PageCount: 10,
      ClassEvaluationId,
    };
    dispatch({
      type: 'schoolEvaluation/reqCommon',
      service: 'getClassDetail',
      payload: param,
    });
    this.setState({ pageQuery, queryPage });
  }

  columns = () => [
    {
      title: '学生姓名',
      dataIndex: 'UserName',
      key: 'UserName',
    },
    {
      title: '测评总数',
      dataIndex: 'Num',
      key: 'Num',
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'Operation',
      render: (record) => <a onClick={() => this.handleReport(record)}>查看测试报告</a>
    },
  ]

  handleReport = (record) => {
    const { dispatch, classDetail } = this.props;
    dispatch({
      type: 'schoolEvaluation/reqCommon',
      service: 'getStudentExamEvaluation',
      params: {
        StudentId: record.StudentId,
        EvaluationId: classDetail.EvaluationId
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
    const { classDetail } = this.props;
    return (
      <PageHeaderWrapper title="班级详情" back="true">
        <div style={{padding: 20, background: '#fff'}}>
          <p>当前班级：{classDetail ? classDetail.ClassName : ''}</p>
          <p>班级人数：{classDetail ? classDetail.StudnetCount : ''}</p>
          { classDetail && classDetail.StudentData && classDetail.StudentData.list?<Table pagination={{total: classDetail.StudentData.pages*10}} columns={this.columns()} rowKey="StudentId" dataSource={classDetail.StudentData.list} onChange={this.handlePageChange} />:<Table pagination={{total: 0}} columns={this.columns()} dataSource={[]} />}
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default EvaluationClass;
