import React, { useState } from "react";
import { FiBell, FiZap } from "react-icons/fi";
import Reusable_Header from "../../reusable_components/Reusable_Header";

const Toggle = ({ enabled, setEnabled, disabled = false }) => {
  return (
    <button
      onClick={() => !disabled && setEnabled(!enabled)}
      className={`relative w-10 h-5 rounded-full transition ${
        enabled ? "bg-black" : "bg-gray-300"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition ${
          enabled ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
};

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const [autoReply, setAutoReply] = useState(true);
  const [fileSharing, setFileSharing] = useState(true);
  const [videoCalls, setVideoCalls] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);

  const SettingRow = ({ title, description, toggle }) => (
    <div className="flex justify-between items-center py-4 border-b last:border-b-0">
      <div>
        <p className="font-medium rob text-[14px] text-gray-900">{title}</p>
        <p className="text-sm text-gray-500 rob">{description}</p>
      </div>
      {toggle}
    </div>
  );

  return (
    <div className="min-h-screen ">
      <div className="w-full mx-auto space-y-6">

        {/* Page Header */}
<Reusable_Header subHeader={'Configure platform-wide settings '} header={'System Settings'} />

        {/* Notification Rules */}
        <div className="bg-white rounded-xl border border-[#AFAFAF] shadow-sm p-6">
          <div className="flex items-center gap-2 mb-1">
            <FiBell className="text-gray-600" />
            <h2 className="font-semibold rob text-gray-800">
              Notification Rules
            </h2>
          </div>
          <p className="text-sm rob text-gray-500 mb-4">
            Configure notification preferences
          </p>

          <SettingRow
            title="Email Notifications"
            description="Send email alerts for important events"
            toggle={
              <Toggle
                enabled={emailNotifications}
                setEnabled={setEmailNotifications}
              />
            }
          />

          <SettingRow
            title="Push Notifications"
            description="Enable browser push notifications"
            toggle={
              <Toggle
                enabled={pushNotifications}
                setEnabled={setPushNotifications}
              />
            }
          />
        </div>

        {/* Feature Toggles */}
        <div className="bg-white rounded-xl border border-[#AFAFAF] shadow-sm p-6">
          <div className="flex items-center gap-2 mb-1">
            <FiZap className="text-gray-600" />
            <h2 className="font-semibold rob text-gray-800">
              Feature Toggles
            </h2>
          </div>
          <p className="text-sm rob text-gray-500 mb-4">
            Enable or disable platform features
          </p>

          <SettingRow
            title="Auto-Reply"
            description="Enable automatic responses"
            toggle={
              <Toggle enabled={autoReply} setEnabled={setAutoReply} />
            }
          />

          <SettingRow
            title="File Sharing"
            description="Allow users to share files in messages"
            toggle={
              <Toggle enabled={fileSharing} setEnabled={setFileSharing} />
            }
          />

          <SettingRow
            title="Video Calls"
            description="Enable video calling functionality"
            toggle={
              <Toggle enabled={videoCalls} setEnabled={setVideoCalls} />
            }
          />

          <SettingRow
            title="Screen Sharing"
            description="Allow screen sharing during calls"
            toggle={
              <Toggle
                enabled={screenSharing}
                setEnabled={setScreenSharing}
              />
            }
          />
        </div>

      </div>
    </div>
  );
};

export default Settings;
