import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { 
  useCreateAutomationMutation, 
  useEditAutomationMutation, 
  useGetBusinessOverViewQuery 
} from "../../../../redux/features/sijanSlice/sijan.slice";
import { toast } from "sonner";

const Toggle = ({ enabled, setEnabled }) => {
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      type="button"
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

const ModalCreateAutomation = ({ onClose, type, initialData }) => {
  const [createAutomation, { isLoading: isCreating }] = useCreateAutomationMutation();
  const [editAutomation, { isLoading: isEditingMutation }] = useEditAutomationMutation();
  const { data: businessesData } = useGetBusinessOverViewQuery();

  const [formData, setFormData] = useState({
    name: "",
    workspace_id: "",
    trigger_type: "user_joins",
    action_type: "send_message",
    message_content: "",
    email_subject: "",
    is_enabled: true,
  });

  useEffect(() => {
    if (type === 'edit' && initialData) {
      setFormData({
        name: initialData.name || "",
        workspace_id: initialData.workspace_id || "",
        trigger_type: initialData.trigger_type || "user_joins",
        action_type: initialData.action_type || "send_message",
        message_content: initialData.message_content || "",
        email_subject: initialData.email_subject || "",
        is_enabled: initialData.is_enabled ?? true,
      });
    }
  }, [type, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.workspace_id) {
      toast.error("Please select a workspace");
      return;
    }

    try {
      if (type === 'create') {
        await createAutomation({ ...formData, workspace_id: Number(formData.workspace_id) }).unwrap();
        toast.success("Automation created successfully");
      } else {
        await editAutomation({ id: initialData.id, data: { ...formData, workspace_id: Number(formData.workspace_id) } }).unwrap();
        toast.success("Automation updated successfully");
      }
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
      console.error(error);
    }
  };

  const isLoading = isCreating || isEditingMutation;

  return (
    <div className="flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="w-full max-w-xl h-[70vh] overflow-y-auto rounded-xl relative space-y-6 scrollbar-hide">
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 rob">
            {type === 'create' ? 'Create New Automation' : 'Edit Automation'}
          </h2>
          <p className="text-sm text-gray-500 rob">
            {type === 'create' ? 'Set up a new automated workflow for your platform' : 'Modify the automated workflow for your platform'}
          </p>
        </div>

        {/* Basic Fields */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium rob">
              Automation Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Welcome Message, Auto-reply"
              className="w-full mt-1 border rounded-md px-3 py-2 text-sm bg-gray-50 rob outline-none focus:border-black transition-all"
            />
          </div>

          <div>
            <label className="text-sm font-medium rob">
              Business (Workspace) *
            </label>
            <select
              name="workspace_id"
              value={formData.workspace_id}
              onChange={handleChange}
              required
              className="w-full mt-1 border rounded-md px-3 py-2 text-sm bg-gray-50 rob outline-none focus:border-black transition-all"
            >
              <option value="">Select a workspace</option>
              {businessesData?.workspaces?.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Trigger Section */}
        <div className="border border-[#AFAFAF] rounded-xl p-4 space-y-4">
          <h3 className="font-semibold text-gray-900 rob">
            Trigger
          </h3>
          <p className="text-sm text-gray-500 rob">
            When should this automation run?
          </p>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-medium rob">
                Trigger Type *
              </label>
              <select 
                name="trigger_type"
                value={formData.trigger_type}
                onChange={handleChange}
                className="w-full mt-1 border rounded-md px-3 py-2 text-sm bg-gray-50 rob outline-none focus:border-black transition-all"
              >
                <option value="user_joins">User Joins</option>
                <option value="new_message">New Message</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="border border-[#AFAFAF] rounded-xl p-4 space-y-4">
          <h3 className="font-semibold text-gray-900 rob">
            Action
          </h3>
          <p className="text-sm text-gray-500 rob">
            What should happen when triggered?
          </p>

          <div>
            <label className="text-sm font-medium rob">
              Action Type *
            </label>
            <select 
              name="action_type"
              value={formData.action_type}
              onChange={handleChange}
              className="w-full mt-1 border rounded-md px-3 py-2 text-sm bg-gray-50 rob outline-none focus:border-black transition-all"
            >
              <option value="send_message">Send Message</option>
              <option value="send_email">Send Email</option>
            </select>
          </div>

          {formData.action_type === 'send_email' && (
            <div>
              <label className="text-sm font-medium rob">
                Email Subject *
              </label>
              <input
                type="text"
                name="email_subject"
                value={formData.email_subject}
                onChange={handleChange}
                required={formData.action_type === 'send_email'}
                placeholder="Enter email subject"
                className="w-full mt-1 border rounded-md px-3 py-2 text-sm bg-gray-50 rob outline-none focus:border-black transition-all"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium rob">
              Message Content *
            </label>
            <textarea
              name="message_content"
              value={formData.message_content}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Enter the message to send..."
              className="w-full mt-1 border rounded-md px-3 py-2 text-sm bg-gray-50 rob outline-none resize-none focus:border-black transition-all"
            />
          </div>
        </div>

        {/* Enable Automation */}
        <div className="flex justify-between items-center border border-[#AFAFAF] rounded-xl p-4">
          <div>
            <p className="font-medium text-gray-900 rob">
              Enable Automation
            </p>
            <p className="text-sm text-gray-500 rob">
              Start running this automation immediately
            </p>
          </div>

          <Toggle 
            enabled={formData.is_enabled} 
            setEnabled={(val) => setFormData(p => ({ ...p, is_enabled: val }))} 
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 pb-2">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-4 py-2 border border-[#AFAFAF] rounded-md text-sm hover:bg-gray-50 rob cursor-pointer"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isLoading}
            className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-900 rob flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading && <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full font-bold"></div>}
            {type === 'create' ? 'Create Automation' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalCreateAutomation;
