import React, { Component } from 'react';
import { Form, Radio, Button, message, DatePicker, TreeSelect } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';

const { RangePicker } = DatePicker;
const { TreeNode } = TreeSelect;

@connect(({ schoolClass, loading }) => ({
  schoolList: schoolClass.schoolList,
  classList: schoolClass.classList,
  loading: loading.models.schoolClass,
}))
@connect(({ questionnaireManage, loading }) => ({
  loading: loading.models.questionnaireManage,
}))
@Form.create()
class Step3 extends Component {

  state = {
    value: undefined,
    treeData: [],
  }

  componentDidMount() {
    this.getClass()
  }

  getClass() {
    const { dispatch } = this.props;
    dispatch({
      type: 'schoolClass/reqCommon',
      service: 'getClass',
      payload: {}
    })
  }

  onChange = (value) => {
    this.setState({ value });
  }


  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} dataRef={item} />;
  })

  // 提交数据
  handleSubmit = () => {
    const { dispatch, form, location } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const { ClassId, ScoreType, State, Time } = fieldsValue;
      let data = { StartTime: null, EndTime: null, ClassId: [], State: null}
      data.StartTime = moment(Time[0]).format('YYYY-MM-DD HH:mm:ss');
      data.EndTime = moment(Time[1]).format('YYYY-MM-DD HH:mm:ss');
      ClassId.map(item => {
        data.ClassId.push({Id: item.slice(0, item.length-1), Type: item.slice(-1)});
      })
      data.ClassId = JSON.stringify(data.ClassId);
      data.State = State;
      data.ScoreType = ScoreType;
      data.Id = location.query.id;
      dispatch({
        type: 'questionnaireManage/reqCommon',
        service: 'addThird',
        payload: data,
        callback: () => {
          message.success('操作成功');
          router.push('/questionnaire/list')
        }
      });
    });
  }

  render() {
    const { form, getClass } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const treeData = [];
    if (getClass) getClass.forEach(item => {
      treeData.push({
        title: item.ClassName,
        value: item.ClassId,
        key: item.ClassId,
        disabled: true,
        children: [{title: `${item.ClassName}学生`,value: `${item.ClassId}A`, key: `${item.ClassName}学生`}, {title: `${item.ClassName}家长`,value: `${item.ClassId}B`, key: `${item.ClassName}家长2`}, {title: `${item.ClassName}学生和家长`,value: `${item.ClassId}C`, key: `${item.ClassName}学生和家长3`}]
      })
    });
    return (
      <Form>
        <Form.Item
          {...formItemLayout}
          label="学分"
        >
          {getFieldDecorator('ScoreType', {
            rules: [{ required: true, message: '必填项' }],
          })(
            <Radio.Group>
              <Radio value="1">0学分</Radio>
              <Radio value="2">使用区级管理员默认学分设置</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="选择班级"
        >
          {getFieldDecorator('ClassId', {
            rules: [{ required: true, message: '必选项' }],
          })(
            <TreeSelect
              showSearch
              style={{ width: 350 }}
              placeholder="请选择班级"
              allowClear
              multiple
              onChange={this.onChange}
              loadData={this.onLoadData}
            >
              {this.renderTreeNodes(this.state.treeData)}
            </TreeSelect>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="选择时间"
        >
          {getFieldDecorator('Time', {
            rules: [{ required: true, message: '必选项' }],
          })(
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="状态"
        >
          {getFieldDecorator('State', {
            rules: [{ required: true, message: '必填项' }],
          })(
            <Radio.Group>
              <Radio value="1">开放</Radio>
              <Radio value="3">可修改</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 12, offset: 8 }}
        >
          <Button onClick={this.handleSubmit} type="primary">完成</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Step3;
