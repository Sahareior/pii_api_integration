import React, { useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined, SettingOutlined, RobotOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LuBell, LuBuilding2, LuHash, LuLayoutDashboard, LuUsersRound } from "react-icons/lu";
import ModalNotifications from './(pages)/profile/ModalNotifications';
import Reusable_Modal from './reusable_components/Reusable_Modal';
import { LiaRobotSolid } from 'react-icons/lia';
import { GoGear } from 'react-icons/go';

const { Header, Content, Footer, Sider } = Layout;

const DashboardHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen,setIsModalOpen] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const sideBar = [
    {
      key: '/overview',
      icon: <LuLayoutDashboard size={20} />,
      label: 'Dashboard',
    },
    {
      key: '/business',
      icon: <LuBuilding2 size={20} />,
      label: 'Businesses',
    },
    {
      key: '/channels',
      icon: <LuHash  size={20} />,
      label: 'Channels',
    },
    {
      key: '/users',
      icon: <LuUsersRound size={20} />,
      label: 'Users',
    },
    {
      key: '/automations',
       icon: <LiaRobotSolid  size={20} />,
      label: 'Automation & Bots',
    },
    {
      key: '/system',
       icon: <GoGear size={20} />,
      label: 'System Settings',
    },
  ];

  // Derive the selected key from the current pathname
  const selectedKey = sideBar.find(item => location.pathname.startsWith(item.key))?.key || '/overview';

  const handleMenuClick = (e) => {
    navigate(e.key);
  };
  const profileMenu = [
    {
      key: '1',
      label: 'Profile Settings',
      onClick: () => navigate('/profile'),
    },
    {
      key: '2',
      label: 'Privacy Policy',
      onClick: () => navigate('privacy'),
    },
    {
      key: '3',
      label: 'Terms of Service',
      onClick: () => navigate('terms'),
    },
    {
      type: 'divider',
      style: { backgroundColor: '#444' }
    },
    {
      key: '4',
      label: 'Logout',
      danger: true,
      onClick: () => navigate('/'),
    },
  ];

  return (
    <Layout className='h-screen'>
      <Sider
             style={{
          background: "#020203",
        }}
        width={250}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical space-y-8" />
        <img className='h-28 w-full object-cover' src="/logo.jpg" alt="Logo" />
        <Menu
          className='space-y-2 rob bg-amber-600 mt-9 font-normal text-[16px] my-7'
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={sideBar}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header 
          className='h-[100px] flex items-center px-8' 
          style={{ background: colorBgContainer, lineHeight: 'normal' }}
        >
          <div className='flex justify-between w-full items-center'>
            <div className='flex'>
              <h3 className='text-[32px] rob flex items-center gap-3 font-semibold leading-tight'>
                Welcome, <span className='text-[20px] rob mt-1 font-normal block'>Admin Dashboard</span>
              </h3>
            </div>

            <div className='flex items-center gap-6'>
              <button onClick={()=> setIsModalOpen(true)} className='cursor-pointer relative text-gray-600 hover:text-black mt-2 transition-colors'>
                <LuBell className='relative' size={24} />
                <p className='absolute -top-3 -right-3 rounded-full bg-[#FB2C36] text-white w-5 h-5 '>2</p>
              </button>
              
              <Dropdown menu={{ items: profileMenu }} overlayClassName="dark-profile-dropdown" trigger={['click']}>
                <div className='flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors'>
                  <Avatar 
                    size={38}
                    src='https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  />
                  <div className='flex flex-col justify-center'>
                    <p className='rob font-semibold text-[16px] leading-tight'>Super Admin</p>
                    <p className='rob text-[14px] text-gray-500 leading-tight'>admin@gmail.com</p>
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content className='h-[82vh] overflow-auto' style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
      <Reusable_Modal
      setIsModalOpen={setIsModalOpen}
      isModalOpen={isModalOpen}
      children={
        <ModalNotifications />
      }
      />
    </Layout>
  );
};

export default DashboardHome;
