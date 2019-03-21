import React, { Component } from 'react';
import { Form, Input, DatePicker, Upload, Button, Select, message, TreeSelect } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import { uploadUrl } from "../../../config";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;
const { TreeNode } = TreeSelect;
const { SHOW_PARENT } = TreeSelect;

@connect(({messageData, loading}) => ({
  getTeacherClass: messageData.getTeacherClass,
  loading: loading.models.messageData,
}))
@Form.create()
class CreateActivity extends Component{

  componentDidMount() {
    this.getTeacherClass()
  }

  getTeacherClass() {
    const { dispatch } = this.props;
    dispatch({
      type: 'messageData/reqCommon',
      service: 'getTeacherClass',
    })
  }

  disabledDate = (current) => {
    return current && current <= moment().subtract(1, "days")
  };

  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} dataRef={item} />;
  })

  onChange = (value) => {
    console.log(value)
  }

  render() {
    const { form, getTeacherClass } = this.props;
    const treeData = []
    if (getTeacherClass) getTeacherClass.forEach(item => {
      treeData.push({
        title: item.ClassName,
        value: item.ClassId,
        key: item.ClassId,
        disabled: true,
        children: [{title: `${item.ClassName}学生`,value: `${item.ClassId}A`, key: `${item.ClassName}学生`}, {title: `${item.ClassName}家长`,value: `${item.ClassId}B`, key: `${item.ClassName}家长2`}, {title: `${item.ClassName}学生和家长`,value: `${item.ClassId}C`, key: `${item.ClassName}学生和家长3`}]
      })
    })
    const tProps = {
      treeData,
      style:{ width: 350 },
      placeholder: "请选择班级",
      allowClear: true,
      multiple: true,
      treeCheckable: true,
      showCheckedStrategy:SHOW_PARENT,
      onChange: this.onChange
    };
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    const props = {
      name: 'Images',
      action: `${uploadUrl}/studentInfo/Upload/apiUploadOne`,
      data: {
        Type: 2
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
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          {...formItemLayout}
          label="活动名称"
        >
          {getFieldDecorator('ActivityName', {
            rules: [{
              required: true, message: '必填项',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="活动描述"
        >
          {getFieldDecorator('Content', {
            rules: [{
              required: true, message: '必填项',
            }],
          })(
            <TextArea />
          )}
        </Form.Item>
        {treeData ?
          <Form.Item
            {...formItemLayout}
            label="开放班级"
          >
            {getFieldDecorator('ClassJson', {
            rules: [{
              required: true, message: '必选项',
            }]
          })(
            <TreeSelect {...tProps} />
          )}
          </Form.Item> : ''}
        <Form.Item
          {...formItemLayout}
          label="选择活动标签"
        >
          {getFieldDecorator('Lable', {
            rules: [{
              required: true, message: '必选项',
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
        <Form.Item
          {...formItemLayout}
          label="活动时间"
        >
          {getFieldDecorator('Time')(
            <RangePicker
              format="YYYY-MM-DD HH:mm:ss"
              disabledDate={this.disabledDate}
              showTime={{
              hideDisabledOptions: true,
              defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
            }}
            />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="活动封面"
        >
          {getFieldDecorator('Cover')(
            <Upload {...props}>
              <Button>上传活动封面</Button>
            </Upload>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="活动图片"
        >
          {getFieldDecorator('Image')(
            <Upload {...props}>
              <Button>上传活动图片</Button>
            </Upload>
          )}
        </Form.Item>
      </Form>
    )
  }
}

export default CreateActivity;
