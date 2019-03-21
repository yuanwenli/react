import React, { Component, Suspense } from 'react';
import { Row, Col, Icon } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Link from 'umi/link';
import PieChart from './Chart/PieChart';
import BarChart from './Chart/BarChart';
import BarScoreChart from './Chart/BarScoreChart'

import styles from './Evaluation.less'

@connect(({ evaluation, loading }) => ({
  careeredit: evaluation.careeredit,
  careerAbility: evaluation.careerAbility,
  careerInterest: evaluation.careerInterest,
  scoreRank: evaluation.scoreRank,
  loading: loading.models.evaluation,
}))
class Evaluation extends Component {

  componentDidMount() {
    this.getScoreData();
    this.getAbilityData();
    this.getCareerInterest();
    this.getMyScoreRank();
  }

  getScoreData() {
    const { dispatch } = this.props;
    dispatch({
      type: 'evaluation/reqCommon',
      service: 'getMyCareeredit',
    })
  }

  getAbilityData() {
    const { dispatch } = this.props;
    dispatch({
      type: 'evaluation/reqCommon',
      service: 'getMyCareerAbility',
    })
  }

  getCareerInterest() {
    const { dispatch } = this.props;
    dispatch({
      type: 'evaluation/reqCommon',
      service: 'getMyCareerInterest'
    })
  }

  getMyScoreRank() {
    const { dispatch } = this.props;
    dispatch({
      type: 'evaluation/reqCommon',
      service: 'getMyScoreRank'
    })
  }

  renderGrade = (val) => {
    if(val) {
      switch (val) {
        case 1:
          return <span>小学</span>;
        case 2:
          return <span>初中</span>;
        case 3:
          return <span>高中</span>;
        default:
          return null;
      }
    }
    return null;
  }

  render() {

    const { careeredit, careerAbility, careerInterest, scoreRank } = this.props;

    return (
      <PageHeaderWrapper title="生涯综合评估" onTabChange={this.handleTabChange}>
        <h2>当前学段： { careeredit && this.renderGrade(careeredit.XueDuan)}</h2>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <div className={styles.list}>
              <Row>
                <Col span={12}><h3>我的生涯学分</h3></Col>
                <Col span={12} style={{textAlign: 'right', cursor: 'pointer'}}>
                  <Link to="/evaluation/career-credit">查看更多<Icon type="double-right" /></Link>
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
                <Col span={12}><h3>我的生涯能力</h3></Col>
                <Col span={12} style={{textAlign: 'right', cursor: 'pointer'}}><Link to="/evaluation/career-ability">查看更多<Icon type="double-right" /></Link></Col>
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
                  <Col span={12}><h3>我的生涯兴趣</h3></Col>
                  <Col span={12} style={{textAlign: 'right', cursor: 'pointer'}}><Link to="/evaluation/career-interest">查看更多<Icon type="double-right" /></Link></Col>
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
                  <Col span={12}><h3>我的成绩排名</h3></Col>
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
      </PageHeaderWrapper>
    )
  }
}

export default Evaluation;
