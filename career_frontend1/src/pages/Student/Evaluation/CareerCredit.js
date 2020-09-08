import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Evaluation.less';
import PieChart from './Chart/PieChart';

@connect(({ evaluation, loading }) => ({
  careerreditDetail: evaluation.careerreditDetail,
  loading: loading.models.evaluation,
}))
class CareerCredit extends Component {

  componentDidMount() {
    this.getScoreDetail();
  }

  getScoreDetail() {
    const { dispatch } = this.props;
    dispatch({
      type: 'evaluation/reqCommon',
      service: 'getMyCareerreditDetail',
    })
  }

  render() {
    const { careerreditDetail } = this.props;

    return (
      <PageHeaderWrapper title="我的生涯学分" back="true">
        <Row gutter={24}>
          { careerreditDetail ? careerreditDetail.map(item => (
            <Col key={item.Id} xl={12} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.list}>
                <div className={styles.chart}>
                  <PieChart data={item} />
                </div>
                <div>
                  <h4 style={{textAlign: 'center'}}>学段：{item.Name}</h4>
                </div>
              </div>
            </Col>
          )) : null }
        </Row>
      </PageHeaderWrapper>
    )
  }
}

export default CareerCredit;
