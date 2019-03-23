import React, { Component } from 'react';
import { Form, Table, Popconfirm, message } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@Form.create()
@connect(({ schoolEvaluation, loading }) => ({
  classEvaluationList: schoolEvaluation.classEvaluationList,
  loading: loading.models.schoolEvaluation,
}))
class EvaluationDetail extends Component {

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
    let { pageQuery, queryPage } = this.state;
    if (queryParam) {
      pageQuery = queryParam;
    }
    if (page || page === 0) {
      queryPage = page;
    }
    const param = { ...pageQuery, Page: queryPage, PageCount: 10, EvaluationId: location.query.id };
    dispatch({
      type: 'schoolEvaluation/reqCommon',
      service: 'getClassEvaluationList',
      payload: param,
    });
    this.setState({ pageQuery, queryPage });
  }

  columns = () => [
    {
      title: '测评名称',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: '开放时间',
      dataIndex: '',
      key: 'StartTime',
      render: (record) => (<span>{record.StartTime}--{record.EndTime}</span>)
    },
    {
      title: '测评状态',
      dataIndex: 'Type',
      key: 'Type',
      render: (record) => {
        if(record === 1) {
          return <span style={{color: '#52c41a'}}>开放中</span>
        }
        if(record === 2) {
          return <span style={{color: '#f5222d'}}>未开放</span>
        }
        return <span style={{color: '#f5222d'}}>已过期</span>
      }
    },
    {
      title: '开放班级',
      dataIndex: '',
      key: 'ClassNum',
      render: (record) => <span onClick={() => this.handleCheckClass(record)} style={{textDecoration: 'underline', cursor: 'pointer'}}>{record.Type === 1 ? record.ClassNum : ''}</span>
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'Operation',
      render: (record) => <span><Popconfirm title="量表在开放中，是否关闭量表?" onConfirm={() => this.handleChose(record)}><a>{record.Type === 1 ? '关闭量表' : ''}</a></Popconfirm></span>
    },
  ]

  handleCheckClass = (val) => {
    const { location } = this.props;
    router.push(`/school-evaluation/class-detail?EvaluationId=${location.query.id}&StartTime=${val.StartTime}&EndTime=${val.EndTime}`);
  }

  handlePageChange = pagination => {
    const { current } = pagination;
    const { queryPage } = this.state;
    if (current !== queryPage) {
      this.getListData(current);
    }
  };

  handleChose = (val) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'schoolEvaluation/reqCommon',
      service: 'closeGroupEvaluation',
      payload: {
        EvaluationId: val.EvaluationId,
        StartTime: val.StartTime,
        EndTime: val.EndTime,
      },
      callback: () => {
        message.success('操作成功');
        this.getListData();
      }
    })
  }

  render() {
    const { classEvaluationList } = this.props;
    return (
      <PageHeaderWrapper title="查看详情" back="true">
        <div style={{padding: 20, background: '#fff'}}>
          { classEvaluationList && classEvaluationList.list?<Table pagination={{total: classEvaluationList.pages*10}} columns={this.columns()} rowKey="StartTime" dataSource={classEvaluationList.list} onChange={this.handlePageChange} />:<Table pagination={{total: 0}} columns={this.columns()} dataSource={[]} />}
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default EvaluationDetail;
