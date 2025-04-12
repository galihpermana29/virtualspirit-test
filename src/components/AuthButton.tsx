import { LogIn, LogOut, User } from "lucide-react";
import type { Account } from "../models/movie";

interface AuthButtonProps {
  isAuthenticated: boolean;
  account: Account | null;
  onLogin: () => void;
  onLogout: () => void;
}

export function AuthButton({
  isAuthenticated,
  account,
  onLogin,
  onLogout,
}: AuthButtonProps) {
  return (
    <div className="flex items-center gap-3">
      {isAuthenticated && account ? (
        <>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-[#00e054]" />
            <span className="text-gray-300">{account.username}</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-[#2c3440] text-gray-300 rounded-lg hover:bg-[#3d4754] transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </>
      ) : (
        <button
          onClick={onLogin}
          className="flex items-center gap-2 px-4 py-2 bg-[#00e054] text-[#14181c] rounded-lg hover:bg-[#00b344] transition-colors font-medium"
        >
          <LogIn className="h-4 w-4" />
          <span>Login with TMDB</span>
        </button>
      )}
    </div>
  );
}
