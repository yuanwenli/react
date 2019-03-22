import React, { Component } from 'react';
import { Form } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Questionnaire from '@/common/Questionnaire/Questionnaire';

@Form.create()
class SQuestionnaire extends Component {

  render() {

    return (
      <PageHeaderWrapper title="问卷调查">
        <Questionnaire />
      </PageHeaderWrapper>
    );
  }
}

export default SQuestionnaire;
