import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const MainLayout = () => {
  return (
    <section className="layout">
      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <Navbar />
      </footer>
    </section>
  );
};

export default MainLayout;
