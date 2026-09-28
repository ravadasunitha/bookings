import React, { useState } from 'react';
import { Doctor } from '../types';
import { useApp } from '../context/AppContext';
import {
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  Video,
  Building2,
  CalendarCheck
} from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
  compact?: boolean;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, compact = false }) => {
  const { navigateTo, selectDoctorForBooking } = useApp();
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between group">
      <div>
        {/* Top Info Row */}
        <div className="flex gap-4 items-start">
          {/* Doctor Photo */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              {imgError ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50 text-blue-700 font-bold text-xl">
                  {doctor.name.split(' ').map((n) => n[0]).join('')}
                </div>
              ) : (
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
            {/* Status indicator dot */}
            <div
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                doctor.availableToday ? 'bg-emerald-500' : 'bg-slate-400'
              }`}
              title={doctor.availableToday ? 'Available Today' : 'Next Available Tomorrow'}
            />
          </div>

          {/* Core Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3
                onClick={() => navigateTo('doctor-profile', doctor.id)}
                className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer truncate"
              >
                {doctor.name}
              </h3>
              <span title="Verified Medical Practitioner (MCI/State Council)">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              </span>
            </div>

            <p className="text-xs font-medium text-blue-700 mt-0.5">
              {doctor.title}
            </p>

            <p className="text-xs text-slate-600 truncate mt-0.5">
              {doctor.degrees}
            </p>

            {/* Unboxed Metadata with subtle separators */}
            <div className="flex items-center gap-2 text-xs text-slate-600 mt-2 flex-wrap">
              <span className="font-semibold text-slate-800">{doctor.specialization}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>{doctor.experienceYears} yrs experience</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <div className="flex items-center gap-1 text-amber-600 font-medium">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span className="font-bold text-slate-800 tabular-nums">{doctor.rating}</span>
                <span className="text-slate-600">({doctor.reviewCount})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hospital & Location Details */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-2 truncate">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium text-slate-800">{doctor.hospital}</span>
            <span className="text-slate-600 truncate">({doctor.hospitalBranch}, {doctor.city})</span>
          </div>

          <div className="flex items-center gap-2 text-emerald-700 font-medium">
            <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              {doctor.availableToday
                ? `Available Today · Next Slot ${doctor.nextSlotTime}`
                : `Next slot: ${doctor.nextSlotTime}`}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Fee & Action Row */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-[11px] text-slate-600">Consultation Fee</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-slate-900 tabular-nums">
              ₹{doctor.consultationFee}
            </span>
            <span className="text-[11px] text-slate-600 font-normal">
              (Clinic) · ₹{doctor.videoFee} (Video)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigateTo('doctor-profile', doctor.id)}
            className="px-3 py-2 text-xs font-medium text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            View Profile
          </button>
          <button
            onClick={() => selectDoctorForBooking(doctor.id, 'in-clinic')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors shadow-sm shadow-blue-500/20 whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Book Visit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
