import React, { Component } from 'react';
import { Form, Input, Upload, TreeSelect,Button, Select, message } from 'antd';
import { connect } from 'dva';
const { TreeNode } = TreeSelect;
const { SHOW_PARENT } = TreeSelect;


const { TextArea } = Input;
const { Option } = Select;
@connect(({messageData, loading}) => ({
  getTeacherClass: messageData.getTeacherClass,
 
}))
@Form.create()
class AddActivityNotice extends Component{

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

  render() {
    const { form, getTeacherClass } = this.props
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
    const treeData = []
    if (getTeacherClass) getTeacherClass.forEach(item => {
      treeData.push({
        title: item.ClassName,
        value: item.ClassId,
        key: item.ClassId,
        disabled: false
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
    // console.log(getTeacherClass)
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSubmit}>
          <Form.Item
          {...formItemLayout}
          label="活动描述"
        >
          {getFieldDecorator('Notice', {
            rules: [{
              required: true, message: '必填项',
            }],
          })(
            <TextArea />
          )}
        </Form.Item>
        {getTeacherClass ?
          <Form.Item
            {...formItemLayout}
            label="开放班级"
          >
            {getFieldDecorator('Class', {
            rules: [{
              required: true, message: '必选项',
            }]
          })(
            <TreeSelect {...tProps} />
          )}
          </Form.Item> : ''}
      </Form>
    )
  }
}

export default AddActivityNotice;

