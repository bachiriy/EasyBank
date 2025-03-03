import { Outlet, Link } from "react-router-dom";
import Footer from "../components/Footer";

const Layout = () => {
  return (
      <div className="min-h-screen flex flex-col">
       {/* Navbar */}
        <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link to="/customers" className="flex items-center">
                  <span className="text-white text-2xl font-bold ml-2 hover:text-blue-200 transition duration-300">
                    EasyBank
                  </span>
                </Link>
              </div>
              {/* Navigation Links */}
              <div className="hidden md:flex space-x-8">
                <Link
                  to="/customers"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Customers
                </Link>
                <Link
                  to="/accounts"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Accounts
                </Link>
                <Link
                  to="/customers/new"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Add Customer
                </Link>
                <Link
                  to="/accounts/new"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Add Account
                </Link>
              </div>
        
              {/* Mobile Menu Button (Optional) */}
              <div className="md:hidden">
                <button
                  type="button"
                  className="text-white hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {/* Hamburger Icon */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        
          {/* Mobile Menu (Optional) */}
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/customers"
                className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium"
              >
                Customers
              </Link>
              <Link
                to="/accounts"
                className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium"
              >
                Accounts
              </Link>
              <Link
                to="/customers/new"
                className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium"
              >
                Add Customer
              </Link>
              <Link
                to="/accounts/new"
                className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium"
              >
                Add Account
              </Link>
            </div>
          </div>
        </nav>
       {/* Main Content */}
       <main className="flex-grow p-4">
         <Outlet /> {/* This is where your page content will be rendered */}
       </main>

       {/* Footer */}
       <Footer />
     </div>
  )
};

export default Layout;
