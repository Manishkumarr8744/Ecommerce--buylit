// Loader.jsx
export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        {/* Big spinning circle */}
        <div className="h-24 w-24 border-8 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
        
        {/* Loading text */}
        <p className="text-xl font-bold text-black-300 tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  );
}
