import React, { Component } from 'react';
import { Form, Comment, List, Tag, message, Popconfirm, Modal, Input, Select, Upload, Button } from 'antd';
import { connect } from 'dva';
import styles from './Activity.less';
import { uploadUrl } from '../../config';

const { TextArea } = Input;
const { Option } = Select;

@connect(({ studentActivity, loading}) => ({
  activityList: studentActivity.activityList,
  signalActivity: studentActivity.signalActivity,
  loading: loading.models.studentActivity,
}))
@Form.create()
class Activity extends Component {
  state = {
    image: null,
    editId: null,
    editVisible: false,
    visible: false,
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
    const param = { ...pageQuery, Page: queryPage, PageCount: 10, StudentId: window.localStorage.getItem('studentId')};
    dispatch({
      type: 'studentActivity/reqCommon',
      service: 'getMyActivityList',
      payload: param,
    });
    this.setState({ pageQuery, queryPage });
  }

  // 翻页
  handlePageChange = pagination => {
    const { current } = pagination;
    const { queryPage } = this.state;
    if (current !== queryPage) {
      this.getListData(pagination);
    }
  };

  // 显示编辑并请求数据
  handleEditVisible = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'studentActivity/reqCommon',
      service: 'getSignalActivity',
      payload: {
        Id: id
      },
      callback: () => {
        const { signalActivity } = this.props;
        if(signalActivity.Image){
          this.setState({
            image: signalActivity.Image
          })
        }
        this.setState({
          editVisible: true,
          editId: id,
        })
      }
    })
  }

  // 删除
  handleDelete = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'studentActivity/reqCommon',
      service: 'delActivity',
      payload: {
        Id: id,
      },
      callback: () => {
        message.success('操作成功');
        this.getListData(1, {});
      }
    })
  }

  handleEditCancel = () => {
    this.setState({
      editVisible: false,
    })
  }

  // 确认编辑
  handleEditOk = () => {
    const { form, dispatch } = this.props;
    const { image, editId } = this.state;
    const imageData = [];
    form.validateFields((err, fieldsValue) => {
      if(err) return;
      const data = fieldsValue;
      if(!fieldsValue.Image) {
        // 没有上传图片，直接用原值
        data.Image = JSON.stringify(image);
      } else {
        // 上传图片
        fieldsValue.Image.fileList.forEach(item => {
          // 处理已上传图片
          if(item.response) {
            imageData.push(item.response.data.ImgUrl);
          } else {
            // 处理原图
            imageData.push(item.url);
          }
        })
        data.Image = JSON.stringify(imageData);
      }
      if(data.Lable) data.Lable = JSON.stringify(data.Lable);
      data.Id = editId;
      dispatch({
        type: 'studentActivity/reqCommon',
        service: 'editActivity',
        payload: data,
        callback: () => {
          message.success('修改成功');
          this.setState({
            editVisible: false
          })
          form.resetFields();
          this.getListData(1, {});
        }
      })
    })
  }

  // 编辑的form
  renderForm = () => {
    const { form, signalActivity } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const upload = {
      name: 'Images',
      action: `${uploadUrl}/studentInfo/Upload/apiUploadOne`,
      data: {
        Type: 1
      },
      headers: {
        authorization: 'authorization-text',
      },
      onChange: (info) => {
        if (info.file.status === 'done') {
          message.success('上传成功');
        } else if (info.file.status === 'error') {
          message.error('上传失败');
        }
      },
      defaultFileList: [],  // 上传图片默认值
    }
    if(!signalActivity) {
      return null;
    }
    const lable = signalActivity.Lable ? signalActivity.Lable.map(item => item.Id) : '';
    // 已有图片，设置默认值
    if(signalActivity.Image){
      signalActivity.Image.forEach((item, index) => {
        upload.defaultFileList.push({uid: index, name: item, url: item});
      })
    }
    return (
      <Form>
        <Form.Item label="活动名称" {...formItemLayout}>
          {getFieldDecorator('Name', {
            initialValue: signalActivity.ActivityName,
            rules: [{
              required: true, message: '必填项',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="活动内容" {...formItemLayout}>
          {getFieldDecorator('Content', {
            initialValue: signalActivity.Content,
            rules: [{
              required: true, message: '必填项',
            }],
          })(
            <TextArea />
          )}
        </Form.Item>
        <Form.Item label="选择标签" {...formItemLayout}>
          {getFieldDecorator('Lable', {
            initialValue: lable,
            rules: [{
              required: false
            }],
          })(
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="请选择标签"
            >
              <Option value="1">艺术型</Option>
              <Option value="2">现实型</Option>
              <Option value="3">企业型</Option>
              <Option value="4">常规型</Option>
              <Option value="5">研究型</Option>
              <Option value="6">社会型</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="上传图片" {...formItemLayout}>
          {getFieldDecorator('Image', {
            rules: [{
              required: false
            }],
          })(
            <Upload {...upload}>
              <Button>上传图片</Button>
            </Upload>
          )}
        </Form.Item>
      </Form>
    )
  }

  handleOk = () => {
    const { form, dispatch } = this.props;
    form.validateFields((err, fieldsValue) => {
      if(err) return;
      const data = fieldsValue;
      if(data.Image) data.Image = JSON.stringify(data.Image.fileList.map(item => item.response.data.ImgUrl));
      if(data.Lable) data.Lable = JSON.stringify(data.Lable);
      dispatch({
        type: 'studentActivity/reqCommon',
        service: 'addActivity',
        payload: data,
        callback: () => {
          message.success('发布成功');
          this.setState({
            visible: false
          })
          form.resetFields();
          this.getListData(1, {});
        }
      })
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleAddVisible = () => {
    this.setState({
      visible: true
    })
  }

  render() {
    const { activityList, data } = this.props;
    const { visible, editVisible } = this.state;
    const activity = [];
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const upload = {
      name: 'Images',
      action: `${uploadUrl}/studentInfo/Upload/apiUploadOne`,
      data: {
        Type: 1
      },
      headers: {
        authorization: 'authorization-text',
      },
      onChange: (info) => {
        if (info.file.status === 'done') {
          message.success('上传成功');
        } else if (info.file.status === 'error') {
          message.error('上传失败');
        }
      },
    }
    if(activityList && activityList.list) {
      activityList.list.forEach(item => {
        activity.push(Object.assign({}, {
          author: item.StudentName,
          avatar: item.Photo,
          content: (
            <div>
              <h3>{item.ActivityName}</h3>
              <p>{item.Content}</p>
              <div>
                {item.Image ? item.Image.map((img, index) => (
                  <img key={index} src={img} alt="" />
                )) : ''}
              </div>
              <div>
                {item.Lable ? item.Lable.map(label => (
                  label ? <Tag key={label.Id} color="blue">{label.Name}</Tag> : ''
                )) : ''}
              </div>
            </div>
          ),
          datetime: (
            <div className={styles.edit}>
              <span>{item.CreaTime}</span>
              {
                !data &&
                <div>
                  <a onClick={() => this.handleEditVisible(item.Id)}>编辑</a>
                  <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(item.Id)} okText="确定" cancelText="取消">
                    <a className={styles.del}>删除</a>
                  </Popconfirm>
                </div>
              }
            </div>
          ),
        }))
      })
    }
    return (
      <div>
        <Modal
          title="修改动态"
          visible={editVisible}
          onOk={this.handleEditOk}
          okText="发表"
          destroyOnClose
          onCancel={this.handleEditCancel}
        >
          {this.renderForm()}
        </Modal>
        <Modal
          title="发表动态"
          visible={visible}
          onOk={this.handleOk}
          okText="发表"
          destroyOnClose
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item label="活动名称" {...formItemLayout}>
              {getFieldDecorator('Name', {
                rules: [{
                  required: true, message: '必填项',
                }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="活动内容" {...formItemLayout}>
              {getFieldDecorator('Content', {
                rules: [{
                  required: true, message: '必填项',
                }],
              })(
                <TextArea />
              )}
            </Form.Item>
            <Form.Item label="选择标签" {...formItemLayout}>
              {getFieldDecorator('Lable', {
                rules: [{
                  required: false
                }],
              })(
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="请选择标签"
                >
                  <Option value="1">艺术型</Option>
                  <Option value="2">现实型</Option>
                  <Option value="3">企业型</Option>
                  <Option value="4">常规型</Option>
                  <Option value="5">研究型</Option>
                  <Option value="6">社会型</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="上传图片" {...formItemLayout}>
              {getFieldDecorator('Image', {
                rules: [{
                  required: false
                }],
              })(
                <Upload {...upload}>
                  <Button>上传图片</Button>
                </Upload>
              )}
            </Form.Item>
          </Form>
        </Modal>
        {
          !data && <Button type="primary" onClick={this.handleAddVisible}>发表活动</Button>
        }
        {activityList && activity && activityList.list && activityList.list.length > 0 ? <List
          itemLayout="horizontal"
          dataSource={activity}
          pagination={{total: activityList.pages*10, onChange: this.handlePageChange}}
          renderItem={item => (
            <Comment
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          )}
        /> : <List
          itemLayout="horizontal"
          dataSource={[]}
          pagination={{total: 0}}
          renderItem={() => <div />}
        />}
      </div>
    )
  }
}

export default Activity;
