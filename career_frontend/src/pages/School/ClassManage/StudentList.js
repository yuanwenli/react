import React, { Component } from 'react';
import { Table, Modal, message } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ParentsSelect from "./ParentsSelect";

@connect(({ classManage, loading }) => ({
  studentList: classManage.studentList,
  loading: loading.models.classManage,
}))
class ClassManage extends Component {

  state = {
    pageQuery: {},
    queryPage: 0,
    parentsVisible: false,
    studentId: null,
    selectValue: false
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
    const param = { ...pageQuery, Page: queryPage, PageCount: 10 };
    dispatch({
      type: 'classManage/reqCommon',
      service: 'getStudentList',
      payload: {
        ...param,
        Cid: location.query.classId,
      },
    });
    this.setState({ pageQuery, queryPage });
  }

  columns = () => [
    {
      title: '姓名',
      dataIndex: 'UserName',
      key: 'UserName',
    },
    {
      title: '学号',
      dataIndex: 'UserNumber',
      key: 'UserNumber',
    },
    {
      title: '性别',
      dataIndex: 'Sex',
      key: 'Sex',
      render: record => <span>{record === 1 ? '女' : '男'}</span>
    },
    {
      title: '查看',
      dataIndex: '',
      key: 'check',
      render: record => <span>
        <a onClick={() => this.handleParentsVisible(record.Id)}>家长</a>
      </span>
    }
  ]

  handleParentsVisible = (val) => {
    this.setState({
      studentId: val,
      parentsVisible: true
    })
  }

  handlePageChange = pagination => {
    const { current } = pagination;
    const { queryPage } = this.state;
    if (current !== queryPage) {
      this.getListData(current);
    }
  };

  handleParentsOk = () => {
    const { dispatch } = this.props;
    const { selectValue, studentId } = this.state;
    if(!selectValue) {
      this.setState({
        parentsVisible: false
      })
      return;
    }
    const data = selectValue.map(item => item.key);
    dispatch({
      type: 'classManage/reqCommon',
      service: 'relateParents',
      payload: {
        StudnetUserId: studentId,
        vtwUserId: JSON.stringify(data)
      },
      callback: (data) => {
        this.setState({
          parentsVisible: false
        })
        if(data.data && data.data.SuccessMsg) {
          message.success(data.data.SuccessMsg)
        }
        if(data.data && data.data.ErrorMsg) {
          message.error(data.data.ErrorMsg)
        }
      }
    })
  }

  handleParentsCancel = () => {
    this.setState({
      parentsVisible: false
    })
  }

  changeData = (data) => {
    this.setState({
      selectValue: data
    })
  }

  render() {
    const { studentList } = this.props;
    const { parentsVisible, studentId } = this.state;

    return (
      <PageHeaderWrapper title="学生列表" back="true">
        <div style={{padding: 20, background: '#fff'}}>
          <Modal
            destroyOnClose
            visible={parentsVisible}
            onOk={this.handleParentsOk}
            onCancel={this.handleParentsCancel}
            title="查看家长"
          >
            <ParentsSelect changeData={(value) => this.changeData(value)} studentId={studentId} />
          </Modal>
          { studentList && studentList.list?<Table pagination={{total: studentList.pages*10}} columns={this.columns()} rowKey="Id" dataSource={studentList.list} onChange={this.handlePageChange}/>:<Table pagination={{total: 0}} columns={this.columns()} dataSource={[]} />}
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default ClassManage;
