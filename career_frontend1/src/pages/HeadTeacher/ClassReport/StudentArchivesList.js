import React, { Component, Fragment } from 'react';
import { Form, Table, Row, Col, Button, Input } from 'antd';
import { connect } from 'dva';

@connect(({ studentRecord, loading }) => ({
  studentRecord: studentRecord.studentRecord,
  loading: loading.models.studentRecord,
}))
@Form.create()
class StudentArchives extends Component {

  state = {
    pageQuery: {},
    queryPage: 0,
    classId: null
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      classId:nextProps.data
    }
  }

  componentDidMount() {
    const { classId } = this.state;
    this.getListData(0, {ClassId: classId});
    this.props.onRef1(this)
  }

  // componentDidUpdate() {
  //   const { classId } = this.state;
  //   this.getListData(0, {ClassId: classId});
  // }


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
    const param = { ...pageQuery, Page: queryPage, PageCount: 10};
    dispatch({
      type: 'studentRecord/reqCommon',
      service: 'getStudentRecord',
      payload: param,
    });
  }

  columns = () => [
    {
      title: '名称',
      dataIndex: 'StudentName',
      key: 'StudentName',
    },
    {
      title: '班级',
      dataIndex: 'ClassName',
      key: 'ClassName',
    },
    {
      title: '学号',
      dataIndex: 'Code',
      key: 'Code',
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'Operation',
      render: () => <a>生涯成长档案</a>
    }
  ]

  // 表格分页点击
  handlePageChange = pagination => {
    const { current } = pagination;
    const { queryPage } = this.state;
    if (current !== queryPage) {
      this.getListData(current);
    }
  };

  handleSearch = (e) => {
    e.preventDefault();
    const { form } = this.props;
    const { classId } = this.state;
    form.validateFields((err, fieldsValue) => {
      if(err) return;
      const { StudentName } = fieldsValue;
      this.getListData(0, {
        ClassId: classId,
        StudentName
      });
    })
  }

  render() {
    const { studentRecord, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Fragment>
        <Row>
          <Col span={20}>
            <Form layout="inline" style={{marginBottom: '10px'}}>
              <Form.Item label="">
                {getFieldDecorator('StudentName',{})(
                  <Input placeholder="请输入学生姓名" />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={this.handleSearch}>搜索</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        { studentRecord && studentRecord.StudentInfo &&  studentRecord.StudentInfo.list?<Table pagination={{total: studentRecord.StudentInfo.pages*10}} columns={this.columns()} rowKey="Id" dataSource={studentRecord.StudentInfo.list} onChange={this.handlePageChange} />: <Table pagination={{total: 0}} columns={this.columns()} dataSource={[]} />}
      </Fragment>
    );
  }
}

export default StudentArchives;
