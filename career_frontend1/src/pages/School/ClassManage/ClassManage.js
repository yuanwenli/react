import React, { Component } from 'react';
import { Form, Table, Modal, message, Popconfirm, Divider, Switch } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ClassTeacherSelect from './ClassTeacherSelect';

@connect(({ classManage, loading }) => ({
  getClass: classManage.getClass,
  signalClass: classManage.signalClass,
  loading: loading.models.classManage,
}))
@Form.create()
class ClassManage extends Component {

  state = {
    pageQuery: {},
    queryPage: 0,
    editId: null,
    role: null,
    teacherVisible: false,
    classId: null,
    type: null,
    selectValue: null,
  }

  componentDidMount() {
    const name = window.localStorage.getItem('antd-pro-authority')
    if(name && name.slice(2, name.length-2) === 'admin') {
      this.setState({
        role: 'admin'
      })
    } else {
      this.setState({
        role: 'district'
      })
    }

    this.getListData();
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
      type: 'classManage/reqCommon',
      service: 'getClass',
      payload: {
        ...param,
      },
    });
    this.setState({ pageQuery, queryPage });
  }

  columns = () => [
    {
      title: '班级名称',
      dataIndex: 'ClassName',
      key: 'ClassName',
    },
    {
      title: '学生人数',
      dataIndex: 'StudnetNum',
      key: 'StudnetNum',
    },
    {
      title: '家长人数',
      dataIndex: 'ParentNum',
      key: 'ParentNum',
    },
    {
      title: '学段',
      dataIndex: 'XueDuan',
      key: 'XueDuan',
      render: record => {
        switch (record) {
          case 1:
            return <span>小学</span>;
          case 2:
            return <span>初中</span>;
          case 3:
            return <span>高中</span>;
          default:
            return null;
        }
      }
    },
    {
      title: '是否可用此系统',
      dataIndex: 'State',
      key: 'State',
      render: (record) => <span>{record === 1 ? '可用' : '不可用'}</span>
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'Operate',
      render: record => {
        return (
          <span>
            <Popconfirm title={record.State === 1 ? '确认关闭吗？' : '确认开启吗？'} onConfirm={() => this.onChangeStatus(record)} okText="确定" cancelText="取消">
              <Switch checked={record.State === 1} />
            </Popconfirm>
          </span>
        )
      },
    },
    {
      title: '查看',
      dataIndex: '',
      key: 'check',
      render: (record) => {
        return (
          <span>
            <a onClick={() => this.handleStudent(record.Id)}>查看学生</a>
            <Divider type='vertical' />
            <a onClick={() => this.handleTeacher(record.Id)}>生涯老师</a>
            <Divider type='vertical' />
            <a onClick={() => this.handleHeadTeacher(record.Id)}>班主任</a>
          </span>
        )
      }
    },
  ]

  handleTeacher = (val) => {
    this.setState({
      teacherVisible: true,
      classId: val,
      type: 'teacher'
    })
  }

  handleHeadTeacher = (val) => {
    this.setState({
      teacherVisible: true,
      classId: val,
      type: 'headTeacher'
    })
  }

  handleStudent = (val) => {
    router.push(`/class-manage/student?classId=${val}`);
  }

  onChangeStatus = (val) => {
    const { dispatch } = this.props;
    const state = val.State === 1 ? 2 : 1;
    dispatch({
      type: 'classManage/reqCommon',
      service: 'chooseClass',
      payload: {
        ClassId: val.Id,
        State: state
      },
      callback: () => {
        message.success('操作成功');
        this.getListData();
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

  handleTeacherCancel = () => {
    this.setState({
      teacherVisible: false
    })
  }

  handleTeacherOk = () => {
    const { dispatch } = this.props;
    const { selectValue, type, classId } = this.state;
    if(!selectValue) {
      this.setState({
        teacherVisible: false
      })
      return;
    }
    dispatch({
      type: 'classManage/reqCommon',
      service: 'chooseClassTeacher',
      payload: {
        Type: type === 'teacher' ? 3 : 4,
        ClassId: classId,
        Account: selectValue.key
      },
      callback: () => {
        this.setState({
          teacherVisible: false
        })
      }
    })
  }

  changeData = (data) => {
    this.setState({
      selectValue: data
    })
  }

  render() {
    const { getClass, location } = this.props;
    const { teacherVisible, classId, type } = this.state;
    return (
      <PageHeaderWrapper title="班级管理">
        <Modal
          destroyOnClose
          visible={teacherVisible}
          onOk={this.handleTeacherOk}
          onCancel={this.handleTeacherCancel}
          title={type === 'teacher' ? '查看生涯老师' : '查看班主任'}
        >
          <ClassTeacherSelect type={type} changeData={(value) => this.changeData(value)} classId={classId} schoolId={location.query.id} />
        </Modal>
        <div style={{padding: 20, background: '#fff'}}>
          { getClass && getClass.list?<Table pagination={{total: getClass.pages*10}} columns={this.columns()} rowKey="Id" dataSource={getClass.list} onChange={this.handlePageChange} />:<Table pagination={{total: 0}} columns={this.columns()} dataSource={[]} />}
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default ClassManage;
