import React, { Component, Fragment } from 'react';
import { Row, Col, Timeline, Modal, Input, message, Popconfirm } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './Person.less';

const { TextArea } = Input;

@connect(({ studentPerson, loading }) => ({
  getStudentPlan: studentPerson.getStudentPlan,
  studentIdol: studentPerson.studentIdol,
  loading: loading.models.studentPerson,
}))
class Person extends Component {

  state = {
    visible: false,
    careerData: ''
  }

  componentDidMount() {
    const { data } = this.props;
    const sendData = data && data.Id ? data.Id : '';
    this.getStudentPerson(sendData);
    this.getStudentIdol(sendData);
  }

  getStudentPerson(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'studentPerson/reqCommon',
      service: 'getStudentPlan',
      payload: {
        StudentId: id
      },
    });
  }

  getStudentIdol(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'studentPerson/reqCommon',
      service: 'studentIdol',
      payload: {
        StudentId: id
      }
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  // 添加生涯规划
  handleOk = () => {
    const { dispatch } = this.props;
    const { careerData } = this.state;
    dispatch({
      type: 'studentPerson/reqCommon',
      service: 'addStudentPlan',
      payload: {
        Content: careerData
      },
      callback: () => {
        message.success('操作成功');
        this.setState({
          visible: false,
        });
        this.getStudentPerson();
      }
    });

  }

  // 删除确认
  confirmDelete = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'studentPerson/reqCommon',
      service: 'delStudentPlan',
      payload: {
        Id: id
      },
      callback: () => {
        message.success('删除成功');
        this.getStudentPerson();
      }
    });
  }

  // 给input上绑定值
  changeValue = (e) => {
    this.setState({
      careerData: e.target.value
    })
  }

  // 显示编辑生涯规划模态框
  handleEditPlan = () => {
    this.setState({
      visible: true,
    });
  }

  handleChooseIdol = () => {
    router.push('/person/choose-idol')
  }

  // 时间线组件
  renderTimeLine() {
    const { getStudentPlan, data } = this.props;
    if(getStudentPlan) {
      return getStudentPlan.map(item => (
        <Timeline.Item key={item.Id}>
          <p className={styles.career}>
            <span>{item.UpdateTime}</span>
            {
              !data &&
              <Popconfirm title="确认删除?" onConfirm={() => this.confirmDelete(item.Id)} okText="确定" cancelText="取消">
                <a>删除</a>
              </Popconfirm>
            }
          </p>
          <p>{item.Content}</p>
        </Timeline.Item>
      ))
    }
    return null;
  }

  render() {
    const { visible, careerData } = this.state;
    const { studentIdol, data } = this.props;
    return (
      <Fragment>
        <Modal
          title="编辑生涯规划"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <TextArea rows={4} placeholder="说点什么吧" value={careerData} onChange={this.changeValue} />
        </Modal>
        <div style={{background: '#fff', padding: '20px'}}>
          { !data &&
          <Row gutter={24}>
            <Col span={4}>
              <img src="" alt="" className={styles.img} />
            </Col>
            <Col span={20}>
              <p>姓名：同学A</p>
              <p>学校：上海市九亭小学</p>
              <p>入学时期：2017-09-12</p>
              <p>当前学段：高中</p>
            </Col>
          </Row>}
          <Row gutter={50}>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.title}>
                <h3>个人简介</h3>
                { !data && <p onClick={this.handleEditPlan}>编辑个人简介</p> }
              </div>
              <div>
                <Timeline>
                  {this.renderTimeLine()}
                </Timeline>
              </div>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.title}>
                <h3>生涯偶像</h3>
                { !data && <p onClick={this.handleChooseIdol}>选择生涯偶像</p> }
              </div>
              <div className={styles.name}>
                <img src={studentIdol.HeadImg} alt="" />
                <h3>{studentIdol.Name}</h3>
              </div>
              <h3 className={styles.family}>家族职业树</h3>
            </Col>
          </Row>
        </div>
      </Fragment>
    )
  }
}

export default Person;
