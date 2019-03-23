import React, { Component } from 'react';
import { Form, List, Card } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './Course.less';

@connect(({ parentsStudy, loading }) => ({
  courseList: parentsStudy.courseList,
  loading: loading.models.parentsStudy,
}))
@Form.create()
class Study extends Component {

  state = {
    pageQuery: {},
    queryPage: 0,
    name: null,
    role: null,
    state: null,
  }

  componentDidMount() {
    this.getListData()
  }

  // 初始化表格数据
  getListData(page, queryParam) {
    const { dispatch } = this.props;
    let { pageQuery, queryPage } = this.state;
    if (queryParam) {
      pageQuery = queryParam;
    }
    if (page || page === 0) {
      queryPage = page;
    }
    const param = { ...pageQuery, Page: queryPage, PageCount: 10 };
    dispatch({
      type: 'parentsStudy/reqCommon',
      service: 'getCourseList',
      payload: param,
    });
    this.setState({ pageQuery, queryPage });
  }

  handleCourseDetail = (id) => {
    const name = window.localStorage.getItem('antd-pro-authority')
    switch (name && name.slice(2, name.length-2)) {
      case 'student':
        router.push(`/student-study/detail?id=${id}`);
        break;
      case 'parent':
        router.push(`/parents-study/detail?id=${id}`);
        break;
      case 'teacher':
        router.push(`/teacher-study-manage/detail?id=${id}`);
        break;
      case 'headTeacher':
        router.push(`/study-manage/detail?id=${id}`);
        break;
      default:
        break;
    }
  }

  render() {

    const { courseList } = this.props;

    return (
      courseList ? <List
        grid={{
          gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,
        }}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={courseList.list}
        renderItem={(item) => (
          <List.Item>
            <Card className={styles.card}>
              <img src="" alt="" onClick={() => this.handleCourseDetail(item.Id)} />
              <div>
                <h3>{item.VideoName}</h3>
              </div>
            </Card>
          </List.Item>
        )}
      /> : ''
    );
  }
}

export default Study;
