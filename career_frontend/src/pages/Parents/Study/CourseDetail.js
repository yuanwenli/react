import React, { Component } from 'react';
import { Form } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CourseDetailCom from '@/common/Course/CourseDetail';

@Form.create()
class CourseDetail extends Component {

  render() {
    const {location} = this.props;
    const {id} = location.query;
    return (
      <PageHeaderWrapper title="播放课程">
        <CourseDetailCom id={id} />
      </PageHeaderWrapper>
    )
  }
}

export default CourseDetail;
