import React, { Component } from 'react';
import { Form, Table, Modal, Radio, Divider, message } from 'antd';
import { connect } from 'dva';
import styles from './Ability.less'

const RadioGroup = Radio.Group;

@connect(({ ability, loading }) => ({
  studentAbilityList: ability.studentAbilityList,
  studentAbilityDetail: ability.studentAbilityDetail,
  loading: loading.models.ability,
}))
@Form.create()
class Ability extends Component {
  state = {
    visible: false,
    pageQuery: {},
    queryPage: 0,
    value: [],
    valueParent: [],
    answer:[],
    answerParent: [],
    testId: null,
    role: ''
  }

  componentDidMount() {
    const name = window.localStorage.getItem('antd-pro-authority')
    if(name && name.slice(2, name.length-2) === 'student') {
      this.setState({
        role: 'student'
      })
    } else {
      this.setState({
        role: 'parents'
      })
    }

    this.getListData(0, {});
  }

  // 初始化表格数据
  getListData(page, queryParam) {
    const { dispatch } = this.props;
    let { pageQuery, queryPage } = this.state;
    if (queryParam) {
      pageQuery = queryParam;
    }
    if (page || page === 0) {
      queryPage = page;
    }
    const param = { ...pageQuery, Page: queryPage, PageCount: 10, StudentUserId: window.localStorage.getItem('studentId')};
    dispatch({
      type: 'ability/reqCommon',
      service: 'getStudentAbilityList',
      payload: param,
    });
    this.setState({ pageQuery, queryPage });
  }

  columns = () => [
    {
      title: '试卷名称',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
    title: '完成状态',
    dataIndex: 'State',
    key: 'State',
    render: (record) => {
      if(record === 1) {
        return <span style={{color: '#52c41a'}}>已完成</span>
      }
      return <span style={{color: '#f5222d'}}>未完成</span>
      }
    },
    {
      title: '开放时间',
      dataIndex: 'StartTime',
      key: 'StartTime',
    },
    {
      title: '试卷得分',
      dataIndex: 'ZScore',
      key: 'ZScore',
    },
    {
      title: '操作',
      key: 'option',
      render: (record) => (
        <span>
          <a onClick={() => this.handleCheckPaper(record.Id)}>查看试卷</a>
        </span>
      ),
    }]

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  handleCheckPaper = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'ability/reqCommon',
      service: 'getStudentAbilityDetail',
      payload: {
        Id: id
      },
      callback: () => {
        this.setState({
          visible: true,
          testId: id
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
  };

  onChange = (e, index, id) => {
    const { value, role, valueParent } = this.state;
    let { answer, answerParent } = this.state;
    const arr = e.target.value;
    if(role === 'student') {
      value[index] = arr;
      if(answer.length > 0) {
        answer = answer.filter(item => item.Id !== id)
      }
      // 改变原值，先去除已有值，在添加新值
      answer.push({Choice: arr, Id: id});
      this.setState({
        value,
        answer
      });
    } else {
      valueParent[index] = arr;
      answerParent = answerParent.filter(item => item.Id !== id);
      answerParent.push({Choice: arr, Id: id});
      this.setState({
        valueParent,
        answerParent
      });
    }
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { testId, answer, answerParent, role } = this.state;
    const answerData = role === 'student' ? answer : answerParent
    dispatch({
      type: 'ability/reqCommon',
      service: 'submitAbilityTest',
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

  render() {
    const { visible, value, role, valueParent } = this.state;
    const { studentAbilityList, studentAbilityDetail } = this.props;

    return (
      <div>
        <div style={{ background: '#fff', padding: '20px' }}>
          { studentAbilityList && studentAbilityList.list?<Table pagination={{total: studentAbilityList.pages*10}} columns={this.columns()} rowKey="Id" dataSource={studentAbilityList.list} onChange={this.handlePageChange} />:<Table pagination={{total: 0}} columns={this.columns()} dataSource={[]} />}
        </div>
        {studentAbilityDetail &&
        <Modal
          title={studentAbilityDetail.Name}
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
          maskClosable={false}
          okButtonProps={{ disabled: studentAbilityDetail.Type === 1 }}
          width={700}
        >
          { studentAbilityDetail&&studentAbilityDetail.Stem?studentAbilityDetail.Stem.map((item, index) => (
            <div key={item.Id} className={styles.list}>
              <p>{index+1}、{item.Name}</p>
              <div>
                学生：
                <RadioGroup onChange={(e) => this.onChange(e, index, item.Id)} value={item.Student === 0?value[index]:item.Student}>
                  {item.Stem.map(option => (
                    <Radio disabled={role === 'parents'} className={styles.radioStyle} key={option.Id} value={option.Id}>{option.Id}、{option.StemName}</Radio>
                  ))}
                </RadioGroup>
              </div>
              <div>
                家长：
                <RadioGroup onChange={(e) => this.onChange(e, index, item.Id)} value={item.Parent === 0 ? valueParent[index]:item.Parent}>
                  {item.Stem.map(option => (
                    <Radio disabled={role !== 'parents'} className={styles.radioStyle} key={option.Id} value={option.Id}>{option.Id}、{option.StemName}</Radio>
                ))}
                </RadioGroup>
              </div>
            </div>
          )):null}
          <Divider />
          {studentAbilityDetail.AbilityScore === '0' ? <h3>总分：暂无<span style={{fontSize: '12px'}}>（全部角色完成生涯能力评估之后显示总分）</span></h3> : <h3>总分：{studentAbilityDetail.AbilityScore}</h3>}
          {
            studentAbilityDetail&&studentAbilityDetail.ability ? studentAbilityDetail.ability.map(item =>
              <p className={styles.score} key={item.Id}>
                <span>{item.Name}:{item.All}</span>
                <span>自我评分:{item.Student}</span>
                <span>家长评分:{item.Parent}</span>
                <span>班主任评分:{item.Headmaster}</span>
                <span>生涯老师评分:{item.Teacher}</span>
              </p>)
              : null
          }
        </Modal>}
      </div>
    );
  }
}

export default Ability;
