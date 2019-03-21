import React, { Component } from 'react';
import { Form, List, Card } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import styles from './ClassActivity.less';

@connect(({ classActivityManage, loading}) => ({
  classActivityList: classActivityManage.classActivityList,
  signalActivity: classActivityManage.signalActivity,
  loading: loading.models.studentActivity,
}))
@Form.create()
class ClassActivity extends Component {

  state = {

  }

  componentDidMount() {
    this.getListData(1, {});
    if(typeof this.props.onRef2 === 'function') {
      this.props.onRef2(this)
    }
  }

  // 初始化数据
  getListData(page, queryParam) {
    const { dispatch, classId } = this.props;
    let { pageQuery, queryPage } = this.state;
    if (queryParam) {
      pageQuery = queryParam;
    }
    if (page || page === 0) {
      queryPage = page;
    }
    const param = { ...pageQuery, Page: queryPage, PageCount: 10, ClassId: classId};
    dispatch({
      type: 'classActivityManage/reqCommon',
      service: 'getClassActivityList',
      payload: param,
    });
    this.setState({ pageQuery, queryPage });
  }

  handlePageChange = pagination => {
    const { current } = pagination;
    const { queryPage } = this.state;
    if (current !== queryPage) {
      this.getListData(pagination);
    }
  };

  handleDetail = (id) => {
    const name = window.localStorage.getItem('antd-pro-authority')
    if(name && name.slice(2, name.length-2) === 'student') {
      router.push(`/activity/detail?id=${id}`);
    } else if(name && name.slice(2, name.length-2) === 'headTeacher') {
      router.push(`/class-report/class-activity-detail?id=${id}`);
    } else {
      router.push(`/class-activity/detail?id=${id}`);
    }
  }

  render() {
    const { classActivityList } = this.props;
    return (
      classActivityList && classActivityList.list ? <List
        grid={{
          gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3
        }}
        pagination={{total: classActivityList.pages*10, onChange: this.handlePageChange}}
        dataSource={classActivityList.list}
        renderItem={(item) => (
          <List.Item>
            <Card className={styles.card} onClick={() => this.handleDetail(item.Id)}>
              <img src="" alt="" />
              <div>
                <h3>{item.ActivityName}</h3>
                <p>{moment(item.StartTime).format('YYYY-MM-DD')}</p>
              </div>
            </Card>
          </List.Item>
        )}
      /> : <List dataSource={[]} renderItem="" />
    );
  }
}

export default ClassActivity;
