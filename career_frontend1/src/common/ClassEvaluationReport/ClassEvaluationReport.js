import React, { Component, Fragment } from 'react';
import { Row, Col, Progress, Divider, Form, Tooltip, Icon } from 'antd';
import router from 'umi/router';
import styles from './ClassEvaluationReport.less';

@Form.create()
class ClassEvaluationReport extends Component{

  state = {
    data: null,
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      data:nextProps.data
    }
  }

  handleDetail = (id) => {
    const { classId } = this.props;
    const name = window.localStorage.getItem('antd-pro-authority')
    if(name && name.slice(2, name.length-2) === 'teacher') {
      router.push(`/examManage/detail?id=${id}&classId=${classId}`);
    } else {
      router.push(`/class-report/class-report-detail?id=${id}&classId=${classId}`);
    }
  }

  renderTable = (data) => (
      data ?
        <Row gutter={24} className={styles.rowUl}>
          {data.map( item =>
            <Col key={item.Id} xl={12} lg={24}>
              <div className={styles.ul}>
                <div className={styles.title}>
                  <span>{item.Name}{<Tooltip title={item.State === 1 || item.State === 2 ? '该图展示了每种类型的人数和占比':'该图展示了每种类型的班级平均得分'}><Icon style={{marginLeft: 6}} type="question-circle" /></Tooltip>}</span>
                  <a onClick={() => this.handleDetail(item.Id)}>已测人数：{item.Code.AllNum}人</a>
                </div>
                <Divider />
                <ul className={styles.list}>
                  {
                    item.Code.Data.map((score, index) => (
                      <li key={score.Id}>
                        <div className={styles.line}>
                          <span className={styles.first}>{score.Name}</span>
                          <span className={styles.second}><Progress percent={score.Score} format={() => item.State === 1 || item.State === 2 ? `${score.Score}%` : score.Score} strokeColor={item.State === 1 || item.State === 2 ? (index % 2 === 0 ? '#3591fa' : '#ebac61') : '#3591fa'} /></span>
                          {item.State === 1 || item.State === 2 ? <span className={styles.third}>{score.Num}</span> : ''}
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </Col>
          )}
        </Row> : null
    )

  render() {
    const { data } = this.state;
    return (
      <div className={styles.content}>
        {data ?
          <Fragment>
            <h4 style={{marginTop: 10}}>班级总人数：{data.StudentCount}</h4>
            <h4>班级测评总体情况：</h4>
            {this.renderTable(data.EvaluationStudentData)}
          </Fragment> : null}
      </div>
    )
  }
}

export default ClassEvaluationReport;
