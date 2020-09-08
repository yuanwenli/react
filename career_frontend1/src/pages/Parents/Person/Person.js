import React, { Component } from 'react';
import { Button, Modal, Radio } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const RadioGroup = Radio.Group;

@connect(({ messageData, loading }) => ({
  userInfo: messageData.userInfo,
  loading: loading.models.messageData,
}))
class Person extends Component {

  state = {
    visible: false,
    value: null
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData() {
    const { dispatch } = this.props;
    dispatch({
      type: 'messageData/reqCommon',
      service: 'getUserInfo',
      payload: {},
    })
  }

  handleStudent = () => {
    this.setState({
      value: parseInt(window.localStorage.getItem('studentId'), 10),
      visible: true
    })
  }

  renderStudent = userInfo => <span>{userInfo.StudentInfo.filter(item => item.Id == window.localStorage.getItem('studentId'))[0].UserName}</span>

  renderRadio = (userInfo) => userInfo.StudentInfo.map(item => <Radio key={item.Id} value={item.Id}>{item.UserName}</Radio>)

  onChange = (e) => {
   this.setState({
     value: e.target.value
   })
  }

  handleOk = () => {
    const { value } = this.state;
    window.localStorage.setItem('studentId', value)
    this.setState({
      visible: false
    })
    this.getAllData();
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { userInfo } = this.props;
    const { visible, value } = this.state;

    return (
      <PageHeaderWrapper title="个人信息">
        <Modal
          title="请选择学生"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <RadioGroup onChange={this.onChange} value={value}>
            { userInfo && this.renderRadio(userInfo) }
          </RadioGroup>
        </Modal>
        { userInfo &&
        <div style={{padding: 20, background: '#fff'}}>
          <p>用户名：{userInfo.UserName}</p>
          <p>手机号：{userInfo.Mobile || '暂无'}</p>
          <p>性别：{userInfo.Sex === 1 ? '女' : '男'}</p>
          <p>当前显示的学生：{this.renderStudent(userInfo)}<Button type="primary" style={{marginLeft: 10}} onClick={this.handleStudent}>切换学生</Button></p>
        </div>}
      </PageHeaderWrapper>
    );
  }
}

export default Person;
