import React, { Component } from 'react';
import { Form, Tabs, Select } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import StudentArchivesList from './StudentArchivesList';
import ClassEvaluationReport from '@/common/ClassEvaluationReport/ClassEvaluationReport';
import ClassActivity from '@/common/ClassActivity/ClassActivity';
import ClassDynamic from './ClassDynamic'
import styles from './ClassReport.less';

const { TabPane } = Tabs;
const { Option } = Select;

@connect(({ messageData }) => ({
  getTeacherClass: messageData.getTeacherClass,
}))
@connect(({ classReport }) => ({
  classReport: classReport.classReport,
}))

@Form.create()
class ClassReport extends Component {

  state = {
    classId: null,
    tabId: 1,
  }

  componentDidMount() {
    this.getTeacherClass();
  }

  getTeacherClass() {
    const { dispatch } = this.props;
    dispatch({
      type: 'messageData/reqCommon',
      service: 'getTeacherClass',
      payload: {},
      callback: () => {
        const { classId } = this.state;
        const { getTeacherClass } = this.props;
        if(classId) {
          this.getListData(classId);
        } else {
          this.getListData(getTeacherClass[0].Id.toString());
        }
      }
    })
  }

  getListData = (data) => {
    const { dispatch } = this.props;
    if(data) {
      dispatch({
        type: 'classReport/reqCommon',
        service: 'getClassReport',
        payload: {
          ClassId: data
        },
      })
    }
  }

  onRef1 = (ref) => {
    this.child1 = ref
  }

  onRef2 = (ref) => {
    this.child2 = ref
  }

  onRef3 = (ref) => {
    this.child3 = ref
  }


  handleChange = (id) => {
    const { tabId } = this.state;
    this.setState({
      classId: id
    })
    this.getListData(id);
    if(tabId === '1') {
      this.child1.getListData(id);
    }
    if(tabId === '3') {
      this.child2.getListData(id);
    }
    if(tabId === '4') {
      this.child3.getListData(id);
    }
  }

  tabChange = (id) => {
    this.setState({
      tabId: id
    })
    if(id === '1') {
      this.child1.getListData(id);
    }
    if(id === '2') {
      this.getListData(id);
    }
    if(id === '3') {
      if(this.child2) {
        this.child2.getListData(id);
      }
    }
    if(id === '4') {
      if(this.Child3) {
        this.child3.getListData(id);
      }
    }
  }

  renderOption = (data) => data ? data.map(item => <Option key={item.ClassId}>{item.ClassName}</Option>) : null;

  render() {
    const { getTeacherClass, classReport } = this.props;
    const { classId } = this.state;
    let defaultClass;
    if(getTeacherClass) {
      defaultClass =  classId || getTeacherClass[0].ClassId.toString();
    }

    return (
      <PageHeaderWrapper title="班级报告">
        <div style={{background: '#fff', padding: '20px'}}>
          <div className={styles.grade}>
            当前班级：
            <Select placeholder="请选择班级" value={defaultClass} style={{ width: 200 }} onChange={this.handleChange}>
              {this.renderOption(getTeacherClass)}
            </Select>
          </div>
          <Tabs defaultActiveKey="1" onChange={this.tabChange} forceRender="true">
            { defaultClass ? <TabPane tab="学生档案" key="1"><StudentArchivesList onRef1={this.onRef1} data={defaultClass} /></TabPane> : '' }
            { classReport ? <TabPane tab="班级测评报告" key="2"><ClassEvaluationReport data={classReport} classId={defaultClass} /></TabPane> : '' }
            <TabPane tab="班级生涯活动" key="3"><ClassActivity onRef2={this.onRef2} classId={defaultClass} /></TabPane>
            <TabPane tab="班级动态" key="4"><ClassDynamic onRef3={this.onRef3} classId={defaultClass} /></TabPane>
          </Tabs>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default ClassReport;
