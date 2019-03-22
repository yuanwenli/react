import React, { Component } from 'react';
import {  Form, Cascader, Button, Table, Modal, message } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Profession.less';

@connect(({ professionSchool, loading }) => ({
  profession: professionSchool.profession,
  professionType: professionSchool.professionType,
  signalProfession: professionSchool.signalProfession,
  getClass: professionSchool.getClass,
  loading: loading.models.professionSchool,
}))
@Form.create()
class Profession extends Component {
  state = {
    pageQuery: {},
    queryPage: 0,
    professionType: null,
    getClass: null,
    professionId: null,
    classId: null,
    visible: false,
    name: null,
    content: null,
    idEdit: null,
    id: null,
  };

  componentDidMount() {
    this.getListData(0, {});
    this.getProfessionType();
    this.getClass();
  }

  // 职业类型
  getProfessionType = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'professionSchool/reqCommon',
      service: 'getProfessionType',
      payload: {
        ParentsId: 0
      },
      callback: () => {
        const { professionType } = this.props;
        this.setState({
          professionType
        })
      }
    })
  }

  // 职业分类
  getClass = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'professionSchool/reqCommon',
      service: 'getClass',
      payload: {
        ParentsId: 0
      },
      callback: () => {
        const { getClass } = this.props;
        this.setState({
          getClass
        })
      }
    })
  }

  // 初始化表格数据
  getListData(page, queryParam,) {
    const { dispatch } = this.props;
    let { pageQuery, queryPage } = this.state;
    const {professionId, classId} = this.state;
    if (queryParam) {
      pageQuery = queryParam;
    }
    if (page || page === 0) {
      queryPage = page;
    }
    const param = { ...pageQuery, Page: queryPage, PageCount: 10, ProfessionId: professionId, ClassId: classId };
    dispatch({
      type: 'professionSchool/reqCommon',
      service: 'getProfession',
      payload: param,
    });
    this.setState({ pageQuery, queryPage });
  }

  columns = () => [
    {
      title: '职业名称',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: '类型',
      dataIndex: 'PationClassName',
      key: 'PationClassName',
    },
    {
      title: '分类',
      dataIndex: 'ClassName',
      key: 'ClassName',
    },
    // {
    //   title: '操作',
    //   dataIndex: '',
    //   key: 'option',
    //   render: record => (
    //     <span>
    //       <a onClick={() => this.handleDetail(record.Id)}>查看详情</a>
    //     </span>
    //   )
    // }
  ]

  // handleDetail = (id) => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'professionSchool/reqCommon',
  //     service: 'signalProfession',
  //     payload: {
  //       PationId: id
  //     }
  //   })
  // }

  handlePageChange = (pagination) => {
    const { current } = pagination;
    const { queryPage } = this.state;
    if (current !== queryPage) {
      this.getListData(current);
    }
  }

  // 职业类型改变
  loadProfession = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    const { dispatch } = this.props;
    targetOption.loading = false;
    dispatch({
      type: 'professionSchool/reqCommon',
      service: 'getProfessionType',
      payload: {
        ParentsId: selectedOptions[0].id
      },
      callback: () => {
        const { professionType } = this.props;
        targetOption.children = professionType;
      }
    })
    this.setState({
      professionType: [...this.state.professionType],
    });
  }

  loadClass = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    const { dispatch } = this.props;
    targetOption.loading = false;
    dispatch({
      type: 'professionSchool/reqCommon',
      service: 'getClass',
      payload: {
        ParentsId: selectedOptions[0].id
      },
      callback: () => {
        const { getClass } = this.props;
        targetOption.children = getClass;
      }
    })
    this.setState({
      getClass: [...this.state.getClass],
    });
  }

  handleProfesstionChange = (name,data) => {
    if(data.length > 1) {
      this.setState({
        professionId: data[1].id
      })
    }
  }

  // 职业分类改变
  handleClassChange = (name, data) => {
    if(data.length > 1) {
      this.setState({
        classId: data[1].id
      })
    }
  }

  handleSearch = () => {
    this.getListData(0, {});
  }

  handleReset = () => {
    this.setState({
      professionType: null,
      getClass: null,
      professionId: null,
      classId: null,
    },  () => {
      this.getProfessionType();
      this.getClass();
      this.getListData(0, {});
    })
  }

  render() {
    const { profession } = this.props;
    const { professionType, getClass } = this.state;
    return (
      <PageHeaderWrapper title="职业库">
        <div style={{background: '#fff', padding: '20px'}}>
          <div style={{marginBottom: '10px'}}>
            职业类型：{professionType?<Cascader
              style={{width: '200px'}}
              className={styles.search}
              placeholder="请选择职业类型"
              options={professionType}
              onChange={this.handleProfesstionChange}
              loadData={this.loadProfession}
              changeOnSelect
            />:''}
            职业分类：{getClass?<Cascader
              style={{width: '200px'}}
              className={styles.search}
              placeholder="请选择职业分类"
              onChange={this.handleClassChange}
              options={getClass}
              loadData={this.loadClass}
              changeOnSelect
            />:''}
            <Button className={styles.search} type="primary" onClick={this.handleSearch}>搜索</Button>
            <Button className={styles.search} type="primary" onClick={this.handleReset}>重置</Button>
          </div>
          { profession && profession.list?<Table pagination={{total: profession.pages*10}} columns={this.columns()} rowKey="Id" dataSource={profession.list} onChange={this.handlePageChange} />:<Table pagination={{total: 0}} columns={this.columns()} dataSource={[]} />}
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Profession;
