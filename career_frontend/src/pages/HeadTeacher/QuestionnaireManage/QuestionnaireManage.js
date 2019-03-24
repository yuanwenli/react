import React, { Component } from 'react';
import { Form, Button, Table, Popconfirm, Divider, message, Input, Select, Modal, Radio } from 'antd';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import styles from './Step2.less';

const { Option } = Select;
const RadioGroup = Radio.Group;

@connect(({ questionnaireManage }) => ({
  questionnaireList: questionnaireManage.questionnaireList,
  preview: questionnaireManage.preview,
}))
@Form.create()
class QuestionnaireManage extends Component {

  state = {
    pageQuery: {},
    queryPage: 0,
    name: null,
    role: null,
    state: null,
    visible: false,
  }

  componentDidMount() {
    this.getListData(0, {});
  }

  // 初始化表格数据
  getListData(page, queryParam) {
    const { dispatch } = this.props;
    let { pageQuery, queryPage} = this.state;
    const { name, role, state } = this.state;
    if (queryParam) {
      pageQuery = queryParam;
    }
    if (page || page === 0) {
      queryPage = page;
    }
    const param = { ...pageQuery, Page: queryPage, PageCount: 10, Source: role, Type: state, Name: name };
    dispatch({
      type: 'questionnaireManage/reqCommon',
      service: 'questionnaireList',
      payload: param,
    });
    this.setState({ pageQuery, queryPage });
  }

  columns = () => [
    {
      title: '问卷名称',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: '开始时间',
      dataIndex: 'StartTime',
      key: 'StartTime',
    },
    {
      title: '结束时间',
      dataIndex: 'EndTime',
      key: 'EndTime',
    },
    {
      title: '创建者',
      dataIndex: 'CreateType',
      key: 'CreateType',
    },
    {
      title: '发放人数',
      dataIndex: 'GrantNum',
      key: 'GrantNum',
    },
    {
      title: '参加人数',
      dataIndex: 'JoinNum',
      key: 'JoinNum',
    },
    {
      title: '状态',
      dataIndex: 'State',
      key: 'State',
      render: record => {
        let data;
        switch(record) {
          case 1:
            data = '开放';
            break;
          case 2:
            data = '关闭';
            break;
          case 3:
            data = '可修改';
            break;
          case 4:
            data = '已删除';
            break;
          case 5:
            data = '已过期';
            break;
          default:
            data = '';
            break;
        }
        return <span>{data}</span>
      }
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'option',
      render: record => {
        const title = record.State === 1 ? '确认关闭问卷' : '确认开放问卷';
        return (
          <span>
            <Popconfirm title={title} onConfirm={() => this.handleOpen(record)} okText="确定" cancelText="取消">
              <a>{record.State === 1 ? '关闭问卷' : '开放问卷'}</a>
            </Popconfirm>
            <Divider type="vertical" />
            <a onClick={() => this.handlePreview(record.Id)}>预览问卷</a>
            {record.State === 3 ? <Divider type="vertical" /> : null}
            <a onClick={() => this.handleEdit(record)}>{record.State === 3 ? '编辑' : ''}</a>
            {record.Operation === 1 ?  <Divider type="vertical" /> : null}
            {record.Operation === 1 ?
              <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.Id)} okText="确定" cancelText="取消">
                <a style={{color: '#f5222d'}}>删除</a>
              </Popconfirm>
              : null}
          </span>
        )
      },
    },
  ]

  handlePreview = (id) => {
    this.setState({
      visible: true
    })
    const { dispatch } = this.props;
    dispatch({
      type: 'questionnaireManage/reqCommon',
      service: 'preview',
      payload: {
        Id: id,
      },
    });
  }

  handlePageChange = pagination => {
    const { current } = pagination;
    const { queryPage } = this.state;
    if (current !== queryPage) {
      this.getListData(current);
    }
  };

  handleAdd = () => {
    const name = window.localStorage.getItem('antd-pro-authority');
    console.log(name)
    if(name && name.slice(2, name.length-2) === 'teacher') {
      router.push('/teacher-questionnaireManage/add');
    }
    if(name && name.slice(2, name.length-2) === 'headTeacher') {
      router.push('/headTeacher-questionnaireManage/add');
    }
    if(name && name.slice(2, name.length-2) === 'school') {
      router.push('/school-questionnaireManage/add');
    }
  }

  handleDelete = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'questionnaireManage/reqCommon',
      service: 'delQuestionnaire',
      payload: {
        Id: id
      },
      callback: () => {
        message.success('操作成功');
      }
    })
  }

  handleEdit = (val) => {
    router.push(`/questionnaireManage/add/step2?id=${val.Id}&isEdit=1`)
  }

  handleOpen = (val) => {
    const { dispatch } = this.props;
    const state = val.State === 1 ? 2 : 1;
    dispatch({
      type: 'questionnaireManage/reqCommon',
      service: 'openQuestionnaire',
      payload: {
        Id: val.Id,
        State: state
      },
      callback: () => {
        message.success('操作成功');
        this.getListData(0, {});
      }
    })
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleRoleChange = (value) => {
    this.setState({
      role: value
    })
  }

  handleStateChange = (value) => {
    this.setState({
      state: value
    })
  }

  handleSearch = () => {
    this.getListData(0, {})
  }

  handleReset = () => {
    this.setState({
      name: '',
      role: '',
      state: ''
    }, () => {
      this.getListData(0, {})
    })
  }


  handleOk = () => {
    this.setState({
      visible: false
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  // 预览题目
  renderTitle = (preview) => {
    if(preview && preview.subject) {
      return preview.subject.map((item, index) =>
        <div key={index} className={styles.list}>
          <p>{index+1}、{item.Title}</p>
          <RadioGroup>
            {item.Option.map((option, index) => <Radio value={option} key={index}>{option}</Radio>)}
          </RadioGroup>
        </div>
      )
    }
    return null;
  }

  render() {
    const { questionnaireList, preview } = this.props;
    const { name, state, role, visible } = this.state;
    return (
      <PageHeaderWrapper title="问卷">
          {preview?
            (
              <Modal
                title={preview.info.Name}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确定"
                cancelText="取消"
                width="800px"
              >
                <p>问卷名称：{preview.info.Name}</p>
                <p>开始时间：{preview.info.StartTime}</p>
                <p>结束时间：{preview.info.EndTime}</p>
                <p>开放班级：{preview.info.ClassName}</p>
                <Divider />
                {this.renderTitle(preview)}
              </Modal>
            )
            :''}
        <div style={{background: '#fff', padding: '20px'}}>
          <div style={{marginBottom: 10}}>
            <Input value={name} onChange={this.handleNameChange} placeholder='请输入问卷名称' style={{width: 120, marginRight: 10}} />
            <Select value={role} onChange={this.handleRoleChange} style={{ width: 120, marginRight: 10 }} placeholder="请选择角色">
              <Option value="0">全部</Option>
              <Option value="3">老师</Option>
              <Option value="4">班主任</Option>
              <Option value="5">校级管理员</Option>
              <Option value="6">区级管理员</Option>
              <Option value="7">超级管理员</Option>
            </Select>
            <Select value={state} onChange={this.handleStateChange} style={{ width: 120, marginRight: 10 }} placeholder="请选择状态">
              <Option value="1">开放中的</Option>
              <Option value="2">已过期的</Option>
              <Option value="3">待发布</Option>
            </Select>
            <Button style={{ marginRight: 10 }} type="primary" onClick={this.handleSearch}>搜索</Button>
            <Button style={{ marginRight: 10 }} type="primary" onClick={this.handleReset}>重置</Button>
            <Button style={{ marginRight: 10 }} type="primary" onClick={this.handleAdd}>添加问卷</Button>
          </div>
          { questionnaireList && questionnaireList.list?<Table pagination={{total: questionnaireList.pages*10}} columns={this.columns()} rowKey="Id" dataSource={questionnaireList.list} onChange={this.handlePageChange} />:<Table pagination={{total: 0}} columns={this.columns()} dataSource={[]} />}
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default QuestionnaireManage;
