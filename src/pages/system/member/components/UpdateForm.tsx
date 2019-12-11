import { Button, Form, Input, Modal, Radio, Select } from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps extends FormComponentProps {
  handleUpdateModalVisible: (flag?: boolean, formVals?: FormValueType) => void;
  handleUpdate: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { TextArea } = Input;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

class UpdateForm extends Component<UpdateFormProps, UpdateFormState> {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  constructor(props: UpdateFormProps) {
    super(props);

    this.state = {
      formVals: {
        username: props.values.username,
        email: props.values.email,
        id: props.values.id,
        phone: props.values.phone
      },
      currentStep: 0,
    };
  }

  renderContent = (formVals: FormValueType) => {
    const { form } = this.props;
    return [
      <FormItem key="username" {...this.formLayout} label="用户名称">
        {form.getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入用户名称！' }],
          initialValue: formVals.username,
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="email" {...this.formLayout} label="邮箱">
        {form.getFieldDecorator('email', {
          rules: [{ required: true, message: '请输入邮箱！', min: 5 }],
          initialValue: formVals.email,
        })(<TextArea rows={4} placeholder="请输入邮箱！" />)}
      </FormItem>,
      <FormItem key="phone" {...this.formLayout} label="手机号">
        {form.getFieldDecorator('phone', {
          rules: [{ required: true, message: '请输入手机号！', min: 5 }],
          initialValue: formVals.phone,
        })(<TextArea rows={4} placeholder="请输入手机号！" />)}
      </FormItem>,
    ];
  };

  renderFooter = () => {
    const { handleUpdateModalVisible, values } = this.props;
    return [
      <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => handleUpdateModalVisible(false, values)}>
        下一步
      </Button>,
    ];
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible, values } = this.props;
    const {  formVals } = this.state;

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="更新用户信息"
        visible={updateModalVisible}
        footer={this.renderFooter()}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >
        {this.renderContent(formVals)}
      </Modal>
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);
