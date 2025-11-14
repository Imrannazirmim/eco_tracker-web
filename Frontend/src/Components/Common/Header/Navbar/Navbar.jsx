import { useState, useContext } from "react";
import { RxCross1 } from "react-icons/rx";
import { Home, Trophy, Calendar, Lightbulb, MenuIcon } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../../../Contexts/RootContext";
import { useNavigate } from "react-router";
import logo from "../../../../assets/logo.png";
import Loading from "../../../Utils/Loading";
import MobileNav from "./MobileNav";
import UserMenu from "./UserMenu";
import DesktopNav from "./DesktopNav";

const Navbar = () => {
      const { user, logoutUser } = useContext(AuthContext);
      const [showMenu, setShowMenu] = useState(false);
      const [showMobileMenu, setShowMobileMenu] = useState(false);

      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();

      const navLinks = [
            { path: "/", label: "Home", icon: Home },
            { path: "/challenges", label: "Challenges", icon: Trophy },
            { path: "/events", label: "Events", icon: Calendar },
            { path: "/tips", label: "Tips", icon: Lightbulb },
      ];

      const handleNavigation = (path) => {
            if (path) navigate(path);
            setShowMobileMenu(false);
            setShowMenu(false);
      };

      const handleLogout = async () => {
            setLoading(true);
            try {
                  await logoutUser();
                  toast.success("Logged out!");
                  setTimeout(() => {
                        navigate("/sign");
                  }, 2000);
            } finally {
                  setLoading(false);
            }
      };

      if (loading) return <Loading />;

      return (
            <>
                  <ToastContainer />

                  <header className="w-full bg-white sticky top-0  z-50">
                        <nav className="flex justify-between items-center py-4 px-6 md:px-20">
                              {/* Logo */}
                              <div
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => handleNavigation("/")}
                              >
                                    <img src={logo} className="w-10 md:w-12" />
                                    <span className="text-xl md:text-2xl font-semibold text-green-600">EcoTrack</span>
                              </div>

                              <DesktopNav
                                    user={user}
                                    navLinks={navLinks}
                                    handleNavigation={handleNavigation}
                                    handleLogout={handleLogout}
                                    showMenu={showMenu}
                                    setShowMenu={setShowMenu}
                              />

                              <div
                                    className="lg:hidden cursor-pointer"
                                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                              >
                                    {showMobileMenu ? <RxCross1 size={26} /> : <MenuIcon />}
                              </div>
                        </nav>
                  </header>

                  {showMenu && (
                        <UserMenu
                              user={user}
                              showMenu={showMenu}
                              setShowMenu={setShowMenu}
                              handleNavigation={handleNavigation}
                        />
                  )}

                  {showMobileMenu && (
                        <MobileNav
                              user={user}
                              navLinks={navLinks}
                              handleNavigation={handleNavigation}
                              handleLogout={handleLogout}
                        />
                  )}
            </>
      );
};

export default Navbar;
