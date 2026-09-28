import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DOCTORS } from '../data/mockData';
import {
  User,
  HeartPulse,
  Activity,
  Calendar,
  FileText,
  Clock,
  Plus,
  ShieldCheck,
  Video,
  Building2,
  Printer,
  ChevronRight,
  ArrowRight,
  PhoneCall,
  Pill,
  Droplet
} from 'lucide-react';

export const PatientDashboardPage: React.FC = () => {
  const {
    patient,
    appointments,
    vitals,
    prescriptions,
    addVitalSign,
    navigateTo,
    setActiveSlipAppointment,
    setActiveRescheduleAppointment,
    setActiveVideoAppointment,
    selectDoctorForBooking,
    showToast
  } = useApp();

  const [vitalName, setVitalName] = useState('Blood Pressure');
  const [vitalValue, setVitalValue] = useState('122/82');
  const [vitalUnit, setVitalUnit] = useState('mmHg');
  const [showVitalModal, setShowVitalModal] = useState(false);

  const upcomingAppointments = appointments.filter(
    (a) => a.status === 'confirmed' || a.status === 'rescheduled'
  );
  const nextAppointment = upcomingAppointments[0];

  const handleSaveVital = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vitalValue.trim()) return;
    addVitalSign(vitalName, vitalValue.trim(), vitalUnit);
    setShowVitalModal(false);
  };

  const handleDownloadPrescription = (rxId: string) => {
    showToast(`Prescription ${rxId} downloaded as digital PDF`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Patient Profile Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-blue-500/20">
              {patient.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {patient.name}
                </h1>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  ID: {patient.id}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {patient.age} Yrs · {patient.gender} · Blood Group: <strong className="text-rose-600">{patient.bloodGroup}</strong> · {patient.city}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-600 pt-1 flex-wrap">
                <span>Emergency: {patient.emergencyContact.name} ({patient.emergencyContact.relation}, {patient.emergencyContact.phone})</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('find-doctors')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Book Consultation</span>
            </button>
            <a
              href="tel:108"
              className="px-3.5 py-2.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Emergency 108</span>
            </a>
          </div>
        </div>

        {/* Known Allergies & Chronic Conditions */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">Allergies:</span>
            <span className="text-slate-500">{patient.allergies.join(', ')}</span>
          </div>
          <span className="text-slate-300">·</span>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">Chronic Conditions:</span>
            <span className="text-slate-500">{patient.chronicConditions.join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Upcoming Visits</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
            {upcomingAppointments.length}
          </div>
          <button
            onClick={() => navigateTo('my-appointments')}
            className="text-[11px] font-bold text-blue-600 hover:underline mt-2 text-left cursor-pointer"
          >
            Manage Bookings →
          </button>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Completed Visits</span>
            <Building2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
            {appointments.filter((a) => a.status === 'completed').length}
          </div>
          <span className="text-[11px] text-slate-400 mt-2">Past hospital consultations</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Prescriptions</span>
            <FileText className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
            {prescriptions.length}
          </div>
          <span className="text-[11px] text-slate-400 mt-2">Digital verified Rx files</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Vitals Tracked</span>
            <Activity className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
            {vitals.length}
          </div>
          <button
            onClick={() => setShowVitalModal(true)}
            className="text-[11px] font-bold text-blue-600 hover:underline mt-2 text-left cursor-pointer"
          >
            + Log New Reading
          </button>
        </div>
      </div>

      {/* Next Upcoming Appointment Focus Banner */}
      {nextAppointment && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-7 text-white shadow-xl shadow-blue-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white/20 border-2 border-white/40 shrink-0">
              <img
                src={nextAppointment.doctor.photo}
                alt={nextAppointment.doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 border border-white/30 text-white">
                  Next Scheduled Appointment
                </span>
                <span className="text-xs font-mono text-blue-100">#{nextAppointment.id}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold">{nextAppointment.doctor.name}</h3>
              <p className="text-xs text-blue-100 font-medium">
                {nextAppointment.doctor.specialization} · {nextAppointment.doctor.hospital}
              </p>
              <div className="flex items-center gap-3 text-xs text-white/90 pt-1">
                <span className="flex items-center gap-1 font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  {nextAppointment.date}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  {nextAppointment.timeSlot}
                </span>
                <span>·</span>
                <span className="capitalize">
                  {nextAppointment.consultationType === 'in-clinic' ? 'In-Clinic' : 'Video Room'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap self-end md:self-auto">
            {nextAppointment.consultationType === 'video' && (
              <button
                onClick={() => setActiveVideoAppointment(nextAppointment)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Join Video Room</span>
              </button>
            )}
            <button
              onClick={() => setActiveSlipAppointment(nextAppointment)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Pass Slip</span>
            </button>
            <button
              onClick={() => setActiveRescheduleAppointment(nextAppointment)}
              className="px-4 py-2 bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Reschedule
            </button>
          </div>
        </div>
      )}

      {/* Main Two-Column Section: Vitals Tracker + Recent Digital Prescriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Vitals Tracker */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Patient Vital Signs
              </h3>
            </div>
            <button
              onClick={() => setShowVitalModal(true)}
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Log Reading</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {vitals.map((v) => (
              <div
                key={v.id}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1"
              >
                <div className="text-[11px] font-semibold text-slate-500">{v.name}</div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                    {v.value}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{v.unit}</span>
                </div>
                <div className="text-[10px] text-slate-400">{v.recordedAt}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Prescriptions & Medical Records */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Digital Prescriptions & Records
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {prescriptions.length} Records Available
            </span>
          </div>

          <div className="space-y-3">
            {prescriptions.map((rx) => (
              <div
                key={rx.id}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">{rx.doctorName}</span>
                    <span className="text-slate-400 text-[11px] ml-2">({rx.doctorSpecialty})</span>
                  </div>
                  <span className="text-slate-400 text-[11px] font-mono">{rx.date}</span>
                </div>

                <div className="text-blue-700 font-semibold">
                  Diagnosis: {rx.diagnosis}
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500">Medicines Prescribed:</span>
                  {rx.medicines.map((med, mIdx) => (
                    <div key={mIdx} className="flex justify-between text-slate-700 text-[11px]">
                      <span>
                        • <strong>{med.name}</strong> ({med.dosage})
                      </span>
                      <span className="text-slate-500 font-mono">{med.frequency}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 italic truncate max-w-[260px]">
                    "{rx.instructions}"
                  </span>
                  <button
                    onClick={() => handleDownloadPrescription(rx.id)}
                    className="font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Saved / Favorite Doctors Quick Booking */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Quick Consult with Preferred Specialists
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              One-click slot reservation with doctors you frequently consult
            </p>
          </div>
          <button
            onClick={() => navigateTo('find-doctors')}
            className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            Browse All Doctors →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DOCTORS.slice(0, 3).map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between gap-3 bg-slate-50/50"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                  <img src={doc.photo} alt={doc.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{doc.name}</h4>
                  <p className="text-[11px] text-blue-700 truncate">{doc.specialization}</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">₹{doc.consultationFee}</p>
                </div>
              </div>
              <button
                onClick={() => selectDoctorForBooking(doc.id, 'in-clinic')}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-xs transition-colors shrink-0 cursor-pointer"
              >
                Book
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Log Vital Modal */}
      {showVitalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">Log Health Reading</h3>
            <p className="text-xs text-slate-500 mb-4">
              Track blood pressure, sugar, heart rate, or oxygen level
            </p>

            <form onSubmit={handleSaveVital} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Vital Sign</label>
                <select
                  value={vitalName}
                  onChange={(e) => {
                    setVitalName(e.target.value);
                    if (e.target.value === 'Blood Pressure') {
                      setVitalUnit('mmHg');
                      setVitalValue('120/80');
                    } else if (e.target.value === 'Heart Rate') {
                      setVitalUnit('bpm');
                      setVitalValue('74');
                    } else if (e.target.value === 'Blood Oxygen') {
                      setVitalUnit('%');
                      setVitalValue('99');
                    } else if (e.target.value === 'Blood Sugar') {
                      setVitalUnit('mg/dL');
                      setVitalValue('95');
                    }
                  }}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 bg-white"
                >
                  <option value="Blood Pressure">Blood Pressure</option>
                  <option value="Heart Rate">Heart Rate</option>
                  <option value="Blood Oxygen">Blood Oxygen (SpO2)</option>
                  <option value="Blood Sugar">Blood Sugar (Fasting)</option>
                  <option value="Body Weight">Body Weight</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Reading</label>
                  <input
                    type="text"
                    required
                    value={vitalValue}
                    onChange={(e) => setVitalValue(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Unit</label>
                  <input
                    type="text"
                    required
                    value={vitalUnit}
                    onChange={(e) => setVitalUnit(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowVitalModal(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
                >
                  Save Reading
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
