import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Clock, CheckCircle2 } from 'lucide-react';

export const RescheduleModal: React.FC = () => {
  const {
    activeRescheduleAppointment,
    setActiveRescheduleAppointment,
    rescheduleAppointment
  } = useApp();

  if (!activeRescheduleAppointment) return null;

  // Generate next 7 days starting from tomorrow
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      iso: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  const timeSlots = [
    '09:30 AM',
    '10:15 AM',
    '11:00 AM',
    '11:45 AM',
    '02:30 PM',
    '03:15 PM',
    '04:30 PM',
    '05:15 PM',
    '06:00 PM'
  ];

  const [selectedDate, setSelectedDate] = useState<string>(dates[0].iso);
  const [selectedSlot, setSelectedSlot] = useState<string>(timeSlots[2]);

  const handleConfirm = () => {
    rescheduleAppointment(activeRescheduleAppointment.id, selectedDate, selectedSlot);
    setActiveRescheduleAppointment(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Reschedule Appointment</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ref ID: <span className="font-mono text-blue-600 font-semibold">{activeRescheduleAppointment.id}</span>
            </p>
          </div>
          <button
            onClick={() => setActiveRescheduleAppointment(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Doctor Context */}
        <div className="mt-4 p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-blue-200 shrink-0">
            <img
              src={activeRescheduleAppointment.doctor.photo}
              alt={activeRescheduleAppointment.doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-slate-900 truncate">
              {activeRescheduleAppointment.doctor.name}
            </div>
            <div className="text-xs text-blue-700 font-medium">
              {activeRescheduleAppointment.doctor.specialization} · {activeRescheduleAppointment.doctor.hospital}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Current slot: {activeRescheduleAppointment.date} at {activeRescheduleAppointment.timeSlot}
            </div>
          </div>
        </div>

        {/* Date Selector */}
        <div className="mt-5">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>Select New Date</span>
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {dates.map((d) => {
              const isSelected = selectedDate === d.iso;
              return (
                <button
                  key={d.iso}
                  type="button"
                  onClick={() => setSelectedDate(d.iso)}
                  className={`flex flex-col items-center py-2 px-1 rounded-xl text-center border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-500/30'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/40'
                  }`}
                >
                  <span className={`text-[10px] uppercase font-semibold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {d.dayName}
                  </span>
                  <span className="text-base font-bold tabular-nums my-0.5">
                    {d.dayNumber}
                  </span>
                  <span className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                    {d.monthName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots */}
        <div className="mt-5">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Select New Time Slot</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => {
              const isSelected = selectedSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 border-blue-600 text-blue-700 ring-2 ring-blue-600/20'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setActiveRescheduleAppointment(null)}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Keep Original Time
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm shadow-blue-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirm Reschedule</span>
          </button>
        </div>
      </div>
    </div>
  );
};
