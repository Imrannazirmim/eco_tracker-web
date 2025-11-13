import React, { useState, useContext, useEffect } from "react";
import { User, Lock, Bell, Settings, Trash2, Shield, Upload, Leaf, ChevronRight } from "lucide-react";
import { AuthContext } from "../Contexts/RootContext";
// import useAxiosSecure from '../Hooks/useAxiosSecure';

const AccountSettings = () => {
      const { user, updateUserProfile } = useContext(AuthContext);
      // const axiosSecure = useAxiosSecure();

      const [activeSection, setActiveSection] = useState("personal");
      // const [loading, setLoading] = useState(false);
      const [saveLoading, setSaveLoading] = useState(false);

      // Personal Information State
      const [personalInfo, setPersonalInfo] = useState({
            fullName: user?.displayName || "",
            username: user?.email?.split("@")[0] || "",
            email: user?.email || "",
            bio: "",
            location: "",
            photoURL: user?.photoURL || "",
      });

      // Security State
      const [securityData, setSecurityData] = useState({
            newPassword: "",
            confirmPassword: "",
            twoFactorEnabled: false,
      });

      // Notifications State
      const [notifications, setNotifications] = useState({
            challengeReminders: true,
            communityMilestones: true,
            eventAlerts: false,
            productUpdates: false,
      });

      // Fetch user additional data from backend (if you have a user profile endpoint)
      useEffect(() => {
            const fetchUserData = async () => {
                  try {
                        // If you have a backend endpoint for user profile
                        // const response = await axiosSecure.get('/api/user/profile');
                        // setPersonalInfo(prev => ({ ...prev, ...response.data }));
                  } catch (error) {
                        console.error("Error fetching user data:", error);
                  }
            };

            if (user) {
                  fetchUserData();
            }
      }, [user]);

      // Handle profile picture upload
      const handlePhotoUpload = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            // Here you would typically upload to a storage service (Firebase Storage, Cloudinary, etc.)
            // For now, we'll create a local preview
            const reader = new FileReader();
            reader.onloadend = () => {
                  setPersonalInfo((prev) => ({ ...prev, photoURL: reader.result }));
            };
            reader.readAsDataURL(file);
      };

      // Save Personal Information
      const handleSavePersonalInfo = async () => {
            setSaveLoading(true);
            try {
                  // Update Firebase Auth profile
                  if (updateUserProfile) {
                        await updateUserProfile({
                              displayName: personalInfo.fullName,
                              photoURL: personalInfo.photoURL,
                        });
                  }

                  // If you have a backend endpoint to save additional user data
                  // await axiosSecure.patch('/api/user/profile', {
                  //   bio: personalInfo.bio,
                  //   location: personalInfo.location,
                  //   username: personalInfo.username
                  // });

                  alert("Profile updated successfully!");
            } catch (error) {
                  console.error("Error updating profile:", error);
                  alert("Failed to update profile. Please try again.");
            } finally {
                  setSaveLoading(false);
            }
      };

      // Handle Password Change
      const handlePasswordChange = async () => {
            if (securityData.newPassword !== securityData.confirmPassword) {
                  alert("Passwords do not match!");
                  return;
            }

            if (securityData.newPassword.length < 6) {
                  alert("Password must be at least 6 characters!");
                  return;
            }

            setSaveLoading(true);
            try {
                  // You would typically call Firebase Auth updatePassword here
                  // const user = auth.currentUser;
                  // await updatePassword(user, securityData.newPassword);

                  alert("Password updated successfully!");
                  setSecurityData({
                        newPassword: "",
                        confirmPassword: "",
                        twoFactorEnabled: securityData.twoFactorEnabled,
                  });
            } catch (error) {
                  console.error("Error updating password:", error);
                  alert("Failed to update password. Please try again.");
            } finally {
                  setSaveLoading(false);
            }
      };

      // Handle Two-Factor Authentication
      const handleTwoFactorToggle = async () => {
            setSaveLoading(true);
            try {
                  // Implement 2FA logic here
                  setSecurityData((prev) => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }));
                  alert(`Two-factor authentication ${!securityData.twoFactorEnabled ? "enabled" : "disabled"}`);
            } catch (error) {
                  console.error("Error toggling 2FA:", error);
            } finally {
                  setSaveLoading(false);
            }
      };

      // Save Notification Preferences
      const handleSaveNotifications = async () => {
            setSaveLoading(true);
            try {
                  // Save to backend
                  // await axiosSecure.patch('/api/user/notifications', notifications);
                  alert("Notification preferences saved!");
            } catch (error) {
                  console.error("Error saving notifications:", error);
                  alert("Failed to save preferences. Please try again.");
            } finally {
                  setSaveLoading(false);
            }
      };

      // Delete Account
      const handleDeleteAccount = async () => {
            const confirmed = window.confirm(
                  "Are you sure you want to delete your account? This action cannot be undone."
            );

            if (!confirmed) return;

            const doubleConfirm = window.prompt('Type "DELETE" to confirm account deletion:');

            if (doubleConfirm !== "DELETE") {
                  alert("Account deletion cancelled.");
                  return;
            }

            try {
                  // Delete from backend first
                  // await axiosSecure.delete('/api/user/account');

                  // Then delete Firebase Auth account
                  // await user.delete();

                  alert("Account deleted successfully. Goodbye!");
                  // Redirect to home or login page
            } catch (error) {
                  console.error("Error deleting account:", error);
                  alert("Failed to delete account. Please try again or contact support.");
            }
      };

      const menuItems = [
            { id: "personal", label: "Personal Information", icon: User },
            { id: "security", label: "Security", icon: Lock },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "privacy", label: "Privacy Settings", icon: Shield },
            { id: "account", label: "Account Management", icon: Settings },
      ];

      return (
            <div className="min-h-screen bg-gray-50">
                  {/* Main Content */}
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="mb-6">
                              <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
                              <p className="text-gray-600 mt-1">
                                    Manage your personal details, security, and preferences
                              </p>
                        </div>

                        <div className="flex gap-6">
                              {/* Sidebar Menu */}
                              <div className="w-64 flex-shrink-0">
                                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                          {/* User Profile Header */}
                                          <div className="p-4 border-b border-gray-200 bg-gradient-to-br from-green-50 to-blue-50">
                                                <div className="flex items-center space-x-3">
                                                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                                            {personalInfo.photoURL ? (
                                                                  <img
                                                                        src={personalInfo.photoURL}
                                                                        alt="Profile"
                                                                        className="w-12 h-12 rounded-full object-cover"
                                                                  />
                                                            ) : (
                                                                  <span className="text-white font-semibold">
                                                                        {personalInfo.fullName
                                                                              ?.charAt(0)
                                                                              ?.toUpperCase() || "U"}
                                                                  </span>
                                                            )}
                                                      </div>
                                                      <div>
                                                            <p className="font-semibold text-gray-900">
                                                                  {personalInfo.fullName || "User"}
                                                            </p>
                                                            <p className="text-xs text-gray-600">
                                                                  {personalInfo.email}
                                                            </p>
                                                      </div>
                                                </div>
                                          </div>

                                          {/* Menu Items */}
                                          <div className="p-2">
                                                {menuItems.map((item) => {
                                                      const Icon = item.icon;
                                                      return (
                                                            <button
                                                                  key={item.id}
                                                                  onClick={() => setActiveSection(item.id)}
                                                                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                                                        activeSection === item.id
                                                                              ? "bg-green-100 text-green-700"
                                                                              : "text-gray-700 hover:bg-gray-50"
                                                                  }`}
                                                            >
                                                                  <Icon className="w-5 h-5" />
                                                                  <span className="flex-1 text-left text-sm font-medium">
                                                                        {item.label}
                                                                  </span>
                                                                  <ChevronRight className="w-4 h-4" />
                                                            </button>
                                                      );
                                                })}
                                          </div>
                                    </div>
                              </div>

                              {/* Main Content Area */}
                              <div className="flex-1">
                                    {/* Personal Information */}
                                    {activeSection === "personal" && (
                                          <div className="bg-white rounded-lg shadow-sm p-6">
                                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                                      Personal Information
                                                </h2>
                                                <p className="text-gray-600 text-sm mb-6">
                                                      Update your personal details and public profile
                                                </p>

                                                {/* Profile Picture */}
                                                <div className="mb-6">
                                                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                            Profile Picture
                                                      </label>
                                                      <div className="flex items-center space-x-4">
                                                            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                                                  {personalInfo.photoURL ? (
                                                                        <img
                                                                              src={personalInfo.photoURL}
                                                                              alt="Profile"
                                                                              className="w-24 h-24 rounded-full object-cover"
                                                                        />
                                                                  ) : (
                                                                        <span className="text-white text-2xl font-semibold">
                                                                              {personalInfo.fullName
                                                                                    ?.charAt(0)
                                                                                    ?.toUpperCase() || "U"}
                                                                        </span>
                                                                  )}
                                                            </div>
                                                            <div>
                                                                  <label className="cursor-pointer">
                                                                        <span className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center space-x-2">
                                                                              <Upload className="w-4 h-4" />
                                                                              <span>Change</span>
                                                                        </span>
                                                                        <input
                                                                              type="file"
                                                                              accept="image/*"
                                                                              onChange={handlePhotoUpload}
                                                                              className="hidden"
                                                                        />
                                                                  </label>
                                                                  <button className="ml-2 text-gray-600 hover:text-gray-900 px-4 py-2">
                                                                        Remove
                                                                  </button>
                                                            </div>
                                                      </div>
                                                </div>

                                                {/* Form Fields */}
                                                <div className="grid grid-cols-2 gap-4 mb-6">
                                                      <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                  Full Name
                                                            </label>
                                                            <input
                                                                  type="text"
                                                                  value={personalInfo.fullName}
                                                                  onChange={(e) =>
                                                                        setPersonalInfo({
                                                                              ...personalInfo,
                                                                              fullName: e.target.value,
                                                                        })
                                                                  }
                                                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                            />
                                                      </div>
                                                      <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                  Username
                                                            </label>
                                                            <input
                                                                  type="text"
                                                                  value={personalInfo.username}
                                                                  onChange={(e) =>
                                                                        setPersonalInfo({
                                                                              ...personalInfo,
                                                                              username: e.target.value,
                                                                        })
                                                                  }
                                                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                            />
                                                      </div>
                                                </div>

                                                <div className="mb-6">
                                                      <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Email Address
                                                      </label>
                                                      <input
                                                            type="email"
                                                            value={personalInfo.email}
                                                            disabled
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-600"
                                                      />
                                                </div>

                                                <div className="mb-6">
                                                      <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Bio
                                                      </label>
                                                      <textarea
                                                            rows={4}
                                                            value={personalInfo.bio}
                                                            onChange={(e) =>
                                                                  setPersonalInfo({
                                                                        ...personalInfo,
                                                                        bio: e.target.value,
                                                                  })
                                                            }
                                                            placeholder="Passionate about sustainability! I'm grateful for learning new ways to reduce my carbon footprint. Let's make a difference together!"
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                      />
                                                </div>

                                                <div className="mb-6">
                                                      <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Location
                                                      </label>
                                                      <input
                                                            type="text"
                                                            value={personalInfo.location}
                                                            onChange={(e) =>
                                                                  setPersonalInfo({
                                                                        ...personalInfo,
                                                                        location: e.target.value,
                                                                  })
                                                            }
                                                            placeholder="San Francisco, CA"
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                      />
                                                </div>

                                                <div className="flex justify-end space-x-3">
                                                      <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                                            Cancel
                                                      </button>
                                                      <button
                                                            onClick={handleSavePersonalInfo}
                                                            disabled={saveLoading}
                                                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                                                      >
                                                            {saveLoading ? "Saving..." : "Save Changes"}
                                                      </button>
                                                </div>
                                          </div>
                                    )}

                                    {/* Security */}
                                    {activeSection === "security" && (
                                          <div className="bg-white rounded-lg shadow-sm p-6">
                                                <h2 className="text-xl font-bold text-gray-900 mb-2">Security</h2>
                                                <p className="text-gray-600 text-sm mb-6">
                                                      Manage your password and account security settings
                                                </p>

                                                {/* Change Password */}
                                                <div className="mb-8">
                                                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                            Change Password
                                                      </h3>
                                                      <div className="space-y-4">
                                                            <div>
                                                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        New Password
                                                                  </label>
                                                                  <input
                                                                        type="password"
                                                                        value={securityData.newPassword}
                                                                        onChange={(e) =>
                                                                              setSecurityData({
                                                                                    ...securityData,
                                                                                    newPassword: e.target.value,
                                                                              })
                                                                        }
                                                                        placeholder="••••••••"
                                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                                  />
                                                            </div>
                                                            <div>
                                                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Confirm New Password
                                                                  </label>
                                                                  <input
                                                                        type="password"
                                                                        value={securityData.confirmPassword}
                                                                        onChange={(e) =>
                                                                              setSecurityData({
                                                                                    ...securityData,
                                                                                    confirmPassword: e.target.value,
                                                                              })
                                                                        }
                                                                        placeholder="••••••••"
                                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                                  />
                                                            </div>
                                                      </div>
                                                </div>

                                                {/* Two-Factor Authentication */}
                                                <div className="mb-8">
                                                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                            Two-Factor Authentication
                                                      </h3>
                                                      <p className="text-sm text-gray-600 mb-4">
                                                            Add an extra layer of security to your account
                                                      </p>
                                                      <button
                                                            onClick={handleTwoFactorToggle}
                                                            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                                                                  securityData.twoFactorEnabled
                                                                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                                                        : "bg-green-500 text-white hover:bg-green-600"
                                                            }`}
                                                      >
                                                            {securityData.twoFactorEnabled
                                                                  ? "Disable"
                                                                  : "Enable Security"}
                                                      </button>
                                                </div>

                                                <div className="flex justify-end">
                                                      <button
                                                            onClick={handlePasswordChange}
                                                            disabled={saveLoading}
                                                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                                                      >
                                                            {saveLoading ? "Updating..." : "Update Security"}
                                                      </button>
                                                </div>
                                          </div>
                                    )}

                                    {/* Notifications */}
                                    {activeSection === "notifications" && (
                                          <div className="bg-white rounded-lg shadow-sm p-6">
                                                <h2 className="text-xl font-bold text-gray-900 mb-2">Notifications</h2>
                                                <p className="text-gray-600 text-sm mb-6">
                                                      Choose how you want to be notified
                                                </p>

                                                <div className="space-y-4">
                                                      <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                                            <div>
                                                                  <h3 className="font-semibold text-gray-900">
                                                                        Challenge Reminders
                                                                  </h3>
                                                                  <p className="text-sm text-gray-600">
                                                                        Get notified about ongoing challenges
                                                                  </p>
                                                            </div>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                  <input
                                                                        type="checkbox"
                                                                        checked={notifications.challengeReminders}
                                                                        onChange={(e) =>
                                                                              setNotifications({
                                                                                    ...notifications,
                                                                                    challengeReminders:
                                                                                          e.target.checked,
                                                                              })
                                                                        }
                                                                        className="sr-only peer"
                                                                  />
                                                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                            </label>
                                                      </div>

                                                      <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                                            <div>
                                                                  <h3 className="font-semibold text-gray-900">
                                                                        Community Milestones
                                                                  </h3>
                                                                  <p className="text-sm text-gray-600">
                                                                        Notify me when someone mentions me in the
                                                                        community
                                                                  </p>
                                                            </div>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                  <input
                                                                        type="checkbox"
                                                                        checked={notifications.communityMilestones}
                                                                        onChange={(e) =>
                                                                              setNotifications({
                                                                                    ...notifications,
                                                                                    communityMilestones:
                                                                                          e.target.checked,
                                                                              })
                                                                        }
                                                                        className="sr-only peer"
                                                                  />
                                                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                            </label>
                                                      </div>

                                                      <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                                            <div>
                                                                  <h3 className="font-semibold text-gray-900">
                                                                        Event Alerts
                                                                  </h3>
                                                                  <p className="text-sm text-gray-600">
                                                                        Get notified about upcoming green events
                                                                  </p>
                                                            </div>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                  <input
                                                                        type="checkbox"
                                                                        checked={notifications.eventAlerts}
                                                                        onChange={(e) =>
                                                                              setNotifications({
                                                                                    ...notifications,
                                                                                    eventAlerts: e.target.checked,
                                                                              })
                                                                        }
                                                                        className="sr-only peer"
                                                                  />
                                                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                            </label>
                                                      </div>

                                                      <div className="flex items-center justify-between py-3">
                                                            <div>
                                                                  <h3 className="font-semibold text-gray-900">
                                                                        Product Updates
                                                                  </h3>
                                                                  <p className="text-sm text-gray-600">
                                                                        Receive news and product update emails from
                                                                        EcoTrack
                                                                  </p>
                                                            </div>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                  <input
                                                                        type="checkbox"
                                                                        checked={notifications.productUpdates}
                                                                        onChange={(e) =>
                                                                              setNotifications({
                                                                                    ...notifications,
                                                                                    productUpdates: e.target.checked,
                                                                              })
                                                                        }
                                                                        className="sr-only peer"
                                                                  />
                                                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                            </label>
                                                      </div>
                                                </div>

                                                <div className="flex justify-end mt-6">
                                                      <button
                                                            onClick={handleSaveNotifications}
                                                            disabled={saveLoading}
                                                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                                                      >
                                                            {saveLoading ? "Saving..." : "Save Preferences"}
                                                      </button>
                                                </div>
                                          </div>
                                    )}

                                    {/* Account Management */}
                                    {activeSection === "account" && (
                                          <div className="bg-white rounded-lg shadow-sm p-6">
                                                <h2 className="text-xl font-bold text-red-600 mb-2">
                                                      Account Management
                                                </h2>
                                                <p className="text-gray-600 text-sm mb-6">
                                                      Permanently delete your account and all associated data
                                                </p>

                                                <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                                                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                            Delete Account
                                                      </h3>
                                                      <p className="text-sm text-gray-600 mb-4">
                                                            Once you delete your account, there is no going back. Please
                                                            be certain.
                                                      </p>
                                                      <button
                                                            onClick={handleDeleteAccount}
                                                            className="flex items-center space-x-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                                      >
                                                            <Trash2 className="w-4 h-4" />
                                                            <span>Delete My Account</span>
                                                      </button>
                                                </div>
                                          </div>
                                    )}
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default AccountSettings;
