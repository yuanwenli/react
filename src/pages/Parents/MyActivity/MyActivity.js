import React, { Component } from 'react';
import { Form } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Activity from '@/common/Activity/Activity';

@Form.create()
class MyActivity extends Component {
  render() {
    return (
      <PageHeaderWrapper title="我的生涯活动">
        <div style={{background: '#fff', padding: '20px'}}>
          <Activity />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default MyActivity;
