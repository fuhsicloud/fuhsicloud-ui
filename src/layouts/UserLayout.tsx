import { DefaultFooter, MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import Link from 'umi/link';
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

import SelectLang from '@/components/SelectLang';
import { ConnectProps, ConnectState } from '@/models/connect';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
}

const UserLayout: React.SFC<UserLayoutProps> = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    formatMessage,
    ...props,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>伏羲云平台</span>
              </Link>
            </div>
            <div className={styles.desc}>基于Kubernetes的云原生PaaS解决方案</div>
          </div>
          {children}
        </div>
        <DefaultFooter
            copyright="2019 伏羲云平台"
            links={[
              // {
              //   key: 'Ant Design Pro',
              //   title: 'Ant Design Pro',
              //   href: 'https://pro.ant.design',
              //   blankTarget: true,
              // },
              // {
              //   key: 'github',
              //   title: <Icon type="github" />,
              //   href: 'https://github.com/ant-design/ant-design-pro',
              //   blankTarget: true,
              // },
              // {
              //   key: 'Ant Design',
              //   title: 'Ant Design',
              //   href: 'https://ant.design',
              //   blankTarget: true,
              // },
            ]}
         />
      </div>
    </>
  );
};

export default connect(({ settings }: ConnectState) => ({
  ...settings,
}))(UserLayout);
