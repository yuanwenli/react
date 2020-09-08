import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Radio, Button, Select, Divider, Row, Col, message, Modal } from 'antd';
import router from 'umi/router';
import styles from './Step2.less';

const { Option } = Select;
const RadioGroup = Radio.Group;

@connect(({ questionnaireManage, loading }) => ({
  preview: questionnaireManage.preview,
  loading: loading.models.questionnaireManage,
}))
@Form.create()
class Step2 extends Component {

  state = {
    allData: [],
    nowIndex: 1,
    defaultValue: null,
    visible: false
  }

  componentDidMount() {
    // 编辑，获取数据
    const { location } = this.props;
    if(parseInt(location.query.isEdit, 10) === 1) {
      const { dispatch } = this.props;
      dispatch({
        type: 'questionnaireManage/reqCommon',
        service: 'preview',
        payload: {
          Id: this.props.location.query.id,
        },
        callback: () => {
          this.setState({
            allData: this.props.preview.subject,
          }, () => {
            this.setState({
              defaultValue: this.state.allData[0]
            })
          })
        }
      });
    }
  }

  handleTitle = () => {
    const { nowIndex, allData } = this.state;
    const { form } = this.props;
    // 下一题已存在，直接进入下一题
    if(nowIndex <= allData.length) {
      this.setState({
        nowIndex: parseInt(this.state.nowIndex, 10) + 1,
        defaultValue: this.state.allData[nowIndex]
      })
      return;
    }
    // 不存在，创建新模板
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        allData: [...this.state.allData, fieldsValue],
        nowIndex: parseInt(this.state.nowIndex, 10) + 1
      })
      form.resetFields();
    });
  }

  // 进行下一步
  handleFinish = () => {
    const data = [];
    const { dispatch } = this.props;
    this.state.allData.map(item => {
      const formData = {};
      const { IfMust, Title, IfSingle} = item;
      let { Option } = item;
      // 去除空值
      Option = Option.filter((s) => s && s.trim());
      Object.assign(formData, {IfMust, Title, IfSingle, Option});
      data.push(formData)
    })
    dispatch({
      type: 'questionnaireManage/reqCommon',
      service: 'addSecond',
      payload: {
        Id: this.props.location.query.id,
        SubjectInfo: JSON.stringify(data)
      },
      callback: () => {
        message.success('操作成功');
        const name = window.localStorage.getItem('antd-pro-authority');
        if(name && name.slice(2, name.length-2) === 'school') {
          router.push(`/school-questionnaireManage/add/step3?id=${this.props.location.query.id}`);
        }
        if(name && name.slice(2, name.length-2) === 'teacher') {
          router.push(`/teacher-questionnaireManage/add/step3?id=${this.props.location.query.id}`);
        }
        if(name && name.slice(2, name.length-2) === 'headTeacher') {
          router.push(`/questionnaire/add/step3?id=${this.props.location.query.id}`);
        }

      }
    });
  }

  // 保存问卷
  handleSave = () => {
    const data = [];
    const { dispatch } = this.props;
    this.state.allData.map(item => {
      const formData = {};
      const { IfMust, Title, IfSingle} = item;
      let { Option } = item;
      // 去除空值
      Option = Option.filter((s) => s && s.trim());
      Object.assign(formData, {IfMust, Title, IfSingle, Option});
      data.push(formData)
    })
    dispatch({
      type: 'questionnaireManage/reqCommon',
      service: 'addSecond',
      payload: {
        Id: this.props.location.query.id,
        SubjectInfo: JSON.stringify(data)
      },
      callback: () => {
        message.success('操作成功');
      }
    });
  }

  handlePreview = () => {
    const { location } = this.props;
    this.setState({
      visible: true
    })
    const { dispatch } = this.props;
    dispatch({
      type: 'questionnaireManage/reqCommon',
      service: 'preview',
      payload: {
        Id: location.query.id,
      },
      callback: () => {

      }
    });
  }

  // 预览题目
  renderTitle = (preview) => {
    if(preview && preview.subject) {
      return preview.subject.map((item, index) =>
        <div key={index} className={styles.list}>
          <p>{index+1}、{item.Title}</p>
          <RadioGroup>
            {item.Option.map((option, index) => <Radio value={option} key={index}>{option}</Radio>)}
          </RadioGroup>
        </div>
      )
    }
      return null;
  }

  handleOk = () => {
    router.push(`/questionnaireManage/add/step3?id=${this.props.location.query.id}`)
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  // 选择题号，显示对应的题目
  handleChange = (value) => {
    this.setState({
      nowIndex: value,
      defaultValue: this.state.allData[value - 1]
    })
  }

  // 题目的选项
  renderOption = () => {
    const { allData } = this.state;
    const children = [];
    for (let i = 0; i < allData.length+1; i++) {
      children.push(<Option key={i+1}>{i+1}</Option>);
    }
    return children;
  }

  render() {
    const { form, preview } = this.props;
    const { getFieldDecorator } = form;
    const { nowIndex, defaultValue, visible } = this.state;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    return (
      <div>
        {preview?
          (
            <Modal
              title={preview.info.Name}
              visible={visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              okText="进行下一步"
              cancelText="取消"
              width="800px"
            >
              {this.renderTitle(preview)}
            </Modal>
          )
          :''}
        <Row>
          <Col offset={6}>
            当前题号：
            <Select value={nowIndex} style={{ width: 120 }} onChange={this.handleChange}>
              {this.renderOption()}
            </Select>
            <Button style={{marginLeft: 10}} onClick={this.handleSave} type="primary">保存问卷</Button>
            <Button style={{marginLeft: 10}} onClick={this.handlePreview} type="primary">预览问卷</Button>
          </Col>
        </Row>
        <Divider />
        <Form>
          <Form.Item label="题目" {...formItemLayout}>
            {getFieldDecorator('Title', {
              initialValue: defaultValue ? defaultValue.Title : '',
              rules: [{ required: true, message: '必填项' }],
            })(
              <Input placeholder="请输入题目" />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="是否必选"
          >
            {getFieldDecorator('IfMust', {
              initialValue: "1",
              rules: [{ required: true, message: '必填项' }],
            })(
              <Radio.Group>
                <Radio value="1">是</Radio>
                <Radio value="2">否</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="是否单选"
          >
            {getFieldDecorator('IfSingle', {
              initialValue: "1",
              rules: [{ required: true, message: '必填项' }],
            })(
              <Radio.Group>
                <Radio value="1">是</Radio>
                <Radio value="2">否</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="选项A" {...formItemLayout}>
            {getFieldDecorator('Option[0]', {
              initialValue: defaultValue&&defaultValue.Option[0] ? defaultValue.Option[0] : '',
              rules: [{ required: true, message: '必填项' }],
            })(
              <Input placeholder="请输入选项A" />
            )}
          </Form.Item>
          <Form.Item label="选项B" {...formItemLayout}>
            {getFieldDecorator('Option[1]', {
              initialValue: defaultValue&&defaultValue.Option[1] ? defaultValue.Option[1] : '',
              rules: [{ required: true, message: '必填项' }],
            })(
              <Input placeholder="请输入选项B" />
            )}
          </Form.Item>
          <Form.Item label="选项C" {...formItemLayout}>
            {getFieldDecorator('Option[2]', {
              initialValue: defaultValue&&defaultValue.Option[2] ? defaultValue.Option[2] : '',
            })(
              <Input placeholder="请输入选项C（如有需要）" />
            )}
          </Form.Item>
          <Form.Item label="选项D" {...formItemLayout}>
            {getFieldDecorator('Option[3]', {
              initialValue: defaultValue&&defaultValue.Option[3] ? defaultValue.Option[3] : '',
            })(
              <Input placeholder="请输入选项D（如有需要）" />
            )}
          </Form.Item>
          <Form.Item label="选项E" {...formItemLayout}>
            {getFieldDecorator('Option[4]', {
              initialValue: defaultValue&&defaultValue.Option[4] ? defaultValue.Option[4] : '',
            })(
              <Input placeholder="请输入选项E（如有需要）" />
            )}
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 12, offset: 8 }}
          >
            <Button onClick={this.handleTitle} type="primary">保存该题</Button>
            <Button style={{marginLeft: 10}} onClick={this.handleFinish} type="primary">下一步</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Step2;
