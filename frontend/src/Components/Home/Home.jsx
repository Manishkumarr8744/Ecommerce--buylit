import React, { useEffect } from 'react';
import { Star, Heart, ShoppingCart, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct, ClearErrors } from '../../Reducer/ProductReducer/productAction';
import Loader from '../Layouts/Loader/Loader';
import { Link } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';

const Home = () => {
  const dispatch = useDispatch();

  const scrollToProducts = () => {
    document.getElementById('featured-products').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const { products, error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      dispatch(ClearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  const ProductCard = ({ product, index }) => (
    <Link 
      to={`/product/${product._id}`} 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
    >
      {/* Badge for first 3 products */}
      {index < 3 && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
          <TrendingUp className="h-3 w-3" />
          <span>Hot</span>
        </div>
      )}
      
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img 
          src={product.image[0].url} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center space-x-2">
            <span>Quick View</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors duration-200 opacity-0 group-hover:opacity-100">
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>
      
      <div className="p-6">
        {/* Product Name */}
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${
                  i < Math.floor(product.ratings) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-200'
                }`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">({product.numOfReviews} reviews)</span>
        </div>
        
        {/* Price and Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105">
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>

        {/* Stock Status */}
        {product.stock < 10 && product.stock > 0 && (
          <p className="text-sm text-orange-600 mt-2 font-medium">
            Only {product.stock} left in stock!
          </p>
        )}
      </div>
    </Link>
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gray-50">
          <MetaData title={"Home"}/>
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 min-h-screen flex items-center justify-center px-4 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative max-w-5xl mx-auto text-center text-white">
              <div className="mb-6 inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Sparkles className="h-5 w-5 text-yellow-300" />
                <span className="text-sm font-medium">Welcome to the future of shopping</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Discover Amazing Products at{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
                  BuyLit
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto">
                Shop the latest trends with unbeatable prices and lightning-fast delivery
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={scrollToProducts}
                  className="group bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link 
                  to="/products"
                  className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/50 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/30 transition-all duration-300"
                >
                  View All Products
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div>
                  <p className="text-3xl font-bold">10K+</p>
                  <p className="text-sm text-white/80">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-sm text-white/80">Products</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">4.8★</p>
                  <p className="text-sm text-white/80">Average Rating</p>
                </div>
              </div>
            </div>

            
          </section>

          {/* Featured Products Section */}
          <section id="featured-products" className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-4">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-sm font-semibold">Trending Now</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Featured Products
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Handpicked selections from our best-selling collection. Don't miss out on these customer favorites!
                </p>
              </div>

              {/* Products Grid - Show only 5 products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {products.slice(0, 5).map((product, index) => (
                  <ProductCard key={product._id} product={product} index={index} />
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center mt-12">
                <Link 
                  to="/products"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <span>View All Products</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </section>

          <div class="w-full h-[70vh] flex flex-col items-center justify-center text-center px-4 md:px-8">
  <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
    Why Choose Us
  </h1>
  <p class="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
    "At BuyLit, shopping isn’t just about buying — it’s about experiencing trust, quality, and convenience."
  </p>
</div>
        </div>
      )}
    </>
  );
};

export default Home;