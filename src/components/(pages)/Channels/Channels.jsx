import React from 'react';
import { Table, Input, Select, Dropdown, Menu, Avatar, Tag } from "antd";
import { FiSearch } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import StatCard from '../../reusable_components/StatCard';
import ReusableTable from '../../reusable_components/ReusableTable';
import Reusable_Header from '../../reusable_components/Reusable_Header';
import { useChannelStatusMutation, useDeleteChannelMutation, useGetChannelOverViewQuery } from '../../../redux/features/sijanSlice/sijan.slice';




const Channels = () => {
  const { data, isLoading, isError, error } = useGetChannelOverViewQuery();
  const [channelStatus] = useChannelStatusMutation();
  const [deleteChannel] = useDeleteChannelMutation();

    const handleStatusChange = async (id, status) => {

    const payload = {
      id: id,
      is_active: status
    }

    try {
      await channelStatus(payload);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteChannel = async (id) => {
    try {
      await deleteChannel({ id });
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
        <p className="text-red-500 text-lg font-semibold mb-2">Failed to load channels</p>
        <p className="text-gray-500">{error?.data?.message || error?.status || "Something went wrong"}</p>
      </div>
    );
  }

  const columns = [
    {
      title: "Channel",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <div className="flex rob items-center gap-2">
          <span className="text-gray-400 text-lg">#</span>
          <span className="font-medium text-gray-800">{name}</span>
        </div>
      ),
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
              color={status === "Active" ? "green" : "red"}
              className="rounded-full px-3"
            >
              {status}
            </Tag>
          ),
        },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag
          className={`rounded-full rob px-2 ${type.toLowerCase() === "public" ? "bg-green-200! text-green-600! rob border-transparent" : "bg-blue-100! text-blue-600! border-transparent"}`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      render: (members) => <p className='rob font-medium'>{members} members</p>,
    },
    {
      title: "Messages",
      dataIndex: "messages",
      key: "messages",
      render: (messages) => <p className='rob font-medium'>{messages.toLocaleString()}</p>,
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (record) => {
        const menuItems = [
             { key: '1', label: `${record.status === "Active" ? "Deactivate" : "Activate"}`, onClick: () => handleStatusChange(record.id, record.status === "Active" ? false : true) },
          { key: '2', label: 'Delete', danger: true, onClick: () => handleDeleteChannel(record.id) },
        ];

        return (
          <Dropdown
            overlayStyle={{ width: '150px' }}
            menu={{ items: menuItems }}
            trigger={["click"]}
          >
            <div className="cursor-pointer p-1 bg-white  transition-colors inline-flex">
              <BsThreeDotsVertical className="text-gray-600" />
            </div>
          </Dropdown>
        );
      },
    },
  ];

  const tableData = data?.channels?.map(channel => ({
    id: channel.id,
    name: channel.name,
    business: channel.workspaces?.[0]?.name || "N/A",
    type: channel.type,
    members: channel.users_count,
    status: channel.is_active === true ? "Active" : "Inactive",
    messages: channel.messages_count,
  })) || [];

console.log(data?.total_inactive_channels)

  return (
    <div className='space-y-12'>
      <Reusable_Header header={'Channels'} subHeader={'Monitor channels, messages, and content across all businesses'} />
      <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>
          <StatCard title="Total Channels" value={data?.total_channels} />
          <StatCard title="Active Channels" value={data?.total_active_channels} />
          <StatCard title="Inactive Channels" value={data?.total_inactive_channels} />
          <StatCard title="Messages Today" value={data?.messages_today_count} />
        </div>

      </div>
      <ReusableTable data={tableData} columns={columns} />
    </div>
  );
};

export default Channels;