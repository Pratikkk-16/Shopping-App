import { Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../Context/CartContext";
const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { id, title, price, image, quantity } = item;

  return (
    <div className="cartItemComp">
      <div className="cartItemImage">
        <img 
          src={image} 
          alt={title} 
          className="cartItemImg"
        />
      </div>
      <div className="cartItemDetails">
        <h3 className="cartItemTitle">{title}</h3>
        <p className="cartItemPrice">${price.toFixed(2)}</p>
      </div>
      <div className="cartItemQuantity">
        <button
          onClick={() => updateQuantity(id, quantity - 1)}
          className="quantityControl"
          aria-label=" Decrement Quantity"
        >
          <Minus className="quantityControlIcon" />
        </button>
        <span className="itemQuantity">{quantity}</span>
        <button
          onClick={() => updateQuantity(id, quantity + 1)}
          className="quantityControl"
          aria-label="Increase quantity"
        >
          <Plus className="quantityControlIcon" />
        </button>
      </div>
      <div className="cartItemTotal">
        <p className="itemTotalPrice">
          ${(price * quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeFromCart(id)}
          className="removeItem"
        >
          <Trash2 className="removeItemIcon" />
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;