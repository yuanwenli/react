import React, { Component } from 'react';
import { Form, Icon, Table, Modal, List } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './School.less';

@connect(({ professionSchool, loading }) => ({
  schoolList: professionSchool.schoolList,
  typeList: professionSchool.typeList,
  majorList: professionSchool.majorList,
  majorDetail: professionSchool.majorDetail,
  selectSchool: professionSchool.selectSchool,
  loading: loading.models.studentPerson,
}))
@Form.create()
class School extends Component {

  state= {
    visible1: false,
    visible2: false,
  }

  componentDidMount() {
    this.getSchoolList()
  }

  columns = () => [
    {
      title: '专业名称',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: '专业代码',
      dataIndex: 'Code',
      key: 'Code',
    },
    {
      title: '开设院校',
      dataIndex: '',
      key: 'school',
      render: (record) => (
        <span>
          <a onClick={() => this.handleCheckSchool(record.Id)}>查看</a>
        </span>
      ),
    },
    // {
    //   title: '专业详情',
    //   dataIndex: '',
    //   key: 'detail',
    //   render: (record) => (
    //     <span>
    //       <a onClick={() => this.handleMajorDetail(record.Id)}>查看</a>
    //     </span>
    //   ),
    // }
  ]

  // 学科列表
  getSchoolList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'professionSchool/reqCommon',
      service: 'schoolList',
      payload: {

      }
    });
  }

  // 分类列表
  handleChooseSubject = (id, index) => {
    const { schoolList } = this.props;
    schoolList.map(item => Object.assign(item, {active: false}) )
    schoolList[index].active = true;
    const { dispatch } = this.props;
    dispatch({
      type: 'professionSchool/reqCommon',
      service: 'typeList',
      payload: {
        ParentsId: id
      },
      callback: () => {
        // 默认选中第一个
        const { typeList } = this.props;
        this.handleChooseType(typeList[0].Id, 0)
      }
    });
  }

  // 专业table
  handleChooseType = (id, index) => {
    const { typeList } = this.props;
    const { dispatch } = this.props;
    typeList.map(item => Object.assign(item, {active: false}));
    typeList[index].active = true;
    dispatch({
      type: 'professionSchool/reqCommon',
      service: 'majorList',
      payload: {
        ParentsId: id
      },
    });
  }

  handleOk1 = () => {
    this.setState({
      visible1: false,
    });
  }

  handleCancel1 = () => {
    this.setState({
      visible1: false,
    });
  }

  handleOk2 = () => {
    this.setState({
      visible2: false,
    });
  }

  handleCancel2 = () => {
    this.setState({
      visible2: false,
    });
  }

  // 关联学校
  handleCheckSchool = (id) => {
    this.setState({
      visible1: true
    })
    const { dispatch } = this.props;
    dispatch({
      type: 'professionSchool/reqCommon',
      service: 'getSelectSchool',
      payload: {
        Id: id
      },
    });
  }

  // 专业详情
  handleMajorDetail = (id) => {
    this.setState({
      visible2: true
    })
    const { dispatch } = this.props;
    dispatch({
      type: 'professionSchool/reqCommon',
      service: 'getMajorDetail',
      payload: {
        Id: id
      },
    });
  }

  renderMajorDetail = (majorDetail) => (
    <div>
      {/*<p>{majorDetail.Degree}</p>*/}
      {/*<p>{majorDetail.InterestType}</p>*/}
    </div>
  )


  render() {
    const { typeList, majorList, schoolList, selectSchool, majorDetail } = this.props;
    const { visible1, visible2 } = this.state;
    return (
      <PageHeaderWrapper title="专业库">
        <Modal
          width="660px"
          title="关联院校"
          visible={visible1}
          onOk={this.handleOk1}
          onCancel={this.handleCancel1}
        >
          {selectSchool?<List
            grid={{ gutter: 16, column: 4 }}
            dataSource={selectSchool}
            renderItem={item => (
              <List.Item>
                {item.Name}
              </List.Item>
            )}
          />:''}
        </Modal>
        <Modal
          width="660px"
          title="专业详情"
          visible={visible2}
          onOk={this.handleOk2}
          onCancel={this.handleCancel2}
        >
          {majorDetail && this.renderMajorDetail(majorDetail)}
        </Modal>
        <div style={{background: '#fff', padding: '20px'}}>
          <div className={styles.specList}>
            <ul className={styles.zykLbUl}>
              {schoolList?schoolList.map((item, index)=><li key={item.Id} onClick={() => this.handleChooseSubject(item.Id,index)} className={item.active?styles.onread:''}><span>{item.Name}</span><Icon type="caret-right" /></li>):''}
            </ul>
            <ul className={styles.zykLbUl}>
              {typeList?typeList.map((item,index)=><li key={item.Id} onClick={() => this.handleChooseType(item.Id,index)} className={item.active?styles.onread:''}><span>{item.Name}</span><Icon type="caret-right" /></li>):''}
            </ul>
            {majorList?<Table width="100%" columns={this.columns()} rowKey="Id" dataSource={majorList} />:''}
          </div>
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default School;
