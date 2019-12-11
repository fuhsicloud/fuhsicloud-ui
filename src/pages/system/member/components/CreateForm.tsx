import { Form, Input, Modal, Radio } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAdd: (fieldsValue: { desc: string }) => void;
  handleModalVisible: () => void;
}
const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名称">
        {form.getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入用户名称！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="邮箱">
        {form.getFieldDecorator('email', {
          rules: [{ required: true, message: '请输入邮箱！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户状态">
        {form.getFieldDecorator('state', {
          rules: [{ required: true, message: '请选择用户状态！' }],
        })(
          <RadioGroup>
            <Radio value="0">正常</Radio>
            <Radio value="1">禁用</Radio>
          </RadioGroup>,
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
