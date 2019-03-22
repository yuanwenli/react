import React, { Component } from 'react';
import { Form, Table, Button, Modal, message, Popconfirm, Divider } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import RankAdd from './RankAdd';
import RankEdit from './RankEdit';
import { copyFileSync } from 'fs';



@connect(({ messageData,rank, loading }) => ({
  getChild:messageData.getChild,
  rankList: rank.rankList,
  signalRank: rank.signalRank,
  loading: loading.models.rank,
}))
@Form.create()
class Rank extends Component {
  constructor(props){
    super()
    console.log(props)
    this.state = {
      visible: false,
        Subject: ["语文", 
          "数学",
          "外语", 
          "物理", 
          "化学",
           "生物" ,
          "政治",
           "历史" ,
           "地理"]
      ,
     studentName:"",
      studentId:localStorage.getItem("studentId"),
      pageQuery: {},
      queryPage: 0,
      editVisible: false,
      editId: null,
  
    }
  }
 
  componentWillMount(){
    const studentId=localStorage.getItem("studentId")
    const {dispatch}=this.props
    dispatch({
      type:"messageData/reqCommon",
      service:"getChild"
    })
    

    }
  componentDidMount() {
    this.getListData(0, {});

  }
getUser(){
  
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
    const param = { ...pageQuery, Page: queryPage, PageCount: 10, StudentId: window.localStorage.getItem('studentId')};
    dispatch({
      type: 'rank/reqCommon',
      service: 'getRankList',
      payload: param,
    });
    this.setState({ pageQuery, queryPage });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  handleAddOk = () => {
     const { dispatch, form } = this.props;
     form.validateFields((err, fieldsValue) => {
       if (err) return;
       const data = fieldsValue
       data.ExamTime = moment(fieldsValue.ExamTime).format('YYYY-MM-DD HH:mm:ss');
       data.StudentId = window.localStorage.getItem('studentId')
       console.log(data)
       dispatch({
         type: 'rank/reqCommon',
         service: 'addRank',
         payload: data,
         callback: () => {
           message.success('操作成功');
           this.setState({
             visible: false,
           });
           this.getListData(0, {});
         }
       });
     });
     
 }

  handleAddCancle = () => {
    this.setState({
      visible: false
    })
  }

  handleDelete = (val) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rank/reqCommon',
      service: 'delRank',
      payload: {
        Id: val
      },
      callback: () => {
        message.success('操作成功');
        this.getListData(0, {})
      }
    })
  }

  handleEditVisible = (val) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'rank/reqCommon',
      service: 'getSignalRank',
      payload: {
        Id: val,
      },
      callback: () => {
        this.setState({
          editId: val,
          editVisible: true
        })
      }
    })
  }

  handleEditOk = () => {
    const { dispatch, form } = this.props;
    const { editId } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.Id = editId;
      dispatch({
        type: 'rank/reqCommons',
        service: 'editRank',
        payload: fieldsValue,
        callback: () => {
          message.success('操作成功');
          this.setState({
            editVisible: false,
          });
          this.getListData(0, {});
        }
      });
    });
  }

  handleEditCancle = () => {
    this.setState({
      editVisible: false
    })
  }

  columns = () => [
    {
      title: '考试名称',
      dataIndex: 'ExamName',
      key: 'ExamName',
    },
    {
      title: '学段',
      dataIndex: 'GRADENAME',
      key: 'GRADENAME',
    },
    {
      title: '考试时间',
      dataIndex: 'ExamTime',
      key: 'ExamTime',
    },
    {
      title: '操作',
      key: 'option',
      render: (record) => (
        <span>
          <a onClick={() => this.handleEditVisible(record.Id)}>修改</a>
          <Divider type='vertical' />
          <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.Id)} okText="确定" cancelText="取消">
            <a>删除</a>
          </Popconfirm>
        </span>
      ),
    }];

  render() {
    const { visible, editVisible } = this.state;
    const { rankList, form, signalRank } = this.props;
 console.log(this)
    return (
      <PageHeaderWrapper title="成绩排名管理" Subject={this.state.Subject}>
        <div style={{ background: '#fff', padding: '20px' }}>
          <Form layout="inline" style={{marginBottom: 20}}>
            <Form.Item>
              <Button type="primary" onClick={this.showModal}>添加成绩排名</Button>
            </Form.Item>
          </Form>
          { rankList && rankList.list?<Table pagination={{total: rankList.pages*10}} columns={this.columns()} rowKey="Id" dataSource={rankList.list} onChange={this.handlePageChange} />:<Table pagination={{total: 0}} columns={this.columns()} dataSource={[]} />}
        </div>
        <Modal
          title="添加成绩排名"
          visible={visible}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancle}
          okText="确认"
          cancelText="取消"
        >
          <RankAdd Subject={this.state.Subject} form={form} />
        </Modal>
        <Modal
          title="编辑成绩排名"
          visible={editVisible}
          onOk={this.handleEditOk}
          onCancel={this.handleEditCancle}
          okText="确认"
          cancelText="取消"
        >
          <RankEdit Subject={this.state.Subject} defaultValue={signalRank} form={form} />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default Rank;
