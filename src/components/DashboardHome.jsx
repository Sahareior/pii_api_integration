import { useState, useMemo } from 'react';
import { Avatar, Dropdown, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LuBell,
  LuBuilding2,
  LuHash,
  LuLayoutDashboard,
  LuUsersRound,
  LuLogOut
} from "react-icons/lu";
import ModalNotifications from './(pages)/profile/ModalNotifications';
import Reusable_Modal from './reusable_components/Reusable_Modal';
import { LiaRobotSolid } from 'react-icons/lia';
import { GoGear } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/auth/auth.slice';
import Swal from 'sweetalert2';
import { useGetNotificationsQuery } from '../redux/features/notification/notification.api';
import useNotificationSocket from '../hooks/useNotificationSocket';


const { Header, Content, Sider } = Layout;

const DashboardHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useGetNotificationsQuery();
  const {
    notifications,
    markAllAsReadLocal,
  } = useNotificationSocket(data);

  // Optimized unread count
  const unreadCount = useMemo(() => {
    return notifications.reduce(
      (acc, n) => acc + (n.unread ? 1 : 0),
      0
    );
  }, [notifications]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Logout
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#343F4F",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        navigate("/");
      }
    });
  };

  // Sidebar items
  const sideBar = [
    { key: '/overview', icon: <LuLayoutDashboard size={20} />, label: 'Dashboard' },
    { key: '/business', icon: <LuBuilding2 size={20} />, label: 'Businesses' },
    { key: '/channels', icon: <LuHash size={20} />, label: 'Channels' },
    { key: '/users', icon: <LuUsersRound size={20} />, label: 'Users' },
    { key: '/automations', icon: <LiaRobotSolid size={20} />, label: 'Automation & Bots' },
    { key: '/system', icon: <GoGear size={20} />, label: 'System Settings' },
  ];

  const selectedKey =
    sideBar.find(item => location.pathname.startsWith(item.key))?.key || '/overview';

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  // Profile dropdown
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
    { type: 'divider' },
    {
      key: '4',
      label: 'Logout',
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className="h-screen">
      {/* Sidebar */}
      <Sider
        style={{ background: "#020203" }}
        width={250}
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <img
              className="h-28 w-full object-cover"
              src="/logo.jpg"
              alt="Logo"
            />

            <Menu
              className="mt-9"
              theme="dark"
              mode="inline"
              selectedKeys={[selectedKey]}
              items={sideBar}
              onClick={handleMenuClick}
            />
          </div>

          {/* Logout button */}
          <div className="px-4 pb-8">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <LuLogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </Sider>

      {/* Main */}
      <Layout>
        {/* Header */}
        <Header
          className="h-[100px] flex items-center px-8"
          style={{ background: colorBgContainer }}
        >
          <div className="flex justify-between w-full items-center">
            <h3 className="text-[28px] font-semibold">
              Welcome,
              <span className="text-[18px] ml-2 font-normal">
                Admin Dashboard
              </span>
            </h3>

            {/* Right side */}
            <div className="flex items-center gap-6">
              {/* Notification */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="relative text-gray-600 hover:text-black"
              >
                <LuBell size={24} />

                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 text-[10px] flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Profile */}
              <Dropdown
                menu={{ items: profileMenu }}
                trigger={['click']}
              >
                <div className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                  <Avatar
                    size={38}
                    src="https://images.unsplash.com/photo-1570612861542-284f4c12e75f"
                  />
                  <div>
                    <p className="font-semibold text-[14px]">
                      Super Admin
                    </p>
                    <p className="text-[12px] text-gray-500">
                      admin@gmail.com
                    </p>
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
        </Header>

        {/* Content */}
        <Content
          className="overflow-auto"
          style={{ margin: '24px 16px 0' }}
        >
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>

      {/* Notification Modal */}
      <Reusable_Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <ModalNotifications
          notifications={notifications}
          markAllAsReadLocal={markAllAsReadLocal}
        />
      </Reusable_Modal>
    </Layout>
  );
};

export default DashboardHome;