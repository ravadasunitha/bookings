import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppointmentStatus, Appointment } from '../types';
import {
  Calendar,
  Clock,
  Building2,
  Video,
  FileText,
  RotateCcw,
  XCircle,
  Video as VideoIcon,
  CheckCircle2,
  AlertCircle,
  Plus,
  ShieldCheck,
  Printer
} from 'lucide-react';

export const MyAppointmentsPage: React.FC = () => {
  const {
    appointments,
    navigateTo,
    setActiveRescheduleAppointment,
    setActiveCancelAppointment,
    setActiveSlipAppointment,
    setActiveVideoAppointment
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const filteredAppointments = appointments.filter((apt) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return apt.status === 'confirmed' || apt.status === 'rescheduled';
    if (activeTab === 'completed') return apt.status === 'completed';
    if (activeTab === 'cancelled') return apt.status === 'cancelled';
    return true;
  });

  const counts = {
    all: appointments.length,
    upcoming: appointments.filter((a) => a.status === 'confirmed' || a.status === 'rescheduled').length,
    completed: appointments.filter((a) => a.status === 'completed').length,
    cancelled: appointments.filter((a) => a.status === 'cancelled').length
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>Confirmed</span>
          </span>
        );
      case 'rescheduled':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            <RotateCcw className="w-3 h-3" />
            <span>Rescheduled</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>Completed</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
            <XCircle className="w-3 h-3" />
            <span>Cancelled</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            My Appointments
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your scheduled clinic visits, video consultations, and booking passes
          </p>
        </div>

        <button
          onClick={() => navigateTo('find-doctors')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Book New Doctor</span>
        </button>
      </div>

      {/* Segmented Status Tabs */}
      <div className="flex border-b border-slate-200 text-xs sm:text-sm font-semibold overflow-x-auto">
        {(['upcoming', 'completed', 'cancelled', 'all'] as const).map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 capitalize transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'text-blue-600 border-b-2 border-blue-600 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>{tab}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums font-bold ${
                  isSelected ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {counts[tab]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((apt) => {
            const isUpcoming = apt.status === 'confirmed' || apt.status === 'rescheduled';
            const isVideo = apt.consultationType === 'video';

            return (
              <div
                key={apt.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-4"
              >
                {/* Header Row: ID, Status, Type */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-700">{apt.id}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500">Booked for {apt.patientName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                        isVideo
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {isVideo ? <Video className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                      <span>{isVideo ? 'Video Call' : 'In-Clinic Visit'}</span>
                    </span>
                    {getStatusBadge(apt.status)}
                  </div>
                </div>

                {/* Doctor & Appointment Details */}
                <div className="flex flex-col sm:flex-row gap-4 items-start justify-between">
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <img
                        src={apt.doctor.photo}
                        alt={apt.doctor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-900">{apt.doctor.name}</h3>
                      <p className="text-xs font-semibold text-blue-700">
                        {apt.doctor.specialization} · {apt.doctor.hospital}
                      </p>
                      <p className="text-xs text-slate-500">{apt.doctor.hospitalBranch}, {apt.doctor.city}</p>
                      <p className="text-xs text-slate-600 pt-1">
                        Reason: <strong className="text-slate-800">{apt.symptoms}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Scheduled Date & Time box */}
                  <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3 text-xs space-y-1 min-w-[170px] self-stretch sm:self-auto text-left sm:text-right">
                    <div className="flex sm:justify-end items-center gap-1.5 font-bold text-blue-900">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>{apt.date}</span>
                    </div>
                    <div className="flex sm:justify-end items-center gap-1.5 text-slate-700 font-semibold tabular-nums">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{apt.timeSlot}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono pt-1">
                      Fee: ₹{apt.totalFee} ({apt.paymentStatus === 'paid_online' ? 'Paid' : 'Pay at Clinic'})
                    </div>
                  </div>
                </div>

                {/* Cancellation reason if cancelled */}
                {apt.status === 'cancelled' && apt.cancellationReason && (
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Cancellation Note: </span>
                      <span>{apt.cancellationReason}</span>
                    </div>
                  </div>
                )}

                {/* Interactive Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveSlipAppointment(apt)}
                      className="px-3 py-1.5 font-medium text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-500" />
                      <span>Medical Slip</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Video Consultation Room CTA */}
                    {isUpcoming && isVideo && (
                      <button
                        onClick={() => setActiveVideoAppointment(apt)}
                        className="px-3.5 py-1.5 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm shadow-indigo-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <VideoIcon className="w-3.5 h-3.5" />
                        <span>Join Video Room</span>
                      </button>
                    )}

                    {/* Reschedule Button */}
                    {isUpcoming && (
                      <button
                        onClick={() => setActiveRescheduleAppointment(apt)}
                        className="px-3 py-1.5 font-medium text-slate-700 hover:text-blue-700 bg-white border border-slate-200 hover:border-blue-300 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                        <span>Reschedule</span>
                      </button>
                    )}

                    {/* Cancel Button */}
                    {isUpcoming && (
                      <button
                        onClick={() => setActiveCancelAppointment(apt)}
                        className="px-3 py-1.5 font-medium text-rose-600 hover:text-rose-700 bg-white border border-rose-200 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5 text-rose-500" />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              No {activeTab} appointments found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You can easily search and book an appointment with verified doctors across India.
            </p>
            <button
              onClick={() => navigateTo('find-doctors')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Book an Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
