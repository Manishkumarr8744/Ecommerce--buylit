import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Star, StarHalf, ShoppingCart, Heart, Eye } from "lucide-react";
import { getProduct } from "../../Reducer/ProductReducer/productAction";
import Loader from "../Layouts/Loader/Loader";
import MetaData from "../Layouts/MetaData";

const Product = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword") || "";

  const [hoveredProduct, setHoveredProduct] = useState(null);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
        );
      } else if (rating >= i - 0.5) {
        stars.push(
          <StarHalf
            key={i}
            className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-amber-400"
          />
        );
      } else {
        stars.push(<Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  useEffect(() => {
    dispatch(getProduct(keyword));
  }, [dispatch, keyword]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
          <MetaData title={"Products"}/>

      {/* Header Section with proper padding/margin */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-sm sm:text-base md:text-lg opacity-90">
            {keyword ? `Showing results for "${keyword}"` : "Browse our entire collection"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10">
        {/* Results Count */}
        <div className="mb-6 sm:mb-8">
          <p className="text-gray-600 text-sm sm:text-base">
            {products?.length || 0} products found
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="group relative bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Wishlist Button */}
                <button className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-white/80 backdrop-blur-sm p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:scale-110">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-red-500 transition-colors" />
                </button>

                <Link to={`/product/${product._id}`} className="block">
                  {/* Product Image */}
                  <div className="relative w-full h-48 sm:h-56 md:h-64 bg-gray-50 overflow-hidden">
                    <img
                      src={product.image[0]?.url}
                      alt={product.name}
                      className="w-full h-full object-contain p-2 sm:p-3 md:p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Quick Actions Overlay - Hidden on mobile */}
                    <div className={`hidden sm:flex absolute inset-0 bg-black/40 items-center justify-center gap-3 md:gap-4 transition-opacity duration-300 ${
                      hoveredProduct === product._id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <button className="bg-white p-2 md:p-3 rounded-full hover:scale-110 transition-transform">
                        <Eye className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                      </button>
                      <button className="bg-white p-2 md:p-3 rounded-full hover:scale-110 transition-transform">
                        <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-3 sm:p-4 md:p-5">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    {/* Price and Discount */}
                    <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-600">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <>
                          <span className="text-xs sm:text-sm text-gray-400 line-through">
                            ₹{product.originalPrice}
                          </span>
                          <span className="text-xs bg-red-100 text-red-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </span>
                        </>
                      )}
                    </div>

                    {/* Ratings */}
                    <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4">
                      <div className="flex items-center">
                        {renderStars(product.ratings)}
                      </div>
                      <span className="text-xs sm:text-sm text-gray-500">
                        {product.ratings} ({product.numOfReviews})
                      </span>
                    </div>

                    {/* Stock Status - Hidden on very small screens */}
                    <div className="hidden xs:flex items-center justify-between">
                      <span className={`text-xs sm:text-sm font-medium ${
                        product.stock > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product.stock > 0 ? `In Stock` : 'Out of Stock'}
                      </span>
                      <span className="text-xs text-gray-400">
                        Free Delivery
                      </span>
                    </div>

                    {/* Mobile CTA Button */}
                    <button className="sm:hidden w-full mt-2 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 sm:py-12 md:py-16">
              <div className="inline-flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400" />
                </div>
                <p className="text-lg sm:text-xl text-gray-600 mb-1 sm:mb-2">No products found</p>
                <p className="text-sm sm:text-base text-gray-400 px-4">Try adjusting your search terms</p>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {products && products.length > 0 && (
          <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center">
            <div className="flex items-center gap-1 sm:gap-2">
              
              
              {/* Mobile: Show fewer page numbers */}
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Show on mobile */}
                <div className="flex sm:hidden gap-1">
                 
                </div>
                
                {/* Show on desktop */}
                <div className="hidden sm:flex gap-2">
                 
                </div>
              </div>
            
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;