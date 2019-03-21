import React, { Component } from 'react';
import { Form, Progress, Radio, Button, message } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const RadioGroup = Radio.Group;


@connect(({ studentExam, loading }) => ({
  titleData: studentExam.titleData,
  signalAnswer: studentExam.signalAnswer,
  loading: loading.models.studentExam,
}))
@Form.create()
class ExamTitle extends Component{

  state = {
    progress: 0,
    title: null,
    nowIndex: 0,
    time: 0,
    answer: null,
  }

  componentDidMount() {
    this.getData();
    this.interval =  setInterval(() => {
      this.setState({
        time: this.state.time + 1
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // 获取题目数据
  getData() {
    const { dispatch, location } = this.props;
    const { nowIndex } = this.state;
    dispatch({
      type: 'studentExam/reqCommon',
      service: 'getTitle',
      payload: {
        EvaluationId: location.query.id
      },
      callback: (data) => {
        const { titleData } = this.props;
        this.setState({
          title: titleData,
          progress: ((data.OkSubjectNum/data.SubjectNum) * 100).toFixed(2)
        })
        dispatch({
          type: 'studentExam/reqCommon',
          service: 'getSignalAnswer',
          payload: {
            EvaluationId: location.query.id,
            SubjectId: this.state.title.Subject[nowIndex].Id
          },
          callback: val => {
            this.setState({
              answer: val || null,
            })
          }
        })
      }
    })
  }

  // 点击选项，提交该题答案
  handleAnswerChange = (e) => {
    this.setState({
      answer: e.target.value
    })
    const answer = e.target.answerData.split('&')
    const { dispatch, location } = this.props;
    const { time, title } = this.state;
    dispatch({
      type: 'studentExam/reqCommon',
      service: 'submitSignalAnswer',
      payload: {
        EvaluationId: location.query.id,
        SubjectId: answer[0],
        Answer: answer[1],
        Time: time,
      },
      callback: (data) => {
        this.setState({
          progress: ((data.OkSubjectNum/title.Subject.length) * 100).toFixed(2)
        })
      }
    })
  }

  // 上一题
  handlePreviewTitle = () => {
    const { dispatch, location } = this.props;
    const { nowIndex } = this.state;
    if(nowIndex > 0) {
      dispatch({
        type: 'studentExam/reqCommon',
        service: 'getSignalAnswer',
        payload: {
          EvaluationId: location.query.id,
          SubjectId: this.state.title.Subject[nowIndex - 1].Id
        },
        callback: data => {
          this.setState({
            answer: data || null
          })
        }
      })
      this.setState({
        nowIndex: nowIndex - 1,
      })
    } else {
      message.destroy()
      message.info('没有上一题了')
    }
  }

  // 下一题
  handleNextTitle = () => {
    const { dispatch, location } = this.props;
    const { nowIndex, title, answer } = this.state;
    if(nowIndex >= title.Subject.length - 1) {
      message.destroy()
      message.info('没有下一题了');
      return;
    }
    if(!answer) {
      message.destroy();
      message.info('请回答完这一题再进行下一题喔~');
      return;
    }
    dispatch({
      type: 'studentExam/reqCommon',
      service: 'getSignalAnswer',
      payload: {
        EvaluationId: location.query.id,
        SubjectId: this.state.title.Subject[nowIndex + 1].Id
      },
      callback: data => {
        this.setState({
          answer: data || null
        })
      }
    })
    this.setState({
      nowIndex: nowIndex + 1,
      time: 0,
      answer: null,
    })
  }

  handleSubmit = () => {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'studentExam/reqCommon',
      service: 'handInExamination',
      payload: {
        EvaluationId: location.query.id,
        EvaluationtimeId: location.query.listId,
      },
      callback: () => {
        message.success('操作成功');
        router.push('/exam/list');
      }
    })
  }

  render() {
    const { titleData } = this.props;
    const { progress, title, nowIndex, answer } = this.state;
    return (
      <PageHeaderWrapper title="开始测评" back="true">
        { title ?
          <div style={{padding: 20, background: '#fff', margin: '0 auto'}}>
            <h3>{titleData.Name}</h3>
            <Progress percent={parseFloat(progress)} status="active" />
            <div style={{marginTop: 40, marginBottom: 40}}>
              <h4 style={{marginBottom: 10}}>{nowIndex + 1}、{title.Subject ? title.Subject[nowIndex].Name : ''}</h4>
              <RadioGroup onChange={this.handleAnswerChange} value={answer}>
                {title.Subject[nowIndex].Stem ? title.Subject[nowIndex].Stem.map(item => (
                  <Radio key={item.Id} value={item.Id} answerData={`${title.Subject[nowIndex].Id}&${item.Id}`}>{item.Name}</Radio>
                )) : ''}
              </RadioGroup>
            </div>
            <div>
              <Button type="primary" onClick={this.handlePreviewTitle}>上一题</Button>
              <Button type="primary" style={{marginLeft: 10}} onClick={this.handleNextTitle}>下一题</Button>
              <Button type="primary" style={{marginLeft: 10}} onClick={this.handleSubmit}>交卷</Button>
            </div>
          </div> : ''}
      </PageHeaderWrapper>
    );
  }
}

export default ExamTitle
