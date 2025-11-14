import { LogIn, UserPlus, LogOut } from "lucide-react";
import NavLinks from "./NavLinks";
import profileImg from "../../../../assets/profile.png";

const DesktopNav = ({ user, navLinks, handleLogout, handleNavigation, setShowMenu }) => {
      return (
            <div className="hidden lg:flex items-center gap-8">
                  {/* Links */}
                  <ul className="flex items-center gap-8">
                        <NavLinks links={navLinks} />
                  </ul>

                  {/* Auth Buttons */}
                  {user ? (
                        <div className="flex items-center gap-4">
                              <button
                                    onClick={handleLogout}
                                    className="btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                              >
                                    <LogOut className="inline w-4 h-4 mr-1" />
                                    Logout
                              </button>

                              <div className="relative">
                                    <img
                                          id="profile-button"
                                          src={user?.photoURL || profileImg}
                                          className="w-12 h-12 rounded-full cursor-pointer border-2 border-green-600"
                                          onClick={(e) => {
                                                e.stopPropagation();
                                                setShowMenu((prev) => !prev);
                                          }}
                                    />
                              </div>
                        </div>
                  ) : (
                        <div className="flex gap-4">
                              <button
                                    onClick={() => handleNavigation("/sign")}
                                    className="btn bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                              >
                                    <LogIn className="w-4 h-4" />
                                    Login
                              </button>

                              <button
                                    onClick={() => handleNavigation("/register")}
                                    className="btn bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                              >
                                    <UserPlus className="w-4 h-4" />
                                    Register
                              </button>
                        </div>
                  )}
            </div>
      );
};

export default DesktopNav;
