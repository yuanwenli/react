import React, { Component } from 'react';
import { Form, Input, Radio, Upload, message, Button, Icon } from 'antd';
import { uploadUrl } from "../../../config";

const RadioGroup = Radio.Group;
const { TextArea } = Input;


@Form.create()
class CreditAdd extends Component {
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
        <Form.Item label="课程名称" {...formItemLayout}>
          {getFieldDecorator('VideoName', {
            rules: [{ required: true, message: '必填项' }],
          })(
            <Input placeholder="请输入课程名称" />
          )}
        </Form.Item>
        <Form.Item label="学段" {...formItemLayout}>
          {getFieldDecorator('XueDuan', {
            rules: [{ required: true, message: '必选项' }],
          })(
            <RadioGroup>
              <Radio value={1}>小学</Radio>
              <Radio value={2}>初中</Radio>
              <Radio value={3}>高中</Radio>
            </RadioGroup>
          )}
        </Form.Item>
        <Form.Item label="上传视频" {...formItemLayout}>
          {getFieldDecorator('video', {
            rules: [{ required: true, message: '必填项' }],
          })(
            <Upload {...props}>
              <Button>
                <Icon type="upload" />点击上传
              </Button>
            </Upload>
          )}
        </Form.Item>
        <Form.Item label="描述" {...formItemLayout}>
          {getFieldDecorator('Desc', {
            rules: [{ required: true, message: '必填项' }],
          })(
            <TextArea placeholder="请输入描述" />
          )}
        </Form.Item>
      </Form>
    )
  }
}

export default CreditAdd;
