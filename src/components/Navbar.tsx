import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HeartPulse,
  Calendar,
  Search,
  User,
  LogOut,
  Menu,
  X,
  PhoneCall,
  LayoutDashboard
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    appointments,
    isLoggedIn,
    userName,
    logout,
    setAuthModalOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const upcomingCount = appointments.filter(
    (a) => a.status === 'confirmed' || a.status === 'rescheduled'
  ).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single element Brand Wordmark */}
          <button
            onClick={() => {
              navigateTo('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
              <HeartPulse className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 leading-tight">
                Medi<span className="text-blue-600">Book</span>
              </span>
              <span className="text-[10px] font-medium text-slate-600 tracking-wide">
                Healthcare Network India
              </span>
            </div>
          </button>

          {/* Zone 2: Clean 4-6 text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <button
              onClick={() => navigateTo('home')}
              className={`transition-colors cursor-pointer py-1 ${
                currentPage === 'home'
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('find-doctors')}
              className={`transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
                currentPage === 'find-doctors' || currentPage === 'doctor-profile'
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Search className="w-4 h-4 text-slate-400" />
              Find Doctors
            </button>
            <button
              onClick={() => navigateTo('my-appointments')}
              className={`transition-colors cursor-pointer py-1 flex items-center gap-2 ${
                currentPage === 'my-appointments'
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>My Appointments</span>
              {upcomingCount > 0 && (
                <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 tabular-nums">
                  {upcomingCount}
                </span>
              )}
            </button>
            <button
              onClick={() => navigateTo('dashboard')}
              className={`transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
                currentPage === 'dashboard'
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
              Patient Dashboard
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:108"
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200/60 transition-colors"
              title="24x7 National Ambulance & Emergency Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Emergency 108</span>
            </a>

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('dashboard')}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-colors text-xs font-medium text-slate-800"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    {userName.charAt(0)}
                  </div>
                  <span className="max-w-[110px] truncate">{userName}</span>
                </button>
                <button
                  onClick={logout}
                  className="p-2 text-slate-600 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-800 shadow-sm shadow-blue-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login / Sign Up</span>
              </button>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="grid gap-1">
            <button
              onClick={() => {
                navigateTo('home');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'home' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                navigateTo('find-doctors');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                currentPage === 'find-doctors' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
              }`}
            >
              <span>Find Doctors</span>
              <Search className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => {
                navigateTo('my-appointments');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                currentPage === 'my-appointments' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
              }`}
            >
              <span>My Appointments</span>
              {upcomingCount > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
                  {upcomingCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                navigateTo('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
              }`}
            >
              Patient Dashboard
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="tel:108"
              className="w-full text-center py-2 text-xs font-semibold text-rose-700 bg-rose-50 rounded-lg flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Emergency 108 Helpline</span>
            </a>
            {isLoggedIn ? (
              <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-800">{userName}</span>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-rose-600 font-semibold"
                >
                  Log out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-blue-600 rounded-lg"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
