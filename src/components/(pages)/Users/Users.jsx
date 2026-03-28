import React from 'react';
import { Table, Input, Select, Dropdown, Menu, Avatar, Tag } from "antd";
import { FiSearch } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import StatCard from '../../reusable_components/StatCard';
import ReusableTable from '../../reusable_components/ReusableTable';
import Reusable_Header from '../../reusable_components/Reusable_Header';

const usersDemoData = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@techcorp.com",
    role: "Business Admin",
    business: "TechCorp Solutions",
    status: "Active",
    lastActive: "2 minutes ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@digipro.com",
    role: "Business Admin",
    business: "Digital Marketing Pro",
    status: "Active",
    lastActive: "1 hour ago",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily@startuphub.io",
    role: "Business Admin",
    business: "StartupHub Inc",
    status: "Active",
    lastActive: "5 minutes ago",
  },
  {
    id: 4,
    name: "John Davis",
    email: "john@techcorp.com",
    role: "Customer",
    business: "TechCorp Solutions",
    status: "Active",
    lastActive: "15 minutes ago",
  },
  {
    id: 5,
    name: "Maria Garcia",
    email: "maria@digipro.com",
    role: "Team Member",
    business: "Digital Marketing Pro",
    status: "Active",
    lastActive: "3 hours ago",
  },
  {
    id: 6,
    name: "Alex Thompson",
    email: "alex@techcorp.com",
    role: "Business User",
    business: "TechCorp Solutions",
    status: "Inactive",
    lastActive: "2 days ago",
  },
];


const Users = () => {


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
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </Avatar>

        <div>
          <div className="font-medium rob text-gray-800">
            {record.name}
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
      const isAdmin = role.toLowerCase().includes("admin");
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
          {role}
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
        color={status === "Active" ? "green" : "default"}
        className={`rounded-full px-3 ${status === "Active" ? "!bg-green-200 text-green-900 rob border-transparent" : ""}`}
      >
        {status}
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
            <Reusable_Header header={'Users'} subHeader={'Manage users'}/>
             <div>
     <div className='grid grid-cols-4 gap-14'>
               {
                [1,2,3,4].map(items => (
                    <StatCard />
                ))
            }
     </div>

        </div>
            <ReusableTable data={usersDemoData} columns={columns} />
        </div>
    );
};

export default Users;