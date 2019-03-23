import React, { Component } from 'react';
import { Table, Popconfirm, Divider, Button, Modal, Form, message } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FamilyAdd from './FamilyAdd';
import FamilyEdit from './FamilyEdit';

@Form.create()
@connect(({ family }) => ({
  familyList: family.familyList,
  signalFamily: family.signalFamily,
}))
class Family extends Component {

  state = {
    pageQuery: {},
    queryPage: 0,
    visible: false,
    visibleEdit: false,
    editId: null
  }

  componentDidMount() {
    this.getListData(0, {});
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
    const param = { ...pageQuery, Page: queryPage, PageCount: 10, StudentId: window.localStorage.getItem('studentId') };
    dispatch({
      type: 'family/reqCommon',
      service: 'getFamilyList',
      payload: param,
    });
    this.setState({ pageQuery, queryPage });
  }

  columns = () => [
    {
      title: '名字',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: '关系',
      dataIndex: 'Option',
      key: 'Option',
    },
    {
      title: '职业',
      dataIndex: 'OccupationName',
      key: 'OccupationName',
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'option',
      render: record => (
        <span>
          <a style={{color: '#1890FF'}} onClick={() => this.handleEditVisible(record.Id)}>编辑</a>
          <Divider type='vertical' />
          <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.Id)} okText="确定" cancelText="取消">
            <a style={{color: '#f5222d'}}>删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ]

  handleAddVisible = () => {
    this.setState({
      visible: true
    })
  }

  handleAddCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleAdd = () => {
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const data = Object.assign({}, fieldsValue);
      if(fieldsValue.HeadImg)
        data.HeadImg = fieldsValue.HeadImg.fileList[fieldsValue.HeadImg.fileList.length-1].response.data.ImgUrl;
      data.StudentId = window.localStorage.getItem('studentId');
      dispatch({
        type: 'family/reqCommon',
        service: 'addFamily',
        payload: {
          ...data
        },
        callback: () => {
          message.success('添加成功');
          this.setState({
            visible: false
          })
          this.getListData(0, {});
        }
      })
    });
  }

  handleDelete = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'family/reqCommon',
      service: 'delFamily',
      payload: {
        Id: id
      },
      callback: () => {
        message.success('删除成功');
        this.getListData(0, {});
      }
    })
  }

  handleEditVisible = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'family/reqCommon',
      service: 'getSignalFamily',
      payload: {
        Id: id
      },
      callback: () => {
        this.setState({
          visibleEdit: true,
          editId: id
        })
      }
    })

  }

  handleEdit = () => {
    const { dispatch, form } = this.props;
    const { editId } = this.state;
    form.validateFields((err, fieldsValue) => {
      const data = Object.assign({}, fieldsValue);
      // 处理头像
      if(data.HeadImg) {
        if(data.HeadImg.fileList) {
          data.HeadImg = data.HeadImg.fileList[data.HeadImg.fileList.length-1].response.data.ImgUrl
        } else {
          data.HeadImg = data.HeadImg
        }
      }
      data.Id = editId;
      data.StudentId = window.localStorage.getItem('studentId');
      if (data.Occupation.value) {
        data.Occupation = data.Occupation.value.key;
      }
      dispatch({
        type: 'family/reqCommon',
        service: 'editFamily',
        payload: {
          ...data
        },
        callback: () => {
          message.success("修改成功");
          this.setState({
            visibleEdit: false
          })
          this.getListData(0, {});
        }
      })
    })

  }

  handleEditCancel = () => {
    this.setState({
      visibleEdit: false
    })
  }

  render() {
    const { familyList, form, signalFamily } = this.props;
    const { visible, visibleEdit } = this.state;

    return (
      <PageHeaderWrapper title="家族职业树">
        <div style={{background: '#fff', padding: 20}}>
          <Modal
            width="660px"
            title="添加"
            destroyOnClose
            visible={visible}
            onOk={this.handleAdd}
            onCancel={this.handleAddCancel}
          >
            <FamilyAdd form={form} />
          </Modal>
          <Modal
            width="660px"
            title="添加"
            destroyOnClose
            visible={visibleEdit}
            onOk={this.handleEdit}
            onCancel={this.handleEditCancel}
          >
            <FamilyEdit form={form} defaultValue={signalFamily} />
          </Modal>
          <Button style={{marginBottom: 10}} type='primary' onClick={this.handleAddVisible}>添加家族成员</Button>
          { familyList && familyList.list?<Table pagination={{total: familyList.pages*10}} columns={this.columns()} rowKey="Id" dataSource={familyList.list} onChange={this.handlePageChange} />:<Table pagination={{total: 0}} columns={this.columns()} dataSource={[]} />}
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Family;
