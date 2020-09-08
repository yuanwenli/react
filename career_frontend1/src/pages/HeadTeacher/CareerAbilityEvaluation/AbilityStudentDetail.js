import React, { Component } from 'react';
import { Table, Select, Modal, Form, Input, Button, Divider, Radio, message } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Ability.less';

const { Option } = Select;
const RadioGroup = Radio.Group;

@connect(({ ability, loading }) => ({
  abilityPageTwo: ability.abilityPageTwo,
  allAnswer: ability.allAnswer,
  loading: loading.models.ability,
}))
@connect(({ messageData, loading }) => ({
  getClass: messageData.getClass,
  loading: loading.models.messageData,
}))
@Form.create()
class AbilityStudentDetail extends Component {

  state = {
    pageQuery: {},
    queryPage: 0,
    visible: false,
    role: '',
    teacherValue: [],
    teacherAnswer: [],
    headValue: [],
    headAnswer: [],
  }

  componentDidMount() {
    const name = window.localStorage.getItem('antd-pro-authority')
    if(name && name.slice(2, name.length-2) === 'teacher') {
      this.setState({
        role: 'teacher'
      })
      this.getClass()
    } else if(name && name.slice(2, name.length-2) === 'headTeacher') {
      this.setState({
        role: 'headTeacher'
      })
    } else {
      this.setState({
        role: 'school'
      })
      this.getClass()
    }
    this.getListData(0, {});
  }

  getClass() {
    const { dispatch } = this.props;
    dispatch({
      type: 'messageData/reqCommon',
      service: 'getClass'
    })
  }

  // 初始化表格数据
  getListData(page, queryParam) {
    const { dispatch, location } = this.props;
    let { pageQuery, queryPage } = this.state;
    if (queryParam) {
      pageQuery = queryParam;
    }
    if (page || page === 0) {
      queryPage = page;
    }
    const param = { ...pageQuery, Page: queryPage, PageCount: 10, TestpaperId: location.query.id, };
    dispatch({
      type: 'ability/reqCommon',
      service: 'getAbilityPageTwo',
      payload: param,
    });
    this.setState({ pageQuery, queryPage });
  }

  columns = () => [
    {
      title: '学生姓名',
      dataIndex: 'StudentName',
      key: 'StudentName',
    },
    {
      title: '班级',
      dataIndex: 'ClassName',
      key: 'ClassName',
    },
    {
      title: '完成状态',
      dataIndex: '',
      key: 'StudentState',
      render: record => (
        <div>
          <p>学生：{record.StudentState === 0 ? <span style={{color: '#f5222d'}}>未完成</span> : <span style={{color: '#52c41a'}}>已完成</span>}</p>
          <p>家长：{record.ParentState === 0 ? <span style={{color: '#f5222d'}}>未评分</span> : <span style={{color: '#52c41a'}}>已评分</span>}</p>
          <p>班主任：{record.HeadmasterState === 0 ? <span style={{color: '#f5222d'}}>未评分</span> : <span style={{color: '#52c41a'}}>已评分</span>}</p>
          <p>生涯老师：{record.TeacherState === 0 ? <span style={{color: '#f5222d'}}>未评分</span> : <span style={{color: '#52c41a'}}>已评分</span>}</p>
        </div>
      )
    },
    {
      title: '得分',
      dataIndex: 'AbilityScore',
      key: 'AbilityScore',
    },
    {
      title: '时间',
      dataIndex: '',
      key: 'EndTime',
      render: (record) => <span>{record.StartTime}--{record.EndTime}</span>
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'option',
      render: record => <a onClick={() => this.handleDetail(record)}>查看详情</a>
    },
  ]

  handleDetail = (val) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'ability/reqCommon',
      service: 'getAllAnswer',
      payload: {
        SendId: val.SendId,
        StudentUserId: val.StudentUserId
      },
      callback: () => {
        this.setState({
          visible: true,
          teacherValue: [],
          teacherAnswer: [],
          headValue: [],
          headAnswer: [],
        })
      }
    })
  }

  handlePageChange = pagination => {
    const { current } = pagination;
    const { queryPage } = this.state;
    if (current !== queryPage) {
      this.getListData(current);
    }
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleSearch = () => {
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const { StudentName, State } = fieldsValue;
      this.getListData(0, { State, StudentName });
    });
  }

  onChange = (e, index, id) => {
    const { teacherValue, role, headValue } = this.state;
    let { teacherAnswer, headAnswer } = this.state;
    const arr = e.target.value;
    if(role === 'teacher') {
      teacherValue[index] = arr;
      if(teacherAnswer.length > 0) {
        teacherAnswer = teacherAnswer.filter(item => item.Id !== id)
      }
      // 改变原值，先去除已有值，在添加新值
      teacherAnswer.push({Choice: arr, Id: id});
      this.setState({
        teacherValue,
        teacherAnswer
      });
    } else {
      headValue[index] = arr;
      if(headAnswer.length > 0) {
        headAnswer = headAnswer.filter(item => item.Id !== id);
      }
      headAnswer.push({Choice: arr, Id: id});
      this.setState({
        headValue,
        headAnswer
      });
    }
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { testId, teacherAnswer, headAnswer, role } = this.state;
    const answerData = role === 'teacher' ? teacherAnswer : headAnswer
    dispatch({
      type: 'ability/reqCommon',
      service: 'markTest',
      payload: {
        Id: testId,
        Subject: JSON.stringify(answerData)
      },
      callback: () => {
        message.success('操作成功');
        this.setState({
          visible: false,
        })
        this.getListData(0, {});
      }
    })
  }

  // 重置
  resetForm = () => {
    const { form } = this.props;
    form.resetFields();
    this.getListData(0, {});
  }

  render() {
    const { abilityPageTwo, location, allAnswer, form, getClass } = this.props;
    const { visible, role, teacherValue, headValue } = this.state;
    const { getFieldDecorator } = form;

    return (
      <PageHeaderWrapper title={location.query.name} back="true">
        {
          allAnswer &&
          <Modal
            title="评分详情"
            visible={visible}
            onOk={this.handleSubmit}
            onCancel={this.handleCancel}
            destroyOnClose
            width={700}
            okButtonProps={{ disabled: allAnswer.Type === 1 || role === 'school' }}
          >
            {allAnswer ?
              allAnswer.Stem.map((item, index) => (
                <div key={item.Id} className={styles.list}>
                  <p>{index+1}、{item.Name}</p>
                  <div>
                    学生：
                    <RadioGroup value={item.Student !== 0?item.Student:''}>
                      {item.Stem.map(option => (
                        <Radio disabled className={styles.radioStyle} key={option.Id} value={option.Id}>{option.Id}、{option.StemName}</Radio>
                      ))}
                    </RadioGroup>
                  </div>
                  <div>
                    家长：
                    <RadioGroup value={item.Parent !== 0 ? item.Parent : ''}>
                      {item.Stem.map(option => (
                        <Radio disabled className={styles.radioStyle} key={option.Id} value={option.Id}>{option.Id}、{option.StemName}</Radio>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              )):null}
            <Divider />
            <h3>班主任评分</h3>
            {
              allAnswer.Headmastercomm && allAnswer.Headmastercomm.map((item, index) =>
                <RadioGroup key={item.Id} onChange={(e) => this.onChange(e, index, item.Id)} value={item.Choice === 0?headValue[index]:item.Choice}>
                  {item.Name}：{item.Stem.map(option => (
                    <Radio disabled={role !== 'headTeacher'} className={styles.radioStyle} value={option.Id} key={option.Id}>{option.Id}、{option.name}-{option.score}</Radio>
                ))}
                </RadioGroup>
              )
            }
            <Divider />
            <h3>生涯老师评分</h3>
            {
              allAnswer.TeacherComm && allAnswer.TeacherComm.map((item, index) =>
                <RadioGroup key={item.Id} onChange={(e) => this.onChange(e, index, item.Id)} value={item.Choice === 0?teacherValue[index]:item.Choice}>
                  {item.Name}：{item.Stem.map(option => (
                    <Radio disabled={role !== 'teacher'} className={styles.radioStyle} value={option.Id} key={option.Id}>{option.Id}、{option.name}-{option.score}</Radio>
                ))}
                </RadioGroup>
              )
            }
            <Divider />
            {allAnswer.AbilityScore === '0' ? <h3>总分：暂无<span style={{fontSize: '12px'}}>（全部角色完成生涯能力评估之后显示总分）</span></h3> : <h3>总分：{allAnswer.AbilityScore}</h3>}
            {
              allAnswer&&allAnswer.ability ? allAnswer.ability.map(item =>
                <p className={styles.score} key={item.Id}>
                  <span>{item.Name}:{item.All}</span>
                  <span>自我评分:{item.Student}</span>
                  <span>家长评分:{item.Parent}</span>
                  <span>班主任评分:{item.Headmaster}</span>
                  <span>生涯老师评分:{item.Teacher}</span>
                </p>)
              : ''}
          </Modal>
        }

        <div style={{padding: 20, background: '#fff'}}>
          <Form layout="inline" style={{marginBottom: '10px'}}>
            {
              getClass &&
              <Form.Item label="">
                {getFieldDecorator('ClassId',{})(
                  <Select placeholder="选择班级" style={{ width: 140 }}>
                    {
                      getClass.map(item => <Option key={item.Id} value={item.Id}>{item.ClassName}</Option>)
                    }
                  </Select>
                )}
              </Form.Item>
            }
            <Form.Item label="">
              {getFieldDecorator('StudentName',{})(
                <Input placeholder="请输入学生姓名" />
              )}
            </Form.Item>
            <Form.Item label="">
              {getFieldDecorator('State',{})(
                <Select placeholder="选择试卷状态" style={{ width: 140 }}>
                  <Option value="0">全部试卷</Option>
                  <Option value="1">已完成</Option>
                  <Option value="2">未完成</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={this.handleSearch}>搜索</Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={this.resetForm}>重置</Button>
            </Form.Item>
          </Form>
          { abilityPageTwo && abilityPageTwo.list ?<Table pagination={{total: abilityPageTwo.pages*10}} columns={this.columns()} rowKey="SendId" dataSource={abilityPageTwo.list} onChange={this.handlePageChange} />:<Table pagination={{total: 0}} columns={this.columns()} dataSource={[]} /> }
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default AbilityStudentDetail;
