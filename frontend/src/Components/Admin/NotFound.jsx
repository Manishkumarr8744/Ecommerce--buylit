import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, AlertCircle } from 'lucide-react';
import MetaData from '../Layouts/MetaData';

const NotFound = () => {
  return (
    <div className="mt-[3rem] min-h-[60vh] bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
     <MetaData title={`Not Found`} />
      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* 404 Error */}
        <div className="relative">
          <h1 className="text-[150px] sm:text-[200px] md:text-[250px] font-bold text-white opacity-20 leading-none select-none ">
            404
          </h1>
         
        </div>

        {/* Error message */}
        <div className="mt-8 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Oops! Page not found
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>
        </div>

        {/* Search suggestion */}
        <div className="mt-8 flex items-center justify-center gap-2 text-white/60">
          <Search className="w-5 h-5 animate-pulse" />
          <p className="text-sm">Try searching for what you need</p>
        </div>

        {/* Action buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="group flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 bg-transparent text-white border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-600 transform hover:-translate-y-1 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Go Back
          </button>
        </div>

        {/* Additional help text */}
        <div className="mt-16 text-white/60 text-sm">
          <p>Need help? <a href="/contact" className="underline hover:text-white transition-colors">Contact support</a></p>
        </div>
      </div>

      {/* Alternative design with geometric shapes */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 opacity-10">
        <svg className="relative block w-full h-32" preserveAspectRatio="none" viewBox="0 0 1200 120">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                className="fill-white"></path>
        </svg>
      </div>
    </div>
  );
};


export default NotFound;