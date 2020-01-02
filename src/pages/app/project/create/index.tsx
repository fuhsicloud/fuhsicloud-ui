import { Card, Steps } from 'antd';
import React, { Component } from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { StateType } from '../../../../models/projectcreate';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import styles from './style.less';

const { Step } = Steps;

interface CreateProps {
  current: StateType['current'];
}

@connect(({ appAndprojectAndcreate }: { appAndprojectAndcreate: StateType }) => ({
  current: appAndprojectAndcreate.current,
}))
class Create extends Component<CreateProps> {
  getCurrentStep() {
    const { current } = this.props;
    switch (current) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }

  render() {
    const currentStep = this.getCurrentStep();
    let stepComponent;
    if (currentStep === 1) {
      stepComponent = <Step2 />;
    } else if (currentStep === 2) {
      stepComponent = <Step3 />;
    } else {
      stepComponent = <Step1 />;
    }
    return (
      <PageHeaderWrapper content="按照引导完成项目的创建，请仔细核对每一项内容和参数。">
        <Card bordered={false}>
          <>
            <Steps current={currentStep} className={styles.steps}>
              <Step title="填写项目基本信息" />
              <Step title="填写项目配置信息" />
              <Step title="完成" />
            </Steps>
            {stepComponent}
          </>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Create;
