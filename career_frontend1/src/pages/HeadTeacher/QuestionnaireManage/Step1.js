import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Input, Button, message } from 'antd';

@connect(({ questionnaireManage, loading }) => ({
  loading: loading.models.questionnaireManage,
}))
@Form.create()
class Step1 extends Component {

  handleNext = () => {
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      dispatch({
        type: 'questionnaireManage/reqCommon',
        service: 'addFirst',
        payload: fieldsValue,
        callback: (res) => {
          if(res.data) {
            message.success('操作成功');
            const name = window.localStorage.getItem('antd-pro-authority')
            if(name && name.slice(2, name.length-2) === 'school') {
              router.push(`/school-questionnaireManage/add/step2?id=${res.data}`)
            }
            if(name && name.slice(2, name.length-2) === 'teacher') {
              router.push(`/teacher-questionnaireManage/add/step2?id=${res.data}`)
            }
            if(name && name.slice(2, name.length-2) === 'headTeacher') {
              router.push(`/questionnaireManage/add/step2?id=${res.data}`)
            }
          }
        }
      });
    });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <Form>
        <Form.Item label="问卷名称" {...formItemLayout}>
          {getFieldDecorator('Name', {
            rules: [{ required: true, message: '必填项' }],
          })(
            <Input placeholder="请输入问卷名称" />
          )}
        </Form.Item>
        <Form.Item wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 16, offset: 4 },
        }}
        >
          <Button type="primary" onClick={this.handleNext}>下一步</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Step1;
