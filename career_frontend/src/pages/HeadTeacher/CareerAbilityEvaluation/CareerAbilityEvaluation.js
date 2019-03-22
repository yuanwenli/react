import React, { Component } from 'react';
import { Form, Button, Table, Input } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ ability, loading }) => ({
  teacherAbilityList: ability.teacherAbilityList,
  schoolAbilityList: ability.schoolAbilityList,
  loading: loading.models.ability,
}))
@Form.create()
class CareerAbilityEvaluation extends Component {

  state = {
    pageQuery: {},
    queryPage: 0,
    role: null
  }

  componentDidMount() {
    const name = window.localStorage.getItem('antd-pro-authority')
    if(name && name.slice(2, name.length-2) === 'school') {
      this.getSchoolList(0, {});
      this.setState({
        role: 'school'
      })
    } else {
      this.getListData(0, {});
    }
  }

  // 初始化表格数据
  getSchoolList(page, queryParam) {
    const { dispatch } = this.props;
    let { pageQuery, queryPage } = this.state;
    if (queryParam) {
      pageQuery = queryParam;
    }
    if (page || page === 0) {
      queryPage = page;
    }
    const param = { ...pageQuery, Page: queryPage, PageCount: 10 };
    dispatch({
      type: 'ability/reqCommon',
      service: 'getSchoolAbilityList',
      payload: param,
    });
    this.setState({ pageQuery, queryPage });
  }

  // 初始化表格数据
  getListData(page, queryParam) {
    const { dispatch } = this.props;
    let { pageQuery, queryPage } = this.state;
    if (queryParam) {
      pageQuery = queryParam;
    }
    if (page || page === 0) {
      queryPage = page;
    }
    const param = { ...pageQuery, Page: queryPage, PageCount: 10 };
    dispatch({
      type: 'ability/reqCommon',
      service: 'getTeacherAbilityList',
      payload: param,
    });
    this.setState({ pageQuery, queryPage });
  }

  columns = () => [
    {
      title: '试卷名称',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'option',
      render: record => <a onClick={() => this.handleDetail(record)}>查看详情</a>
    },
  ]

  handleDetail = (val) => {
    const name = window.localStorage.getItem('antd-pro-authority')
    if(name && name.slice(2, name.length-2) === 'teacher') {
      router.push(`/teacher-ability/student?id=${val.TestpaperId}&name=${val.Name}`)
    } else if(name && name.slice(2, name.length-2) === 'headTeacher') {
      router.push(`/career-ability-evaluation/student?id=${val.TestpaperId}&name=${val.Name}`)
    } else {
      router.push(`/school-ability/student?id=${val.TestpaperId}&name=${val.Name}`)
    }

  }


  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  handlePageChange = pagination => {
    const { current } = pagination;
    const { queryPage } = this.state;
    if (current !== queryPage) {
      this.getListData(current);
    }
  }

  renderTable = (data1, data2) => {
    const { role } = this.state;
    const data = role === 'school' ? data2 : data1;
    if(data && data.list) {
      return <Table style={{marginTop: 10}} pagination={{total: data.pages*10}} columns={this.columns()} rowKey="TestpaperId" dataSource={data.list} onChange={this.handlePageChange} />
    }
    return <Table pagination={{total: 0}} columns={this.columns()} dataSource={[]} />
  }

  render() {

    const { teacherAbilityList, schoolAbilityList } = this.props;

    return (
      <PageHeaderWrapper title="生涯能力评估">
        <div style={{background: '#fff', padding: '20px'}}>
          {/* <Form layout="inline">
            <Form.Item>
              <Input placeholder="请输入试卷名称" />
            </Form.Item>
            <Form.Item>
              <Button type="primary">搜索</Button>
            </Form.Item>
          </Form> */}
          {this.renderTable(teacherAbilityList, schoolAbilityList)}
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default CareerAbilityEvaluation;
