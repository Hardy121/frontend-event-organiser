export const MapComponent = () => {
  return (
    <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-6 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-blue-200 to-cyan-300">
        <div className="absolute top-4 left-4 text-xs text-gray-600">PACIFIC HEIGHTS</div>
        <div className="absolute top-4 right-4 text-xs text-gray-600">CHINATOWN</div>
        <div className="absolute bottom-4 left-4 text-xs text-gray-600">HAIGHT ASHBURY</div>
        <div className="absolute bottom-4 right-4 text-xs text-gray-600">MISSION BAY</div>
        <div className="absolute center text-xs text-gray-600">UNION SQUARE</div>
        <div className="absolute bottom-2 right-2 text-xs text-gray-500">Map data ©2025 Google</div>
      </div>
    </div>
  );
};