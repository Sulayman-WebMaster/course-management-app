import React from 'react'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-12">
        {/* Column 1: Logo + Slogan */}
        <div className="flex flex-col max-w-xs">
          <h1 className="sofia-regular text-3xl md:text-5xl">Shikhun</h1>
          <p className="text-sm leading-relaxed text-gray-400">
            Your trusted source for insightful articles and quality content delivered daily.
          </p>
        </div>

        {/* Column 2: Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:text-[#FE7743] transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FE7743] transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FE7743] transition">
                Blog
              </a>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex mt-8 space-x-6 text-gray-400">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition"
            >
              <FaFacebookF className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Column 3: More Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-6">Resources</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:text-[#FE7743] transition">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FE7743] transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FE7743] transition">
                Terms of Service
              </a>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex mt-8 space-x-6 text-gray-400">
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition"
            >
              <FaLinkedinIn className="w-6 h-6" />
            </a>
            <a
              href="https://github.com"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://youtube.com"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition"
            >
              <FaYoutube className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

