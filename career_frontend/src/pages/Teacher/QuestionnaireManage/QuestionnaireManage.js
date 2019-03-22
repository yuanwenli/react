import React, { Component } from 'react';
import { Form } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@Form.create()
class QuestionnaireManage extends Component {
  render() {
    return (
      <PageHeaderWrapper title="问卷调查管理"></PageHeaderWrapper>
    );
  }
}

export default QuestionnaireManage;
