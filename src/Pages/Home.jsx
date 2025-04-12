import { useState, useEffect } from "react";
import { getAllProducts, getProductsByCategory, getAllCategories } from "../API/api";
import ProductCard from "../components/ProductCard";
import { Search } from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          getAllProducts(),
          getAllCategories()
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } 
      catch (error) {
        console.error("Error fetching data:", error);
      } 
      finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterProducts = async () => {
      setIsLoading(true);
      try {
        let filteredData;
        if (selectedCategory) {
          filteredData = await getProductsByCategory(selectedCategory);
        } 
        else {
          filteredData = products;
        }
        if (searchQuery) {
          filteredData = filteredData.filter(product => 
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setFilteredProducts(filteredData);
      } 
      catch (error) {
        console.error("Error filtering products:", error);
      } 
      finally {
        setIsLoading(false);
      }
    };

    filterProducts();
  }, [selectedCategory, searchQuery, products]);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };
  return (
    <div className="homepage">
      <div className="producthead">
        <h1 className="products">Products</h1>
        <div className="searchBar">
          <form onSubmit={handleSearch} className="search">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="searchinp"
            />
            <Search className="find" />
          </form>
          <div className="categoryBlock">
            <button
              onClick={() => handleCategoryChange("")}
              className={`allbtn ${
                selectedCategory === "" 
                  ? "this" 
                  : "that"
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`categories ${
                  selectedCategory === category 
                    ? "this" 
                    : "that"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="loading">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="index"></div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="filteredProduct">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="notFound">
          <p className="noProduct">No products found. Try a different search or category.</p>
        </div>
      )}
    </div>
  );
};

export default Home;