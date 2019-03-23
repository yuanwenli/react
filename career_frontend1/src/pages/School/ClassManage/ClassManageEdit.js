import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import { connect } from 'dva';

const { Option } = Select;
const { TextArea } = Input;

@connect(({ classManage }) => ({
  getGrade: classManage.getGrade,
}))
@Form.create()
class ClassManageAdd extends Component {

  componentDidMount() {
    this.getGrade();
  }

  getGrade(val) {
    const { dispatch } = this.props;
    dispatch({
      type: 'userManage/reqCommon',
      service: 'getGrade',
      payload: {
        XueDuan: val
      }
    })
  }

  renderOption = (grade) => grade && grade.map(item => <Option key={item.Id}>{item.GRADENAME}</Option>)

  handleChange = val => {
    this.getGrade(val);
  }

  render() {
    const { form, getGrade, defaultValue } = this.props;

    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 15 },
    };
    if(!defaultValue) return null;
    return (
      <Form layout="horizontal">
        <Form.Item label="学段" {...formItemLayout}>
          {getFieldDecorator('XueDuan', {
            initialValue: defaultValue.XueDuan.toString(),
            rules: [{ required: true, message: '必填项' }],
          })(
            <Select placeholder="请选择学段" onChange={this.handleChange} style={{ width: 150 }}>
              <Option value="1">小学</Option>
              <Option value="2">初中</Option>
              <Option value="3">高中</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="年级" {...formItemLayout}>
          {getFieldDecorator('GradeinfoId', {
            initialValue: defaultValue.GradeinfoId.toString(),
            rules: [{ required: true, message: '必填项' }],
          })(
            <Select placeholder="请选择年级" style={{ width: 150 }}>
              {this.renderOption(getGrade)}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="类型" {...formItemLayout}>
          {getFieldDecorator('State', {
            initialValue: defaultValue.State.toString(),
            rules: [{ required: true, message: '必填项' }],
          })(
            <Select placeholder="请选择学段" style={{ width: 150 }}>
              <Option value="1">可用</Option>
              <Option value="2">不可用</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="班级号" {...formItemLayout}>
          {getFieldDecorator('gradeClass', {
            initialValue: defaultValue.Id,
            rules: [{ required: true, message: '必填项' }],
          })(
            <Input placeholder="请输入班级号，例如：1" />
          )}
        </Form.Item>
        <Form.Item label="入学时间" {...formItemLayout}>
          {getFieldDecorator('foundTime', {
            initialValue: defaultValue.foundTime,
            rules: [{ required: true, message: '必填项' }],
          })(
            <Input placeholder="请输入入学时间，例如：2019" />
          )}
        </Form.Item>
        <Form.Item label="出校时间" {...formItemLayout}>
          {getFieldDecorator('graduationTime', {
            initialValue: defaultValue.graduationTime,
            rules: [{ required: true, message: '必填项' }],
          })(
            <Input placeholder="请输入出校时间，例如：2020" />
          )}
        </Form.Item>
        <Form.Item label="描述" {...formItemLayout}>
          {getFieldDecorator('Desc', {
            initialValue: defaultValue.Desc,
          })(
            <TextArea placeholder="请输入描述" />
          )}
        </Form.Item>
      </Form>
    )
  }
}

export default ClassManageAdd;
