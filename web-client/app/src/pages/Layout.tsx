import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul className="flex justify-between m-4 bg-black text-white">
          <li>
            <Link to="/clients">Clients</Link>
          </li>
          <li>
            <Link to="/accounts">Accounts</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;

