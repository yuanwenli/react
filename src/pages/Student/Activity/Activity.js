import React, { Component } from 'react';
import { Form, Tabs } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Activity from '@/common/Activity/Activity';
import ClassActivity from '@/common/ClassActivity/ClassActivity';
import { connect } from 'dva';

const { TabPane } = Tabs;

@connect(({ studentActivity, loading}) => ({
  activityList: studentActivity.activityList,
  classActivity: studentActivity.classActivity,
  loading: loading.models.studentActivity,
}))
@Form.create()
class StudentActivity extends Component {

  render() {
    return (
      <PageHeaderWrapper title="生涯活动记录">
        <div style={{backgroundColor: '#fff', padding: '0 20px 20px'}}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="我的生涯活动" key="1">
              <Activity />
            </TabPane>
            <TabPane tab="班级生涯活动" key="2">
              <ClassActivity />
            </TabPane>
          </Tabs>
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default StudentActivity;
