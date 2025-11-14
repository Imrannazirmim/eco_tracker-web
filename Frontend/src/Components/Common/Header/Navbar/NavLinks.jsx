import { NavLink } from "react-router";

const NavLinks = ({ links, onClick }) => {
      return (
            <>
                  {links.map((link) => (
                        <li key={link.path}>
                              <NavLink
                                    to={link.path}
                                    onClick={onClick}
                                    className={({ isActive }) =>
                                          `flex items-center gap-2 transition-colors ${
                                                isActive
                                                      ? "text-green-600 font-semibold"
                                                      : "text-gray-700 hover:text-green-600"
                                          }`
                                    }
                              >
                                    <link.icon className="w-4 h-4" />
                                    {link.label}
                              </NavLink>
                        </li>
                  ))}
            </>
      );
};

export default NavLinks;
