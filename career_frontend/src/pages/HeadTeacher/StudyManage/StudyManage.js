import React, { Component } from 'react';
import { Form, Tabs } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import MyCourse from './MyCourse';
import Course from '@/common/Course/Course'

const { TabPane } = Tabs;

@Form.create()
class StudyManage extends Component {
  render() {
    return (
      <PageHeaderWrapper title="在线学习课程">
        <div style={{background: '#fff', padding: '20px'}}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="全部课程" key="1"><Course /></TabPane>
            <TabPane tab="我的课程" key="2"><MyCourse /></TabPane>
          </Tabs>
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default StudyManage;
