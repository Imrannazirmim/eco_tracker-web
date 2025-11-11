import { Outlet } from "react-router";
import Footer from "../Common/Footer/Footer.jsx";
import Navbar from "../Common/Header/Navbar.jsx";

const MainLayout = () => {
      return (
            <>
                  <Navbar />
                  <main className="min-h-screen bg-[#F6F8F6]">
                        <Outlet />
                  </main>
                  <Footer />
            </>
      );
};

export default MainLayout;
