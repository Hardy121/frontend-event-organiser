import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import Faq from "./Faq";
import axiosInstanceAuthFormData from "@/apiInstance/axiosInstanceAuthFormData";
import toast from "react-hot-toast";
import axiosInstance from "@/apiInstance/axiosInstance";
import axiosInstanceAuth from "@/apiInstance/axiosInstanceAuth";

export const MainContent = ({ setEventInputs, dateTimeInputs, setdateTimeInputs, eventInputs }) => {
  const [images, setImages] = useState([]);
  const [sendImages, setsendImages] = useState([])
  const [saveLoading, setSaveLoading] = useState(false)
  const [faqs, setFaqs] = useState([]);
  const [existingEventData, setExistingEventData] = useState({});

  const [errors, setErrors] = useState({
    title: false,
    summary: false,
    date: false,
    startTime: false,
    endTime: false,
    location: false,
    overView: false
  });



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

  async function createEvent() {
    try {
      const formData = new FormData();
      formData.append("title", eventInputs.title || "nusd");
      formData.append("description", eventInputs.summary);
      formData.append("date", dateTimeInputs.date);
      formData.append("startTime", dateTimeInputs.startTime);
      formData.append("endTime", dateTimeInputs.endTime);
      formData.append("location", dateTimeInputs?.location);
      formData.append("overView", dateTimeInputs?.overView);
      faqs.forEach((item, index) => {
        formData.append(`goodToKnow[${index}][question]`, item.question);
        formData.append(`goodToKnow[${index}][answer]`, item.answer);
      });
      sendImages.forEach((file) => {
        formData.append("images", file);
      });

      setSaveLoading(true)
      const response = await axiosInstanceAuthFormData.post(`/event/create-event`, formData)
      console.log("response", response?.data)
      console.log("id", response?.data?.data?._id)
      localStorage.setItem('eventId', response?.data?.data?._id)
      toast.success(response?.data?.data?.message || 'Event created!!!')
      setSaveLoading(false)
    } catch (error) {
      console.log('error', error)
      setSaveLoading(false)
    }
  }

  async function getEventData() {
    const eventId = localStorage.getItem('eventId');
    if (!eventId) return;
    try {
      const response = await axiosInstanceAuth.get(`/event/getOrganisersEvents/${eventId}`)
      // console.log('response', ?.title)
      const eventData = response?.data?.data;
      setExistingEventData(eventData)

      setEventInputs({
        title: response?.data?.data.title,
        summary: response?.data?.data.description
      });

      setdateTimeInputs({
        date: response?.data?.data.date,
        startTime: response?.data?.data.startTime || "",
        endTime: response?.data?.data.endTime || "",
        location: response?.data?.data.location || "",
        overView: response?.data?.data.overView
      });

      setFaqs(
        (eventData?.goodToKnow || []).map(faq => ({
          question: faq?.question || "",
          answer: faq?.answer || "",
          open: faq?.open ?? false  // Always ensure open is boolean
        }))
      );
      setImages((response?.data?.data.images || []).map(img => ({
        preview: img.url
      })));

    } catch (error) {
      console.log()
    }
  }

  async function updateEvent() {
    console.log("updated")
  }

  function handleCreateEventValidation() {

    const newErrors = {
      title: eventInputs?.title?.trim() == '',
      summary: eventInputs?.summary?.trim() == '',
      date: !dateTimeInputs?.date,
      startTime: !dateTimeInputs?.startTime,
      endTime: !dateTimeInputs?.endTime,
      location: dateTimeInputs?.location?.trim() == '',
      overView: dateTimeInputs?.overView?.trim() == ''
    };
    setErrors(newErrors);

    return !Object.values(newErrors).includes(true);



  }

  async function handleSaveAndContinue() {
    const isValid = handleCreateEventValidation();
    if (!isValid) return;
    const isEventExist = localStorage.getItem('eventId');
    if (isEventExist) {
      await updateEvent()
    } else {
      await createEvent()
    }
  }

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    getEventData();
    console.log("existingEventData", existingEventData)
  }, [])


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
            value={eventInputs?.title}
            onChange={(e) => setEventInputs(prev => ({ ...prev, title: e.target.value }))}
            className={`w-full border rounded ${errors.title ? "border-red-500" : ""} px-3 py-2 text-sm`}
            placeholder="Enter event title"
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">Event title is required.</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Summary *</label>
          <textarea
            rows={2}
            value={eventInputs?.summary}
            onChange={(e) => setEventInputs(prev => ({ ...prev, summary: e.target.value }))}
            className={`w-full border ${errors.summary ? "border-red-500" : ""} rounded px-3 py-2 text-sm`}
            placeholder="Short description of your event"
          />
          {errors.summary && <p className="text-xs text-red-500 mt-1">Summary is required.</p>}
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
              className={`w-full ${errors.date ? "border-red-500" : ""} border rounded px-3 py-2 text-sm`} />
            {errors.date && <p className="text-xs text-red-500 mt-1">Date is required.</p>}

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
              className={`w-full ${errors.startTime ? "border-red-500" : ""} border rounded px-3 py-2 text-sm`} />
            {errors.startTime && <p className="text-xs text-red-500 mt-1">Start time is required.</p>}
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">End time</label>
            <input
              type="time"
              value={dateTimeInputs?.endTime}
              onChange={(e) =>
                setdateTimeInputs(prev => ({
                  ...prev,
                  endTime: e.target.value
                }))
              }
              className={`w-full ${errors.endTime ? "border-red-500" : ""} border rounded px-3 py-2 text-sm`} />
            {errors.endTime && <p className="text-xs text-red-500 mt-1">Start time is required.</p>}

          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Location *</label>
          <input
            type="text"
            value={dateTimeInputs?.location}
            onChange={(e) => setdateTimeInputs(prev => ({ ...prev, location: e.target.value }))}
            className={`${errors.location ? "border-red-500" : ""} w-full border  rounded px-3 py-2 text-sm`}
            placeholder="Enter a location"
          />
          {errors.location && <p className="text-xs text-red-500 mt-1">Start time is required.</p>}
        </div>
      </div>

      {/* Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Overview</h2>
        <div className="text-sm mb-3">Add more details about your event and include what people can expect if they attend.</div>
        <div className="text-sm mb-3">Use arrow keys to navigate between modules. Use the up and down buttons to reorder modules.</div>
        <textarea
          rows={4}
          value={dateTimeInputs.overView}
          onChange={(e) =>
            setdateTimeInputs(prev => ({
              ...prev,
              overView: e.target.value
            }))
          }
          className={`w-full ${errors.overView ? "border-red-500" : ""} border rounded px-3 py-2 text-sm`}
          placeholder="Add more details about your event"
        />
        {errors.overView && <p className="text-xs text-red-500 mt-1">Overview is required.</p>}

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
