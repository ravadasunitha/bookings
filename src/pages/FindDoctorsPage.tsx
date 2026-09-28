import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DOCTORS, CITIES, SPECIALTIES } from '../data/mockData';
import { DoctorCard } from '../components/DoctorCard';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Check,
  Star,
  MapPin,
  Building2,
  Calendar,
  Video,
  X
} from 'lucide-react';

export const FindDoctorsPage: React.FC = () => {
  const { filterState, updateFilters, resetFilters } = useApp();

  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      // Search query (doctor name, specialty, hospital, degrees)
      if (filterState.searchQuery.trim()) {
        const query = filterState.searchQuery.toLowerCase();
        const matchesQuery =
          doc.name.toLowerCase().includes(query) ||
          doc.specialization.toLowerCase().includes(query) ||
          doc.hospital.toLowerCase().includes(query) ||
          doc.hospitalBranch.toLowerCase().includes(query) ||
          doc.degrees.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Specialty filter
      if (filterState.specialty !== 'all') {
        if (
          !doc.specialization.toLowerCase().includes(filterState.specialty.toLowerCase()) &&
          !filterState.specialty.toLowerCase().includes(doc.specialization.toLowerCase())
        ) {
          return false;
        }
      }

      // City filter
      if (filterState.city !== 'All Cities') {
        if (doc.city.toLowerCase() !== filterState.city.toLowerCase()) {
          return false;
        }
      }

      // Availability filter
      if (filterState.availability === 'today' && !doc.availableToday) {
        return false;
      }

      // Consultation Type
      if (filterState.consultationType === 'video' && !doc.videoFee) {
        return false;
      }

      // Max Fee
      if (doc.consultationFee > filterState.maxFee) {
        return false;
      }

      // Min Rating
      if (filterState.minRating > 0 && doc.rating < filterState.minRating) {
        return false;
      }

      // Gender
      if (filterState.gender !== 'all' && doc.gender !== filterState.gender) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'rating') return b.rating - a.rating;
      if (filterState.sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (filterState.sortBy === 'fee_low') return a.consultationFee - b.consultationFee;
      if (filterState.sortBy === 'fee_high') return b.consultationFee - a.consultationFee;
      return 0; // recommended default
    });
  }, [filterState]);

  const hasActiveFilters =
    filterState.searchQuery !== '' ||
    filterState.specialty !== 'all' ||
    filterState.city !== 'All Cities' ||
    filterState.availability !== 'all' ||
    filterState.consultationType !== 'all' ||
    filterState.minRating > 0 ||
    filterState.gender !== 'all' ||
    filterState.maxFee < 2000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header & Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Find & Book Verified Doctors
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Instant appointment confirmations at top NABH accredited hospital networks
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-slate-500">Sort by:</span>
            <select
              value={filterState.sortBy}
              onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
              className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-600 cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Highest Rated</option>
              <option value="experience">Most Experienced</option>
              <option value="fee_low">Fee: Low to High</option>
              <option value="fee_high">Fee: High to Low</option>
            </select>
          </div>
        </div>

        {/* Global Search and City Quick Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-slate-100">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by doctor name, medical specialization, hospital or symptoms..."
              value={filterState.searchQuery}
              onChange={(e) => updateFilters({ searchQuery: e.target.value })}
              className="w-full text-xs text-slate-900 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 transition-colors"
            />
            {filterState.searchQuery && (
              <button
                onClick={() => updateFilters({ searchQuery: '' })}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="sm:col-span-4 relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <select
              value={filterState.city}
              onChange={(e) => updateFilters({ city: e.target.value })}
              className="w-full text-xs font-medium text-slate-800 pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 cursor-pointer appearance-none"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100 text-xs">
            <span className="text-[11px] font-semibold text-slate-400">Active filters:</span>
            {filterState.specialty !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-medium text-xs border border-blue-200">
                Specialty: {filterState.specialty}
                <button
                  onClick={() => updateFilters({ specialty: 'all' })}
                  className="hover:text-blue-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterState.city !== 'All Cities' && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-medium text-xs border border-blue-200">
                City: {filterState.city}
                <button
                  onClick={() => updateFilters({ city: 'All Cities' })}
                  className="hover:text-blue-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterState.availability === 'today' && (
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-medium text-xs border border-emerald-200">
                Available Today
                <button
                  onClick={() => updateFilters({ availability: 'all' })}
                  className="hover:text-emerald-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterState.consultationType !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-medium text-xs border border-indigo-200">
                Mode: {filterState.consultationType === 'in-clinic' ? 'In-Clinic' : 'Video Call'}
                <button
                  onClick={() => updateFilters({ consultationType: 'all' })}
                  className="hover:text-indigo-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterState.minRating > 0 && (
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-medium text-xs border border-amber-200">
                ★ {filterState.minRating}+
                <button
                  onClick={() => updateFilters({ minRating: 0 })}
                  className="hover:text-amber-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterState.maxFee < 2000 && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium text-xs border border-slate-200">
                Max Fee: ₹{filterState.maxFee}
                <button
                  onClick={() => updateFilters({ maxFee: 2000 })}
                  className="hover:text-slate-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 hover:underline ml-auto flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Sidebar Filters + Doctor Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>Filter Doctors</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-blue-600 hover:underline font-semibold cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          {/* Specialty Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-2">Specialty</label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                type="button"
                onClick={() => updateFilters({ specialty: 'all' })}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                  filterState.specialty === 'all'
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>All Specialties</span>
                {filterState.specialty === 'all' && <Check className="w-3.5 h-3.5 text-blue-600" />}
              </button>
              {SPECIALTIES.map((spec) => {
                const isSelected = filterState.specialty.toLowerCase() === spec.name.toLowerCase();
                return (
                  <button
                    key={spec.id}
                    type="button"
                    onClick={() => updateFilters({ specialty: spec.name })}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate">{spec.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Availability */}
          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-900 mb-2">Availability</label>
            <div className="space-y-1.5 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="radio"
                  name="availability"
                  checked={filterState.availability === 'all'}
                  onChange={() => updateFilters({ availability: 'all' })}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Any Day</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="radio"
                  name="availability"
                  checked={filterState.availability === 'today'}
                  onChange={() => updateFilters({ availability: 'today' })}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-emerald-700 font-semibold">Available Today</span>
              </label>
            </div>
          </div>

          {/* Consultation Mode */}
          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-900 mb-2">Consultation Mode</label>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
              <button
                type="button"
                onClick={() => updateFilters({ consultationType: 'all' })}
                className={`py-1.5 rounded-md transition-all cursor-pointer ${
                  filterState.consultationType === 'all'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Modes
              </button>
              <button
                type="button"
                onClick={() => updateFilters({ consultationType: 'video' })}
                className={`py-1.5 rounded-md transition-all cursor-pointer ${
                  filterState.consultationType === 'video'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Video Only
              </button>
            </div>
          </div>

          {/* Max Consultation Fee Slider */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs mb-2">
              <label className="font-bold text-slate-900">Max Fee</label>
              <span className="font-mono font-bold text-blue-700 tabular-nums">
                ₹{filterState.maxFee}
              </span>
            </div>
            <input
              type="range"
              min={600}
              max={2000}
              step={100}
              value={filterState.maxFee}
              onChange={(e) => updateFilters({ maxFee: Number(e.target.value) })}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>₹600</span>
              <span>₹1,300</span>
              <span>₹2,000+</span>
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-900 mb-2">Patient Rating</label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {[0, 4.5, 4.8].map((score) => {
                const isSelected = filterState.minRating === score;
                return (
                  <button
                    key={score}
                    type="button"
                    onClick={() => updateFilters({ minRating: score })}
                    className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {score === 0 ? 'Any' : `${score}+ ★`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Doctor Gender */}
          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-900 mb-2">Doctor Gender</label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {(['all', 'male', 'female'] as const).map((g) => {
                const isSelected = filterState.gender === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => updateFilters({ gender: g })}
                    className={`py-1.5 px-2 rounded-lg border capitalize text-center font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Doctor Cards List */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing <strong className="text-slate-900 tabular-nums">{filteredDoctors.length}</strong>{' '}
              verified doctors
            </span>
          </div>

          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredDoctors.map((doc) => (
                <DoctorCard key={doc.id} doctor={doc} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                No doctors found matching your filters
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try expanding your search query, increasing max consultation fee, or selecting 'All Cities'.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
