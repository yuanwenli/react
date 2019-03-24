import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Form, Input, Select, DatePicker } from 'antd';

const { Option } = Select;

@connect(({ messageData, loading }) => ({
  getGrade: messageData.getGrade,
  
  loading: loading.models.rank,
}))
@Form.create()
class RankAdd extends Component {
constructor(props){
  super()
  
}
  componentDidMount() {
    this.getGrade()
  }

  getGrade() {
    const { dispatch } = this.props;
    dispatch({
      type: 'messageData/reqCommon',
      service: 'getGrade',
    })
  }


  renderGrade = (val) => val.map(item => <Option key={item.Id} value={item.Id}>{item.GRADENAME}</Option>);

  render() {
    const { form, getGrade } = this.props;
    const { getFieldDecorator } = form;
    console.log(this.props)
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 15 },
    };
    return (
      <Form layout="horizontal">
       <Form.Item label="科目" {...formItemLayout}>

          {getFieldDecorator('Subject', {
            rules: [{ required: true, message: '必填项' }],
          })(
            <Select placeholder="请选择科目名称" style={{ width: 150 }}>
              { this.props.Subject.map((item,index) => <Option key={index} value={index}>{item}</Option>)}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="考试名称" {...formItemLayout}>
          {getFieldDecorator('ExamName', {
            rules: [{ required: true, message: '必填项' }],
          })(
            <Input placeholder="请输入考试名称" />
          )}
        </Form.Item>
        <Form.Item label="年级" {...formItemLayout}>
          {getFieldDecorator('GradeId', {
            rules: [{ required: true, message: '必填项' }],
          })(
            <Select placeholder="请选择学段" style={{ width: 150 }}>
              { getGrade && this.renderGrade(getGrade)}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="考试时间" {...formItemLayout}>
          {getFieldDecorator('ExamTime', {
            rules: [{ required: true, message: '必填项' }],
          })(
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              placeholder="请选择时间"
              onChange={this.onChange}
            />
          )}
        </Form.Item>
        <Form.Item label="班级名次" {...formItemLayout}>
          {getFieldDecorator('ClassRank', {
            rules: [{ required: true, message: '必填项' }],
          })(
            <Input placeholder="请填写名次" />
          )}
        </Form.Item>
      </Form>
    )
  }
}

export default RankAdd;
