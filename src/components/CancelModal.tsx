import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlertCircle, X, Check } from 'lucide-react';

export const CancelModal: React.FC = () => {
  const {
    activeCancelAppointment,
    setActiveCancelAppointment,
    cancelAppointment
  } = useApp();

  const reasons = [
    'Change of travel plans or out of town',
    'Symptoms resolved / feeling better',
    'Consulted another physician locally',
    'Timing conflict with office or personal emergency',
    'Want to book with a different specialist',
    'Financial or insurance reasons'
  ];

  const [selectedReason, setSelectedReason] = useState<string>(reasons[0]);
  const [customNote, setCustomNote] = useState<string>('');

  if (!activeCancelAppointment) return null;

  const handleConfirm = () => {
    const finalReason = customNote ? `${selectedReason} - ${customNote}` : selectedReason;
    cancelAppointment(activeCancelAppointment.id, finalReason);
    setActiveCancelAppointment(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-rose-600">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <h3 className="text-base font-bold text-slate-900">Cancel Appointment</h3>
          </div>
          <button
            onClick={() => setActiveCancelAppointment(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
          <div className="font-semibold text-slate-800">
            {activeCancelAppointment.doctor.name} ({activeCancelAppointment.doctor.specialization})
          </div>
          <div className="text-slate-500">
            Scheduled for {activeCancelAppointment.date} at {activeCancelAppointment.timeSlot}
          </div>
          <div className="text-slate-500 font-mono text-[11px]">
            Booking ID: {activeCancelAppointment.id}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Please help us understand why you are cancelling:
          </label>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {reasons.map((r) => {
              const isSelected = selectedReason === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedReason(r)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs font-medium border flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-rose-50/60 border-rose-300 text-rose-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate pr-2">{r}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-3">
          <input
            type="text"
            placeholder="Additional notes (optional)..."
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-rose-400"
          />
        </div>

        <p className="mt-3 text-[11px] text-slate-500 leading-normal">
          Note: If you paid online (₹{activeCancelAppointment.totalFee}), a full refund will be credited back to your original payment method within 2-4 business days.
        </p>

        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={() => setActiveCancelAppointment(null)}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Go Back
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-lg shadow-sm shadow-rose-500/20 transition-all cursor-pointer"
          >
            Confirm Cancellation
          </button>
        </div>
      </div>
    </div>
  );
};
