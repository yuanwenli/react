import React, { Component } from 'react';
import { Form, Input, Upload, Button, message } from 'antd';
import { connect } from 'dva';
import { uploadUrl } from "../../../config";
import ProfessionSelect from './ProfessionSelect';

@Form.create()
@connect(({messageData}) => ({
  getChild: messageData.getChild,
}))
class FamilyAdd extends Component {

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 15 },
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
      <Form layout="horizontal">
        <Form.Item label="亲属名称" {...formItemLayout}>
          {getFieldDecorator('Name', {
            rules: [{ required: true, message: '必填项' }],
          })(
            <Input placeholder="请输入亲属名称" />
          )}
        </Form.Item>
        <Form.Item label="关系" {...formItemLayout}>
          {getFieldDecorator('Option', {
            rules: [{ required: true, message: '必填项' }],
          })(
            <Input placeholder="请输入关系" />
          )}
        </Form.Item>
        <Form.Item label="毕业院校" {...formItemLayout}>
          {getFieldDecorator('ParentSchool', {
            rules: [{ required: false, message: '必填项' }],
          })(
            <Input placeholder="请输入毕业院校" />
          )}
        </Form.Item>
        <Form.Item label="学历" {...formItemLayout}>
          {getFieldDecorator('Education', {
            rules: [{ required: false }],
          })(
            <Input placeholder="请输入学历" />
          )}
        </Form.Item>
        <Form.Item label="职业" {...formItemLayout}>
          {getFieldDecorator('Occupation', {
            rules: [{ required: false }],
          })(
            <ProfessionSelect />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="头像"
        >
          {getFieldDecorator('HeadImg', {
            rules: [{ required: false }],
          })(
            <Upload {...props}>
              <Button>上传亲属头像</Button>
            </Upload>
          )}
        </Form.Item>
      </Form>
    )
  }
}

export default FamilyAdd;
