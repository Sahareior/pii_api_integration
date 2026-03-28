import React from "react";
import { FiBell, FiZap } from "react-icons/fi";
import Reusable_Header from "../../reusable_components/Reusable_Header";
import { useSystemSettingsQuery, useUpdateSystemSettingsMutation } from "../../../redux/features/sijanSlice/sijan.slice";

import { toast } from "sonner";

const Toggle = ({ enabled, setEnabled, disabled = false }) => {
  return (
    <button
      onClick={() => !disabled && setEnabled(!enabled)}
      disabled={disabled}
      className={`relative w-10 h-5 rounded-full transition ${
        enabled ? "bg-black" : "bg-gray-300"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
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
  const { data: systemSettings, isLoading, isError, error } = useSystemSettingsQuery();
  const [updateSystemSettings, { isLoading: isUpdating }] = useUpdateSystemSettingsMutation();

  const handleToggle = async (field, currentValue) => {
    try {
      await updateSystemSettings({ [field]: !currentValue }).unwrap();
      toast.success("Setting updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update setting");
      console.error(err);
    }
  };

  const SettingRow = ({ title, description, toggle }) => (
    <div className="flex justify-between items-center py-4 border-b last:border-b-0">
      <div>
        <p className="font-medium rob text-[14px] text-gray-900">{title}</p>
        <p className="text-sm text-gray-500 rob">{description}</p>
      </div>
      {toggle}
    </div>
  );

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
        <p className="text-red-500 text-lg font-semibold mb-2">Failed to load system settings</p>
        <p className="text-gray-500">{error?.data?.message || error?.status || "Something went wrong"}</p>
      </div>
    );
  }

  const settings = systemSettings || {};

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto space-y-6">

        {/* Page Header */}
        <Reusable_Header subHeader={'Configure platform-wide settings'} header={'System Settings'} />

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
                enabled={settings.email_notifications_enabled}
                setEnabled={() => handleToggle("email_notifications_enabled", settings.email_notifications_enabled)}
                disabled={isUpdating}
              />
            }
          />

          <SettingRow
            title="Push Notifications"
            description="Enable browser push notifications"
            toggle={
              <Toggle
                enabled={settings.push_notifications_enabled}
                setEnabled={() => handleToggle("push_notifications_enabled", settings.push_notifications_enabled)}
                disabled={isUpdating}
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
              <Toggle 
                enabled={settings.auto_reply_enabled} 
                setEnabled={() => handleToggle("auto_reply_enabled", settings.auto_reply_enabled)}
                disabled={isUpdating}
              />
            }
          />

          <SettingRow
            title="File Sharing"
            description="Allow users to share files in messages"
            toggle={
              <Toggle 
                enabled={settings.file_sharing_enabled} 
                setEnabled={() => handleToggle("file_sharing_enabled", settings.file_sharing_enabled)}
                disabled={isUpdating}
              />
            }
          />

          <SettingRow
            title="Video Calls"
            description="Enable video calling functionality"
            toggle={
              <Toggle 
                enabled={settings.video_calls_enabled} 
                setEnabled={() => handleToggle("video_calls_enabled", settings.video_calls_enabled)}
                disabled={isUpdating}
              />
            }
          />

          <SettingRow
            title="Screen Sharing"
            description="Allow screen sharing during calls"
            toggle={
              <Toggle
                enabled={settings.screen_sharing_enabled}
                setEnabled={() => handleToggle("screen_sharing_enabled", settings.screen_sharing_enabled)}
                disabled={isUpdating}
              />
            }
          />
        </div>

      </div>
    </div>
  );
};

export default Settings;
