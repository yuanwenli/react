import React, { Component } from 'react';
import { Form, Tag, Radio, Button, message } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const RadioGroup = Radio.Group;

@Form.create()
@connect(({ studentActivity}) => ({
  classActivityDetail: studentActivity.classActivityDetail,
}))
class ActivityDetail extends Component{

  state = {
    value: null,
  }

  componentDidMount() {
    this.getDetail()
  }

  getDetail() {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'studentActivity/reqCommon',
      service: 'getClassActivityDetail',
      payload: {
        Id: location.query.id
      }
    })
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  joinActivity = () => {
    const { dispatch, location } = this.props;
    const { value } = this.state;
    if(!value) {
      message.info('请填写评价');
      return
    }
    dispatch({
      type: 'studentActivity/reqCommon',
      service: 'joinActivity',
      payload: {
        Type: value,
        ClassActivityId: location.query.id
      },
      callback: () => {
        message.success('参加成功');
        router.push('/activity/list');
      }
    })
  }

  activityStatus = (type) => {
    switch (type) {
      case 1:
        return <span style={{color: '#52c41a'}}>开放中</span>;
      case 2:
        return <span style={{color: '#f5222d'}}>未开放</span>;
      case 3:
        return <span style={{color: '#f5222d'}}>关闭</span>;
      case 4:
        return <span style={{color: '#f5222d'}}>过期</span>;
      default:
        return null;
    }
  }

  render() {
    const { classActivityDetail } = this.props;
    const { value } = this.state;

    return (
      <PageHeaderWrapper title="班级生涯活动详情" back="true">
        {
          classActivityDetail ?
            <div style={{background: '#fff', padding: 20}}>
              <h3>活动名称：{classActivityDetail.ActivityName}</h3>
              <h3>活动内容：<span>{classActivityDetail.Content}</span></h3>
              <div>
                {classActivityDetail.Image ? classActivityDetail.Image.map((item, index) => <img key={index} src={item} alt="" />) : ''}
              </div>
              <h3>活动标签：{classActivityDetail.Lable.map(item => (<Tag key={item.Id} color="blue">{item.Name}</Tag>))}</h3>
              <h3>活动状态：{this.activityStatus(classActivityDetail.Type)}</h3>
              <h3>是否参加：{classActivityDetail.State === 1 ? '已参加' : '未参加'}</h3>
              <h3>学生评价：</h3>
              <div>
                <RadioGroup onChange={(e) => this.onChange(e)} value={value}>
                  <Radio key="1" value="1">喜欢</Radio>
                  <Radio key="2" value="2">不喜欢</Radio>
                </RadioGroup>
              </div>
              <Button disabled={classActivityDetail.Type !== 1 || classActivityDetail.State === 1} onClick={this.joinActivity} type='primary' style={{marginTop: 10}}>参加活动</Button>
            </div>
            : ''
        }
      </PageHeaderWrapper>
    )
  }
}

export default ActivityDetail;
