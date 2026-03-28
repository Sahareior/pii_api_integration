import React, { useState } from "react";
import { FiX } from "react-icons/fi";

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

const ModalCreateAutomation = ({ onClose,type }) => {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="  flex items-center justify-center  z-50">
      <div className=" w-full max-w-xl h-[70vh] overflow-y-auto rounded-xl   relative space-y-6">

        {/* Close Button */}


        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {type === 'create' ? 'Create New Aut  omation' : 'Edit Automation'}
          </h2>
          <p className="text-sm text-gray-500">
            {type === 'create' ? 'Set up a new automated workflow for your platform' : 'Edit the automated workflow for your platform'}
          </p>
        </div>

        {/* Basic Fields */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">
              Automation  Name *
            </label>
            <input
              type="text"
              placeholder="e.g., Welcome Message, Auto-reply"
              className="w-full mt-1 border rounded-md px-3 py-2 text-sm bg-gray-50"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Business *
            </label>
            <input
              type="text"
              placeholder="All business"
              className="w-full mt-1 border rounded-md px-3 py-2 text-sm bg-gray-50"
            />
          </div>
        </div>

        {/* Trigger Section */}
        <div className="border rounded-xl p-4 space-y-4">
          <h3 className="font-semibold text-gray-900">
            Trigger
          </h3>
          <p className="text-sm text-gray-500">
            When should this automation run?
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">
                Trigger Type *
              </label>
              <select className="w-full mt-1 border rounded-md px-3 py-2 text-sm bg-gray-50">
                <option>New Message</option>
                <option>User Signup</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Trigger Value *
              </label>
              <input
                type="text"
                placeholder="Trigger condition"
                className="w-full mt-1 border rounded-md px-3 py-2 text-sm bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="border rounded-xl p-4 space-y-4">
          <h3 className="font-semibold text-gray-900">
            Action
          </h3>
          <p className="text-sm text-gray-500">
            What should happen when triggered?
          </p>

          <div>
            <label className="text-sm font-medium">
              Action Type *
            </label>
            <select className="w-full mt-1 border rounded-md px-3 py-2 text-sm bg-gray-50">
              <option>Send Message</option>
              <option>Assign Task</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">
              Message Content *
            </label>
            <textarea
              rows={3}
              placeholder="Enter the message to send..."
              className="w-full mt-1 border rounded-md px-3 py-2 text-sm bg-gray-50 resize-none"
            />
          </div>
        </div>

        {/* Enable Automation */}
        <div className="flex justify-between items-center border rounded-xl p-4">
          <div>
            <p className="font-medium text-gray-900">
              Enable Automation
            </p>
            <p className="text-sm text-gray-500">
              Start running this automation immediately
            </p>
          </div>

          <Toggle enabled={enabled} setEnabled={setEnabled} />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50">
            {type === 'create' ? 'Cancel' : 'Delete'}
          </button>
          <button className="px-4 py-2 bg-[#000000] text-white rounded-md text-sm hover:bg-black">
            {type === 'create' ? 'Create Automation' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateAutomation;
