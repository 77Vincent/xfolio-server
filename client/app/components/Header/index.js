import React from 'react';
import { Menu, Button } from 'antd';
import { Route, Link, NavLink } from 'react-router-dom';
import './index.less';

export default class Header extends React.Component {
  render() {
    const links = [{
      title: '首页',
      href: '/'
    }, {
      title: '寻找老师',
      href: '/teachers'
    }, {
      title: '关于我们',
      href: '/about'
    }];

    const domain = this.constructor.name;

    return (
      <div>
        <div className="App-logo"></div>

        <Menu 
          mode='horizontal' 
          className={`${domain}-Menu`}
        >

          {
            links.map((item, index) => {
              return <Menu.Item key={index}><NavLink to={item.href}>{item.title}</NavLink></Menu.Item>
            })
          }
          <Menu.Item style={{float: 'right'}}><Button><Link to='/register'>注册</Link></Button></Menu.Item>
          <Menu.Item style={{float: 'right'}}><Button><Link to='/login'>登录</Link></Button></Menu.Item>
        </Menu>
      </div>
    );
  }
}