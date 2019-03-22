import React, { Component } from 'react';
import { Form} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ClassActivity from '@/common/ClassActivity/ClassActivity';


@Form.create()
class PClassActivity extends Component {
  render() {
    return (
      <PageHeaderWrapper title="班级生涯活动">
        <div style={{background: '#fff', padding: '20px'}}>
          <ClassActivity />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default PClassActivity;
