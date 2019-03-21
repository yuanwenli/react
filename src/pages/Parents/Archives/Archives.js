import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CareerGrowthRecord from '@/common/CareerGrowthRecord/CareerGrowthRecord';

@Form.create()
@connect(({ messageData, loading }) => ({
  getChildDetail: messageData.getChildDetail,
  loading: loading.models.message,
}))
class Archives extends Component {

  state = {
    childData: null
  }

  componentDidMount() {
    this.getChildData()
  }

  getChildData() {
    const { dispatch } = this.props;
    const storageChild = window.localStorage.getItem('studentId');
    dispatch({
      type: 'messageData/reqCommon',
      service: 'getChildDetail',
      payload: {},
      callback: () => {
        const { getChildDetail } = this.props;
        if(getChildDetail) {
          const data = getChildDetail.filter(item => item.Id === parseInt(storageChild, 10));
          this.setState({
            childData: data[0]
          })
        }
      }
    })
  }

  render() {
    const { childData } = this.state;

    return (
      <PageHeaderWrapper title="生涯成长档案">
        <CareerGrowthRecord data={childData} />
      </PageHeaderWrapper>
    )
  }
}

export default Archives;
