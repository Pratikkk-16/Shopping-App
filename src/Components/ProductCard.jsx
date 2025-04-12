import { Link } from "react-router-dom";
import './ProductCard.css'

const ProductCard = ({ product }) => {
  const { id, title, price, image, category } = product;
  return (
    <Link to={`/product/${id}`} className="productCardLink">
      <div className="productCard">
        <div className="productImageDiv">
          <img 
            src={image} 
            alt={title} 
            className="productImg"
          />
        </div>
        <div className="productDetails">
          <span className="productCategoryComp">{category}</span>
          <h3 className="productTitleComp">{title}</h3>
          <div className="productPricing">
            <span className="productPriceComp">${price.toFixed(2)}</span>
            <span className="viewDetails">
              View Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;