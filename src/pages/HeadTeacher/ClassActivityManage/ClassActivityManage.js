import React, { Component } from 'react';
import { Form, Input, Button, Table, Divider, Modal, message, Popconfirm } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import CreateActivity from './CreateActivity';
import EditActivity from './EditActivity';

@connect(({ classActivityManage, loading }) => ({
  classActivityList: classActivityManage.classActivityList,
  signalActivity: classActivityManage.signalActivity,
  loading: loading.models.classActivityManage,
}))
@Form.create()
class ClassActivityManage extends Component {

  state = {
    visible: false,
    editVisible: false,
    editId: null,
  };

  componentDidMount() {
    this.getListData(1, {});
  }

  // 初始化数据
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
      type: 'classActivityManage/reqCommon',
      service: 'getClassActivityList',
      payload: param,
    });
    this.setState({ pageQuery, queryPage });
  }

  columns = () => [
    {
      title: '活动名称',
      dataIndex: 'ActivityName',
      key: 'ActivityName',
    },
    {
      title: '活动时间',
      dataIndex: '',
      key: 'CreaTime',
      render: (record) => (
        <span>{record.StartTime}——{record.EndTime}</span>
      )
    },
    {
      title: '班级管理',
      dataIndex: 'ClassJson',
      key: 'ClassJson',
      render: (record) => (
        record.map(item => (
          <span key={item.Id+item.Type}>{item.Name}</span>
        ))
      ),
    },
    {
      title: '状态',
      dataIndex: 'Type',
      key: 'Type',
      render: (record) => {
        if(record === 1) {
          return <span>开放中</span>
        }
        if(record === 2) {
          return <span>未开放</span>
        }
        if(record === 3) {
          return <span>已关闭</span>
        }
        return <span>已过期</span>
      }
    },
    {
    title: '操作',
    key: 'action',
    render: (record) => (
      <span>
        <a onClick={() => this.handleEditVisible(record.Id)}>编辑</a>
        <Divider type="vertical" />
        {record.Type === 2 || record.Type === 3 ? <a onClick={() => this.handleOpen(record)}>开启活动<Divider type="vertical" /></a> : (record.Type === 1 ? <a onClick={() => this.handleOpen(record)}>关闭活动<Divider type="vertical" /></a> : '')}
        <Popconfirm title="确认删除吗?" onConfirm={() => this.handleDelete(record.Id)} okText="确定" cancelText="取消">
          <a style={{color: '#f5222d'}}>删除</a>
        </Popconfirm>
      </span>
    ),
  }];

  handleOpen = (val) => {
    const { dispatch } = this.props;
    const type = val.Type === 2 || val.Type === 3 ? '1' : '2';
    dispatch({
      type: 'classActivityManage/reqCommon',
      service: 'openActivity',
      payload: {
        Id: val.Id,
        Type: type,
      },
      callback: () => {
        this.getListData(1, {});
      }
    })
  }

  handleDelete = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'classActivityManage/reqCommon',
      service: 'delActivity',
      payload: {
        Id: id
      },
      callback: () => {
        message.success('操作成功');
        this.getListData(1, {});
      }
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleOk = () => {
    const { form, dispatch } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const { Time, ActivityName, Content, Cover, Lable, ClassJson, Image } = fieldsValue;
      const data = { StartTime: null, EndTime: null};
      data.ActivityName = ActivityName;
      data.Content = Content;
      data.Lable = JSON.stringify(Lable);
      data.ClassJson = [];
      if(Cover) {
        data.Cover = Cover.fileList[0].response.data.ImgUrl;
      }
      if(Time) {
        data.StartTime = moment(Time[0]).format('YYYY-MM-DD HH:mm:ss');
        data.EndTime = moment(Time[1]).format('YYYY-MM-DD HH:mm:ss');
      }
      ClassJson.forEach(item => {
        data.ClassJson.push({Id: item.substr(0, item.length-1), Type: item.substr(item.length-1,1)});
      })
      data.ClassJson = JSON.stringify(data.ClassJson);
      if(Image) data.Image = JSON.stringify(Image.fileList.map(item => item.response.data.ImgUrl));
      dispatch({
        type: 'classActivityManage/reqCommon',
        service: 'addClassActivity',
        payload: data,
        callback: () => {
          message.success('操作成功');
          this.setState({
            visible: false
          })
          this.getListData(1, {});
        }
      });
    });
  };

  handleEditVisible = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'classActivityManage/reqCommon',
      service: 'getSignalActivity',
      payload: {
        Id: id
      },
      callback: () => {
        this.setState({
          editVisible: true,
          editId: id,
        })
      }
    })
  }

  handleEditOk = () => {
    const { form, dispatch } = this.props;
    const { editId } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const { Time, ActivityName, Content, Cover, Lable, ClassJson, Image } = fieldsValue;
      const data = { StartTime: null, EndTime: null};
      const imageData = [];
      data.ActivityName = ActivityName;
      data.Content = Content;
      data.Lable = JSON.stringify(Lable);
      data.ClassJson = [];
      data.Id = editId;
      // 处理封面
      if(Cover) {
        if(Cover.fileList) {
          data.Cover = Cover.fileList[Cover.fileList.length-1].response.data.ImgUrl
        } else {
          data.Cover = Cover
        }
      }
      // 时间转换
      if(Time) {
        data.StartTime = moment(Time[0]).format('YYYY-MM-DD HH:mm:ss');
        data.EndTime = moment(Time[1]).format('YYYY-MM-DD HH:mm:ss');
      }
      // 处理图片
      if(Image) {
        if(Image.fileList) {
          Image.fileList.forEach(item => {
            // 处理已上传图片
            if(item.response) {
              imageData.push(item.response.data.ImgUrl);
            } else {
              // 处理原图
              imageData.push(item.url);
            }
          })
          data.Image = JSON.stringify(imageData);
        } else {
          data.Image = Image
        }
      }
      // 处理开放班级
      ClassJson.forEach(item => {
        data.ClassJson.push({Id: item.substr(0, item.length-1), Type: item.substr(item.length-1,1)});
      })
      data.ClassJson = JSON.stringify(data.ClassJson);
      dispatch({
        type: 'classActivityManage/reqCommon',
        service: 'editActivity',
        payload: data,
        callback: () => {
          message.success('操作成功');
          this.setState({
            editVisible: false
          })
          this.getListData(1, {});
        }
      });
    })
  }

  handleEditCancel = () => {
    this.setState({
      editVisible: false
    })
  }

  render() {
    const { classActivityList, form, signalActivity } = this.props;
    const { visible, editVisible } = this.state;
    return (
      <PageHeaderWrapper title="班级活动管理">
        <Modal
          title="新建生涯活动"
          visible={visible}
          destroyOnClose
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={false}
        >
          <CreateActivity form={form} />
        </Modal>
        <Modal
          title="修改生涯活动"
          visible={editVisible}
          destroyOnClose
          onOk={this.handleEditOk}
          onCancel={this.handleEditCancel}
          maskClosable={false}
        >
          <EditActivity defaultValue={signalActivity} form={form} />
        </Modal>
        <div style={{ background: '#fff', padding: '20px' }}>
          <Form layout="inline">
            <Form.Item>
              <Input placeholder="请输入学生姓名" />
            </Form.Item>
            <Form.Item>
              <Button type="primary">搜索</Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={this.showModal}>新建生涯活动</Button>
            </Form.Item>
          </Form>
          {classActivityList && classActivityList.list ?
            <Table
              style={{ marginTop: '20px' }}
              columns={this.columns()}
              rowKey="Id"
              pagination={{ total: classActivityList.pages * 10 }}
              dataSource={classActivityList.list}
            />
            : ''}
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default ClassActivityManage;
