import React, { Component, Suspense } from 'react';
import { Form, Row, Col, Icon } from 'antd';
import { connect } from 'dva';
// import Link from 'umi/link';

import styles from './Evaluation.less'
import PieChart from '../../pages/Student/Evaluation/Chart/PieChart';
import BarChart from '../../pages/Student/Evaluation/Chart/BarChart';
import BarScoreChart from '../../pages/Student/Evaluation/Chart/BarScoreChart';


@Form.create()
@connect(({ evaluation, loading }) => ({
  careeredit: evaluation.careeredit,
  careerAbility: evaluation.careerAbility,
  careerInterest: evaluation.careerInterest,
  scoreRank: evaluation.scoreRank,
  loading: loading.models.evaluation,
}))
class Evaluation extends Component {

  componentDidMount() {
    const { data } = this.props;
    this.getScoreData(data.Id);
    this.getAbilityData(data.Id);
    this.getCareerInterest(data.Id);
    this.getMyScoreRank(data.Id);
  }

  getScoreData(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'evaluation/reqCommon',
      service: 'getMyCareeredit',
      payload: {
        StudentId: id
      }
    })
  }

  getAbilityData(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'evaluation/reqCommon',
      service: 'getMyCareerAbility',
      payload: {
        StudentId: id
      }
    })
  }

  getCareerInterest(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'evaluation/reqCommon',
      service: 'getMyCareerInterest',
      payload: {
        StudentId: id
      }
    })
  }

  getMyScoreRank(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'evaluation/reqCommon',
      service: 'getMyScoreRank',
      payload: {
        StudentId: id
      }
    })
  }


  render() {
    const { careeredit, careerAbility, careerInterest, scoreRank } = this.props;
    return (
      <Row gutter={24}>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <div className={styles.list}>
            <Row>
              <Col span={12}><h3>生涯学分</h3></Col>
              <Col span={12} style={{textAlign: 'right', cursor: 'pointer'}}>
                {/*<Link to="/evaluation/career-credit">查看更多<Icon type="double-right" /></Link>*/}
              </Col>
            </Row>
            <Row>
              <Col>
                <div className={styles.chart}>
                  <PieChart data={careeredit} />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <div className={styles.list}>
            <Row>
              <Col span={12}><h3>生涯能力</h3></Col>
              {/*<Col span={12} style={{textAlign: 'right', cursor: 'pointer'}}><Link to="/evaluation/career-ability">查看更多<Icon type="double-right" /></Link></Col>*/}
            </Row>
            <Row>
              <Col>
                <div className={styles.chart}>
                  <PieChart data={careerAbility} />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <div className={styles.list}>
              <Row>
                <Col span={12}><h3>生涯兴趣</h3></Col>
                {/*<Col span={12} style={{textAlign: 'right', cursor: 'pointer'}}><Link to="/evaluation/career-interest">查看更多<Icon type="double-right" /></Link></Col>*/}
              </Row>
              <Row>
                <Col>
                  <div className={styles.chart}>
                    <BarChart data={careerInterest} />
                  </div>
                </Col>
              </Row>
            </div>
          </Suspense>
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <div className={styles.list}>
              <Row>
                <Col span={12}><h3>成绩排名</h3></Col>
              </Row>
              <Row>
                <Col>
                  <div className={styles.chart}>
                    <BarScoreChart data={scoreRank} />
                  </div>
                </Col>
              </Row>
            </div>
          </Suspense>
        </Col>
      </Row>
    )
  }
}

export default Evaluation;
