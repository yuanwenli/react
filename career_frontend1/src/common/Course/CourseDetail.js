import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';

@connect(({ parentsStudy, loading }) => ({
  courseDetail: parentsStudy.courseDetail,
  loading: loading.models.parentsStudy,
}))
@Form.create()
class CourseDetail extends Component {

  componentDidMount() {
    this.getVideoData()
  }

  getVideoData() {
    const { dispatch, id } = this.props;
    dispatch({
      type: 'parentsStudy/reqCommon',
      service: 'getCourseDetail',
      payload: {Id: id},
    });
  }

  render() {
    const {courseDetail} = this.props;
    return (
      <div style={{padding: 20, background: '#fff'}}>
        <video controls>
          <source src={courseDetail.PdfUrl} type="video/mp4" />
          <source src={courseDetail.PdfUrl} type="video/ogg" />
          您的浏览器不支持 video 标签。
        </video>
        <p>课程名称：{courseDetail.VideoName}</p>
        <p>课程介绍：{courseDetail.Desc}</p>
      </div>
    );
  }
}

export default CourseDetail;
