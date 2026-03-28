import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";
import Reusable_Header from "../../reusable_components/Reusable_Header";
import Reusable_Modal from "../../reusable_components/Reusable_Modal";
import ModalCreateAutomation from "./_components/ModalCreateAutomation";
import StatCard from "../../reusable_components/StatCard";

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



const AutomationItem = ({
  title,
  description,
  enabledInitial = true,
}) => {
  const [enabled, setEnabled] = useState(enabledInitial);
  const [isModalOpen,setIsModalOpen] = useState(false)
  

  return (
    <div className="bg-white rounded-lg border border-[#AFAFAF] p-4 flex justify-between items-center">
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-black text-white rounded-md flex items-center justify-center">
          <BsRobot />
        </div>

        <div>
          <p className="font-bold rob italic text-[15px] text-gray-900">{title}</p>
          <p className="text-xs rob mt-1 text-gray-500">{description}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <Toggle enabled={enabled} setEnabled={setEnabled} />

        <span
          className={`text-xs px-3 py-1 rounded-full ${
            enabled
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {enabled ? "Enabled" : "Disabled"}
        </span>

        <button onClick={()=> setIsModalOpen(true)} className="text-sm border border-[#AFAFAF] px-3 py-1 rounded hover:bg-gray-50 hover:cursor-pointer">
          Edit
        </button>
      </div>
      <Reusable_Modal
      setIsModalOpen={setIsModalOpen}
      isModalOpen={isModalOpen}
      children={
        <ModalCreateAutomation type={'edit'} />
      }
      />
    </div>
  );
};

const Automation = () => {
    const [isModalOpen,setIsModalOpen] = useState(false)
  return (
    <div className="min-h-screen ">
      <div className="max-w-8xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
<Reusable_Header header={'Automation & Bots'} subHeader={' Manage automated workflows and chatbots'} />


          <button onClick={()=> setIsModalOpen(true)} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800">
            <FiPlus />
            Create Automation
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Active Automations"
            value="1,247"
            subtitle="+12% this month"
          />
          <StatCard
            title="Total Executions"
            value="342K"
            subtitle="This month"
          />
          <StatCard
            title="Success Rate"
            value="97.8%"
            subtitle="Average"
          />
          <StatCard
            title="Time Saved"
            value="1,284 hrs"
            subtitle="This month"
          />
        </div>

        {/* Automation List */}
        <div className="space-y-4">
          <AutomationItem
            title="Welcome Message"
            description="New customer join • 1,247 executions • 98.5% success"
            enabledInitial={true}
          />

          <AutomationItem
            title="Auto-reply Outside Hours"
            description="Messages after 6PM • 804 executions • 100% success"
            enabledInitial={true}
          />

          <AutomationItem
            title="Task Assignment"
            description='Keyword: "urgent" • 356 executions • 95.3% success'
            enabledInitial={false}
          />
        </div>

      </div>

      <Reusable_Modal
      setIsModalOpen={setIsModalOpen}
      isModalOpen={isModalOpen}
      children={
        <ModalCreateAutomation />
      }
      />
    </div>
  );
};

export default Automation;
