import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";
import Reusable_Header from "../../reusable_components/Reusable_Header";
import Reusable_Modal from "../../reusable_components/Reusable_Modal";
import ModalCreateAutomation from "./_components/ModalCreateAutomation";
import StatCard from "../../reusable_components/StatCard";
import { useEditAutomationMutation, useGetAutomationQuery } from "../../../redux/features/sijanSlice/sijan.slice";

const Toggle = ({ enabled, setEnabled }) => {
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative w-10 h-5 rounded-full transition ${
        enabled ? "bg-black" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition ${
          enabled ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
};



const AutomationItem = ({ automationItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAutomation] = useEditAutomationMutation();

  const handleToggle = async (enabled) => {
    try {
      await editAutomation({
        id: automationItem.id,
        data: { is_enabled: enabled }
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-[#AFAFAF] p-4 flex justify-between items-center">
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-black text-white rounded-md flex items-center justify-center">
          <BsRobot />
        </div>

        <div>
          <p className="font-bold rob italic text-[15px] text-gray-900">{automationItem.name}</p>
          <p className="text-xs rob mt-1 text-gray-500">
            {automationItem.trigger_type} • {automationItem.action_type}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <Toggle 
          enabled={automationItem.is_enabled} 
          setEnabled={(val) => handleToggle(val)} 
        />

        <span
          className={`text-xs px-3 py-1 rounded-full ${
            automationItem.is_enabled
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {automationItem.is_enabled ? "Enabled" : "Disabled"}
        </span>

        <button onClick={() => setIsModalOpen(true)} className="text-sm border border-[#AFAFAF] px-3 py-1 rounded hover:bg-gray-50 hover:cursor-pointer">
          Edit
        </button>
      </div>

      <Reusable_Modal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      >
        <ModalCreateAutomation type="edit" initialData={automationItem} onClose={() => setIsModalOpen(false)} />
      </Reusable_Modal>
    </div>
  );
};

const Automation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError, error } = useGetAutomationQuery();

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
        <p className="text-red-500 text-lg font-semibold mb-2">Failed to load automations</p>
        <p className="text-gray-500">{error?.data?.message || error?.status || "Something went wrong"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-8xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <Reusable_Header header={'Automation & Bots'} subHeader={' Manage automated workflows and chatbots'} />

          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 cursor-pointer">
            <FiPlus />
            Create Automation
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Active Automations"
            value={data?.active_automations || 0}
            subtitle="Currently running"
          />
          <StatCard
            title="Total Executions"
            value={data?.total_executions || 0}
            subtitle="Lifetime total"
          />
          <StatCard
            title="Success Rate"
            value={`${data?.success_rate || 0}%`}
            subtitle="Average"
          />
          <StatCard
            title="Time Saved"
            value={`${data?.time_saved_hours || 0} hrs`}
            subtitle="Estimated"
          />
        </div>

        {/* Automation List */}
        <div className="space-y-4">
          {data?.automations?.length > 0 ? (
            data.automations.map((item) => (
              <AutomationItem
                key={item.id}
                automationItem={item}
              />
            ))
          ) : (
            <div className="bg-white rounded-lg border border-dashed border-[#AFAFAF] p-12 text-center">
              <p className="text-gray-500 rob">No automations found. Create your first one!</p>
            </div>
          )}
        </div>

      </div>

      <Reusable_Modal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      >
        <ModalCreateAutomation type="create" onClose={() => setIsModalOpen(false)} />
      </Reusable_Modal>
    </div>
  );
};

export default Automation;
