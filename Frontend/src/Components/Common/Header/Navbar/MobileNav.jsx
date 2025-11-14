import NavLinks from "./NavLinks";
import { LogIn, UserPlus, LogOut, Trophy, Activity } from "lucide-react";
import profileImg from "../../../../assets/profile.png";

const MobileNav = ({ user, navLinks, handleNavigation, handleLogout }) => {

      return (
            <div className="lg:hidden bg-green-100 shadow-lg w-full absolute z-40">
                  <ul className="flex flex-col gap-4 p-6">
                        <NavLinks links={navLinks} onClick={() => handleNavigation()} />

                        {user && (
                              <div className="flex flex-col gap-4 border-t pt-4">
                                    <button
                                          onClick={() => handleNavigation("/my-activities")}
                                          className="flex gap-2 hover:text-green-800 cursor-pointer items-center"
                                    >
                                          <Activity className="w-5 h-5" /> My Activities
                                    </button>

                                    <button
                                          onClick={() => handleNavigation("/my-challenges")}
                                          className="flex gap-2 hover:text-green-800 cursor-pointer items-center"
                                    >
                                          <Trophy className="w-5 h-5" /> My Challenges
                                    </button>

                                    <button
                                          onClick={() => handleNavigation("/profile")}
                                          className="flex gap-2 hover:text-green-800 cursor-pointer items-center"
                                    >
                                          <img src={user.photoURL || profileImg} className="w-8 h-8 rounded-full" />
                                          Profile
                                    </button>
                              </div>
                        )}

                        <hr className="text-gray-300"/>

                        {user ? (
                              <button onClick={handleLogout} className="flex gap-2 text-red-600 font-semibold">
                                    <LogOut size={18} /> Logout
                              </button>
                        ) : (
                              <div className="flex items-center gap-2">
                                    <button
                                          onClick={() => handleNavigation("/sign")}
                                          className="flex items-center cursor-pointer py-1 px-6 gap-2 rounded-2xl hover:bg-green-500 mx-auto bg-green-600  text-white"
                                    >
                                          <LogIn size={18} /> Login
                                    </button>

                                    <button
                                          onClick={() => handleNavigation("/register")}
                                          className="flex items-center cursor-pointer py-1 px-6 gap-2 rounded-2xl hover:bg-green-500 mx-auto bg-green-600  text-white"
                                    >
                                          <UserPlus size={18} /> Register
                                    </button>
                              </div>
                        )}
                  </ul>
            </div>
      );
};

export default MobileNav;
