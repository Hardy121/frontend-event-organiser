import { Plus, X } from "lucide-react";
import { useState } from "react";
import Faq from "./Faq";
import axiosInstanceAuthFormData from "@/apiInstance/axiosInstanceAuthFormData";

export const MainContent = ({ setEventInputs, dateTimeInputs, setdateTimeInputs, eventInputs }) => {
  const [images, setImages] = useState([]);
  const [sendImages, setsendImages] = useState([])
  const [location, setLocation] = useState('');

  const [saveLoading, setSaveLoading] = useState(false)

  const [faqs, setFaqs] = useState([])



  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setsendImages((prev) => {
      const combinedFiles = [...prev, ...files];
      return combinedFiles.slice(0, 3);
    });

    const newImages = files.slice(0, 3).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages].slice(0, 3));
  };


  async function handleSaveAndContinue() {


    try {
      const formData = new FormData();

      formData.append("title", eventInputs.title || "nusd");
      formData.append("description", eventInputs.summary);
      formData.append("date", dateTimeInputs.date);
      formData.append("startTime", dateTimeInputs.startTime);
      formData.append("endTime", dateTimeInputs.endTime);
      formData.append("location", location);

      faqs.forEach((item, index) => {
        formData.append(`goodToKnow[${index}][question]`, item.question);
        formData.append(`goodToKnow[${index}][answer]`, item.answer);
      });
      sendImages.forEach((file) => {
        formData.append("images", file); // "images" matches backend field name
      });

      setSaveLoading(true)
      const response = await axiosInstanceAuthFormData.post(`/event/create-event`, formData)
      console.log("response", response)
      setSaveLoading(false)

    } catch (error) {
      console.log('error', error)
      setSaveLoading(false)
    }
  }

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1 p-6 space-y-6 bg-gray-50">
      {/* Images & Video */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Add images and video</h2>

        {/* Image Preview Section */}
        <div className="flex gap-4 mb-4">
          {images.map((img, i) => (
            <div key={i} className="relative w-40 h-24 border rounded overflow-hidden">
              <img src={img.preview} alt="preview" className="w-full h-full object-cover" />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {images.length < 3 && (
            <label className="w-40 h-24 border-2 border-dashed rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
              <Plus className="w-6 h-6 text-gray-500" />
              <span className="text-xs text-gray-500">Add Image</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        <p className="text-xs text-gray-500">
          Recommended: 2160 × 1080px • Max size: 10MB • Formats: JPEG, PNG
        </p>
      </div>

      {/* Event Overview */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold">Event Overview</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Event title *</label>
          <input
            type="text"
            onChange={(e) => setEventInputs({ title: e.target.value })}
            className="w-full border  rounded px-3 py-2 text-sm"
            // border-red-500
            placeholder="Enter event title"
          />
          {/* <p className="text-xs text-red-500 mt-1">Event title is required.</p> */}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Summary *</label>
          <textarea
            rows={2}
            onChange={(e) => setEventInputs({ summary: e.target.value })}
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="Short description of your event"
          />
          {/* <p className="text-xs text-red-500 mt-1">Summary is required.</p> */}
        </div>
      </div>

      {/* Date & Location */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Date and location</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={dateTimeInputs?.date}
              onChange={(e) =>
                setdateTimeInputs(prev => ({
                  ...prev,
                  date: e.target.value
                }))
              }
              className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Start time</label>
            <input
              type="time"
              value={dateTimeInputs?.startTime}
              onChange={(e) =>
                setdateTimeInputs(prev => ({
                  ...prev,
                  startTime: e.target.value
                }))
              }
              className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Start time</label>
            <input
              type="time"
              value={dateTimeInputs?.endTime}
              onChange={(e) =>
                setdateTimeInputs(prev => ({
                  ...prev,
                  endTime: e.target.value
                }))
              }
              className="w-full border rounded px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Location *</label>
          <input
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border  rounded px-3 py-2 text-sm"
            placeholder="Enter a location"
          />
          {/* <p className="text-xs text-red-500 mt-1">Location is required.</p> */}
        </div>
      </div>

      {/* Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Overview</h2>
        <div className="text-sm mb-3">Add more details about your event and include what people can expect if they attend.</div>
        <div className="text-sm mb-3">Use arrow keys to navigate between modules. Use the up and down buttons to reorder modules.</div>
        <textarea
          rows={4}
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="Add more details about your event"
        />
      </div>

      {/* Good to Know */}
      <Faq setFaqs={setFaqs} faqs={faqs} />

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          disabled={saveLoading}
          onClick={handleSaveAndContinue}
          className={`px-6 py-2 ${saveLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"} bg-orange-600 text-white rounded-lg hover:bg-orange-700`}>
          {saveLoading ? "Saving..." : "Save and continue"}
        </button>
      </div>
    </div>
  );
};
