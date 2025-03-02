import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul className="flex justify-between m-4 bg-black text-white">
          <li>
            <Link to="/customers">Customers</Link>
          </li>
          <li>
            <Link to="/accounts">Accounts</Link>
          </li>
          <li>
            <Link to="/customers/new">Add Customer</Link>
          </li>
          <li>
            <Link to="/accounts/new">Add Account</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;

