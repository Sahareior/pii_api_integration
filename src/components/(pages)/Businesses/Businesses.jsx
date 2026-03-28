import React from 'react';
import { Table, Input, Select, Dropdown, Menu, Avatar, Tag } from "antd";
import { FiSearch } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import StatCard from '../../reusable_components/StatCard';
import ReusableTable from '../../reusable_components/ReusableTable';
import Reusable_Header from '../../reusable_components/Reusable_Header';

 const businessDemoData = [
  {
    id: 1,
    business: "TechCorp Solutions",
    ownerName: "Sarah Johnson",
    ownerEmail: "sarah@techcorp.com",
    status: "Active",
    teamSize: 45,
    channels: 12,
    created: "Jan 15, 2024",
  },
  {
    id: 2,
    business: "Digital Marketing Pro",
    ownerName: "Michael Chen",
    ownerEmail: "michael@digipro.com",
    status: "Active",
    teamSize: 28,
    channels: 8,
    created: "Feb 3, 2024",
  },
  {
    id: 3,
    business: "StartupHub Inc",
    ownerName: "Emily Rodriguez",
    ownerEmail: "emily@startuphub.io",
    status: "Active",
    teamSize: 12,
    channels: 5,
    created: "Feb 18, 2024",
  },
  {
    id: 4,
    business: "Global Ventures",
    ownerName: "David Kim",
    ownerEmail: "david@globalventures.com",
    status: "Active",
    teamSize: 78,
    channels: 24,
    created: "Dec 10, 2023",
  },
  {
    id: 5,
    business: "Creative Studio",
    ownerName: "Lisa Anderson",
    ownerEmail: "lisa@creativestudio.com",
    status: "Suspended",
    teamSize: 15,
    channels: 6,
    created: "Jan 28, 2024",
  },
  {
    id: 6,
    business: "FinTech Innovations",
    ownerName: "Robert Taylor",
    ownerEmail: "robert@fintech.com",
    status: "Active",
    teamSize: 92,
    channels: 31,
    created: "Nov 5, 2023",
  },
  {
    id: 7,
    business: "Local Bakery Co",
    ownerName: "Amanda White",
    ownerEmail: "amanda@bakery.com",
    status: "Active",
    teamSize: 3,
    channels: 2,
    created: "Mar 1, 2024",
  },
  {
    id: 8,
    business: "E-commerce Platform",
    ownerName: "James Wilson",
    ownerEmail: "james@ecommerce.com",
    status: "Active",
    teamSize: 34,
    channels: 14,
    created: "Feb 12, 2024",
  },
];


const Businesses = () => {


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
          >
            {record.business.slice(0, 2).toUpperCase()}
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
            {record.ownerName}
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
          overlayStyle={{ width: '150px', background:'black' }}
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
    return (
        <div className='space-y-12'>
<Reusable_Header header={'Businesses'} subHeader={'Manage all businesses on your platform'} />

             <div>
     <div className='grid grid-cols-4 gap-14'>
               {
                [1,2,3,4].map(items => (
                    <StatCard />
                ))
            }
     </div>

        </div>
            <ReusableTable data={businessDemoData} columns={columns} />
        </div>
    );
};

export default Businesses;