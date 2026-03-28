import React, { useState } from "react";
import { FiEdit2, FiUser, FiBriefcase, FiMail, FiPhone, FiMapPin, FiCheck, FiX } from "react-icons/fi";
import Reusable_Header from "../../reusable_components/Reusable_Header";

const Card = ({ children }) => (
  <div className="bg-white border border-[#60606080]/50 rounded-xl p-6 shadow-sm">
    {children}
  </div>
);

const InputField = ({ label, icon, value, name, onChange, disabled, textarea = false }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[16px] rob font-normal text-black">
      {label}
    </label>

    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-3 text-gray-400">
          {icon}
        </span>
      )}

      {textarea ? (
        <textarea
          name={name}
          value={value}
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
          value={value}
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
  
  const initialData = {
    firstName: "Admin",
    lastName: "User",
    email: "admin@1source.chat",
    phone: "+1 (555) 123-4567",
    bio: "Tell us about yourself...",
    role: "Platform Administrator",
    department: "Operations",
    location: "San Francisco, CA"
  };

  const [profileData, setProfileData] = useState(initialData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    console.log("Saving changes:", profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData(initialData);
    setIsEditing(false);
  };

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
                className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800 transition-all cursor-pointer"
              >
                <FiCheck size={14} />
                Update
              </button>
            </div>
          )}
        </div>

        {/* Profile Picture */}
        <Card>
          <h2 className="font-normal text-[20px] rob text-gray-900 mb-1">
            Profile Picture
          </h2>
          <p className="text-sm text-[#717182] mb-6 rob font-normal">
            Upload a profile picture to personalize your account
          </p>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-lg font-semibold">
              {profileData.firstName[0]}{profileData.lastName[0]}
            </div>
            <div>
              <p className="font-medium text-[16px] rob text-gray-900">{profileData.firstName} {profileData.lastName}</p>
              <p className="rob text-[14px] text-gray-500">
                {profileData.email}
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

          <div className="grid md:grid-cols-2 gap-6">
            <InputField 
              label="First Name" 
              name="firstName"
              value={profileData.firstName} 
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <InputField 
              label="Last Name" 
              name="lastName"
              value={profileData.lastName} 
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
              disabled={!isEditing}
            />
          </div>

          <div className="mt-6">
            <InputField
              label="Phone Number"
              icon={<FiPhone size={14} />}
              name="phone"
              value={profileData.phone}
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
              label="Role" 
              name="role"
              value={profileData.role} 
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
