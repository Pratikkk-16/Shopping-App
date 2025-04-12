import { useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../Components/CartItem";
import { useCart } from "../Context/CartContext";
import { ShoppingBasket, ArrowRight } from "lucide-react";

const Cart = () => {
  const { cartItems, clearCart, getCartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);

    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);

    }, 1500);
  };
  if (cartItems.length === 0) {
    return (
      <div className="emptyCart">
        <ShoppingBasket className="emptyCartIcon" />
        <h2 className="emptyCartTitle">Your cart is empty</h2>
        <p className="emptyCartMessage">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="continueShopping">
          Continue Shopping
          <ArrowRight className="continueShoppingArrow" />
        </Link>
      </div>
    );
  }
  return (
    <div className="CartPage">
      <h1 className="cartPageTitle">Shopping Cart</h1>
      <div className="cartGrid">
        <div className="cartItem">
          <div>
            <div className="cartItemList">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
        <div className="orderSummary">
          <div className="orderSummaryCard">
            <h2 className="orderSummaryTitle">Order Summary</h2>
            <div className="orderSummaryDetail">
              <div className="summarySubtotal">
                <span className="summaryLabel">Subtotal</span>
                <span className="summaryValue">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="summaryShipping">
                <span className="summaryLabel">Shipping</span>
                <span className="summaryValue">Free</span>
              </div>
              <div className="summaryTotal">
                <span className="summaryLabel">Total</span>
                <span className="summaryValueBold">${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="checkoutButton"
            >
              {isCheckingOut ? "Processing..." : "Checkout"}
            </button>
            <Link to="/" className="continueShoppingLink">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;