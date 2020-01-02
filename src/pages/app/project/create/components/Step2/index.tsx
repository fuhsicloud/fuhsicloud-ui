import { Alert, Button, Descriptions, Divider, Select, Tooltip, Form, Input } from 'antd';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
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
interface Step2Props extends FormComponentProps {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
  submitting?: boolean;
}

const Step2: React.FC<Step2Props> = props => {
  const { form, data, dispatch, submitting } = props;
  if (!data) {
    return null;
  }
  const { getFieldDecorator, validateFields, getFieldsValue } = form;
  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'appAndprojectAndcreate/saveStepFormData',
        payload: {
          ...data,
          ...values,
        },
      });
      dispatch({
        type: 'appAndprojectAndcreate/saveCurrentStep',
        payload: 'info',
      });
    }
  };
  
  const onChangeImage = (val: String) => {
    if (dispatch) {
      dispatch({
        type: 'appAndprojectAndcreate/changeProjectImage',
        payload: {
          image: val,
        },
      });
      dispatch({
        type: 'appAndprojectAndcreate/changeImageLanguage',
        payload: { image: val },
      });
    }
  };

  const onValidateForm = (e: React.FormEvent) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        if (dispatch) {
          dispatch({
            type: 'appAndprojectAndcreate/submitStepForm',
            payload: {
              ...data,
              ...values,
            },
          });
        }
      }
    });
  };
  const { deploymentInfo, language } = data;
  return (
    <Form layout="horizontal" className={styles.stepForm}>
      <Alert
        closable
        showIcon
        message="确认转账后，资金将直接打入对方账户，无法退回。"
        style={{ marginBottom: 24 }}
      />
      <Descriptions column={1}>
        <Descriptions.Item label="命名空间"> {data.namespace}</Descriptions.Item>
        <Descriptions.Item label="项目名称"> {data.project_name_en}</Descriptions.Item>
      </Descriptions>
      <Divider style={{ margin: '24px 0' }} />
      <Form.Item {...formItemLayout} label="项目语言">
        {getFieldDecorator('image', {
          initialValue: (data && data.image) ? data.image : 'golang',
          rules: [{ message: '请选择基础镜像', required: true }],
        })(
          <span>
          <Select
            placeholder="golang"
            style={{ width: 320 }}
            value={data.image ? data.image : 'golang'}
            onChange={ onChangeImage }
          >
            {/*<Option value="alpine:v0.0.02">Golang: alpine:v0.0.02</Option>*/}
            <Option value="golang">
              Golang
            </Option>
            <Option value="java">Java</Option>
            <Option value="nodejs">
              NodeJs
            </Option>
            <Option value="python">
              Python
            </Option>
            <Option value="nginx">
              Nginx
            </Option>
            <Option value="static">
              Static
            </Option>
          </Select>
            &nbsp;&nbsp;
            <Tooltip placement="topLeft" title={language ? language : 'Golang'} arrowPointAtCenter>
              <Button>{language ? language : 'Golang'}</Button>
            </Tooltip>
            &nbsp;&nbsp;
            <Tooltip placement="topLeft" title="点击去下载Dockerfile" arrowPointAtCenter>
          <Button icon="cloud-download" 
          // onClick={this.onDownDockerfile}
          />
          </Tooltip>
          </span>,
        )}
      </Form.Item>
      <Form.Item {...formItemLayout} label="项目Git地址">
          <Input.Group compact>
            <Select defaultValue="alipay" style={{ width: 100 }}>
              <Option value="alipay">支付宝</Option>
              <Option value="bank">银行账户</Option>
            </Select>
            {getFieldDecorator('receiverAccount', {
              initialValue: data.receiverAccount,
              rules: [
                { required: true, message: '请输入收款人账户' },
                { type: 'email', message: '账户名应为邮箱格式' },
              ],
            })(<Input style={{ width: 'calc(100% - 100px)' }} placeholder="test@example.com" />)}
          </Input.Group>
        </Form.Item>
      <Form.Item {...formItemLayout} label="支付密码" required={false}>
        {getFieldDecorator('password', {
          initialValue: '123456',
          rules: [
            {
              required: true,
              message: '需要支付密码才能进行支付',
            },
          ],
        })(<Input type="password" autoComplete="off" style={{ width: '80%' }} />)}
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 8 }}
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: {
            span: formItemLayout.wrapperCol.span,
            offset: formItemLayout.labelCol.span,
          },
        }}
        label=""
      >
        <Button type="primary" onClick={onValidateForm} loading={submitting}>
          提交
        </Button>
        <Button onClick={onPrev} style={{ marginLeft: 8 }}>
          上一步
        </Button>
      </Form.Item>
    </Form>
  );
};
export default connect(
  ({
    appAndprojectAndcreate,
    loading,
  }: {
    appAndprojectAndcreate: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    submitting: loading.effects['appAndprojectAndcreate/submitStepForm'],
    data: appAndprojectAndcreate.step,
  }),
)(Form.create<Step2Props>()(Step2));
