import React, { Component } from 'react';
import { Form, Tabs, Select } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { TabPane } = Tabs;
const { Option } = Select;

@Form.create()
class GradeReport extends Component {

  handleChange = () => {

  }

  render() {
    return (
      <PageHeaderWrapper title="班级报告">
        <div style={{background: '#fff', padding: '20px'}}>
          <div>
            当前班级：
            <Select defaultValue="lucy" style={{ width: 200 }} onChange={this.handleChange}>
              <Option value="高一1班">高一1班</Option>
              <Option value="高一2班">高一2班</Option>
              <Option value="高一3班">高一3班</Option>
              <Option value="高一4班">高一4班</Option>
            </Select>
          </div>
          <Tabs defaultActiveKey="1">
            <TabPane tab="学生档案" key="1">学生档案</TabPane>
            <TabPane tab="班级测评报告" key="2">班级测评报告</TabPane>
            <TabPane tab="班级生涯活动" key="3">班级生涯活动</TabPane>
            <TabPane tab="班级动态" key="4">班级动态</TabPane>
          </Tabs>
        </div>

      </PageHeaderWrapper>
    );
  }
}

export default GradeReport;
