import { NavLink, useNavigate } from "react-router";
import logo from "../../../assets/logo.png";
import profileImg from "../../../assets/profile.png";
import "./nav.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Contexts/RootContext";
import { RxCross1 } from "react-icons/rx";

import {
      Menu,
      X,
      Home,
      Trophy,
      Calendar,
      Lightbulb,
      Activity,
      LogOut,
      LogIn,
      UserPlus,
      User,
      ChevronDown,
      LayoutDashboard,
      Target,
      Cross,
      MenuIcon,
      CrossIcon,
} from "lucide-react";
import { getAuth } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { RiProfileFill, RiProfileLine } from "react-icons/ri";

const Navbar = () => {
      const { user, logoutUser } = useContext(AuthContext);
      const [showMenu, setShowMenu] = useState(false);
      const [showMobileMenu, setShowMobileMenu] = useState(false);
      const navigate = useNavigate();
      const auth = getAuth();
      const [userData, setUserData] = useState([]);
      const axiosInstance = useAxiosSecure();

      useEffect(() => {
            const handleUserData = async () => {
                  if (!user) {
                        return;
                  }

                  try {
                        const res = await axiosInstance.get(`/api/user-challenges`);
                        setUserData(res.data);
                  } catch (error) {
                        console.error("Failed to fetch user challenges:", error);
                        if (error.response?.status !== 401) {
                              toast.error("Failed to load user data");
                        }
                  }
            };
            handleUserData();
      }, [user, axiosInstance]);

      console.log(userData);

      console.log(auth);
      const handleNavigation = () => {
            navigate("");
            setShowMobileMenu(false);
            setShowMenu(false);
      };

      const handleLogout = async () => {
            try {
                  await logoutUser();
                  setShowMobileMenu(false);
                  setShowMenu(false);
                  navigate("/sign");
            } catch (error) {
                  toast.error(error.message);
            }
      };

      const navLinks = [
            { path: "/", label: "Home", icon: Home },
            { path: "/challenges", label: "Challenges", icon: Trophy },
            { path: "/events", label: "Events", icon: Calendar },
            { path: "/tips", label: "Tips", icon: Lightbulb },
      ];

      return (
            <>
                  <ToastContainer />
                  <header className="w-full bg-white shadow-md sticky top-0 z-50">
                        <nav className="flex justify-between items-center py-4 px-6 md:px-20 mx-auto">
                              {/* Logo */}
                              <div
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => handleNavigation("/")}
                              >
                                    <img src={logo} alt="eco tracker" className="w-10 md:w-12" />
                                    <span className="text-xl md:text-2xl font-semibold text-green-600">EcoTrack</span>
                              </div>

                              {/* Desktop Navigation */}
                              <ul className="hidden lg:flex  items-center gap-8">
                                    {navLinks.map((link) => (
                                          <li key={link.path}>
                                                <NavLink
                                                      to={link.path}
                                                      className="flex items-center gap-2 hover:text-green-600 transition-colors"
                                                >
                                                      <link.icon className="w-4 h-4" />
                                                      {link.label}
                                                </NavLink>
                                          </li>
                                    ))}
                              </ul>
                              <div className="hidden lg:flex items-center gap-8">
                                    {user ? (
                                          <>
                                                <div className="flex gap-8 relative">
                                                      <button className="btn" onClick={handleLogout}>
                                                            LogOut
                                                      </button>
                                                      <div>
                                                            <img
                                                                  onClick={() => setShowMenu(!showMenu)}
                                                                  className="w-12 rounded-full"
                                                                  src={user.photoURL}
                                                                  alt=""
                                                            />
                                                      </div>

                                                      <div className="absolute z-20 top-16 right-2 ">
                                                            {showMenu && (
                                                                  <div className="shadow text-white border rounded-md border-gray-300 p-4 bg-green-900">
                                                                        <div className="py-2">
                                                                              <h2>{user?.displayName}</h2>
                                                                              <p>{user?.email}</p>
                                                                        </div>
                                                                        <hr className="text-gray-300" />
                                                                        <div className="mt-2 text-left">
                                                                              <button
                                                                                    onClick={() =>
                                                                                          navigate("/my-activities")
                                                                                    }
                                                                                    className="hover:bg-green-800 flex items-center gap-2 p-2 w-full rounded-xl"
                                                                              >
                                                                                    <Activity /> My Activities
                                                                              </button>
                                                                              <button
                                                                                    onClick={() =>
                                                                                          navigate("/my-challenges")
                                                                                    }
                                                                                    className="hover:bg-green-800 flex items-center gap-2 p-2 w-full rounded-xl"
                                                                              >
                                                                                    <Trophy /> My Challenge{" "}
                                                                              </button>
                                                                              <button
                                                                                    onClick={() => navigate("/profile")}
                                                                                    className="hover:bg-green-800 p-2 flex items-center gap-2 w-full rounded-xl"
                                                                              >
                                                                                    <img
                                                                                          src={profileImg}
                                                                                          alt="profile image"
                                                                                          className="w-[1.8rem]"
                                                                                    />{" "}
                                                                                    Profile
                                                                              </button>
                                                                        </div>
                                                                  </div>
                                                            )}
                                                      </div>
                                                </div>
                                          </>
                                    ) : (
                                          <div className="flex gap-8">
                                                <button onClick={() => navigate("/sign")} className="btn">
                                                      Login
                                                </button>
                                                <button onClick={() => navigate("/register")} className="btn">
                                                      Register
                                                </button>
                                          </div>
                                    )}
                              </div>
                              <div onClick={() => setShowMobileMenu(!showMobileMenu)} className="flex lg:hidden cursor-pointer">
                                    {showMobileMenu ? <RxCross1 className="font-bold text-2xl" />  : <MenuIcon />}
                              </div>
                        </nav>
                  </header>
                  {/* mobile menu  */}
                  {showMobileMenu && (
                        <div className="lg:hidden bg-white border-t border-gray-200 shadow-md absolute w-full z-40">
                              <ul className="flex flex-col gap-4 p-6">
                                    {navLinks.map((link) => (
                                          <li key={link.path}>
                                                <NavLink
                                                      to={link.path}
                                                      onClick={() => setShowMobileMenu(false)}
                                                      className={({ isActive }) =>
                                                            `flex items-center gap-2 text-lg ${
                                                                  isActive
                                                                        ? "text-green-600 font-semibold"
                                                                        : "text-gray-800 hover:text-green-600"
                                                            }`
                                                      }
                                                >
                                                      <link.icon className="w-5 h-5" />
                                                      {link.label}
                                                </NavLink>
                                          </li>
                                    ))}
                                    <div>
                                          <button
                                                onClick={() => navigate("/my-activities")}
                                                className="hover:bg-green-800 flex items-center gap-2 p-2 w-full rounded-xl"
                                          >
                                                <Activity /> My Activities
                                          </button>
                                          <button
                                                onClick={() => navigate("/my-challenges")}
                                                className="hover:bg-green-800 flex items-center gap-2 p-2 w-full rounded-xl"
                                          >
                                                <Trophy /> My Challenge{" "}
                                          </button>
                                          <button
                                                onClick={() => navigate("/profile")}
                                                className="hover:bg-green-800 p-2 flex items-center gap-2 w-full rounded-xl"
                                          >
                                                <img src={profileImg} alt="profile image" className="w-[1.8rem]" />{" "}
                                                Profile
                                          </button>
                                    </div>

                                    <hr className="my-2" />

                                    {user ? (
                                          <>
                                                <div className="flex items-center gap-3 mb-4">
                                                      <img
                                                            src={user.photoURL || profileImg}
                                                            alt="profile"
                                                            className="w-10 h-10 rounded-full border-2 border-green-600"
                                                      />
                                                      <div>
                                                            <p className="font-semibold text-gray-800">
                                                                  {user.displayName}
                                                            </p>
                                                            <p className="text-sm text-gray-500">{user.email}</p>
                                                      </div>
                                                </div>
                                                <button
                                                      onClick={handleLogout}
                                                      className="flex items-center gap-2 hover:text-red-900 cursor-pointer text-red-600 font-semibold"
                                                >
                                                      <LogOut size={18} /> Logout
                                                </button>
                                          </>
                                    ) : (
                                          <div className="flex flex-col gap-2">
                                                <button onClick={() => navigate("/sign")} className="btn w-full">
                                                      <LogIn size={18} /> Login
                                                </button>
                                                <button onClick={() => navigate("/register")} className="btn w-full">
                                                      <UserPlus size={18} /> Register
                                                </button>
                                          </div>
                                    )}
                              </ul>
                        </div>
                  )}
            </>
      );
};

export default Navbar;
