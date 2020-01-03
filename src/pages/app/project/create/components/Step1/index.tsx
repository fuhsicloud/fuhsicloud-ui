import { Button, Divider, Form, Input, Select } from 'antd';
import React, { Fragment } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import { StateType } from '../../../../../../models/projectcreate';
import styles from './index.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
interface Step1Props extends FormComponentProps {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
}

const Step1: React.FC<Step1Props> = props => {
  const { form, dispatch, data } = props;
  if (!data) {
    return null;
  }
  const { getFieldDecorator, validateFields } = form;
  const onValidateForm = () => {
    validateFields((err: any, values: StateType['step']) => {
      if (!err && dispatch) {
        dispatch({
          type: 'appAndprojectAndcreate/saveStepFormData',
          payload: values,
        });
        dispatch({
          type: 'appAndprojectAndcreate/saveCurrentStep',
          payload: 'confirm',
        });
      }
    });
  };
  return (
    <Fragment>
      <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
        <Form.Item {...formItemLayout} label="业务空间">
          {getFieldDecorator('namespace', {
            initialValue: data.namespace,
            rules: [{ required: true, message: '请业务空间' }],
          })(
            <Select placeholder="namespace">
              <Option value="defalut">defalut</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="项目英文名">
          {getFieldDecorator('project_name_en', {
            initialValue: data.project_name_en,
            rules: [{ required: true, message: '请输入项目英文名' }],
          })(<Input placeholder="仅支持英文小写字母 数字 -" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="项目描述">
          {getFieldDecorator('desc', {
            initialValue: data.desc,
            rules: [
              { required: true, message: '请输入项目描述' },
            ],
          })(<Input placeholder="请输入项目描述" />)}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=""
        >
          <Button type="primary" onClick={onValidateForm}>
            下一步
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
      <div className={styles.desc}>
        <h3>说明</h3>
        <h4>根据需求设置合理的参数</h4>
        <p>
          
        </p>
        <h4>如有疑问请联系管理员</h4>
        <p>
          
        </p>
      </div>
    </Fragment>
  );
};

export default connect(({ appAndprojectAndcreate }: { appAndprojectAndcreate: StateType }) => ({
  data: appAndprojectAndcreate.step,
}))(Form.create<Step1Props>()(Step1));
