import React, { useEffect, useState } from 'react';
import { Ticket, Zap, Heart, ChevronRight, Calendar, Star, Crown } from 'lucide-react';
import axiosInstanceAuthFormData from '@/apiInstance/axiosInstanceAuthFormData';
import toast from 'react-hot-toast';
import axiosInstanceAuth from '@/apiInstance/axiosInstanceAuth';

const TicketContent = () => {
  const [activeTicketType, setActiveTicketType] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false)
  const [eventTickets, setEventTickets] = useState([]);

  console.log(eventTickets)

  const [formData, setFormData] = useState({
    type: '',
    quantity: 0,
    price: 0.00,
    salesStarts: '08/17/2025',
    salesEnd: '10/03/2025',
    startTime: '12:00 AM',
    endTime: '10:00 AM'
  });


  const ticketTypes = [
    {
      id: 'General',
      icon: <Ticket className="w-6 h-6 text-blue-600" />,
      title: 'General',
      description: 'Create a ticket that people have to pay for.',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100'
    },
    {
      id: 'Reserved',
      icon: <Zap className="w-6 h-6 text-purple-600" />,
      title: 'Reserved',
      description: 'Create a ticket that no one has to pay for.',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100'
    },
    {
      id: 'VIP',
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      title: 'VIP',
      description: 'Exclusive premium access with special perks.',
      bgColor: 'bg-yellow-50',
      iconBg: 'bg-yellow-100'
    },
    {
      id: 'VVIP',
      icon: <Crown className="w-6 h-6 text-indigo-600" />,
      title: 'VVIP',
      description: 'Ultra-exclusive access with luxury benefits.',
      bgColor: 'bg-indigo-50',
      iconBg: 'bg-indigo-100'
    }
  ];


  const handleTicketTypeClick = (ticket) => {
    const existingTicket = eventTickets.find(t => t.type === ticket.id);

    if (existingTicket) {
      setActiveTicketType(ticket);
      setFormData(existingTicket);
    } else {
      setActiveTicketType(ticket);
      setFormData({
        type: ticket.title,
        quantity: 0,
        price: 0.00,
        salesStarts: '',
        salesEnd: '',
        startTime: '',
        endTime: ''
      });
    }
  };

  function handleValidationForAddTickets(formData) {
    if (!formData.type || formData.type.trim() === "") {
      toast.error("Ticket type is required");
      return false;
    }

    if (!formData.quantity || isNaN(formData.quantity) || Number(formData.quantity) <= 0) {
      toast.error("Quantity must be greater than 0");
      return false;
    }

    if (formData.price === "" || isNaN(formData.price) || Number(formData.price) < 100) {
      toast.error("Price must be a valid number (100 or above)");
      return false;
    }

    if (!formData.salesStarts) {
      toast.error("Sales start date is required");
      return false;
    }

    if (!formData.salesEnd) {
      toast.error("Sales end date is required");
      return false;
    }
    const startDate = new Date(formData.salesStarts);
    const endDate = new Date(formData.salesEnd);
    if (endDate < startDate) {
      toast.error("Sales end date must be after start date");
      return false;
    }

    if (!formData.startTime) {
      toast.error("Start time is required");
      return false;
    }

    if (!formData.endTime) {
      toast.error("End time is required");
      return false;
    }
    return true;
  }


  const handleSaveTicket = () => {
    const isValid = handleValidationForAddTickets(formData);
    if (!isValid) return;

    setEventTickets((prev) => {
      const existingIndex = prev.findIndex(t => t.type === activeTicketType?.id);
      if (existingIndex !== -1) {
        const updatedTickets = [...prev];
        updatedTickets[existingIndex] = { ...formData, type: activeTicketType?.id };
        return updatedTickets;
      } else {
        return [...prev, { ...formData, type: activeTicketType?.id }];
      }
    });
    setActiveTicketType(null);
    setFormData({
      type: '',
      quantity: 0,
      price: 0.00,
      salesStarts: '',
      salesEnd: '',
      startTime: '',
      endTime: ''
    });
  };



  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: field == "quantity" || field == "price"
        ? Number(value)
        : value
    }));
  };

  async function handleAddTicketsToEvent() {
    const eventId = localStorage.getItem('eventId');
    if (!eventId) return;
    try {
      setSaveLoading(true)
      const response = await axiosInstanceAuth.put(`/event/addTicketToEvent/${eventId}`, {
        eventTickets
      })
      toast.success(response?.data?.message || 'Event updated!!!');
      setSaveLoading(false)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong!!!');
      console.log("handleAddTicketsToEvent ~ error", error)
      setSaveLoading(false)
    }
  }
  async function getEventData() {
    const eventId = localStorage.getItem('eventId');
    if (!eventId) return;
    try {
      const response = await axiosInstanceAuth.get(`/event/getOrganisersEvents/${eventId}`)
      const eventData = response?.data?.data;
      if (eventData?.eventTickets && Array.isArray(eventData.eventTickets)) {
        // 🟢 Map backend fields into your frontend state shape
        const mappedTickets = eventData.eventTickets.map(ticket => ({
          type: ticket.type,  // "General", "Reserved", etc.
          quantity: ticket.total ?? 0,
          price: ticket.price ?? 0,
          salesStarts: ticket.salesStarts || '',
          salesEnd: ticket.salesEnd || '',
          startTime: ticket.startTime || '',
          endTime: ticket.endTime || '',
          // booked: ticket.booked ?? 0,
          type: ticket.type
        }));

        setEventTickets(mappedTickets);
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getEventData();
  }, [])


  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-2xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Create tickets</h1>
            <p className="text-gray-600 text-lg">
              Choose a ticket type or build a section with multiple ticket types.
            </p>
          </div>

          {/* Ticket Type Options */}
          <div className="space-y-4 mb-12">
            {ticketTypes.map((ticket, index) => (
              <div
                key={index}
                onClick={() => handleTicketTypeClick(ticket)}
                className={`${ticket.bgColor} rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg group`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`${ticket.iconBg} p-3 rounded-xl`}>
                      {ticket.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {ticket.title}
                      </h3>
                      <p className="text-gray-600">
                        {ticket.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex items-center justify-end'>
          <button
            onClick={handleAddTicketsToEvent}
            className={`px-6 py-2 cursor-pointer bg-orange-600 text-white rounded-lg hover:bg-orange-700`}>
            Next
          </button>
        </div>
      </div>

      {/* Sidebar */}

      <div className={`w-96 fixed ${activeTicketType ? "right-0" : "-right-full"} transition-all duration-500  bg-white border-l border-gray-200 p-6 h-screen overflow-y-auto`}>
        {/* Sidebar Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Add tickets</h2>

          {/* Ticket Type Tabs */}
          {/* <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              {ticketTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedTicketType(type.id)}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${selectedTicketType === type.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {type.title}
                </button>
              ))}
            </div> */}
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ticket type"
              disabled
            />
            <div className="text-right text-xs text-gray-500 mt-1">17/50</div>
          </div>

          {/* Available Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => handleInputChange('quantity', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="100"
            />
          </div>

          {/* Price Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Sales Start */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sales start <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={formData.salesStarts}
                  onChange={(e) => handleInputChange('salesStarts', e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start time
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Sales End */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sales end <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={formData.salesEnd}
                  onChange={(e) => handleInputChange('salesEnd', e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End time
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Advanced Settings */}
          {/* <div className="pt-4">
              <button className="flex items-center justify-between w-full text-left">
                <span className="font-medium text-gray-900">Advanced settings</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div> */}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-8 mb-20 pt-6 border-t">
          <button
            onClick={() => setActiveTicketType(null)}

            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            disabled={saveLoading}
            onClick={handleSaveTicket}
            className={`px-6 py-2 ${saveLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"} bg-orange-600 text-white rounded-lg hover:bg-orange-700`}>
            {saveLoading ? "Saving..." : "Save and continue"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default TicketContent;