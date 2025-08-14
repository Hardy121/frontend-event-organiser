import { Calendar, MapPin, Plus } from "lucide-react";
import { MapComponent } from "./Map";

export const MainContent = () => {
  return (
    <div className="flex-1 p-6"> 
      <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
              <Plus className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-white text-sm">Upload photos</div>
            <div className="text-white text-sm">and video</div>
          </div>
        </div>
        
        {/* Yoga illustration overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2">
              <div className="w-16 h-20 bg-gray-700 rounded-t-full relative">
                <div className="absolute -right-8 top-4 w-8 h-12 bg-gray-700 rounded-full transform rotate-45"></div>
                <div className="absolute -left-8 top-4 w-8 h-12 bg-gray-700 rounded-full transform -rotate-45"></div>
                <div className="absolute bottom-0 -left-4 w-8 h-16 bg-gray-700 rounded-full transform rotate-12"></div>
                <div className="absolute bottom-0 -right-4 w-8 h-16 bg-gray-700 rounded-full transform -rotate-12"></div>
              </div>
            </div>
            
            <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2">
              <div className="w-16 h-20 bg-gray-600 rounded-t-full relative">
                <div className="absolute -right-8 top-4 w-8 h-12 bg-gray-600 rounded-full transform rotate-45"></div>
                <div className="absolute -left-8 top-4 w-8 h-12 bg-gray-600 rounded-full transform -rotate-45"></div>
                <div className="absolute bottom-0 -left-4 w-8 h-16 bg-gray-600 rounded-full transform rotate-12"></div>
                <div className="absolute bottom-0 -right-4 w-8 h-16 bg-gray-600 rounded-full transform -rotate-12"></div>
              </div>
            </div>
          </div>
        </div>
        
        <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50">
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      
      {/* Event Details Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Event Title</h1>
          <Plus className="w-6 h-6 text-blue-600 cursor-pointer" />
        </div>
        <p className="text-gray-600">A short and sweet sentence about your event.</p>
      </div>
      
      {/* Date and Location Section */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Date and time</h3>
            <Plus className="w-5 h-5 text-blue-600 cursor-pointer" />
          </div>
          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <div className="font-medium">Tuesday, September 23 • 10am -</div>
              <div className="font-medium">12pm GMT+5:30</div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Location</h3>
            <Plus className="w-5 h-5 text-blue-600 cursor-pointer" />
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <div className="text-gray-500">Enter a location</div>
              <button className="text-blue-600 text-sm hover:underline">Hide map</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Component */}
      <MapComponent />

      <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Overview</h3>
            <Plus className="w-5 h-5 text-blue-600 cursor-pointer" />
          </div>
          <p className="text-gray-600 text-sm">
            Use this section to provide more details about your event. You can include things to know, venue information, 
            accessibility options—anything that will help people know what to expect.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Good to know</h3>
            <Plus  className="w-5 h-5 text-blue-600 cursor-pointer" />
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-3">Highlights</h4>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-50 flex items-center">
                <Plus className="w-3 h-3 mr-1" />
                Add Age Info
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-50 flex items-center">
                <Plus className="w-3 h-3 mr-1" />
                Add Door Time
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-50 flex items-center">
                <Plus className="w-3 h-3 mr-1" />
                Add Parking Info
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-3">Frequently asked questions</h4>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-3">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center mr-2">
                  <span className="text-xs text-white font-bold">!</span>
                </div>
                <span className="text-sm text-gray-700">Events with FAQs have 8% more organic traffic</span>
              </div>
            </div>
            <button className="text-blue-600 text-sm hover:underline">+ Add question</button>
          </div>
        </div>
      
      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
          Save and continue
        </button>
      </div>
    </div>
  );
};