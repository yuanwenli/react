import React, { Component } from 'react';
import { Form, Table, Divider, message } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@Form.create()
@connect(({ schoolEvaluation, loading }) => ({
  evaluationClass: schoolEvaluation.evaluationClass,
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
    const { EvaluationId, StartTime, EndTime } = location.query;
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
      EvaluationId,
      StartTime,
      EndTime,
    };
    dispatch({
      type: 'schoolEvaluation/reqCommon',
      service: 'getEvaluationClass',
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
      title: '开放班级',
      dataIndex: 'ClassName',
      key: 'ClassName',
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'Operation',
      render: (record) => (
        <span>
          <a onClick={() => this.handleDetail(record.Id)}>查看详情</a>
          {/*<Divider type="vertical" />*/}
          {/*<a onClick={() => this.handleStatistics(record.Id)}>测评统计</a>*/}
        </span>
      )
    },
  ]

  handleDetail = (id) => {
      router.push(`/school-evaluation/student?ClassEvaluationId=${id}`);
  }

  handleStatistics = (id) => {

  }

  handlePageChange = pagination => {
    const { current } = pagination;
    const { queryPage } = this.state;
    if (current !== queryPage) {
      this.getListData(current);
    }
  };

  handleChose = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'schoolEvaluation/reqCommon',
      service: 'closeClassEvaluation',
      payload: {
        EvaluationClassId: id
      },
      callback: () => {
        message.success('操作成功');
      }
    })
  }

  render() {
    const { evaluationClass } = this.props;
    return (
      <PageHeaderWrapper title="班级列表" back="true">
        <div style={{padding: 20, background: '#fff'}}>
          { evaluationClass && evaluationClass.list?<Table pagination={{total: evaluationClass.pages*10}} columns={this.columns()} rowKey="Id" dataSource={evaluationClass.list} onChange={this.handlePageChange} />:<Table pagination={{total: 0}} columns={this.columns()} dataSource={[]} />}
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default EvaluationClass;
