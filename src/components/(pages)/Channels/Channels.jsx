import React from 'react';
import { Table, Input, Select, Dropdown, Menu, Avatar, Tag } from "antd";
import { FiSearch } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import StatCard from '../../reusable_components/StatCard';
import ReusableTable from '../../reusable_components/ReusableTable';
import Reusable_Header from '../../reusable_components/Reusable_Header';

const channelsDemoData = [
  {
    id: 1,
    name: "general",
    business: "TechCorp Solutions",
    type: "Public",
    members: 45,
    messages: 12847,
  },
  {
    id: 2,
    name: "engineering",
    business: "TechCorp Solutions",
    type: "Private",
    members: 28,
    messages: 8934,
  },
  {
    id: 3,
    name: "marketing",
    business: "Digital Marketing Pro",
    type: "Public",
    members: 15,
    messages: 5621,
  },
  {
    id: 4,
    name: "customer-support",
    business: "StartupHub Inc",
    type: "Public",
    members: 8,
    messages: 3247,
  },
  {
    id: 5,
    name: "product-updates",
    business: "TechCorp Solutions",
    type: "Public",
    members: 45,
    messages: 1892,
  },
];


const Channels = () => {


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
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type) => (
      <Tag
        className={`rounded-full rob px-2 ${type === "Public" ? "!bg-green-200 !text-green-600 rob border-transparent" : ""}`}
      
      >
        {type}
      </Tag>
    ),
  },
  {
    title: "Members",
    dataIndex: "members",
    key: "members",
    render: (members) => <p className='rob font-medium'>${members} members</p>,
  },
  {
    title: "Messages",
    dataIndex: "messages",
    key: "messages",
    render: (messages) =><p className='rob font-medium'>{ messages.toLocaleString()}</p>,
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
          overlayStyle={{ width: '150px'}}
          menu={{ items: menuItems }}
          trigger={["click"]}
        >
          <div className="cursor-pointer p-1 hover:bg-gray-100  rounded-full transition-colors inline-flex">
            <BsThreeDotsVertical className="text-gray-600" />
          </div>
        </Dropdown>
      );
    },
  },
];
    return (
        <div className='space-y-12'>
            <Reusable_Header header={'Channels'} subHeader={'Monitor channels, messages, and content across all businesses'} />
             <div>
     <div className='grid grid-cols-4 gap-14'>
               {
                [1,2,3,4].map(items => (
                    <StatCard />
                ))
            }
     </div>

        </div>
            <ReusableTable data={channelsDemoData} columns={columns} />
        </div>
    );
};

export default Channels;