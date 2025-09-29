import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    navigate(`/jobs?search=${encodeURIComponent(searchTerm)}`);
  };

  const navItems = [
    { to: "/", label: "Home", icon: "Home" },
    { to: "/jobs", label: "Find Jobs", icon: "Search" },
    { to: "/employers", label: "For Employers", icon: "Building" },
    { to: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
    { to: "/profile", label: "Profile", icon: "User" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-lg">
              <ApperIcon name="Bridge" className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TalentBridge
            </span>
          </NavLink>

          {/* Desktop Search Bar */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-100 ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-gray-900"
                  }`
                }
              >
                <ApperIcon name={item.icon} className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
</nav>

          {/* Logout Button */}
          <div className="flex items-center gap-2">
            <LogoutButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <ApperIcon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                className="h-6 w-6" 
              />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  }`
                }
              >
                <ApperIcon name={item.icon} className="h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
            <div className="px-3 py-3">
              <LogoutButton />
            </div>
          </div>
        </div>
      )}
</header>
  );
}

function LogoutButton() {
  const { logout } = useContext(AuthContext);
  
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={logout}
      className="flex items-center gap-2"
    >
      <ApperIcon name="LogOut" className="h-4 w-4" />
      <span className="hidden sm:inline">Logout</span>
    </Button>
  );
}

export default Header;