import React, { Component } from 'react';
import { Timeline, Button, message, Divider, Tooltip, Icon} from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import BarChart from './Chart/BarChart';
import YearBarChart from './Chart/YearBarChart'
import styles from './Evaluation.less';

@connect(({ evaluation, loading }) => ({
  careerInterestDetail: evaluation.careerInterestDetail,
  careerTimeScore: evaluation.careerTimeScore,
  careerYearScore: evaluation.careerYearScore,
  loading: loading.models.evaluation,
}))
class CareerInterest extends Component {

  state= {
    page: 1,
    pageCount: 5,
    careerInterestDetail: [],
  }

  static getDerivedStateFromProps(nextProps, preState) {
    const { careerInterestDetail } = nextProps;
    if(careerInterestDetail && careerInterestDetail.list && preState.page === 1) {
      return {
        careerInterestDetail: [...careerInterestDetail.list]
      }
    }
    return null;
  }

  componentDidMount() {
    this.getCareerNode();
    this.getCareerTimeScore();
    this.getCareerYearScore();
  }

  getCareerNode() {
    const { dispatch } = this.props;
    const { page, pageCount } = this.state;
    dispatch({
      type: 'evaluation/reqCommon',
      service: 'getMyCareerInterestDetail',
      payload: {
        Page: page,
        PageCount: pageCount,
      }
    })
  }

  getCareerTimeScore(val) {
    const { dispatch } = this.props;
    dispatch({
      type: 'evaluation/reqCommon',
      service: 'getCareerTimeScore',
      payload: {
        Time: val
      }
    })
  }

  getCareerYearScore() {
    const { dispatch } = this.props;
    dispatch({
      type: 'evaluation/reqCommon',
      service: 'getCareerYearScore'
    })
  }

  handleTimeChange = (val) => {
    this.getCareerTimeScore(val)
  }

  handleLoadMore = () => {
    const { dispatch } = this.props;
    const { page, pageCount, careerInterestDetail } = this.state;
    const preData = careerInterestDetail;
    dispatch({
      type: 'evaluation/reqCommon',
      service: 'getMyCareerInterestDetail',
      payload: {
        Page: page+1,
        PageCount: pageCount,
      },
      callback: () => {
        if(this.props.careerInterestDetail && this.props.careerInterestDetail.list) {
          this.props.careerInterestDetail.list.forEach(item => {
            preData.push(item)
          })
        } else {
          message.info('没有更多了')
        }
        this.setState({
          careerInterestDetail: preData,
          page: this.state.page + 1
        })
      }
    })
  }

  renderTimeLine = (val) => val.map(item => <Timeline.Item key={item.Id}><a onClick={() => this.handleTimeChange(item.CreaTime)}>{item.CreaTime}&nbsp;&nbsp;&nbsp;&nbsp;{item.ActivityName}</a></Timeline.Item>)

  render() {
    const { careerInterestDetail } = this.state;
    const { careerTimeScore, careerYearScore } = this.props;

    return(
      <PageHeaderWrapper title="我的生涯兴趣" back="true">
        <div style={{padding: 20, background: '#fff'}}>
          <h3 style={{marginBottom: 30}}>各时间段生涯活动
            <Tooltip title="下面展示了各个时间段的生涯活动，点击时间，可查看这个时间点的生涯兴趣得分（如右边图表所示），该得分是截止该时间点的累计得分。">
              <Icon style={{marginLeft: 6}} type="question-circle" />
            </Tooltip>
          </h3>
          <div className={styles.interest}>
            <div>
              <Timeline>
                { careerInterestDetail && careerInterestDetail.length > 0 && this.renderTimeLine(careerInterestDetail)}
              </Timeline>
              <Button type="primary" onClick={this.handleLoadMore}>加载更多</Button>
            </div>
            <div style={{width: 400}}>
              <BarChart data={careerTimeScore} />
            </div>
          </div>
          <Divider />
          <h3>各年份生涯兴趣对比图</h3>
          <YearBarChart data={careerYearScore} />
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default CareerInterest;
