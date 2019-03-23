import React, { Component } from 'react';
import { Tabs, List, Card, Button, message, Modal, Input } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../../../common/Course/Course.less';

const { TabPane } = Tabs;

const IdolType = [
  { id: "0", type: '全部' },
  { id: "1", type: '艺术型'},
  { id: "2", type: '现实型'},
  { id: "3", type: '企业型'},
  { id: "4", type: '常规型'},
  { id: "5", type: '研究型'},
  { id: "6", type: '社会型'},
]

// 连接studentPerson模块
@connect(({ studentPerson }) => ({
  idolList: studentPerson.idolList,
}))
class ChooseIdol extends Component{

  state = {
    activeKey: IdolType[0].id,
    visible: false,
    name: '',
    url: '',
  }

  componentDidMount() {
    this.getIdolList()
  }

  // 获取偶像列表
  getIdolList(state = 0) {
    const { dispatch } = this.props;
    dispatch({
      type: 'studentPerson/reqCommon',
      service: 'idolList',
      payload: {
        Page: 1,
        PageCount: 10,
        State: state
      },
    });
  }

  handleShowModal = () => {
    this.setState({
      visible: true
    })
  }

  // 处理Input事件
  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleUrlChange = (e) => {
    this.setState({
      url: e.target.value
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  // 确认添加偶像
  handleOk = () => {
    const { dispatch } = this.props;
    const { name, url } = this.state;
    dispatch({
      type: 'studentPerson/reqCommon',
      service: 'suggetsIdol',
      payload: {
        Name: name,
        Link: url
      },
      callback: () => {
        message.success('操作成功,已发送后台审核');
        this.setState({
          visible: false,
        });
        this.getIdolList();
      }
    })

  }

  // 偶像类型切换
  handleTabChange = (activeKey) => {
    this.setState({ activeKey });
    this.getIdolList(activeKey)
  }

  // 选择偶像
  handleChooseIdol = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'studentPerson/reqCommon',
      service: 'setIdol',
      payload: {
        Id: id
      },
      callback() {
        message.success('设置成功')
      }
    })
  }

  // 偶像列表组件
  idolListFun = () => {
    const { idolList } = this.props;
    if(idolList) {
      return (
        <List
          grid={{
            gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 3,
          }}
          pagination={{
            pageSize: 10,
          }}
          dataSource={idolList.list}
          renderItem={(item) => (
            <List.Item>
              <Card className={styles.card}>
                <img src={item.HeadImg} alt="" />
                <div>
                  <h3>{item.Name}</h3>
                  <Button type="primary" onClick={() => this.handleChooseIdol(item.Id)}>设为偶像</Button>
                </div>
              </Card>
            </List.Item>
          )}
        />
      )
    }
    return null;
  }

  render() {
    const { activeKey, visible, name, url } = this.state;
    return (
      <PageHeaderWrapper title="选择生涯偶像" back="true">
        <Modal
          title="找不到偶像？请填写偶像名字以及偶像信息介绍链接"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input placeholder="请填写偶像名字" className={styles.marginTop} value={name} onChange={this.handleNameChange} />
          <Input placeholder="请填写偶像链接介绍地址" className={styles.marginTop} value={url} onChange={this.handleUrlChange} />
          <p className={styles.marginTop}>链接地址可以是偶像微博地址、百度百科介绍</p>
        </Modal>
        <div style={{background: '#fff', padding: '20px', position: 'relative'}}>
          <Tabs onChange={this.handleTabChange} activeKey={activeKey}>
            {IdolType.map(item => <TabPane tab={item.type} key={item.id}>{this.idolListFun()}</TabPane>)}
          </Tabs>
          <a onClick={this.handleShowModal} style={{position: 'absolute', right: '20px', top: '20px'}}>找不到偶像，点击这里</a>
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default ChooseIdol;
