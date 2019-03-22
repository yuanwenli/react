import React, { Component } from 'react';
import { Select, Spin } from 'antd';
import { connect } from 'dva';
import debounce from 'lodash/debounce';

const { Option } = Select;

@connect(({ professionSchool, loading }) => ({
  profession: professionSchool.profession,
  loading: loading.models.professionSchool,
}))
class ProfessionSelect extends Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }

  state = {
    data: null,
    value: [],
    fetching: false,
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  fetchUser = (value) => {
    this.lastFetchId += 1;
    const { dispatch } = this.props;
    dispatch({
      type: 'professionSchool/reqCommon',
      service: 'getProfession',
      payload: {
        Page: 1,
        PageCount: 10,
        Name: value
      },
      callback: () => {
        const { profession } = this.props;
        if(profession) this.setState({ data: profession.list, fetching: false });
      }
    })
    this.setState({ data: [], fetching: true });
  }

  handleChange = (value) => {
    this.setState({
      value,
      data: null,
      fetching: false,
    });
    this.triggerChange(value);
  }

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue.key);
    }
  };

  render() {
    const { fetching, data, value } = this.state;
    let optionData;
    if (data) {
      optionData = data.map(d => (
        <Option key={d.Id}>
          { d.Name }
        </Option>
      ));
    }
    return (
      <Select
        labelInValue
        showSearch
        value={value}
        placeholder="请输入姓名"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchUser}
        onChange={this.handleChange}
        style={{ width: '100%' }}
      >
        {optionData}
      </Select>
    );
  }
}

export default ProfessionSelect
