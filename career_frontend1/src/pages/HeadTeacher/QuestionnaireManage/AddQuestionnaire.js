import React, { Component, Fragment } from 'react';
import { Card, Steps } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';


const { Step } = Steps;

class AddQuestionnaire extends Component {

  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'step1':
        return 0;
      case 'step2':
        return 1;
      case 'step3':
        return 2;
      default:
        return 0;
    }
  }

  render() {
    const { children } = this.props;
    return (
      <PageHeaderWrapper title='添加问卷'>
        <Card bordered={false} style={{padding: 24}}>
          <Fragment>
            <Steps current={this.getCurrentStep()}>
              <Step title="填写问卷名称" />
              <Step title="添加问卷题目" />
              <Step title="问卷设置" />
            </Steps>
            <div style={{width: '70%', margin: '0 auto', marginTop: '30px',}}>
              {children}
            </div>
          </Fragment>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AddQuestionnaire;
