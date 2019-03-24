import React, { Component } from 'react';
import { Form } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Ability from '@/common/Ability/Ability';


@Form.create()
class SAbility extends Component {

  render() {
    return (
      <PageHeaderWrapper title="生涯能力评估">
        <Ability />
      </PageHeaderWrapper>
    );
  }
}

export default SAbility;
