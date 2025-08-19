import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1E0A3C] text-gray-400 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">EventHub</h3>
            <p className="text-sm leading-6">
              Discover and book amazing events happening around you.  
              Join, network and experience the best of Surat.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">Events</a></li>
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-white hover:text-[#1E0A3C] transition">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-white hover:text-[#1E0A3C] transition">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-white hover:text-[#1E0A3C] transition">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-white hover:text-[#1E0A3C] transition">
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} EventHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
