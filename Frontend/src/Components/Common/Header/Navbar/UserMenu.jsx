import { useEffect } from "react";
import { Activity, Trophy, LogOut } from "lucide-react";

const UserMenu = ({ user, showMenu, setShowMenu, handleNavigation, handleLogout }) => {
      useEffect(() => {
            const close = () => setShowMenu(false);
            document.addEventListener("click", close);
            return () => document.removeEventListener("click", close);
      }, [setShowMenu]);
      if (!showMenu || !user) return null;

      return (
            <div
                  className="fixed right-6 top-20 bg-green-900 text-white rounded-xl shadow-xl w-64 p-4 z-50 border border-green-700"
                  onClick={(e) => e.stopPropagation()} // Keep menu open when clicking inside
            >
                  {/* User Info */}
                  <div className="pb-3 border-b border-green-700">
                        <h2 className="font-semibold truncate">{user?.displayName || "User"}</h2>
                        <p className="text-sm text-green-200 truncate">{user?.email}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="flex flex-col mt-3">
                        <button
                              className="flex items-center gap-2 p-2 hover:bg-green-800 rounded-lg"
                              onClick={() => {
                                    handleNavigation("/my-activities");
                                    setShowMenu(false);
                              }}
                        >
                              <Activity className="w-4 h-4" />
                              My Activities
                        </button>

                        <button
                              className="flex items-center gap-2 p-2 hover:bg-green-800 rounded-lg"
                              onClick={() => {
                                    handleNavigation("/my-challenges");
                                    setShowMenu(false);
                              }}
                        >
                              <Trophy className="w-4 h-4" />
                              My Challenges
                        </button>

                        <button
                              className="flex items-center gap-2 p-2 hover:bg-green-800 rounded-lg"
                              onClick={() => {
                                    handleNavigation("/profile");
                                    setShowMenu(false);
                              }}
                        >
                              <img src="/default-avatar.png" alt="" className="w-4 h-4" />
                              Profile
                        </button>

                        <button
                              className="flex items-center gap-2 p-2 text-red-400 hover:bg-red-900 rounded-lg mt-2"
                              onClick={() => {
                                    handleLogout();
                                    setShowMenu(false);
                              }}
                        >
                              <LogOut className="w-4 h-4" />
                              Logout
                        </button>
                  </div>
            </div>
      );
};

export default UserMenu;
