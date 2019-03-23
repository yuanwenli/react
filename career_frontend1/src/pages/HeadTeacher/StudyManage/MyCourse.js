import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Modal, Button, Table, Popconfirm, message } from 'antd';
import CourseAdd from './CourseAdd';

@Form.create()
@connect(({ studyManage }) => ({
  myCourseList: studyManage.myCourseList,
}))
class MyCourse extends Component {

  state = {
    pageQuery: {},
    queryPage: 0,
    visible: false,
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
    const param = { ...pageQuery, Page: queryPage, PageCount: 10 };
    dispatch({
      type: 'studyManage/reqCommon',
      service: 'getMyCourseList',
      payload: param,
    });
    this.setState({ pageQuery, queryPage });
  }

  handleDelete = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'studyManage/reqCommon',
      service: 'delMyCourse',
      payload: {
        Id: id
      },
      callback: () => {
        message.success('操作成功');
      }
    })
  }

  columns = () => [
    {
      title: '课程名称',
      dataIndex: 'VideoName',
      key: 'VideoName',
    },
    {
      title: '上传时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '审核状态',
      dataIndex: 'State',
      key: 'State',
      render: (record) => {
        switch (record) {
          case 1:
            return <span style={{color: '#52c41a'}}>已通过</span>;
          case 2:
            return <span style={{color: 'rgba(0, 0, 0, 0.65)'}}>未审核</span>;
          case 3:
            return <span style={{color: '#f5222d'}}>未通过</span>;
          default:
            return null;
        }
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (record) => (
        <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.Id)} okText="确定" cancelText="取消">
          <a style={{color: '#f5222d'}}>删除</a>
        </Popconfirm>
      ),
    }]

  handlePageChange = pagination => {
    const { current } = pagination;
    const { queryPage } = this.state;
    if (current !== queryPage) {
      this.getListData(current);
    }
  };

  // 增加操作
  handleAdd = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      visible: true,
    });
  }

  // 确认增加
  handleOk = () => {
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const data = {};
      data.VideoName = fieldsValue.VideoName;
      data.Desc = fieldsValue.Desc;
      data.XueDuan = fieldsValue.XueDuan;
      const file = fieldsValue.video.file.response.data;
      data.VideoUrl = file.ImgUrl;
      data.VideoSize = file.size;
      data.PdfUrl = file.PdfUrl;
      dispatch({
        type: 'studyManage/reqCommon',
        service: 'addMyCourse',
        payload: data,
        callback: () => {
          message.success('操作成功');
          this.getListData();
          this.setState({
            visible: false,
          });
        }
      });
    });
  }

  // 取消增加
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { myCourseList, form } = this.props;
    const { visible } = this.state;
    return (
      <div>
        <Modal
          destroyOnClose
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <CourseAdd form={form} />
        </Modal>
        <Button type="primary" onClick={this.handleAdd}>上传课程</Button>
        { myCourseList && myCourseList.list?<Table pagination={{total: myCourseList.pages*10}} columns={this.columns()} rowKey="Id" dataSource={myCourseList.list} onChange={this.handlePageChange} />:<Table pagination={{total: 0}} columns={this.columns()} dataSource={[]} />}
      </div>
    );
  }

}

export default MyCourse;
