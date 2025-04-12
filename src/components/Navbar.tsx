import { Film, Menu, X } from "lucide-react";
import { useState } from "react";
import { AuthButton } from "./AuthButton";
import { useAuth } from "../usecases/authContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { account, isAuthenticated, handleLogin, handleLogout } = useAuth();
  return (
    <header className="sticky top-0 z-30 bg-[#14181c]/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            className="flex items-center gap-3 flex-shrink-0 cursor-pointer"
            href="/"
          >
            <Film className="h-8 w-8 text-[#00e054]" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Moviebox
            </h1>
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-4">
            <AuthButton
              isAuthenticated={isAuthenticated}
              account={account}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="pt-4">
              <AuthButton
                isAuthenticated={isAuthenticated}
                account={account}
                onLogin={handleLogin}
                onLogout={handleLogout}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
