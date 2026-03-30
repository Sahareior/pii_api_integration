import React, { useState, useEffect } from "react";
import { FiEdit2, FiUser, FiBriefcase, FiMail, FiPhone, FiMapPin, FiCheck, FiX } from "react-icons/fi";
import Reusable_Header from "../../reusable_components/Reusable_Header";
import { useAdminProfileQuery, useUpdateProfileMutation } from "../../../redux/features/sijanSlice/sijan.slice";
import { toast } from "sonner";

const Card = ({ children }) => (
  <div className="bg-white border border-[#60606080]/50 rounded-xl p-6 shadow-sm">
    {children}
  </div>
);

const InputField = ({ label, icon, value, name, onChange, disabled, textarea = false }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[16px] rob text-black font-semibold">
      {label}
    </label>

    <div className="relative ">
      {icon && (
        <span className="absolute left-3  top-3 text-gray-400">
          {icon}
        </span>
      )}

      {textarea ? (
        <textarea
          name={name}
          value={value || ""}
          onChange={onChange}
          disabled={disabled}
          rows={3}
          className={`w-full pl-6 pr-4 py-2 text-[14px] rob border rounded-md text-gray-600 resize-none transition-colors ${
            disabled ? "bg-gray-100 cursor-not-allowed border-gray-200" : "bg-white border-black cursor-text"
          }`}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value || ""}
          onChange={onChange}
          disabled={disabled}
          className={`w-full pl-6 pr-2 py-2 rob text-[14px] border rounded-md text-gray-600 transition-colors ${
            disabled ? "bg-gray-100 cursor-not-allowed border-gray-200" : "bg-white border-black cursor-text"
          }`}
        />
      )}
    </div>
  </div>
);

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data, isLoading, isError, error } = useAdminProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone_number: "",
    bio: "",
    title: "",
    department: "",
    location: ""
  });

  useEffect(() => {
    if (data?.user) {
      setProfileData({
        name: data.user.name || "",
        email: data.user.email || "",
        phone_number: data.user.phone_number || "",
        bio: data.user.bio || "",
        title: data.user.title || "",
        department: data.user.department || "",
        location: data.user.location || ""
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateProfile(profileData).unwrap();
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update profile");
      console.error(err);
    }
  };

  const handleCancel = () => {
    if (data?.user) {
      setProfileData({
        name: data.user.name || "",
        email: data.user.email || "",
        phone_number: data.user.phone_number || "",
        bio: data.user.bio || "",
        title: data.user.title || "",
        department: data.user.department || "",
        location: data.user.location || ""
      });
    }
    setIsEditing(false);
  };

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
        <p className="text-red-500 text-lg font-semibold mb-2">Failed to load profile</p>
        <p className="text-gray-500">{error?.data?.message || error?.status || "Something went wrong"}</p>
      </div>
    );
  }

  const user = data?.user || {};

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto space-y-12">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Reusable_Header 
            header={'Profile Settings'} 
            subHeader={'Manage your personal information and preferences'} 
          />

          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800 transition-all cursor-pointer"
            >
              <FiEdit2 size={14} />
              Edit Profile
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button 
                onClick={handleCancel}
                className="flex items-center gap-2 border border-gray-300 px-5 py-2 rounded-md text-sm hover:bg-gray-50 transition-all cursor-pointer"
              >
                <FiX size={14} />
                Cancel
              </button>
              <button 
                onClick={handleUpdate}
                disabled={isUpdating}
                className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? (
                  <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full font-bold"></div>
                ) : (
                  <FiCheck size={14} />
                )}
                {isUpdating ? "Updating..." : "Update"}
              </button>
            </div>
          )}
        </div>

        {/* Profile Info Header */}
        <Card>
          <h2 className="font-normal text-[20px] rob text-gray-900 mb-1">
            Account Status
          </h2>
          <p className="text-sm text-[#717182] mb-6 rob font-normal">
            Your current account role and status
          </p>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-lg font-semibold uppercase">
              {profileData.name?.[0] || user.email?.[0] || "A"}
            </div>
            <div>
              <p className="font-medium text-[16px] rob text-gray-900">{profileData.name || "Administrator"}</p>
              <p className="rob text-[14px] text-gray-500">
                {user.role_name} • {user.status}
              </p>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card>
          <div className="flex items-center gap-2 mb-1">
            <FiUser className="text-gray-500" />
            <h2 className="font-normal text-[16px] rob text-gray-900">
              Personal Information
            </h2>
          </div>

          <p className="text-[13px] rob font-normal text-gray-500 mb-6">
            Update your personal details
          </p>

          <div className="grid md:grid-cols-1 gap-6">
            <InputField 
              label="Full Name" 
              name="name"
              value={profileData.name} 
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mt-6">
            <InputField
              label="Email Address"
              icon={<FiMail size={14} />}
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              disabled={true} // Email is usually non-editable for security
            />
          </div>

          <div className="mt-6">
            <InputField
              label="Phone Number"
              icon={<FiPhone size={14} />}
              name="phone_number"
              value={profileData.phone_number}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mt-6">
            <InputField
              label="Bio"
              textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </Card>

        {/* Work Information */}
        <Card>
          <div className="flex items-center gap-2 mb-1">
            <FiBriefcase className="text-gray-500" />
            <h2 className="font-normal rob text-[16px] text-gray-900">
              Work Information
            </h2>
          </div>

          <p className="text-[13px] rob font-normal text-gray-500 mb-6">
            Your role and department details
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <InputField 
              label="Title / Role" 
              name="title"
              value={profileData.title} 
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <InputField 
              label="Department" 
              name="department"
              value={profileData.department} 
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mt-6">
            <InputField
              label="Location"
              icon={<FiMapPin size={14} />}
              name="location"
              value={profileData.location}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
