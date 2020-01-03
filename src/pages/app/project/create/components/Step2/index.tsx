import { Alert, Button, Descriptions, Divider, Select, Tooltip, Form, Input, Radio } from 'antd';

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
  const changeCpuType = (e: { target: { value: string; }; }) => {
    if (dispatch && data.javaState) {
      const halfNum = parseInt(e.target.value.substring(2), 0) / 2;
      if (halfNum >= 1 && halfNum <= 20) {
        dispatch({
          type: 'appAndprojectAndcreate/changeCupInfo',
          payload: {
            cpuHalfNum: halfNum.toString() + 'g',
          },
        });
      } else if (halfNum === 0.5) {
        dispatch({
          type: 'appAndprojectAndcreate/changeCupInfo',
          payload: {
            cpuHalfNum: '512m',
          },
        });
      } else if (halfNum > 20) {
        dispatch({
          type: 'appAndprojectAndcreate/changeCupInfo',
          payload: {
            cpuHalfNum: halfNum.toString() + 'm',
          },
        });
      }
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
const { language } = data;
  return (
    <Form layout="horizontal" className={styles.stepForm}>
      <Alert
        // closable
        showIcon
        message="不同开发语言对应不同配置信息"
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
            style={{ width: 260 }}
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
            <Select defaultValue="github" style={{ width: 100 }}>
              <Option value="github">Github</Option>
              <Option value="gitlab">Gitlab</Option>
              <Option value="bitbucket">Bitbucket</Option>
            </Select>
            {getFieldDecorator('image', {
              initialValue: data.gitPath,
              rules: [
                { required: true, message: '请输入项目路径' },
              ],
            })(<Input style={{ width: 'calc(100% - 100px)' }} placeholder="fuhsicloud/fuhiscloud.git" />)}
          </Input.Group>
      </Form.Item>
      <Form.Item
          {...formItemLayout}
          label="容器规格"
          help="根据自己需求配置 (CPU:200m/500m/1/2,内存:256Mi/512Mi/2Gi)"
        >
        <div>
          {data.javaState ? getFieldDecorator('resources', {
            initialValue: '',
            rules: [{ required: true, message: '请选择容器规格' }],
          })(
            <Radio.Group onChange={changeCpuType}>
              <Radio value="1/512Mi">512M内存</Radio>
              <Radio value="1/1Gi">1G内存</Radio>
              <Radio value="2/2Gi">2G内存</Radio>
              <Radio value="2/4Gi">4G内存</Radio>
              <Radio value="2/6Gi">6G内存</Radio>
              <Radio value="2/8Gi">8G内存</Radio>
              <Radio value="2/10Gi">10G内存</Radio>
            </Radio.Group>,
          ) : getFieldDecorator('resources', {
            initialValue: '',
            rules: [{ required: true, message: '请选择容器规格' }],
          })(
            <Radio.Group onChange={changeCpuType}>
              <Radio value="100m/64Mi">64M内存</Radio>
              <Radio value="100m/128Mi">128M内存</Radio>
              <Radio value="200m/256Mi">256M内存</Radio>
              <Radio value="500m/512Mi">512M内存</Radio>
              <Radio value="1/1Gi">1G内存</Radio>
              <Radio value="2/2Gi">2G内存</Radio>
              <Radio value="2/4Gi">4G内存</Radio>
              <Radio value="2/6Gi">6G内存</Radio>
              <Radio value="2/8Gi">8G内存</Radio>
            </Radio.Group>,
          )}
          {/*<Form.Item {...formItemLayout} label="其他">*/}
          {/*{getFieldDecorator("other_resources", {*/}
          {/*initialValue: data.project_name,*/}
          {/*rules: [*/}
          {/*{*/}
          {/*pattern: `^([1-9]{1}[0-9]{2}[m]{1}|[0-9]{1})/{1}[1-9]{1}([0-9]{2}Mi|Gi)$`,*/}
          {/*message: "请设置正确的容器规格，类似:200m/500Mi 或 1/2Gi",*/}
          {/*},*/}
          {/*],*/}
          {/*})(<Input placeholder="其他: 200m/500Mi 或 1/2Gi"/>)}*/}
          {/*</Form.Item>*/}
        </div>
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
