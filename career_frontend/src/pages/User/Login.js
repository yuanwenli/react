import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Checkbox, Alert, Modal, Radio, Select } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Submit } = Login;
const RadioGroup = Radio.Group;
const { Option } = Select;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
@connect(({ changeLoginStatus }) => ({
  changeLoginStatus,
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
    visible: false,
    account: null,
    value: null,
    visibleStudent: false,
    student: null,
    studentValue: null
  };

  componentDidMount() {
  }

  handleChange = (val) => {
    this.login(val);
  }

  login = (val) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/login',
      payload: {
        ticket: 'aTVhNjE0MzU2ODgzNjQ2MTNhNmYyNDU4NmE5MjNhNjA5MTU1MjM2MDE2OTM3MQ==',
        personId: val,
        Type: 1
      },
      callback: (data) => {
        if(data.data.UserInfo[0].StudentInfo) {
          this.setState({
            visibleStudent: true,
            student: data.data.UserInfo[0].StudentInfo
          })
        } else {
          this.setState({
            account: data.data.UserInfo,
            visible: true,
          })
        }
      }
    });
  }

  onTabChange = type => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'login/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          Type: 1
        },
        callback: (data) => {
          this.setState({
            account: data.data.UserInfo,
            visible: true,
          })
        }
      });
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleOk = () => {
    const { dispatch } = this.props;
    const { value } = this.state;
    const data = value.split('&');
    dispatch({
      type: 'login/typeLogin',
      payload: {
        Type: 1,
        UserId: data[0],
        UsessionId: data[1]
      }
    })
  }

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  onStudentChange = (e) => {
    this.setState({
      studentValue: e.target.value,
    })
  }

  renderName = (name) => {
    switch (name) {
      case 'headTeacher':
        return <span>班主任</span>;
      case 'student':
        return <span>学生</span>;
      case 'teacher':
        return <span>生涯老师</span>;
      case 'parents':
        return <span>家长</span>;
      case 'school':
        return <span>校管理员</span>;
      default:
        return null;
    }
  }

  handleStudentOk = () => {
    const { studentValue } = this.state;
    window.localStorage.setItem('studentId', studentValue);
    const { dispatch } = this.props;
    dispatch({
      type: 'login/loginSuccess',
    })
    // router.push('/archives');
  }

  handleStudentCancel = () => {
    this.setState({
      visibleStudent: false
    })
  }

  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin, visible, account, value, visibleStudent, student, studentValue } = this.state;
    return (
      <div className={styles.main}>
        <Modal
          title="该账户有多个身份，请选择登录身份"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <RadioGroup onChange={this.onChange} value={value}>
            {account?account.map(item => <Radio key={item.Id} value={`${item.Id}&${item.UsessionId}`}>{this.renderName(item.UserType.Name)}</Radio>):null}
          </RadioGroup>
        </Modal>
        <Modal
          title="该账户绑定了多个学生，请选择学生"
          visible={visibleStudent}
          onOk={this.handleStudentOk}
          onCancel={this.handleStudentCancel}
        >
          <RadioGroup onChange={this.onStudentChange} value={studentValue}>
            {student&&student.map(item => <Radio key={item.Id} value={item.Id}>{item.UserName}</Radio>)}
          </RadioGroup>
        </Modal>
        <Select style={{width: '300px'}} placeholder="请选择角色" onChange={this.handleChange}>
          <Option key="6D935C24C9017BD5E053EE3C980AE40F" value="6D935C24C9017BD5E053EE3C980AE40F">家长</Option>
          <Option key="6C55EBCDB8022E8BE053EE3C980A4532" value="6C55EBCDB8022E8BE053EE3C980A4532">学生</Option>
          <Option key="6BC46D1794822E6FE053EE3C980A8134" value="6BC46D1794822E6FE053EE3C980A8134">老师</Option>
          <Option key="6BC46D1794812E6FE053EE3C980A8134" value="6BC46D1794812E6FE053EE3C980A8134">班主任</Option>
          <Option key="6BC46D1793302E6FE053EE3C980A8134" value="6BC46D1793302E6FE053EE3C980A8134">校管</Option>
        </Select>
        {/* <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
            <UserName
              name="UserNumber"
              placeholder="请输入用户名"
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.userName.required' }),
                },
              ]}
            />
            <Password
              name="PassWord"
              placeholder="请输入密码"
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.password.required' }),
                },
              ]}
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me" />
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="app.login.forgot-password" />
            </a>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
          <div className={styles.other}>
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="app.login.signup" />
            </Link>
          </div>
        </Login> */}
      </div>
    );
  }
}

export default LoginPage;
