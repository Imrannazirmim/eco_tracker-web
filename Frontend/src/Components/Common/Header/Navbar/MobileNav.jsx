import NavLinks from "./NavLinks";
import { LogIn, UserPlus, LogOut, Trophy, Activity } from "lucide-react";
import profileImg from "../../../../assets/profile.png";

const MobileNav = ({ user, navLinks, handleNavigation, handleLogout }) => {
    return (
        <div className="lg:hidden bg-green-50 shadow-lg w-full absolute z-40">
            <ul className="flex flex-col gap-4 p-6">

                <NavLinks links={navLinks} onClick={() => handleNavigation()} />

                {user && (
                    <div className="flex flex-col gap-4 border-t pt-4">
                        <button
                            onClick={() => handleNavigation("/my-activities")}
                            className="flex gap-2 items-center"
                        >
                            <Activity className="w-5 h-5" /> My Activities
                        </button>

                        <button
                            onClick={() => handleNavigation("/my-challenges")}
                            className="flex gap-2 items-center"
                        >
                            <Trophy className="w-5 h-5" /> My Challenges
                        </button>

                        <button
                            onClick={() => handleNavigation("/profile")}
                            className="flex gap-2 items-center"
                        >
                            <img src={profileImg} className="w-5 h-5" />
                            Profile
                        </button>
                    </div>
                )}

                {/* Bottom Auth Section */}
                <hr />

                {user ? (
                    <button
                        onClick={handleLogout}
                        className="flex gap-2 text-red-600 font-semibold"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleNavigation("/sign")}
                            className="btn bg-green-600 w-full text-white"
                        >
                            <LogIn size={18} /> Login
                        </button>

                        <button
                            onClick={() => handleNavigation("/register")}
                            className="btn bg-green-600 w-full text-white"
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
