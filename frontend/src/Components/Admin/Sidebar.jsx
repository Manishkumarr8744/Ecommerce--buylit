import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

// Import Lucide Icons
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ListOrdered,
  Users,
  Star,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  List,
} from "lucide-react";

const Sidebar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Check if a route is active
  const isActive = (path) => location.pathname === path;

  // Close sidebar on mobile when clicking a link
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          w-64 bg-white shadow-lg flex flex-col border-r border-gray-200 
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          fixed md:sticky top-0 left-0 h-screen z-40
        `}
      >
        {/* Logo Section */}
        <div className="p-5 border-b border-gray-100">
          <Link 
            to="/" 
            className="flex items-center justify-center md:justify-start"
            onClick={handleLinkClick}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              BuyLit
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-2">
          {/* Dashboard */}
          <Link
            to="/admin/dashboard"
            onClick={handleLinkClick}
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 group
              ${isActive("/admin/dashboard") 
                ? "bg-indigo-50 text-indigo-700" 
                : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
              }
            `}
          >
            <LayoutDashboard 
              size={20} 
              className={`transition-colors ${
                isActive("/admin/dashboard") ? "text-indigo-600" : "group-hover:text-indigo-600"
              }`} 
            />
            <span className="font-medium">Dashboard</span>
          </Link>

          {/* Products Dropdown */}
          <div className="space-y-1">
            <button
              onClick={() => setIsProductsOpen(!isProductsOpen)}
              className={`
                w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 group
                ${(isActive("/admin/products") || isActive("/admin/product"))
                  ? "bg-indigo-50 text-indigo-700" 
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <Package 
                  size={20} 
                  className={`transition-colors ${
                    (isActive("/admin/products") || isActive("/admin/product"))
                      ? "text-indigo-600" 
                      : "group-hover:text-indigo-600"
                  }`} 
                />
                <span className="font-medium">Products</span>
              </div>
              {isProductsOpen ? (
                <ChevronUp size={16} className="text-gray-500" />
              ) : (
                <ChevronDown size={16} className="text-gray-500" />
              )}
            </button>

            {/* Dropdown Content */}
            <div
              className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                isProductsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <Link
                to="/admin/products"
                onClick={handleLinkClick}
                className={`
                  flex items-center space-x-3 px-4 py-2.5 rounded-md text-sm transition-colors duration-200 ml-4
                  ${isActive("/admin/products")
                    ? "bg-gray-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-indigo-700"
                  }
                `}
              >
                <List size={16} />
                <span>All Products</span>
              </Link>
              <Link
                to="/admin/product"
                onClick={handleLinkClick}
                className={`
                  flex items-center space-x-3 px-4 py-2.5 rounded-md text-sm transition-colors duration-200 ml-4
                  ${isActive("/admin/product")
                    ? "bg-gray-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-indigo-700"
                  }
                `}
              >
                <PlusCircle size={16} />
                <span>Create Product</span>
              </Link>
            </div>
          </div>

          {/* Orders */}
          <Link
            to="/admin/orders"
            onClick={handleLinkClick}
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 group
              ${isActive("/admin/orders") 
                ? "bg-indigo-50 text-indigo-700" 
                : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
              }
            `}
          >
            <ListOrdered 
              size={20} 
              className={`transition-colors ${
                isActive("/admin/orders") ? "text-indigo-600" : "group-hover:text-indigo-600"
              }`} 
            />
            <span className="font-medium">Orders</span>
          </Link>

          {/* Users */}
          <Link
            to="/admin/users"
            onClick={handleLinkClick}
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 group
              ${isActive("/admin/users") 
                ? "bg-indigo-50 text-indigo-700" 
                : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
              }
            `}
          >
            <Users 
              size={20} 
              className={`transition-colors ${
                isActive("/admin/users") ? "text-indigo-600" : "group-hover:text-indigo-600"
              }`} 
            />
            <span className="font-medium">Users</span>
          </Link>

          {/* Reviews */}
          <Link
            to="/admin/reviews"
            onClick={handleLinkClick}
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 group
              ${isActive("/admin/reviews") 
                ? "bg-indigo-50 text-indigo-700" 
                : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
              }
            `}
          >
            <Star 
              size={20} 
              className={`transition-colors ${
                isActive("/admin/reviews") ? "text-indigo-600" : "group-hover:text-indigo-600"
              }`} 
            />
            <span className="font-medium">Reviews</span>
          </Link>
        </nav>

        {/* Footer - Optional */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            © 2024 BuyLit Admin
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;