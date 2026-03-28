import React from 'react';
import { Table, Input, Select, Dropdown, Menu, Avatar, Tag } from "antd";
import { FiSearch } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import StatCard from '../../reusable_components/StatCard';
import ReusableTable from '../../reusable_components/ReusableTable';
import Reusable_Header from '../../reusable_components/Reusable_Header';
import { useBusinessStatusMutation, useGetBusinessOverViewQuery } from '../../../redux/features/sijanSlice/sijan.slice';




const Businesses = () => {
  const { data, isLoading, isError, error } = useGetBusinessOverViewQuery();
  const [businessStatus] = useBusinessStatusMutation();


  const handleStatusChange = async (id, status) => {

    const payload = {
      id: id,
      is_active: status
    }

    try {
      await businessStatus(payload);
    } catch (error) {
      console.log(error);
    }
  };

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
        <p className="text-red-500 text-lg font-semibold mb-2">Failed to load businesses</p>
        <p className="text-gray-500">{error?.data?.message || error?.status || "Something went wrong"}</p>
      </div>
    );
  }

  const columns = [
    {
      title: "Business",
      dataIndex: "business",
      key: "business",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar
            style={{ backgroundColor: "#000", color: "#fff" }}
            size={36}
            src={record.picture}
          >
            {record.business?.slice(0, 2).toUpperCase()}
          </Avatar>
          <span className="font-medium text-gray-800">
            {record.business}
          </span>
        </div>
      ),
    },
    {
      title: "Owner",
      key: "owner",
      render: (_, record) => (
        <div>
          <div className="font-medium text-gray-800">
            {record.ownerName || "N/A"}
          </div>
          <div className="text-xs text-gray-500">
            {record.ownerEmail}
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={status === "Active" ? "green" : "red"}
          className="rounded-full px-3"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Team Size",
      dataIndex: "teamSize",
      key: "teamSize",
      render: (size) => `${size} members`,
    },
    {
      title: "Channels",
      dataIndex: "channels",
      key: "channels",
    },
    {
      title: "Created",
      dataIndex: "created",
      key: "created",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_, record) => {
        const menuItems = [
          { key: '1', label: `${record.status === "Active" ? "Deactivate" : "Activate"}`, onClick: () => handleStatusChange(record.id, record.status === "Active" ? false : true) },
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

  const tableData = data?.workspaces?.map(space => ({
    id: space.id,
    business: space.name,
    picture: space.picture,
    ownerName: space.created_by?.name,
    ownerEmail: space.created_by?.email,
    status: space.is_active === true ? "Active" : "Inactive",
    teamSize: space.users_count,
    channels: space.channels_count,
    created: space.created_at,
    
  })) || [];

  return (
    <div className='space-y-12'>
      <Reusable_Header header={'Businesses'} subHeader={'Manage all businesses on your platform'} />

      <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14'>
          <StatCard title="Total Businesses" value={data?.total_workspaces} />
          <StatCard title="Active Businesses" value={data?.total_active_workspaces} />
          <StatCard title="Inactive Businesses" value={data?.total_inactive_workspaces} />
        </div>
      </div>
      <ReusableTable data={tableData} columns={columns} />
    </div>
  );
};

export default Businesses;