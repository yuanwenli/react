import React, { Component } from 'react';
import { Select, Spin } from 'antd';
import { connect } from 'dva';
import debounce from 'lodash/debounce';

const { Option }  = Select;

@connect(({ classManage, loading }) => ({
  classTeacher: classManage.classTeacher,
  schoolTeacher: classManage.schoolTeacher,
  loading: loading.models.classManage,
}))
class ClassTeacherSelect extends Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }

  state = {
    data: [],
    value: [],
    fetching: false,
  }

  componentDidMount() {
    const { classId } = this.props;
    this.getClassTeacher(classId);
  }

  getClassTeacher(schoolId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'classManage/reqCommon',
      service: 'getClassTeacher',
      payload: {
        ClassId: schoolId
      },
      callback: () => {
        const { classTeacher } = this.props;
        console.log(classTeacher)
        const data = [];
        const { type } = this.props;
        classTeacher.filter(item => type === 'teacher' ? item.TeacherType === 3 : item.TeacherType === 4).map(item => {
          data.push({
            key: item.Account,
            label: `${item.UserName}（${item.Account}）`
          })
        })
        this.setState({
          value: data
        })
      }
    })
  }

  fetchUser = (value) => {
    this.lastFetchId += 1;
    const { dispatch, schoolId } = this.props;
    dispatch({
      type: 'classManage/reqCommon',
      service: 'getSchoolTeacher',
      payload: {
        Page: 1,
        PageCount: 10,
        SchoolId: schoolId,
        Name: value
      },
      callback: () => {
        const { schoolTeacher } = this.props;
        this.setState({ data: schoolTeacher.list, fetching: false });
      }
    })
    this.setState({ data: [], fetching: true });
  }

  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
    this.props.changeData(value)
  }

  render() {
    const { fetching, value } = this.state;
    const { data } = this.state;
    return (
      <Select
        showSearch
        labelInValue
        value={value}
        placeholder="请输入姓名"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchUser}
        onChange={this.handleChange}
        style={{ width: '100%' }}
      >
        {data && data.map(d => <Option key={d.Account}>{`${d.UserName}（${d.Account}）`}</Option>)}
      </Select>
    );
  }
}

export default ClassTeacherSelect
