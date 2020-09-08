import React, { Component } from 'react';
import { Form, Tabs } from 'antd';
import Evaluation from '@/common/Evaluation/Evaluation';
import Activity from '@/common/Activity/Activity';
import Questionnaire from '@/common/Questionnaire/Questionnaire';
import StudentDetail from '@/pages/Student/Person/PersonDetail';
import AllReport from '@/pages/Student/Exam/AllReport';
import styles from './CareerGrowthRecord.less';

const { TabPane } = Tabs;

@Form.create()
class CareerGrowthRecord extends Component {


  render() {
    const { data } = this.props;

    return (
        data &&
        <div style={{background: '#fff', padding: '20px'}}>
          <div className={styles.message}>
            <img src={data.Photo} alt="" />
            <div style={{marginLeft: 20}}>
              <p>姓名： {data.UserName}</p>
              <p>学校：上海市九亭小学</p>
              <p>入学日期：2018年2月22</p>
              <p>当前学段：高中</p>
            </div>
          </div>
          <Tabs defaultActiveKey="1">
            <TabPane tab="生涯综合评估" key="1"><Evaluation data={data} /></TabPane>
            <TabPane tab="生涯测评报告" key="2"><AllReport data={data} /></TabPane>
            <TabPane tab="生涯活动记录" key="3"><Activity data={data} /></TabPane>
            <TabPane tab="家族树" key="4">家族职业树</TabPane>
            <TabPane tab="问卷调查" key="5"><Questionnaire data={data} /></TabPane>
            <TabPane tab="其他信息" key="6"><StudentDetail data={data} /></TabPane>
          </Tabs>
        </div>
    )
  }
}

export default CareerGrowthRecord
