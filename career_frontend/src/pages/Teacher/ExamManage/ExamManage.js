import React, { Component } from 'react';
import { Form, Select } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ClassEvaluationReport from '@/common/ClassEvaluationReport/ClassEvaluationReport';

const { Option } = Select;

@connect(({ messageData }) => ({
  getTeacherClass: messageData.getTeacherClass,
}))
@connect(({ classReport }) => ({
  classReport: classReport.classReport,
}))
@Form.create()
class ExamManage extends Component {

  state = {
    classId: null,
  }

  componentDidMount() {
    this.getTeacherClass();
  }

  getTeacherClass() {
    const { dispatch } = this.props;
    dispatch({
      type: 'messageData/reqCommon',
      service: 'getTeacherClass',
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


  handleChange = (id) => {
    this.setState({
      classId: id
    })
    this.getListData(id);
  }

  renderOption = (data) => data ? data.map(item => <Option key={item.Id}>{item.ClassName}</Option>) : null;

  render() {

    const { getTeacherClass, classReport } = this.props;
    const { classId } = this.state;
    let defaultClass;
    if(getTeacherClass) {
      defaultClass =  classId || getTeacherClass[0].Id.toString();
    }

    return (
      <PageHeaderWrapper title="班级测评报告">
        <div style={{padding: 20, background: '#fff'}}>
          当前班级：
          <Select placeholder="请选择班级" value={defaultClass} style={{ width: 200 }} onChange={this.handleChange}>
            {this.renderOption(getTeacherClass)}
          </Select>
          {classReport ? <ClassEvaluationReport data={classReport} classId={defaultClass} /> : null}
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default ExamManage;
