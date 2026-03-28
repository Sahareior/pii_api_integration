import React from 'react';
import { Table, Input, Select, Dropdown, Menu, Avatar, Tag } from "antd";
import { FiSearch } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import StatCard from '../../reusable_components/StatCard';
import ReusableTable from '../../reusable_components/ReusableTable';
import Reusable_Header from '../../reusable_components/Reusable_Header';
import { useGetAllUsersQuery } from '../../../redux/features/sijanSlice/sijan.slice';




const Users = () => {
  const { data, isLoading, isError, error } = useGetAllUsersQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <p className="text-red-500 text-lg font-semibold mb-2">Failed to load users</p>
        <p className="text-gray-500">{error?.data?.message || error?.status || "Something went wrong"}</p>
      </div>
    );
  }

  const columns = [
    {
      title: "User",
      key: "user",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar
            style={{ backgroundColor: "#000", color: "#fff" }}
            size={36}
          >
            {record.name
              ? record.name
                  .split(" ")
                  .filter(Boolean)
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : record.email[0].toUpperCase()}
          </Avatar>

          <div>
            <div className="font-medium rob text-gray-800">
              {record.name || "N/A"}
            </div>
            <div className="text-xs rob text-gray-500">
              {record.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        const isAdmin = role?.toLowerCase().includes("admin");
        return (
          <Tag
            className={`rounded-full rob px-3`}
            color={
              isAdmin
                ? "bg-black text-white"
                : role === "Customer"
                ? "blue"
                : role === "Team Member"
                ? "default"
                : "processing"
            }
          >
            {role || "User"}
          </Tag>
        );
      },
    },
    {
      title: "Business",
      dataIndex: "business",
      key: "business",
      render: (items) => (
        <p className='font-medium rob'>
          {items}
        </p>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={status?.toLowerCase() === "active" ? "green" : "default"}
          className={`rounded-full px-3 ${status?.toLowerCase() === "active" ? "bg-green-200! text-green-900! rob border-transparent" : ""}`}
        >
          {status?.charAt(0).toUpperCase() + status?.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Last Active",
      dataIndex: "lastActive",
      key: "lastActive",
      render: (items) => (
        <p className='text-[#717182] rob'>
          {items}
        </p>
      )
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: () => {
        const menuItems = [
          { key: '1', label: 'Deactivate' },
          { key: '2', label: 'Delete', danger: true },
        ];

        return (
          <Dropdown
            overlayStyle={{ width: '150px', background: 'black' }}
            menu={{ items: menuItems }}
            trigger={["click"]}
          >
            <div className="cursor-pointer p-1 hover:bg-gray-100 rounded-full transition-colors inline-flex">
              <BsThreeDotsVertical className="text-gray-600" />
            </div>
          </Dropdown>
        );
      },
    },
  ];

  const tableData = data?.results?.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    business: user.created_workspaces?.[0] || "N/A",
    status: user.status === "active" ? "Active" : "Inactive",
    lastActive: user.last_active || "Never",
  })) || [];

  return (
    <div className='space-y-12'>
      <Reusable_Header header={'Users'} subHeader={'Manage users'} />
      <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14'>
          <StatCard title="Total Users" value={data?.total_users} />
          <StatCard title="Active Users" value={data?.total_active_users} />
          <StatCard title="Inactive Users" value={data?.total_inactive_users} />
        </div>

      </div>
      <ReusableTable data={tableData} columns={columns} />
    </div>
  );
};

export default Users;