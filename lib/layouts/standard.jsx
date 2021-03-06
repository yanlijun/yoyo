import {Layout, Menu, Icon, Breadcrumb, Dropdown} from 'antd';
import {Component } from 'react'
import {Link} from 'dva/router';
import {connect} from 'dva';
import './standard.less';
import {logout} from '../../utils'

const {Header, Sider, Content} = Layout;
const SubMenu = Menu.SubMenu;
const userMenus = (
  <Menu>
    <Menu.Item >
      <a href="javascript:;" onClick={logout}>退出</a>
    </Menu.Item>
  </Menu>
);
function getMenuItem(item, current = []) {
  if (item.submenu && item.submenu.length) {
    return (
      <SubMenu
        key={item.code}
        title={<span><i className={item.icon}/><span className="nav-text">{item.name}</span></span>}
      >
        {
          (item.submenu || []).map((sub) => {
            return getMenuItem(sub,current)
          })
        }
      </SubMenu>
    )
  } else if (item.isMenu ) {
    return <Menu.Item key={item.code}>
      <Link to={item.url}><i className={item.icon}/>{item.name}</Link>
    </Menu.Item>
  } else if(current.indexOf(item.code) > -1){
    return <Menu.Item key={item.code}>
      <a><i className={item.icon}/>{item.name}</a>
    </Menu.Item>
  } else {
    return null;
  }

}
const BreadcrumbConnect = connect(({layout}) => {
  return {
    current: layout.menuMap[layout.current],
  }
})(({current}) => {
  if (!current) {
    return null;
  }
  const arr = [current];
  let currentObj = current;
  while (currentObj && currentObj.parent) {
    arr.push(currentObj.parent);
    currentObj = currentObj.parent;
  }
  return (
    <Breadcrumb style={{margin: '12px 0'}}>
      {arr.reverse().map((item) => {
        return <Breadcrumb.Item key={item.code}>{item.name}</Breadcrumb.Item>
      })}
    </Breadcrumb>
  )
})
class Standard extends Component{
  componentDidMount(){
    this.props.dispatch({
      type:'layout/queryUser'
    })
  }
  render(){
    const {
      dispatch, children, collapsed,
      user, menus, topMenus, currentSystem, openKeys, current,
    }  = this.props;
    if (!user) {
      return (
        <div>登录中...</div>
      )
    }
    function toggleCollapsed() {
      dispatch({
        type: 'layout/toggleCollapsed',
      })
    }


    function onOpenChange(openKeys) {
      dispatch({
        type: 'layout/openMenu',
        payload: openKeys,
      })
    }

    const topMenusDropdown = (<Menu>
      {topMenus.map((item) => {
        return (
          <Menu.Item key={item.code}>
            <a href={item.url}>{item.name}</a>
          </Menu.Item>
        )
      })}
    </Menu>);
    return (
      <Layout className="layout">
        <Header className="header">
          <Link to="/" className="logo">
            易居社区
          </Link>
          <div className={`companyName ${collapsed ? 'close' : ''}`}>
            <span>易居社区增值服务集团</span>
          </div>
          <Icon
            className={'trigger'}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggleCollapsed}
          />
          <div className="pull-right">
            <Dropdown overlay={userMenus}>
              <a className="ant-dropdown-link" href="javascript:;">
                {user.user_name} <Icon type="down"/>
              </a>
            </Dropdown>
            &nbsp;&nbsp;&nbsp;
            <Dropdown overlay={topMenusDropdown}>
              <a className="ant-dropdown-link" href="javascript:;">
                {currentSystem && currentSystem.name} <Icon type="down"/>
              </a>
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <Menu
              mode={collapsed ? 'vertical' : 'inline'} onOpenChange={onOpenChange}
              openKeys={openKeys}
              selectedKeys={current}
              inlineIndent="12"
            >
              {
                menus.map(item => getMenuItem(item, current))
              }
            </Menu>
          </Sider>
          <Content className={'content'}>
            <BreadcrumbConnect />
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}


export default connect(({layout}) => {
  return {
    ...layout,
  }
})(Standard);
