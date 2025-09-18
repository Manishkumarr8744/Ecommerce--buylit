import React from "react";
import { Instagram, Linkedin, Mail, ShoppingBag, Code2, Sparkles } from "lucide-react";
import MetaData from "../MetaData";

const About = () => {
  return (
    <div className="mt-[3rem] min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <MetaData title={`About`} />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl w-full">
          {/* Main Card */}
          <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 sm:p-10 lg:p-12 border border-white/20">
            {/* Logo/Icon */}
           

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-center mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                BuyLit
              </span>
              <span className="text-gray-800"> Store</span>
            </h1>

            {/* Tagline */}
            <p className="text-center text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              A modern <span className="font-semibold text-blue-600">MERN Stack</span> 
              <Code2 className="inline w-5 h-5 mx-1 text-blue-600" />
              ECommerce project showcasing shopping, cart, and order management.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl text-center">
                <Sparkles className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Modern UI/UX</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl text-center">
                <Code2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Full-Stack App</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl text-center">
                <ShoppingBag className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">E-Commerce Ready</p>
              </div>
            </div>

            {/* Creator Card */}
            <div className="relative group mb-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-75"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-xl p-6 sm:p-8 text-center transform transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-3xl">👨‍💻</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Manish Kumar</h2>
                <p className="text-sm sm:text-base opacity-90">Full-Stack Developer | MERN Enthusiast</p>
              </div>
            </div>

            {/* Contact & Socials */}
            <div className="space-y-4">
              <h3 className="text-center text-gray-600 font-medium mb-4">Connect with me</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/ma_niiiiish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                >
                  <Instagram className="w-5 h-5 text-pink-600 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-pink-600">Instagram</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/manish-kumar-87589528b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-sky-50 hover:from-blue-100 hover:to-sky-100 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                >
                  <Linkedin className="w-5 h-5 text-blue-700 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-blue-700">LinkedIn</span>
                </a>
              </div>

              {/* Email */}
              <a
                href="mailto:mk7219630@gmail.com"
                className="group flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full max-w-md mx-auto justify-center"
              >
                <Mail className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="font-medium text-red-600 truncate">mk7219630@gmail.com</span>
              </a>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-500 text-sm text-center">
                © {new Date().getFullYear()} BuyLit Store. Built with{" "}
                <span className="text-red-500 animate-pulse">❤️</span> by Manish Kumar
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add these styles to your global CSS */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default About;