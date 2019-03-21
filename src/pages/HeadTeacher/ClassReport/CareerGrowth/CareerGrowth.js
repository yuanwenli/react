import React, { Component } from 'react';
import { Form } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CareerGrowthRecord from '@/common/CareerGrowthRecord/CareerGrowthRecord';

@Form.create()
class CareerGrowth extends Component {
  render() {
    return (
      <PageHeaderWrapper titile="生涯成长档案">
        <CareerGrowthRecord />
      </PageHeaderWrapper>
    )
  }
}

export default CareerGrowth;
