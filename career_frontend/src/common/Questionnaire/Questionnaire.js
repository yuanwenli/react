import React, { Component } from 'react';
import { Form, Table, Modal, Radio, message } from 'antd';
import { connect } from 'dva';
import styles from './Questionnaire.less'

const RadioGroup = Radio.Group;

@connect(({ studentQuestionnaire, loading }) => ({
  questionnaireList: studentQuestionnaire.questionnaireList,
  questionnaireDetail: studentQuestionnaire.questionnaireDetail,
  loading: loading.models.studentQuestionnaire,
}))
@Form.create()
class Questionnaire extends Component {

  state = {
    pageQuery: {},
    queryPage: 0,
    visible: false,
    value: [],
    answer:[],
    id: null,
    uId: null,
    isComplete: false
  }

  componentDidMount() {
    this.getListData()
  }

// 初始化表格数据
  getListData(page, queryParam) {
    const { dispatch, data } = this.props;
    let { pageQuery, queryPage } = this.state;
    if (queryParam) {
      pageQuery = queryParam;
    }
    if (page || page === 0) {
      queryPage = page;
    }
    const param = { ...pageQuery, Page: queryPage, PageCount: 10, StudnetId: window.localStorage.getItem('studentId') };
    if(data) {
      param.StudnetId = data.Id
    }
    dispatch({
      type: 'studentQuestionnaire/reqCommon',
      service: 'getQuestionnaireList',
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
      title: '开放时间',
      dataIndex: 'StartTime',
      key: 'StartTime',
    },
    {
      title: '完成状态',
      dataIndex: 'WJType',
      key: 'WJType',
      render: (record) => {
        switch (record) {
          case 1:
            return <span style={{color: '#52c41a'}}>已完成</span>;
          case 2:
            return <span style={{color: '#f5222d'}}>未完成</span>;
          case 3:
            return <span style={{color: 'rgba(0, 0, 0, 0.65)'}}>已过期</span>;
          default:
            return null;
        }
      }
    },
    {
      title: '操作',
      key: 'option',
      render: (record) => (
        <span>
          <a onClick={() => this.handleCheckPaper(record.Id, record.UlId, record.WJType)}>查看问卷</a>
        </span>
      ),
    }];

  onChange = (e, index, id) => {
    const { value } = this.state;
    let { answer } = this.state;
    const arr = [];
    value[index] = e.target.value;
    // 改变原值，先去除已有值，在添加新值
    if(answer.length > 0) {
      answer = answer.filter(item => {
        return item.id !== id;
      })
    }
    arr[0] = e.target.value;
    answer.push({op: arr, Id: id});
    this.setState({
      value,
      answer
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  handleOk = () => {
    const { answer, id, uId } = this.state;
    answer.forEach(item => {
      switch (item.op[0]) {
        case 0:
          item.op[0] = "A";
          break;
        case 1:
          item.op[0] = "B";
          break;
        case 2:
          item.op[0] = "C";
          break;
        case 3:
          item.op[0] = "D";
          break;
        case 4:
          item.op[0] = "E";
          break;
        default:
          break;
      }
    })
    const { dispatch } = this.props;
    dispatch({
      type: 'studentQuestionnaire/reqCommon',
      service: 'submitQuestionnaire',
      payload: { Id: id, Sub: JSON.stringify(answer), UlId: uId },
      callback: () => {
        this.getListData();
        message.success('交卷成功');
        this.setState({
          visible: false
        })
      }
    });
  }

  handleCheckPaper = (id, uId, type) => {
    const { dispatch } = this.props;
    // 未完成
    if(type === 2) {
      this.setState({
        isComplete: true
      })
      dispatch({
        type: 'studentQuestionnaire/reqCommon',
        service: 'getQuestionnaireDetail',
        payload: { Id: id },
        callback: () => {
          const {questionnaireDetail} = this.props;
          this.setState({
            visible: true,
            id,
            uId,
            value: [...questionnaireDetail.Subject]
          })
        }
      });
    } else {
      // 已完成和过期
      this.setState({
        isComplete: false
      })
      dispatch({
        type: 'studentQuestionnaire/reqCommon',
        service: 'completedQuestionnaire',
        payload: { UlId: uId },
        callback: () => {
          const {questionnaireDetail} = this.props;
          questionnaireDetail.Subject.forEach(item => {
            switch (item.Choice[0]) {
              case "A":
                item.choose = 0;
                break;
              case "B":
                item.choose = 1;
                break;
              case "C":
                item.choose = 2;
                break;
              case "D":
                item.choose = 3;
                break;
              case "E":
                item.choose = 4;
                break;
              default:
                break;
            }
          })
          this.setState({
            visible: true,
            id,
            uId,
            value: [...questionnaireDetail.Subject]
          })
        }
      });
    }
  }

  renderOption = (index) => {
    switch (index) {
      case 0:
        return <span>A. </span>;
      case 1:
        return <span>B. </span>;
      case 2:
        return <span>C. </span>;
      case 3:
        return <span>D. </span>;
      case 4:
        return <span>E. </span>;
      default:
        return <span />;
    }
  }

  handlePageChange = pagination => {
    const { current } = pagination;
    const { queryPage } = this.state;
    if (current !== queryPage) {
      this.getListData(current);
    }
  };

  render() {
    const { visible, value, isComplete } = this.state;
    const { questionnaireList, questionnaireDetail, data } = this.props;
    return (
      <div>
        <div style={{ background: '#fff', padding: '20px' }}>
          {questionnaireList && questionnaireList.list ? <Table rowKey="Id" dataSource={questionnaireList.list} onChange={this.handlePageChange} columns={this.columns()} /> : <Table pagination={{total: 0}} columns={this.columns()} dataSource={[]} />}
        </div>
        <Modal
          title={questionnaireDetail?questionnaireDetail.Name:''}
          visible={visible}
          maskClosable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="提交"
          cancelText="取消"
          okButtonProps={{ disabled: !isComplete || data }}
          destroyOnClose
        >
          { questionnaireDetail&&questionnaireDetail.Subject?questionnaireDetail.Subject.map((item, index) => (
            <div key={item.Id} className={styles.list}>
              <p className={item.IfMust === 1 ? 'ant-form-item-required' : ''}>{index+1}、{item.Title}</p>
              <RadioGroup onChange={(e) => this.onChange(e, index, item.Id)} value={item.choose||item.choose===0?item.choose:value[index]}>
                {item.Sub.map((option, index2) => (
                  <Radio className={styles.radioStyle} key={index2} value={index2}>
                    {this.renderOption(index2)}
                    {option}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
          )):null}
        </Modal>
      </div>
    );
  }
}

export default Questionnaire;
