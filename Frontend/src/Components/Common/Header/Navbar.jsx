import { NavLink, useNavigate } from "react-router";
import logo from "../../../assets/logo.png";
import "./nav.css";
import { use, useState } from "react";
import { AuthContext } from "../../../Contexts/RootContext";
import profileImg from "../../../assets/profile.png";

const Navbar = () => {
      const { user, logoutUser } = use(AuthContext);
      const [showMenu, setShowMenu] = useState(false);
      const navigate = useNavigate();

      // console.log(user);

      return (
            <>
                  <header className="w-full">
                        <nav className="flex justify-between items-center py-4 px-20 ">
                              <div className="flex items-center gap-2">
                                    <img src={logo} alt="eco tracker" className="w-18" />
                                    <span className="text-[1.5rem] font-semibold text-green-600">EcoTrack</span>
                              </div>
                              <ul className="flex items-center gap-24 ">
                                    <li>
                                          <NavLink to="/">Home</NavLink>
                                    </li>
                                    <li>
                                          <NavLink to="/challenges">Challenges</NavLink>
                                    </li>
                                    <li>
                                          <NavLink to="/events">Events</NavLink>
                                    </li>
                                    <li>
                                          <NavLink to="/tips">Tips</NavLink>
                                    </li>
                                    {user && (
                                          <>
                                                <li>
                                                      <NavLink to="/my-activities">My Activities</NavLink>
                                                </li>
                                          </>
                                    )}
                              </ul>
                              <div className="flex items-center gap-5">
                                    {user ? (
                                          <>
                                                <button className="btn" onClick={logoutUser}>
                                                      Logout
                                                </button>
                                                <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                                                      <img
                                                            onClick={() => setShowMenu(!showMenu)}
                                                            src={user.photoURL || profileImg}
                                                            alt="User Avatar"
                                                            className="w-full h-full object-cover"
                                                      />
                                                </div>

                                                <div className="absolute top-20 right-14 z-10 cursor-pointer">
                                                      {showMenu && (
                                                            <div className="flex flex-col border border-gray-300 bg-gray-200 rounded-xl p-4">
                                                                  <h2 className="text-green-800 py-1 px-2 rounded-md hover:bg-gray-100">
                                                                        {user.displayName}
                                                                  </h2>
                                                                  <h3 className="text-gray-600 py-1 px-2 rounded-md hover:bg-gray-100">
                                                                        {user.email}
                                                                  </h3>
                                                                  <hr className="text-gray-300 mt-1" />
                                                                  <span
                                                                        onClick={() => navigate("/dashboard")}
                                                                        className="text-green-800 py-1 px-2 rounded-md hover:bg-gray-100"
                                                                  >
                                                                        Dashboard
                                                                  </span>
                                                                  <span
                                                                        onClick={() => navigate("/profile")}
                                                                        className="text-green-800 py-1 px-2 rounded-md hover:bg-gray-100"
                                                                  >
                                                                        User Profile
                                                                  </span>
                                                            </div>
                                                      )}
                                                </div>
                                          </>
                                    ) : (
                                          <>
                                                <button className="btn" onClick={() => navigate("/sign")}>
                                                      Login
                                                </button>
                                                <button className="btn" onClick={() => navigate("/register")}>
                                                      Register
                                                </button>
                                          </>
                                    )}
                              </div>
                        </nav>
                  </header>
            </>
      );
};

export default Navbar;
