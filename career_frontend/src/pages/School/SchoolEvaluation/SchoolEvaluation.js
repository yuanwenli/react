import React, { Component } from 'react';
import { Form, Table, Divider, Modal, DatePicker, Select, message } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import styles from './SchoolEvaluation.less';

const { RangePicker } = DatePicker;
const { Option } = Select;

@Form.create()
@connect(({ schoolEvaluation, loading }) => ({
  getList: schoolEvaluation.getList,
  preview: schoolEvaluation.preview,
  selectClass: schoolEvaluation.selectClass,
  loading: loading.models.schoolEvaluation,
}))
class SchoolEvaluation extends Component {

  state = {
    visible: false,
    visibleOpen: false,
    evaluateId: '',
  }

  componentDidMount() {
    this.getListData();
  }

  // 初始化表格数据
  getListData() {
    const { dispatch } = this.props;
    const param = { };
    dispatch({
      type: 'schoolEvaluation/reqCommon',
      service: 'getList',
      payload: param,
    });
  }

  columns = () => [
    {
      title: '名称',
      dataIndex: 'Test',
      key: 'Test',
    },
    {
      title: '学生人数',
      dataIndex: 'StudentCount',
      key: 'StudentCount',
    },
    {
      title: '操作',
      render: (record) => (
        <span>
          <a onClick={() => this.handleOpen(record)}>开放量表</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleDetail(record)}>查看详情</a>
          <Divider type="vertical" />
          <a onClick={() => this.handlePreview(record)}>预览量表</a>
        </span>
      )
    }
  ]

  handleOpen = (val) => {
    this.setState({
      visibleOpen: true,
      evaluateId: val.EvaluationId
    })
    this.selectClass(val.Id)
  }

  handleDetail = (val) => {
    router.push(`/school-evaluation/detail?id=${val.Id}`);
  }

  handlePreview = (val) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'schoolEvaluation/reqCommon',
      service: 'preview',
      payload: {
        EvaluationId: val.EvaluationId,
      },
      callback: () => {
        this.setState({
          visible: true,
        })
      }
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleOk = () => {
    this.setState({
      visible: false
    })
  }

  handleOpenCancel = () => {
    this.setState({
      visibleOpen: false
    })
  }

  handleOpenOk = () => {
    const { dispatch, form } = this.props;
    const { evaluateId } = this.state;
    form.validateFields((err, fieldsValue) => {
      if(err) return;
      const { Time, ClassId } = fieldsValue;
      const data = {
        ClassId: []
      };
      if(Time) {
        data.StartTime = moment(Time[0]).format('YYYY-MM-DD HH:mm:ss');
        data.EndTime = moment(Time[1]).format('YYYY-MM-DD HH:mm:ss');
      }
      data.EvaluationId = evaluateId;
      ClassId.forEach(item => {
        const val = item.split('&');
        data.ClassId.push({Id: val[0], Name: val[1]});
      })
      data.ClassId = JSON.stringify(data.ClassId);
      dispatch({
        type: 'schoolEvaluation/reqCommon',
        service: 'sendEvaluation',
        payload: data,
        callback: (res) => {
          if(res.ok === "4000") {
            message.success(res.data.Success.join('、'));
            this.setState({
              visibleOpen: false
            })
          }
        }
      })
    })
  }

  changeTime = (val) => {
    const { form, dispatch } = this.props;
    const { evaluateId } = this.state;
    dispatch({
      type: 'schoolEvaluation/reqCommon',
      service: 'selectClass',
      payload: {
        EvaluationId: evaluateId,
        StartTime: moment(val[0]).format('YYYY-MM-DD HH:mm:ss'),
        EndTime: moment(val[1]).format('YYYY-MM-DD HH:mm:ss')
      }
    })
    form.resetFields('ClassId');
  }

  selectClass(id) {
    const { dispatch } = this.props;
    const param = {
      EvaluationId: id
    };
    dispatch({
      type: 'schoolEvaluation/reqCommon',
      service: 'selectClass',
      payload: param,
    });
  }

  render() {

    const { getList, preview, form, selectClass } = this.props;
    const { visible, visibleOpen } = this.state;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
      },
    };

    return (
      <PageHeaderWrapper title="测评列表">
        <Modal
          title="预览量表"
          visible={visible}
          onOk={this.handleOk}
          destroyOnClose="true"
          width={600}
          onCancel={this.handleCancel}
        >
          {preview ? preview.map((item, index) => (
            <div key={item.Id} className={styles.list}>
              <p>{index + 1}、{item.Name}</p>
              {item.Stem.map(val => (
                <p key={val.Id} style={{marginLeft: 20}}>{val.Id}、{val.Name}</p>
              ))}
            </div>
          )) : ''}
        </Modal>
        <Modal
          title="开放量表"
          visible={visibleOpen}
          onOk={this.handleOpenOk}
          destroyOnClose="true"
          width={600}
          onCancel={this.handleOpenCancel}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              {...formItemLayout}
              label="开始时间和结束时间："
            >
              {getFieldDecorator('Time', {
                rules: [{ required: true, message: '必选项' }],
              })(
                <RangePicker
                  format="YYYY-MM-DD HH:mm:ss"
                  disabledDate={this.disabledDate}
                  onChange={this.changeTime}
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                  }}
                />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="选择班级："
            >
              {getFieldDecorator('ClassId', {
                rules: [{ required: true, message: '必选项' }],
              })(
                <Select style={{width: 200}} mode="multiple">
                  {
                    selectClass?selectClass.map(item => <Option value={`${item.Id}&${item.ClassName}`} key={item.Id}>{item.ClassName}</Option>):null
                  }
                </Select>
              )}
            </Form.Item>
          </Form>
        </Modal>
        <div style={{background: '#fff', padding: '20'}}>
          { getList && getList?<Table pagination={{total: 15}} columns={this.columns()} rowKey="Id" dataSource={getList} />:<Table pagination={{total: 0}} columns={this.columns()} dataSource={[]} />}
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default SchoolEvaluation;
