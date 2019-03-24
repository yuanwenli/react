import React, { Component } from 'react';
import { Form,} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Course from '@/common/Course/Course';

@Form.create()
class Study extends Component {
  render() {
    return (
      <PageHeaderWrapper title="在线课程学习">
        <div style={{background: '#fff', padding: '20px'}}>
          <Course />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Study;
