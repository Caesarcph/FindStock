import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  LineChartOutlined,
  FundOutlined,
  RobotOutlined,
  SearchOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

function Navbar() {
  const location = useLocation();

  const items = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: '/technical',
      icon: <LineChartOutlined />,
      label: <Link to="/technical">Technical Analysis</Link>,
    },
    {
      key: '/fundamental',
      icon: <FundOutlined />,
      label: <Link to="/fundamental">Fundamental Analysis</Link>,
    },
    {
      key: '/ai',
      icon: <RobotOutlined />,
      label: <Link to="/ai">AI Analysis</Link>,
    },
    {
      key: '/search',
      icon: <SearchOutlined />,
      label: <Link to="/search">Stock Search</Link>,
    },
  ];

  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={items}
      />
    </Header>
  );
}

export default Navbar;
