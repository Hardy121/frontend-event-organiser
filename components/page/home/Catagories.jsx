"use client"
import React from "react";
import { Mic, Music, Calendar, Heart, Gamepad2, Briefcase, Utensils, Glasses } from "lucide-react";

const categories = [
  { name: "Music", icon: <Mic size={30} className="text-gray-500" /> },
  { name: "Nightlife", icon: <Music size={30} className="text-gray-500" /> }, // closest to disco ball
  { name: "Performing & Visual Arts", icon: <Glasses size={30} className="text-gray-500" /> }, // using glasses as placeholder
  { name: "Holidays", icon: <Calendar size={30} className="text-gray-500" /> },
  { name: "Dating", icon: <Heart size={30} className="text-gray-500" /> },
  { name: "Hobbies", icon: <Gamepad2 size={30} className="text-gray-500" /> },
  { name: "Business", icon: <Briefcase size={30} className="text-gray-500" /> },
  { name: "Food & Drink", icon: <Utensils size={30} className="text-gray-500" /> },
];

const Categories = () => {
  return (
    <div className="flex justify-center gap-10 flex-wrap py-10">
      {categories.map((cat, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-28 h-28 flex items-center justify-center rounded-full border border-gray-300">
            {cat.icon}
          </div>
          <p className="mt-3 text-sm text-gray-600 text-center">{cat.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
