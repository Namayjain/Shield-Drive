"use client";

import { useState } from "react";
import { Shield, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-700 flex items-center justify-center shadow-sm">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="font-bold text-xl md:text-2xl text-slate-900 tracking-tight">ShieldDrive</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <span className="text-sm font-medium text-slate-600 hover:text-blue-700 cursor-pointer transition-colors">Insurance Products</span>
            <span className="text-sm font-medium text-slate-600 hover:text-blue-700 cursor-pointer transition-colors">Claims</span>
            <span className="text-sm font-medium text-slate-600 hover:text-blue-700 cursor-pointer transition-colors">About Us</span>
            <div className="flex items-center gap-2 text-sm font-bold text-blue-700 bg-blue-50 px-4 py-2 rounded-full">
              <span>Support:</span>
              <span>1-800-555-0199</span>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <>
          {/* Background overlay to capture outside clicks */}
          <div 
            className="md:hidden fixed inset-0 top-[64px] z-40 bg-slate-900/20 backdrop-blur-sm" 
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl z-50 rounded-b-2xl">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <div className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-blue-700 hover:bg-slate-50 rounded-md cursor-pointer transition-colors" onClick={() => setIsMenuOpen(false)}>Insurance Products</div>
              <div className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-blue-700 hover:bg-slate-50 rounded-md cursor-pointer transition-colors" onClick={() => setIsMenuOpen(false)}>Claims</div>
              <div className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-blue-700 hover:bg-slate-50 rounded-md cursor-pointer transition-colors" onClick={() => setIsMenuOpen(false)}>About Us</div>
              <div className="mt-4 px-3 py-4 text-sm font-bold text-blue-700 bg-blue-50 rounded-lg flex items-center justify-between shadow-sm">
                <span>Customer Support:</span>
                <span>1-800-555-0199</span>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
