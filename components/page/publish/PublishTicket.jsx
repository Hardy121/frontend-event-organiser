import React, { useState } from 'react';
import { ChevronDown, X, ExternalLink } from 'lucide-react';

const PublishTicket = () => {
  const [eventType, setEventType] = useState('Other');
  const [category, setCategory] = useState('Other'); 
  const [tags, setTags] = useState(['music_festival', 'summer_fun', 'community_event', 'outdoor_concert', 'family_gathering']);
  const [newTag, setNewTag] = useState(''); 
  const [isPublic, setIsPublic] = useState(true);
  const [allowRefunds, setAllowRefunds] = useState(true);
  const [refundDays, setRefundDays] = useState('7'); 
  const [publishTiming, setPublishTiming] = useState('now');

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTag();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Your event is almost ready to publish
            </h1>
            <p className="text-gray-600">
              Review your settings and let everyone find your event.
            </p>
          </div>

          {/* Event Preview Card */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-52 h-52 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-300 rounded"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">event</h3>
                <p className="text-sm text-gray-600 mb-2">Friday, October 3 • 10am - 12pm GMT+5:30</p>
                <p className="text-sm text-gray-500 mb-3">To be announced</p>
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold">₹30.00</span>
                  <span className="text-sm text-gray-500">100</span>
                  {/* <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                    Preview <ExternalLink className="w-3 h-3 ml-1" />
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          {/* Event Type and Category */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Event type and category</h2>
            <p className="text-sm text-gray-600 mb-4">
              Your type and category help your event appear in more searches.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <div className="relative">
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white"
                  >
                    <option>Other</option>
                    <option>Conference</option>
                    <option>Workshop</option>
                    <option>Concert</option>
                  </select>
                  <ChevronDown className="w-5 h-5 absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white"
                  >
                    <option>Other</option>
                    <option>Music</option>
                    <option>Arts</option>
                    <option>Business</option>
                  </select>
                  <ChevronDown className="w-5 h-5 absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Tags</h2>
            <p className="text-sm text-gray-600 mb-4">
              Help people discover your event by adding tags related to your event's theme, topic, vibe, location, and more.
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-2 hover:text-gray-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add search keywords to your event"
                className="w-full p-2 border-0 focus:outline-none text-sm"
              />
            </div>

            <p className="text-xs text-gray-500 mt-2">{tags.length}/10 tags</p>
          </div>


          {/* Publish Settings */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Publish settings</h2>

            {/* Public/Private */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3 ">Is your event public or private?</h3>
              <div className="space-y-2">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={isPublic}
                    onChange={() => setIsPublic(true)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium">Public</div>
                    <div className="text-sm text-gray-500">Shared on Eventbrite and search engines</div>
                  </div>
                </label>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={!isPublic}
                    onChange={() => setIsPublic(false)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium">Private</div>
                    <div className="text-sm text-gray-500">Shared only with a select audience</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Refund Policy */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Set your refund policy</h3>
              <p className="text-sm text-gray-600 mb-4">
                After your event is published, you can only update your policy to make it more flexible for your attendees.
              </p>

              <div className="space-y-2 mb-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    checked={allowRefunds}
                    onChange={() => setAllowRefunds(true)}
                    className="mt-0"
                  />
                  <span className="font-medium">Allow refunds</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    checked={!allowRefunds}
                    onChange={() => setAllowRefunds(false)}
                    className="mt-0"
                  />
                  <span className="font-medium">Don't allow refunds</span>
                </label>
              </div>

              {allowRefunds && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Days before the event
                  </label>
                  <input
                    type="number"
                    value={refundDays}
                    onChange={(e) => setRefundDays(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                  />
                  <p className="text-xs text-gray-500">
                    Set how many days (1 to 30) before the event that attendees can request refunds.
                  </p>
                </div>
              )}
            </div>

            {/* Publish Timing */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">When should we publish your event?</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    checked={publishTiming === 'now'}
                    onChange={() => setPublishTiming('now')}
                    className="mt-0"
                  />
                  <span>Publish now</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    checked={publishTiming === 'later'}
                    onChange={() => setPublishTiming('later')}
                    className="mt-0"
                  />
                  <span>Schedule for later</span>
                </label>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="flex justify-end mt-10">
        <div className='flex items-center gap-3'>
          <button
            className={`px-6 py-2 cursor-pointer bg-orange-600 text-white rounded-lg hover:bg-orange-700`}>
            Edit
          </button>
          <button
            className={`px-6 py-2 cursor-pointer bg-orange-600 text-white rounded-lg hover:bg-orange-700`}>
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishTicket;