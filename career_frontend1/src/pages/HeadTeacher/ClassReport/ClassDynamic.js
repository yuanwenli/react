import React, { Component } from 'react';
import { Comment, List, Tag } from 'antd';
import { connect } from 'dva';

@connect(({ studentActivity }) => ({
  classStudentActivity: studentActivity.classStudentActivity,
}))
class ClassDynamic extends Component {

  state = {
    pageQuery: {},
    queryPage: 0,
  };

  componentDidMount() {
    this.getListData(1, {});
    this.props.onRef3(this)
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
      type: 'studentActivity/reqCommon',
      service: 'classStudentActivity',
      payload: param,
    });
    this.setState({ pageQuery, queryPage });
  }

  // 翻页
  handlePageChange = pagination => {
    const { current } = pagination;
    const { queryPage } = this.state;
    if (current !== queryPage) {
      this.getListData(pagination);
    }
  };

  render() {
    const { classStudentActivity } = this.props;
    const activity = [];
    if (classStudentActivity && classStudentActivity.list) {
      classStudentActivity.list.forEach(item => {
        activity.push(Object.assign({}, {
          author: item.StudentName,
          avatar: item.Photo,
          content: (
            <div>
              <h3>{item.ActivityName}</h3>
              <p>{item.Content}</p>
              <div>
                {item.Image ? item.Image.map((img, index) => (
                  <img key={index} src={img} alt="" />
                )) : ''}
              </div>
              <div>
                {item.Lable ? item.Lable.map(label => (
                  label ? <Tag key={label.Id} color="blue">{label.Name}</Tag> : ''
                )) : ''}
              </div>
            </div>
          ),
          datetime: (
            <span>{item.CreaTime}</span>
          ),
        }));
      });
    }
    return (
      <div>
        {classStudentActivity && activity && classStudentActivity.length > 0 ? <List
          itemLayout="horizontal"
          dataSource={activity}
          pagination={{ total: classStudentActivity.pages * 10, onChange: this.handlePageChange }}
          renderItem={item => (
            <Comment
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          )}
        /> : <List
          itemLayout="horizontal"
          dataSource={[]}
          renderItem=""
        />}
      </div>
    )
  }
}

export default ClassDynamic;
