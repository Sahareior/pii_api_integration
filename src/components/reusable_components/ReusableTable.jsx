import React, { useMemo, useState } from "react";
import { Table, Input, Select, Dropdown, Menu, Avatar, Tag } from "antd";
import { FiSearch } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";

const { Option } = Select;





const ReusableTable = ({ data = [], columns }) => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  /* ---------------- Filtering Logic ---------------- */

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.business?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.ownerName?.toLowerCase().includes(searchText.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [data, searchText, statusFilter]);

  /* ---------------- Columns ---------------- */



  /* ---------------- UI ---------------- */

  return (
    <div className="bg-white rounded-xl border-[#60606080]/50 border rob p-4">

      {/* Top Controls */}
      <div className="flex justify-between items-center mb-4">

        {/* Search */}
        <Input
          prefix={<FiSearch />}
          placeholder="Search businesses or owners..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
          allowClear
        />

        {/* Status Filter */}
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          style={{ width: 150 }}
        >
          <Option value="all">All Status</Option>
          <Option value="Active">Active</Option>
          <Option value="Suspended">Suspended</Option>
        </Select>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

export default ReusableTable;
