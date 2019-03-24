import React, { PureComponent } from 'react';
import { FormattedMessage } from 'umi/locale';
import { Spin, Menu, Icon, Avatar, Modal, List, message, Badge } from 'antd';
import { connect } from 'dva';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

@connect(({ messageData }) => ({
  getNotice: messageData.getNotice,
  getUnRead: messageData.getUnRead
}))
class GlobalHeaderRight extends PureComponent {

  state = {
    visible: false,
    pageQuery: {},
    queryPage: 1,
  }

  componentDidMount() {
    this.getUnRead()
  }

  getUnRead() {
    const { dispatch } = this.props;
    dispatch({
      type: 'messageData/reqCommon',
      service: 'getUnRead',
    })
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
    const param = { ...pageQuery, Page: queryPage, PageCount: 5 };
    dispatch({
      type: 'messageData/reqCommon',
      service: 'getNotice',
      payload: param,
    });
    this.setState({ pageQuery, queryPage });
  }

  handleNotice = () => {
    this.getListData(0, {});
    this.setState({
      visible: true
    })
  }

  handleOk = () => {
    this.setState({
      visible: false
    })
  }

  onChange = pagination => {
    const { queryPage } = this.state;
    if (pagination !== queryPage) {
      this.getListData(pagination);
    }
  };

  handleRead = (val) => {
    if(val.Read === 1) {
      message.info('您已标记');
      return;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'messageData/reqCommon',
      service: 'getSignalNotice',
      payload: {
        Id: val.Id
      },
      callback: () => {
        message.success('标记成功');
        this.getListData(0, {});
      }
    })
  }

  render() {
    const {
      currentUser,
      onMenuClick,
      theme,
      getNotice,
      getUnRead,
    } = this.props;
    const { visible } = this.state;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right} ${styles.dark}`;
    }
    return (
      <div className={className}>
        <Badge dot={getUnRead === 0}>
          <Icon onClick={() => this.handleNotice()} type="question-circle" style={{cursor: 'pointer'}} />
        </Badge>
        {
          getNotice &&
          <Modal
            title="消息列表"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleOk}
          >
            <List
              itemLayout="horizontal"
              dataSource={getNotice.list}
              pagination={{
                onChange: this.onChange,
                pageSize: 5,
                total: getNotice.Page ? 5*getNotice.Page : 0,
              }}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<span>{item.UserName}<span style={{color: 'rgba(0, 0, 0, 0.45)', fontSize: 12}}>（{item.CreaTime}）</span></span>}
                    description={item.Desc}
                  />
                  <Icon className={item.Read === 1 ? styles.read : ''} onClick={() => this.handleRead(item)} style={{cursor: 'pointer'}} type="check-circle" />
                </List.Item>
              )}
            />
          </Modal>
        }
        {currentUser && currentUser.data && currentUser.data.UserName ? (
          <HeaderDropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={currentUser.data.avatar}
                alt="avatar"
              />
              <span className={styles.name}>{currentUser.data.UserName}</span>
            </span>
          </HeaderDropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
      </div>
    );
  }
}

export default GlobalHeaderRight;
