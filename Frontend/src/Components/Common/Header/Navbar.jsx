import { NavLink, useNavigate } from "react-router";
import logo from "../../../assets/logo.png";
import profileImg from "../../../assets/profile.png";
import "./nav.css";
import { use, useState } from "react";
import { AuthContext } from "../../../Contexts/RootContext";
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
} from "lucide-react";

const Navbar = () => {
      const { user, logoutUser } = use(AuthContext);
      const [showMenu, setShowMenu] = useState(false);
      const [showMobileMenu, setShowMobileMenu] = useState(false);
      const navigate = useNavigate();

      const handleNavigation = (path) => {
            navigate(path);
            setShowMobileMenu(false);
            setShowMenu(false);
      };

      const handleLogout = async () => {
            try {
                  await logoutUser();
                  setShowMobileMenu(false);
                  setShowMenu(false);
                  navigate("/register");
            } catch (error) {
                  console.error("Logout error:", error);
            }
      };

      const navLinks = [
            { path: "/", label: "Home", icon: Home },
            { path: "/challenges", label: "Challenges", icon: Trophy },
            { path: "/events", label: "Events", icon: Calendar },
            { path: "/tips", label: "Tips", icon: Lightbulb },
      ];

      return (
            <header className="w-full bg-white shadow-md sticky top-0 z-50">
                  <nav className="flex justify-between items-center py-4 px-6 md:px-20 mx-auto">
                        {/* Logo */}
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation("/")}>
                              <img src={logo} alt="eco tracker" className="w-10 md:w-12" />
                              <span className="text-xl md:text-2xl font-semibold text-green-600">EcoTrack</span>
                        </div>

                        {/* Desktop Navigation */}
                        <ul className="hidden lg:flex items-center gap-8">
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
                              {user && (
                                    <li>
                                          <NavLink
                                                to="/my-activities"
                                                className="flex items-center gap-2 hover:text-green-600 transition-colors"
                                          >
                                                <Activity className="w-4 h-4" />
                                                My Activities
                                          </NavLink>
                                    </li>
                              )}
                        </ul>

                        {/* Desktop Auth Section */}
                        <div className="hidden lg:flex items-center gap-4">
                              {user ? (
                                    <>
                                          <button className="btn flex items-center gap-2" onClick={handleLogout}>
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                          </button>

                                          {/* Profile Dropdown */}
                                          <div className="relative">
                                                <div
                                                      className="flex items-center gap-2 cursor-pointer"
                                                      onClick={() => setShowMenu(!showMenu)}
                                                >
                                                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-600">
                                                            <img
                                                                  src={user.photoURL || profileImg}
                                                                  alt="User Avatar"
                                                                  className="w-full h-full object-cover"
                                                            />
                                                      </div>
                                                      <ChevronDown
                                                            className={`w-4 h-4 transition-transform ${
                                                                  showMenu ? "rotate-180" : ""
                                                            }`}
                                                      />
                                                </div>

                                                {/* Dropdown Menu */}
                                                {showMenu && (
                                                      <div className="absolute top-14 right-0 w-64 bg-white border border-gray-200 rounded-xl shadow-xl p-3 animate-fadeIn">
                                                            {/* User Info */}
                                                            <div className="px-3 py-2 border-b border-gray-200 mb-2">
                                                                  <h2 className="font-semibold text-gray-800 truncate">
                                                                        {user.displayName || "User"}
                                                                  </h2>
                                                                  <h3 className="text-sm text-gray-600 truncate">
                                                                        {user.email}
                                                                  </h3>
                                                            </div>

                                                            {/* Menu Items */}
                                                            <div className="space-y-1">
                                                                  <div
                                                                        onClick={() => handleNavigation("/dashboard")}
                                                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-50 hover:text-green-600 cursor-pointer transition-colors"
                                                                  >
                                                                        <LayoutDashboard className="w-4 h-4" />
                                                                        <span>Dashboard</span>
                                                                  </div>
                                                                  <div
                                                                        onClick={() =>
                                                                              handleNavigation("/my-challenges")
                                                                        }
                                                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-50 hover:text-green-600 cursor-pointer transition-colors"
                                                                  >
                                                                        <Target className="w-4 h-4" />
                                                                        <span>My Challenges</span>
                                                                  </div>
                                                                  <div
                                                                        onClick={() => handleNavigation("/profile")}
                                                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-50 hover:text-green-600 cursor-pointer transition-colors"
                                                                  >
                                                                        <User className="w-4 h-4" />
                                                                        <span>User Profile</span>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                )}
                                          </div>
                                    </>
                              ) : (
                                    <>
                                          <button
                                                className="btn flex items-center gap-2"
                                                onClick={() => navigate("/sign")}
                                          >
                                                <LogIn className="w-4 h-4" />
                                                Login
                                          </button>
                                          <button
                                                className="btn flex items-center gap-2"
                                                onClick={() => navigate("/register")}
                                          >
                                                <UserPlus className="w-4 h-4" />
                                                Register
                                          </button>
                                    </>
                              )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center gap-3">
                              {user && (
                                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-green-600">
                                          <img
                                                src={user.photoURL || profileImg}
                                                alt="User Avatar"
                                                className="w-full h-full object-cover"
                                          />
                                    </div>
                              )}
                              <button
                                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                    {showMobileMenu ? (
                                          <X className="w-6 h-6 text-gray-700" />
                                    ) : (
                                          <Menu className="w-6 h-6 text-gray-700" />
                                    )}
                              </button>
                        </div>
                  </nav>

                  {/* Mobile Menu */}
                  {showMobileMenu && (
                        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg animate-slideDown">
                              <div className="px-6 py-4 max-w-7xl mx-auto">
                                    {/* User Info (Mobile) */}
                                    {user && (
                                          <div className="px-4 py-3 bg-green-50 rounded-lg mb-4">
                                                <h2 className="font-semibold text-gray-800 truncate">
                                                      {user.displayName || "User"}
                                                </h2>
                                                <h3 className="text-sm text-gray-600 truncate">{user.email}</h3>
                                          </div>
                                    )}

                                    {/* Navigation Links */}
                                    <ul className="space-y-2 mb-4">
                                          {navLinks.map((link) => (
                                                <li key={link.path}>
                                                      <NavLink
                                                            to={link.path}
                                                            onClick={() => setShowMobileMenu(false)}
                                                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors"
                                                      >
                                                            <link.icon className="w-5 h-5" />
                                                            <span className="font-medium">{link.label}</span>
                                                      </NavLink>
                                                </li>
                                          ))}
                                          {user && (
                                                <li>
                                                      <NavLink
                                                            to="/my-activities"
                                                            onClick={() => setShowMobileMenu(false)}
                                                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors"
                                                      >
                                                            <Activity className="w-5 h-5" />
                                                            <span className="font-medium">My Activities</span>
                                                      </NavLink>
                                                </li>
                                          )}
                                    </ul>

                                    {/* User Menu (Mobile) */}
                                    {user && (
                                          <div className="border-t border-gray-200 pt-4 mb-4">
                                                <div className="space-y-2">
                                                      <div
                                                            onClick={() => handleNavigation("/dashboard")}
                                                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-50 hover:text-green-600 cursor-pointer transition-colors"
                                                      >
                                                            <LayoutDashboard className="w-5 h-5" />
                                                            <span className="font-medium">Dashboard</span>
                                                      </div>
                                                      <div
                                                            onClick={() => handleNavigation("/my-challenges")}
                                                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-50 hover:text-green-600 cursor-pointer transition-colors"
                                                      >
                                                            <Target className="w-5 h-5" />
                                                            <span className="font-medium">My Challenges</span>
                                                      </div>
                                                      <div
                                                            onClick={() => handleNavigation("/profile")}
                                                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-50 hover:text-green-600 cursor-pointer transition-colors"
                                                      >
                                                            <User className="w-5 h-5" />
                                                            <span className="font-medium">User Profile</span>
                                                      </div>
                                                </div>
                                          </div>
                                    )}

                                    {/* Auth Buttons (Mobile) */}
                                    <div className="border-t border-gray-200 pt-4 space-y-3">
                                          {user ? (
                                                <button
                                                      onClick={handleLogout}
                                                      className="w-full btn flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700"
                                                >
                                                      <LogOut className="w-5 h-5" />
                                                      Logout
                                                </button>
                                          ) : (
                                                <>
                                                      <button
                                                            onClick={() => handleNavigation("/sign")}
                                                            className="w-full btn flex items-center justify-center gap-2"
                                                      >
                                                            <LogIn className="w-5 h-5" />
                                                            Login
                                                      </button>
                                                      <button
                                                            onClick={() => handleNavigation("/register")}
                                                            className="w-full btn flex items-center justify-center gap-2"
                                                      >
                                                            <UserPlus className="w-5 h-5" />
                                                            Register
                                                      </button>
                                                </>
                                          )}
                                    </div>
                              </div>
                        </div>
                  )}
            </header>
      );
};

export default Navbar;
