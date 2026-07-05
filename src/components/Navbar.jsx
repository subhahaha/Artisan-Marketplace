import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { itemCount } = useCart();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="border-b border-ink/10 bg-paper/95 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-y-2">
        <Link to="/" className="font-display text-xl sm:text-2xl text-plum tracking-tight">
          Kaarigar<span className="text-gold">.</span>Bazaar
        </Link>
        <nav className="flex items-center gap-3 sm:gap-6 text-sm font-medium text-ink-soft">
          <Link to="/" className="hover:text-plum transition-colors">
            Shop
          </Link>
          <Link
            to="/cart"
            className="hover:text-plum transition-colors flex items-center gap-1.5"
          >
            Cart
            {itemCount > 0 && (
              <span className="bg-gold text-plum text-xs font-mono font-medium rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/seller/dashboard" className="hover:text-plum transition-colors">
                Dashboard
              </Link>
              <button onClick={logout} className="hover:text-plum transition-colors">
                Log out
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-plum transition-colors">
              <span className="hidden sm:inline">Sell on Kaarigar</span>
              <span className="sm:hidden">Sell</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}