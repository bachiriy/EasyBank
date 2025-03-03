import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-blue-700 text-white py-8 mt-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/customers" className="hover:text-blue-200 transition duration-300">
                      Customers
                    </Link>
                  </li>
                  <li>
                    <Link to="/accounts" className="hover:text-blue-200 transition duration-300">
                      Accounts
                    </Link>
                  </li>
                  <li>
                    <Link to="/customers/new" className="hover:text-blue-200 transition duration-300">
                      Add Customer
                    </Link>
                  </li>
                  <li>
                    <Link to="/accounts/new" className="hover:text-blue-200 transition duration-300">
                      Add Account
                    </Link>
                  </li>
                </ul>
              </div>
        
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="mailto:support@yourbank.com" className="hover:text-blue-200 transition duration-300">
                      support@easybank.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+1234567890" className="hover:text-blue-200 transition duration-300">
                      +1 (212) 649-2916-51
                    </a>
                  </li>
                  <li>
                    <p>123 Bank Street, Financial City, FC 12345</p>
                  </li>
                </ul>
              </div>
        
              {/* Social Media Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition duration-300">
                    <i className="fab fa-twitter text-2xl"></i>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition duration-300">
                    <i className="fab fa-facebook text-2xl"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition duration-300">
                    <i className="fab fa-linkedin text-2xl"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition duration-300">
                    <i className="fab fa-instagram text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
        
            {/* Copyright Section */}
            <div className="border-t border-blue-500 mt-8 pt-8 text-center">
              <p>&copy; {new Date().getFullYear()} EasyBank. All rights reserved.</p>
            </div>
          </div>
        </footer>
    );
}

export default Footer;
