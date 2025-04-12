import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../API/api";
import { useCart } from "../Context/CartContext";
import { ShoppingCart, ArrowLeft, Star } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, value);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="loadingpg">
        <div className="loadingAnimation">
          <div className="loadingTitle"></div>
          <div className="loadingGrid">
            <div className="loadingImage"></div>
            <div className="loadingInfo">
              <div className="loadingInfoTitle"></div>
              <div className="loadingInfoCategory"></div>
              <div className="loadingInfoDescription"></div>
              <div className="loadingInfoPrice"></div>
              <div className="loadingInfoButton"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="DetailNotFound">
        <p className="productNotFound">Product not found.</p>
        <button 
          onClick={goBack} 
          className="goBackButton"
        >
          <ArrowLeft className="goBackIcon" />
          Back to products
        </button>
      </div>
    );
  }

  const { title, price, description, category, image, rating } = product;
  return (
    <div className="productDetail">
      <button 
        onClick={goBack} 
        className="goBackButton"
      >
        <ArrowLeft className="goBackIcon" />
        Back to products
      </button>
      <div className="productDetailGrid">
        <div className="productImage">
          <img 
            src={image} 
            alt={title} 
            className="productImg" 
          />
        </div>
        <div>
          <span className="productCategory">{category}</span>
          <h1 className="productTitle">{title}</h1>
          <div className="productRating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`starIcon ${
                    i < Math.round(rating?.rate || 0) 
                      ? "filledStar" 
                      : "emptyStar"
                  }`} 
                />
              ))}
            </div>
            <span className="ratingText">
              {rating?.rate} ({rating?.count} reviews)
            </span>
          </div>
          <p className="productPrice">
            ${price.toFixed(2)}
          </p>
          <p className="productDescription">
            {description}
          </p>
          <div className="productAction">
            <div className="quantityControl">
              <label htmlFor="quantity" className="quantityLabel">
                Quantity:
              </label>
              <div className="quantityInputDiv">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="quantityMinus"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="quantityInput"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="quantityPlus"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="addToCart"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;