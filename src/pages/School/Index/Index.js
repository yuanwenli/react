import React, { PureComponent, Suspense } from 'react';
import { Row, Col, Modal } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import BarChart from './BarChart';
import BarChart2 from './BarChart2';

import styles from './Index.less';

@connect(({ statistics, loading }) => ({
  schoolScore: statistics.schoolScore,
  schoolInterest: statistics.schoolInterest,
  schoolAbility: statistics.schoolAbility,
  signalInterest: statistics.signalInterest,
  loading: loading.models.statistics,
}))
class Index extends PureComponent {

  state = {
    visible: false
  }

  componentDidMount() {
    this.getAbilityData();
    this.getScoreData();
    this.getCareerInterest();
  }

  getScoreData() {
    const { dispatch } = this.props;
    dispatch({
      type: 'statistics/reqCommon',
      service: 'schoolScore',
    })
  }

  getAbilityData() {
    const { dispatch } = this.props;
    dispatch({
      type: 'statistics/reqCommon',
      service: 'schoolAbility',
    })
  }

  getCareerInterest() {
    const { dispatch } = this.props;
    dispatch({
      type: 'statistics/reqCommon',
      service: 'schoolInterest'
    })
  }

  renderAbility = (schoolAbility) => schoolAbility.map(item =>
    <Col key={item.GradeId} xl={12} lg={24} md={24} sm={24} xs={24}>
      <div className={styles.list}>
        <Row>
          <Col span={12}><h3>{item.GradeName}生涯能力统计</h3></Col>
        </Row>
        <Row>
          <Col>
            <div className={styles.chart}>
              <BarChart2 type="ability" data={item.AbilityData} />
            </div>
          </Col>
        </Row>
      </div>
    </Col>
    )

  renderInterest = (signalInterest) => signalInterest.map(item =>
    <Col key={item.Id} span={24}>
      <div className={styles.list}>
        <Row>
          <Col span={12}><h3>{item.Name}生涯能力统计</h3></Col>
        </Row>
        <Row>
          <Col>
            <div className={styles.chart}>
              <BarChart2 type="score" data={item.GradeInfo} />
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  )

  handleOk = () => {
    this.setState({
      visible: false
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleMore = () => {
    this.setState({
      visible: true
    })
    const { dispatch } = this.props;
    dispatch({
      type: 'statistics/reqCommon',
      service: 'signalInterest'
    })
  }

  render() {
    const { schoolScore, schoolAbility, schoolInterest, signalInterest } = this.props;
    const { visible } = this.state;

    return (
      <PageHeaderWrapper title="首页" onTabChange={this.handleTabChange}>
        <Modal
          title="生涯兴趣报告"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className={styles.chart}>
            { signalInterest && this.renderInterest(signalInterest) }
          </div>
        </Modal>
        <div style={{padding: 20, background: '#fff'}}>
          <Row gutter={24}>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.list}>
                <Row>
                  <Col span={12}><h3>生涯学分统计</h3></Col>
                </Row>
                <Row>
                  <Col>
                    <div className={styles.chart}>
                      <BarChart type="score" data={schoolScore} />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            { schoolAbility && this.renderAbility(schoolAbility) }
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <div className={styles.list}>
                  <Row>
                    <Col span={12}><h3>生涯兴趣统计</h3></Col>
                    <Col span={12} style={{textAlign: 'right'}}><a onClick={this.handleMore}>查看更多</a></Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className={styles.chart}>
                        <BarChart type="interest" data={schoolInterest} />
                      </div>
                    </Col>
                  </Row>
                </div>
              </Suspense>
            </Col>
          </Row>
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default Index;
