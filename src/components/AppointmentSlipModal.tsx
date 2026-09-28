import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Printer,
  Download,
  CheckCircle,
  Building2,
  Calendar,
  Clock,
  User,
  HeartPulse,
  ShieldCheck,
  QrCode
} from 'lucide-react';

export const AppointmentSlipModal: React.FC = () => {
  const { activeSlipAppointment, setActiveSlipAppointment, showToast } = useApp();

  if (!activeSlipAppointment) return null;

  const apt = activeSlipAppointment;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast('Appointment confirmation slip saved as PDF', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Modal Top Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              Official Booking Pass
            </span>
            <span className="text-xs font-mono text-slate-500">#{apt.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Print Booking Slip"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveSlipAppointment(null)}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Pass Container */}
        <div className="mt-4 pt-2">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-dashed border-slate-300 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Medi<span className="text-blue-600">Book</span> Health Slip
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                National Healthcare Appointment Confirmation & Verification Pass
              </p>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 bg-slate-100 rounded-lg border border-slate-200 flex flex-col items-center justify-center text-slate-400">
                <QrCode className="w-12 h-12 text-slate-700" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 block mt-1">Scan at Desk</span>
            </div>
          </div>

          {/* Appointment Key Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-slate-200 text-xs">
            <div>
              <div className="text-slate-600 text-[11px]">Appointment ID</div>
              <div className="font-mono font-bold text-blue-700">{apt.id}</div>
            </div>
            <div>
              <div className="text-slate-600 text-[11px]">Date & Time</div>
              <div className="font-bold text-slate-800 tabular-nums">
                {apt.date} · {apt.timeSlot}
              </div>
            </div>
            <div>
              <div className="text-slate-600 text-[11px]">Consultation Mode</div>
              <div className="font-bold text-slate-800 capitalize">
                {apt.consultationType === 'in-clinic' ? 'In-Clinic Physical' : 'Digital Video'}
              </div>
            </div>
            <div>
              <div className="text-slate-600 text-[11px]">Booking Status</div>
              <div className="font-bold text-emerald-600 capitalize flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{apt.status}</span>
              </div>
            </div>
          </div>

          {/* Doctor & Hospital Details */}
          <div className="py-4 border-b border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Practitioner & Clinic Location
            </h4>
            <div className="flex gap-3 items-start">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                <img
                  src={apt.doctor.photo}
                  alt={apt.doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs space-y-1">
                <div className="text-sm font-bold text-slate-900">{apt.doctor.name}</div>
                <div className="text-blue-700 font-medium">
                  {apt.doctor.specialization} · {apt.doctor.degrees}
                </div>
                <div className="text-slate-600 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{apt.doctor.hospital}, {apt.doctor.hospitalBranch}</span>
                </div>
                <div className="text-slate-600 text-[11px] leading-relaxed">
                  {apt.doctor.address}
                </div>
                <div className="text-slate-600 text-[11px]">
                  Registration: <span className="font-mono">{apt.doctor.registrations}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="py-4 border-b border-slate-200 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Patient Identification
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-600 block text-[11px]">Patient Name</span>
                <span className="font-bold text-slate-800">{apt.patientName}</span>
              </div>
              <div>
                <span className="text-slate-600 block text-[11px]">Age & Gender</span>
                <span className="font-semibold text-slate-800">{apt.patientAge} Years · {apt.patientGender}</span>
              </div>
              <div>
                <span className="text-slate-600 block text-[11px]">Phone Contact</span>
                <span className="font-mono font-medium text-slate-800">{apt.patientPhone}</span>
              </div>
              <div className="col-span-2 sm:col-span-3 pt-1 border-t border-slate-200">
                <span className="text-slate-600 block text-[11px]">Reported Chief Complaint</span>
                <span className="text-slate-700">{apt.symptoms || 'General Medical Consultation'}</span>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="py-4 border-b border-dashed border-slate-300 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-slate-900">Total Consultation Fee</div>
              <div className="text-[11px] text-slate-500">
                Payment Mode: {apt.paymentMethod} ({apt.paymentStatus === 'paid_online' ? 'Online Paid' : 'Pay at Reception'})
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-slate-900 tabular-nums">
                ₹{apt.totalFee}
              </div>
              <div className="text-[10px] text-emerald-600 font-semibold uppercase">
                {apt.paymentStatus === 'paid_online' ? 'Receipt Cleared' : 'Due at Clinic'}
              </div>
            </div>
          </div>

          {/* Patient Instructions */}
          <div className="mt-4 bg-blue-50/50 p-3.5 rounded-xl border border-blue-100 text-[11px] text-slate-600 space-y-1">
            <div className="font-semibold text-blue-900 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Important Hospital Guidelines</span>
            </div>
            <p>1. Please arrive 15 minutes prior to your time slot for biometric / desk registration.</p>
            <p>2. Carry previous discharge summaries, prescriptions, lab reports, and valid photo ID (Aadhaar / Voter ID).</p>
            <p>3. If booking is for video consultation, ensure stable high-speed WiFi and join 5 minutes early.</p>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 print:hidden">
          <button
            onClick={() => setActiveSlipAppointment(null)}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-500/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Slip</span>
          </button>
        </div>
      </div>
    </div>
  );
};
