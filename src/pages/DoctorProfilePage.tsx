import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DOCTOR_REVIEWS } from '../data/mockData';
import {
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  Building2,
  CalendarCheck,
  Award,
  Video,
  Languages,
  CheckCircle2,
  FileBadge,
  ThumbsUp,
  ArrowLeft,
  Share2
} from 'lucide-react';

export const DoctorProfilePage: React.FC = () => {
  const { selectedDoctor, navigateTo, selectDoctorForBooking, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'reviews' | 'location'>('overview');
  const [selectedConsultationType, setSelectedConsultationType] = useState<'in-clinic' | 'video'>('in-clinic');

  if (!selectedDoctor) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-600 mb-4">No doctor selected.</p>
        <button
          onClick={() => navigateTo('find-doctors')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
        >
          Browse Doctors
        </button>
      </div>
    );
  }

  const doc = selectedDoctor;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Doctor profile link copied to clipboard', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('find-doctors')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Doctor Directory</span>
        </button>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Profile</span>
        </button>
      </div>

      {/* Doctor Header Banner Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {/* Doctor Portrait */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 shadow-xs">
              <img
                src={doc.photo}
                alt={doc.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                doc.availableToday ? 'bg-emerald-500' : 'bg-slate-400'
              }`}
              title={doc.availableToday ? 'Available Today' : 'Available Tomorrow'}
            />
          </div>

          {/* Profile Details */}
          <div className="flex-1 min-w-0 space-y-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {doc.name}
                </h1>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>MCI Verified</span>
                </span>
              </div>
              <p className="text-sm font-semibold text-blue-700 mt-1">{doc.title}</p>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{doc.degrees}</p>
            </div>

            {/* Unboxed Metadata */}
            <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap">
              <span className="font-semibold text-slate-900">{doc.specialization}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>{doc.experienceYears} Years Clinical Experience</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <div className="flex items-center gap-1 text-amber-600 font-medium">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span className="font-bold text-slate-900 tabular-nums">{doc.rating}</span>
                <span className="text-slate-500">({doc.reviewCount} verified patient reviews)</span>
              </div>
            </div>

            {/* Hospital Affiliation & Registration */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  <strong>{doc.hospital}</strong> ({doc.hospitalBranch}, {doc.city})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Speaks: {doc.languages.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-emerald-700 font-medium">
                  {doc.availableToday ? `Available Today · Next Slot ${doc.nextSlotTime}` : `Next Slot: ${doc.nextSlotTime}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FileBadge className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Reg: {doc.registrations}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Tabs Content + Fast Booking Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Tabbed Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tabs Bar */}
          <div className="flex border-b border-slate-200 text-xs sm:text-sm font-semibold overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-4 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Overview & Bio
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`py-3 px-4 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'services'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Treatments & Services
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-3 px-4 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'reviews'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Patient Reviews ({doc.reviewCount})
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`py-3 px-4 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'location'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Clinic Timings & Location
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
                  About {doc.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {doc.about}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Awards & Honors</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {doc.awards.map((award, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
                  Clinic Consultation Timings
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                    <span className="font-semibold text-slate-800 block">Working Days</span>
                    <span className="text-slate-600 mt-0.5 block">{doc.clinicTimings.days}</span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                    <span className="font-semibold text-slate-800 block">Consultation Shifts</span>
                    <span className="text-slate-600 mt-0.5 block">
                      Morning: {doc.clinicTimings.morning} <br />
                      Evening: {doc.clinicTimings.evening}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Services */}
          {activeTab === 'services' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-1">
                Clinical Procedures & Sub-Specializations
              </h3>
              <p className="text-xs text-slate-500">
                Services provided by {doc.name} at {doc.hospital}:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {doc.services.map((srv, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-blue-50/40 border border-blue-100 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-800">{srv}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                      {doc.rating}
                    </span>
                    <div>
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs text-slate-500">
                        Based on {doc.reviewCount} verified ratings
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-semibold self-start sm:self-auto">
                  98% Patients Recommend This Doctor
                </div>
              </div>

              {/* Review Cards */}
              <div className="space-y-4">
                {DOCTOR_REVIEWS.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{rev.author}</span>
                        {rev.verified && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full font-medium">
                            Verified Patient
                          </span>
                        )}
                      </div>
                      <span className="text-slate-400 text-[11px]">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(rev.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                      {rev.condition && (
                        <span className="text-slate-500 text-[11px] ml-2">
                          Consulted for: <strong>{rev.condition}</strong>
                        </span>
                      )}
                    </div>
                    <p className="text-slate-700 leading-relaxed">{rev.comment}</p>
                    <div className="flex items-center gap-2 pt-1 text-slate-400 text-[11px]">
                      <button className="flex items-center gap-1 hover:text-slate-600 cursor-pointer">
                        <ThumbsUp className="w-3 h-3" />
                        <span>Helpful</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Location */}
          {activeTab === 'location' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Hospital Address & Map Location
              </h3>
              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-bold text-slate-900 text-sm">
                    {doc.hospital} ({doc.hospitalBranch})
                  </div>
                  <div className="text-slate-600 leading-relaxed">{doc.address}</div>
                  <div className="text-blue-600 font-semibold pt-1">
                    Landmark: Near Main OPD Block, Ground Floor
                  </div>
                </div>
              </div>

              {/* Simulated Map Visual */}
              <div className="h-48 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-slate-400 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-50/40 pattern-grid opacity-60" />
                <div className="relative z-10 text-center space-y-1">
                  <MapPin className="w-8 h-8 text-rose-600 mx-auto animate-bounce" />
                  <span className="text-xs font-bold text-slate-800 block">
                    {doc.hospital}, {doc.city}
                  </span>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(doc.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Instant Booking Card */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-white rounded-2xl p-6 border-2 border-blue-500/20 shadow-lg shadow-blue-500/5 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Schedule Consultation
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Book an Appointment</h3>
              <p className="text-xs text-slate-500 mt-0.5">Instant booking with slot confirmation</p>
            </div>

            {/* Mode selection toggle */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Consultation Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedConsultationType('in-clinic')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedConsultationType === 'in-clinic'
                      ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-600/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-blue-600 mb-1" />
                  <div className="text-xs font-bold">In-Clinic Visit</div>
                  <div className="text-xs font-mono font-bold text-slate-900 mt-0.5 tabular-nums">
                    ₹{doc.consultationFee}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedConsultationType('video')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedConsultationType === 'video'
                      ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-600/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Video className="w-4 h-4 text-indigo-600 mb-1" />
                  <div className="text-xs font-bold">Video Consult</div>
                  <div className="text-xs font-mono font-bold text-slate-900 mt-0.5 tabular-nums">
                    ₹{doc.videoFee}
                  </div>
                </button>
              </div>
            </div>

            {/* Availability status badge */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2.5 text-xs text-emerald-800">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-semibold">
                  {doc.availableToday ? 'Slots Available Today' : 'Available Tomorrow'}
                </span>
                <div className="text-[11px] text-emerald-600">
                  Fastest consultation token at {doc.nextSlotTime}
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => selectDoctorForBooking(doc.id, selectedConsultationType)}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Select Date & Time Slot</span>
            </button>

            <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero cancellation fee up to 2 hrs before slot</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
