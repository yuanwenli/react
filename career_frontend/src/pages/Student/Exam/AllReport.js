import React, { Component, Fragment } from 'react';
import { Form, Select, Button, List, Card, Modal } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './Exam.less';
import HReport from './HReport';
import HReportDetail from './HReportDetail';
import MReport from './MReport';
import MReportDetail from './MReportDetail';
import XReport from './XReport';
import XReportDetail from './XReportDetail';
import CReport from './CReport';
import CReportDetail from './CReportDetail';
import DReport from './DReport';
import DReportDetail from './DReportDetail';


const { Option } = Select;

@connect(({ studentExam, loading }) => ({
  listData: studentExam.listData,
  reportData: studentExam.reportData,
  loading: loading.models.studentExam,
}))
@Form.create()
class AllReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      name: '',
      type: null
    };
  }

  componentDidMount() {
    const { data } = this.props;
    const sendData = data ? data.Id : null
    this.getListData(sendData);
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.reportData) {
      this.setState({listData: nextProps.listData});
    }
  }

  // componentDidUpdate() {
  //   console.log(this.props)
  // }

  getListData(id) {
    console.log(id)
    const { dispatch } = this.props;
    dispatch({
      type: 'studentExam/reqCommon',
      service: 'getList',
      payload: {
        StudentId: id
      },
    });
  }

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleCheckReport = (val, id, type, index) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'studentExam/reqCommon',
      service: 'getReport',
      payload: {
        Id: val.StudentEvaluationId,
        Time: id
      },
      callback: () => {
        const { reportData } = this.props;
        const { listData } = this.state;
        const data = listData;
        if(type) {
          data[index].TestData = reportData.TestData;
          this.setState({
            listData: data
          })
        } else {
          this.setState({
            visible: true,
            name: val.Test,
            type: val.EvaluationState,
          });
        }
      }
    })
  };

  // 切换时间
  handleTimeChange = (e, id, index) => {
    const data = {
      StudentEvaluationId: e
    }
    this.handleCheckReport(data, id, 1, index);
  };

  handleStartTest = (id, listId) => {
    router.push(`/exam/title?id=${id}&listId=${listId}`);
  }

  renderReportDetail = (data) => {
    const { type } = this.state;
    switch (type) {
      case 1:
        return <HReportDetail data={data} />;
      case 2:
        return <MReportDetail data={data} />;
      case 3:
        return <XReportDetail data={data} />;
      case 4:
        return <CReportDetail data={data} />;
      case 5:
        return <DReportDetail data={data} />;
      default:
        return null;
    }
  }

  renderReport = (data) => {
    switch (data.EvaluationState) {
      case 1:
        return <HReport data={data.TestData} />;
      case 2:
        return <MReport data={data.TestData} />;
      case 3:
        return <XReport data={data.TestData} />;
      case 4:
        return <CReport data={data.TestData} />;
      case 5:
        return <DReport data={data.TestData} />;
      default:
        return null;
    }
  }

  render() {
    const { visible, name, listData } = this.state;
    const { reportData, data } = this.props;

    return (
      <Fragment>
        <Modal
          title={name}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={700}
        >
          { this.renderReportDetail(reportData)}
        </Modal>
        {listData ? <List
          grid={{
            gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 2, xxl: 2,
          }}
          dataSource={listData}
          renderItem={(item, index) => (
            <List.Item>
              <Card>
                <div className={styles.list}>
                  <div className={styles.test}>
                    <h3>{item.Test}</h3>
                    { !data &&
                    <Button
                      style={{ marginLeft: '10px' }}
                      type='primary'
                      onClick={() => this.handleStartTest(item.EvaluationId, item.Id)}
                    >开始测试
                    </Button> }
                  </div>
                  {item.State === 1 ?
                    <div className={styles.test}>
                      <Select style={{ width: 200 }} placeholder="请选择时间" onSelect={(e) => this.handleTimeChange(e, item.EvaluationId, index)}>
                        {item.HaveDone.map(time => <Option key={time.Id} value={time.Id}>{time.CreaTime}</Option>)}
                      </Select>
                      <Button
                        style={{ marginLeft: '10px' }}
                        type='primary'
                        onClick={() => this.handleCheckReport(item)}
                      >查看报告
                      </Button>
                    </div> : ''
                  }
                  <div className={styles.chart}>
                    { this.renderReport(item, index) }
                    <div dangerouslySetInnerHTML={{__html: item.Content}} />
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        /> : ''}
      </Fragment>
    );
  }
}

export default AllReport;
