import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import { ShoppingCart, User, LogOut } from "lucide-react";
import './Header.css'

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="strip">
        <Link to="/" className="title">Shopper</Link>
        <nav>
          <ul className="links">
                <li>
                  <Link to="/" className="home">
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/cart" 
                    className="cartlink"
                  >
                    <ShoppingCart className="cart" />
                    <span>Cart</span>
                    {cartCount > 0 && (
                      <span className="cartCount">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="logoutbtn"
                  >
                    <LogOut className="logout" />
                    <span>Logout</span>
                  </button>
                </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;