import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/RootContext";
import AccountTab from "../Components/Common/Profile/AccountTab";
import PersonalTab from "../Components/Common/Profile/PersonalTab";
import { Sidebar } from "../Components/Common/Profile/Sidebar";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("personal");

  const [profile, setProfile] = useState({
    photoURL: "",
    coverPhoto: "",
    displayName: "",
    username: "",
    email: "",
    bio: "",
    location: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        photoURL: user.photoURL || "",
        coverPhoto: user.coverPhoto || "",
        displayName: user.displayName || "",
        username: user.email?.split("@")[0] || "",
        email: user.email || "",
        bio: user.bio || "",
        location: user.location || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () =>
      setProfile((prev) => ({ ...prev, [field]: reader.result }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-2xl font-bold mb-1">My Profile</h1>
        <p className="text-gray-500 mb-6">Manage your personal details and account settings.</p>

        <div className="flex flex-col md:flex-row gap-6">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="flex-1 bg-white rounded-lg shadow p-6">
            {activeTab === "personal" && (
              <PersonalTab
                profile={profile}
                handleChange={handleChange}
                handleFileChange={handleFileChange}
                setProfile={setProfile}
              />
            )}

            {activeTab === "account" && <AccountTab />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile