import React, { Component } from 'react';
import { Select, Spin } from 'antd';
import { connect } from 'dva';
import debounce from 'lodash/debounce';

const Option = Select.Option;

@connect(({ classManage, loading }) => ({
  allParents: classManage.allParents,
  studentParents: classManage.studentParents,
  loading: loading.models.classManage,
}))
class ParentsSelect extends Component {
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
    const { studentId } = this.props;
    this.getStudentParents(studentId);
  }

  getStudentParents(studentId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'classManage/reqCommon',
      service: 'getStudentParents',
      payload: {
        StudentId: studentId,
        Page: 0,
        PageCount: 10
      },
      callback: () => {
        const { studentParents } = this.props;
        const data = [];
        studentParents.map(item => {
          data.push({
            key: item.Id,
            label: `${item.name}`
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
    const { dispatch } = this.props;
    dispatch({
      type: 'classManage/reqCommon',
      service: 'getAllParents',
      payload: {
        Page: 1,
        PageCount: 10,
        Name: value
      },
      callback: () => {
        const { allParents } = this.props;
        this.setState({ data: allParents.list, fetching: false });
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
    const { fetching, data, value } = this.state;
    return (
      <Select
        mode="multiple"
        labelInValue
        value={value}
        placeholder="请输入姓名"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchUser}
        onChange={this.handleChange}
        style={{ width: '100%' }}
      >
        {data && data.map(d => <Option key={d.Id}>{`${d.name}（${d.Id}）`}</Option>)}
      </Select>
    );
  }
}

export default ParentsSelect
