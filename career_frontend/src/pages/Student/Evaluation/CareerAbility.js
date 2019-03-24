import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Divider } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PieChart from './Chart/PieChart';
import YearBarChart from './Chart/YearBarChart';
import styles from './Evaluation.less';

const { Option } = Select;

@connect(({ evaluation, loading }) => ({
  careerAbilityDetail1: evaluation.careerAbilityDetail1,
  careerAbilityDetail2: evaluation.careerAbilityDetail2,
  loading: loading.models.evaluation,
}))
class CareerAbility extends Component {

  componentDidMount() {
    this.getMyCareerAbilityDetail1();
    this.getMyCareerAbilityDetail2();
  }

  getMyCareerAbilityDetail1(time) {
    const { dispatch } = this.props;
    dispatch({
      type: 'evaluation/reqCommon',
      service: 'getMyCareerAbilityDetail1',
      payload: {
        Time: time
      }
    })
  }

  getMyCareerAbilityDetail2() {
    const { dispatch } = this.props;
    dispatch({
      type: 'evaluation/reqCommon',
      service: 'getMyCareerAbilityDetail2',
    })
  }

  handleChange = (val) => {
    this.getMyCareerAbilityDetail1(val)
  }

  renderScore = (val) => val.map(item => <p key={item.Id}><span>{item.Name}：{item.Score}</span>&nbsp;&nbsp;&nbsp;&nbsp;自我评分：{item.StudentScore}&nbsp;&nbsp;&nbsp;&nbsp;班主任评分：{item.HeadmasterScore}&nbsp;&nbsp;&nbsp;&nbsp;生涯老师评分：{item.TeacherScore}&nbsp;&nbsp;&nbsp;&nbsp;家长评分：{item.ParentScore}</p>)

  renderOption = (val) => val.map(item => <Option key={item.Id} value={item.Year}>{item.Year}</Option>)

  render() {
    const { careerAbilityDetail1, careerAbilityDetail2 } = this.props;

    return(
      <PageHeaderWrapper title="我的生涯能力" back="true">
        <div style={{background: '#fff', padding: 20}}>
          <h4>选择年份：<Select placeholder="请选择年份" style={{width: 140}} onChange={this.handleChange}>{careerAbilityDetail2 && this.renderOption(careerAbilityDetail2)}</Select></h4>
          <div>
            <PieChart data={careerAbilityDetail1} />
            <div className={styles.score}>
              { careerAbilityDetail1 && this.renderScore(careerAbilityDetail1.ScoreData) }
            </div>
          </div>
          <Divider />
          <h4>各年份生涯能力对比图</h4>
          <YearBarChart data={careerAbilityDetail2} />
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default CareerAbility;
