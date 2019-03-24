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

  componentDidMount() {
    this.getChild()
  }

  getChild = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'messageData/reqCommon',
      service: 'getChild',
      payload: {},
    });
  }

  render() {
    const { form, defaultValue } = this.props;
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
      defaultFileList: [],
      onChange: (info) => {
        if (info.file.status === 'done') {
          message.success('上传成功');
        } else if (info.file.status === 'error') {
          message.error('上传失败');
        }
      },
    }
    const data = { key: '', label: '' };
    if(!defaultValue) return null;
    // 已有封面，设置默认值
    if(defaultValue.HeadImg){
      props.defaultFileList[0] = {uid: 1, name: defaultValue.HeadImg, url: defaultValue.HeadImg};
    }
    data.key = defaultValue.OccupationId;
    data.label = defaultValue.OccupationName;
    return (
      <Form layout="horizontal">
        <Form.Item label="亲属名称" {...formItemLayout}>
          {getFieldDecorator('Name', {
            rules: [{ required: true, message: '必填项' }],
            initialValue: defaultValue.Name,
          })(
            <Input placeholder="请输入亲属名称" />
          )}
        </Form.Item>
        <Form.Item label="关系" {...formItemLayout}>
          {getFieldDecorator('Option', {
            initialValue: defaultValue.Option,
            rules: [{ required: true, message: '必填项' }],
          })(
            <Input placeholder="请输入关系" />
          )}
        </Form.Item>
        <Form.Item label="毕业院校" {...formItemLayout}>
          {getFieldDecorator('ParentSchool', {
            initialValue: defaultValue.ParentSchool,
            rules: [{ required: false, message: '必填项' }],
          })(
            <Input placeholder="请输入毕业院校" />
          )}
        </Form.Item>
        <Form.Item label="学历" {...formItemLayout}>
          {getFieldDecorator('Education', {
            initialValue: defaultValue.Education,
            rules: [{ required: false }],
          })(
            <Input placeholder="请输入学历" />
          )}
        </Form.Item>
        <Form.Item label="职业" {...formItemLayout}>
          {getFieldDecorator('Occupation', {
            initialValue: { value: data },
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
            initialValue: defaultValue.HeadImg,
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
