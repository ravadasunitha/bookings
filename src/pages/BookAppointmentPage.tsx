import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DOCTORS } from '../data/mockData';
import {
  Calendar,
  Clock,
  User,
  Building2,
  Video,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  QrCode,
  Printer,
  Sparkles
} from 'lucide-react';
import { ConsultationType } from '../types';

export const BookAppointmentPage: React.FC = () => {
  const {
    selectedDoctor,
    selectedDoctorId,
    bookingConsultationType,
    bookAppointment,
    navigateTo,
    setActiveSlipAppointment,
    patient
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const [currentDoctorId, setCurrentDoctorId] = useState<string>(
    selectedDoctorId || DOCTORS[0].id
  );
  const [consultationType, setConsultationType] = useState<ConsultationType>(
    bookingConsultationType || 'in-clinic'
  );

  // Generate 10 upcoming days
  const upcomingDates = Array.from({ length: 10 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      iso: d.toISOString().split('T')[0],
      dayName: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(upcomingDates[0].iso);

  // Time slots categorized
  const timeSlots = {
    morning: ['09:15 AM', '10:00 AM', '10:45 AM', '11:30 AM'],
    afternoon: ['12:15 PM', '01:00 PM', '02:30 PM', '03:15 PM'],
    evening: ['04:00 PM', '04:45 PM', '05:30 PM', '06:15 PM', '07:00 PM']
  };

  const [selectedSlot, setSelectedSlot] = useState<string>('10:45 AM');

  // Patient Info Form State
  const [bookingFor, setBookingFor] = useState<'self' | 'other'>('self');
  const [patientName, setPatientName] = useState<string>(patient.name);
  const [patientAge, setPatientAge] = useState<number>(patient.age);
  const [patientGender, setPatientGender] = useState<'Male' | 'Female' | 'Other'>(patient.gender);
  const [patientPhone, setPatientPhone] = useState<string>(patient.phone);
  const [patientEmail, setPatientEmail] = useState<string>(patient.email);
  const [symptoms, setSymptoms] = useState<string>('General Consultation & Health Evaluation');
  const [medicalHistoryNote, setMedicalHistoryNote] = useState<string>('');

  // Payment method
  const [paymentOption, setPaymentOption] = useState<'online' | 'clinic'>('online');
  const [paymentMethodName, setPaymentMethodName] = useState<string>('UPI (Google Pay / PhonePe)');

  // Confirmed booking ref
  const [confirmedApt, setConfirmedApt] = useState<any>(null);

  const currentDoctor = DOCTORS.find((d) => d.id === currentDoctorId) || selectedDoctor || DOCTORS[0];

  const totalFee =
    consultationType === 'in-clinic'
      ? currentDoctor.consultationFee
      : currentDoctor.videoFee;

  const handleConfirmBooking = () => {
    const createdAppointment = bookAppointment({
      doctorId: currentDoctor.id,
      patientName: patientName || patient.name,
      patientAge: Number(patientAge) || 30,
      patientGender: patientGender,
      patientPhone: patientPhone || '+91 98765 43210',
      patientEmail: patientEmail || 'patient@example.com',
      date: selectedDate,
      timeSlot: selectedSlot,
      consultationType: consultationType,
      symptoms: symptoms + (medicalHistoryNote ? ` (${medicalHistoryNote})` : ''),
      totalFee: totalFee,
      paymentStatus: paymentOption === 'online' ? 'paid_online' : 'pay_at_clinic',
      paymentMethod: paymentOption === 'online' ? paymentMethodName : 'Pay at Hospital Reception'
    });

    setConfirmedApt(createdAppointment);
    setStep(6); // Step 6: Confirmation Screen
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header and Step Indicator */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Book Appointment
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Follow the quick 5-step booking flow to lock your consultation slot
            </p>
          </div>
          {step < 6 && (
            <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full self-start sm:self-auto">
              Step {step} of 5
            </div>
          )}
        </div>

        {/* Step Progression Tabs */}
        {step < 6 && (
          <div className="pt-4 grid grid-cols-5 gap-2 text-center text-xs font-medium">
            {[
              { num: 1, label: 'Doctor' },
              { num: 2, label: 'Date' },
              { num: 3, label: 'Time Slot' },
              { num: 4, label: 'Patient Info' },
              { num: 5, label: 'Confirm' }
            ].map((s) => (
              <div
                key={s.num}
                className={`py-2 px-1 rounded-xl transition-all ${
                  step === s.num
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : step > s.num
                    ? 'bg-blue-50 text-blue-800'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                <span className="hidden sm:inline">Step {s.num}: </span>
                {s.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Step 1: Doctor & Mode Selection */}
      {step === 1 && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-base font-bold text-slate-900">Step 1: Confirm Doctor & Mode</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review your selected specialist and preferred consultation format
            </p>
          </div>

          {/* Doctor Card Banner */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                <img
                  src={currentDoctor.photo}
                  alt={currentDoctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{currentDoctor.name}</h3>
                <p className="text-xs text-blue-700 font-semibold">
                  {currentDoctor.specialization} · {currentDoctor.hospital}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {currentDoctor.degrees} · {currentDoctor.experienceYears} Years Exp
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('find-doctors')}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline cursor-pointer self-end sm:self-auto"
            >
              Change Doctor
            </button>
          </div>

          {/* Consultation Mode */}
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Select Consultation Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setConsultationType('in-clinic')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  consultationType === 'in-clinic'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-600/20'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-sm">In-Clinic Hospital Visit</span>
                  </div>
                  <span className="font-bold font-mono text-slate-900 text-sm">
                    ₹{currentDoctor.consultationFee}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Direct physical consultation at {currentDoctor.hospital} ({currentDoctor.hospitalBranch}). Includes token pass.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setConsultationType('video')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  consultationType === 'video'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-600/20'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-indigo-600" />
                    <span className="font-bold text-sm">Online Video Call</span>
                  </div>
                  <span className="font-bold font-mono text-slate-900 text-sm">
                    ₹{currentDoctor.videoFee}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  HD secure video consultation with verified digital prescription sent to your email and dashboard.
                </p>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Continue to Select Date</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Date Selection */}
      {step === 2 && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-base font-bold text-slate-900">Step 2: Choose Appointment Date</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select your preferred day for consultation with {currentDoctor.name}
            </p>
          </div>

          {/* Date Selector Carousel Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {upcomingDates.map((d) => {
              const isSelected = selectedDate === d.iso;
              return (
                <button
                  key={d.iso}
                  type="button"
                  onClick={() => setSelectedDate(d.iso)}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                    isSelected
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/40'
                  }`}
                >
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider ${
                      isSelected ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    {d.dayName}
                  </span>
                  <span className="text-xl font-extrabold tabular-nums my-1">{d.dayNumber}</span>
                  <span className={`text-xs ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                    {d.monthName}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-blue-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              Selected Date: <strong>{selectedDate}</strong> (Slots available in morning & evening)
            </span>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Continue to Select Time</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Time Slot Selection */}
      {step === 3 && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-base font-bold text-slate-900">Step 3: Select Time Slot</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Available consultation windows on {selectedDate}
            </p>
          </div>

          {/* Morning Slots */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Morning Shift (09:00 AM - 12:00 PM)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {timeSlots.morning.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Afternoon Slots */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>Afternoon Shift (12:00 PM - 04:00 PM)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {timeSlots.afternoon.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Evening Slots */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>Evening Shift (04:00 PM - 08:00 PM)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {timeSlots.evening.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Continue to Patient Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Patient Details */}
      {step === 4 && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-base font-bold text-slate-900">Step 4: Enter Patient Details</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Provide medical recipient information for hospital registration & prescription slip
            </p>
          </div>

          {/* Toggle Self vs Family Member */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold max-w-sm">
            <button
              type="button"
              onClick={() => {
                setBookingFor('self');
                setPatientName(patient.name);
                setPatientAge(patient.age);
              }}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                bookingFor === 'self'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Booking for Self
            </button>
            <button
              type="button"
              onClick={() => {
                setBookingFor('other');
                setPatientName('');
                setPatientAge(25);
              }}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                bookingFor === 'other'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Booking for Family Member
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Patient Full Name *
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Rahul Verma"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Age *</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={120}
                  value={patientAge}
                  onChange={(e) => setPatientAge(Number(e.target.value))}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Gender *</label>
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value as any)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mobile Number (+91) *
              </label>
              <input
                type="tel"
                required
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address (For Slip & Reports) *
              </label>
              <input
                type="email"
                required
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Chief Symptoms or Reason for Consultation *
              </label>
              <input
                type="text"
                required
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g. Chest tightness, joint pain, routine health review, fever..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Medical History / Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={medicalHistoryNote}
                onChange={(e) => setMedicalHistoryNote(e.target.value)}
                placeholder="Any known allergies (e.g. Penicillin) or chronic conditions (Diabetes, Hypertension)..."
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (!patientName.trim()) {
                  alert('Please enter patient name');
                  return;
                }
                setStep(5);
              }}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Review & Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Review & Confirm Appointment */}
      {step === 5 && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-base font-bold text-slate-900">Step 5: Review & Confirm Appointment</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review appointment summary and choose payment mode
            </p>
          </div>

          {/* Booking Summary Box */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <div className="font-bold text-slate-900 text-sm">{currentDoctor.name}</div>
                <div className="text-blue-700 font-semibold">{currentDoctor.specialization}</div>
                <div className="text-slate-500">{currentDoctor.hospital}, {currentDoctor.hospitalBranch}</div>
              </div>
              <div className="text-right">
                <span className="font-bold uppercase text-[10px] text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                  {consultationType === 'in-clinic' ? 'In-Clinic Physical' : 'Digital Video'}
                </span>
                <div className="text-slate-700 font-bold mt-1">
                  {selectedDate} · {selectedSlot}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-600 pt-1">
              <div>
                <span className="text-[11px] text-slate-400 block">Patient</span>
                <span className="font-bold text-slate-800">{patientName}</span> ({patientAge}y, {patientGender})
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Phone</span>
                <span className="font-mono font-medium text-slate-800">{patientPhone}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Reason</span>
                <span className="text-slate-800 truncate block">{symptoms}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentOption('online')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  paymentOption === 'online'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-600/20'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>Instant Online Payment (UPI / Card / NetBanking)</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  100% Instant token confirmation + priority queue at hospital
                </p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentOption('clinic')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  paymentOption === 'clinic'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-600/20'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>Pay at Hospital Desk on Visit</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Pay via Cash, UPI, or Card at the hospital reception counter
                </p>
              </button>
            </div>
          </div>

          {/* Pricing Bill Breakdown */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Doctor Consultation Fee</span>
              <span className="font-mono font-bold text-slate-800">₹{totalFee}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="flex items-center gap-1">
                <span>MediBook Convenience Fee</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                  Waived
                </span>
              </span>
              <span className="font-mono text-emerald-600 font-bold">₹0</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Taxes & GST (Inclusive)</span>
              <span className="font-mono font-bold text-slate-800">₹0</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
              <span>Total Payable</span>
              <span className="font-mono text-lg text-blue-700">₹{totalFee}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(4)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={handleConfirmBooking}
              className="px-7 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Confirm & Lock Appointment</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Confirmation Screen */}
      {step === 6 && confirmedApt && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Booking Confirmed
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Appointment Successfully Scheduled!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Your consultation is locked. Confirmation SMS and booking slip have been dispatched to{' '}
              <strong className="text-slate-800">{confirmedApt.patientPhone}</strong>.
            </p>
          </div>

          {/* Pass Card preview */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 max-w-lg mx-auto text-left space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[11px] text-slate-400 block">Appointment ID</span>
                <span className="font-mono font-bold text-blue-700 text-sm">
                  {confirmedApt.id}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Total Amount</span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  ₹{confirmedApt.totalFee}
                </span>
              </div>
            </div>

            <div className="text-xs space-y-1">
              <div className="font-bold text-slate-900">{confirmedApt.doctor.name}</div>
              <div className="text-blue-700 font-medium">
                {confirmedApt.doctor.specialization} · {confirmedApt.doctor.hospital}
              </div>
              <div className="text-slate-600">
                Scheduled on <strong>{confirmedApt.date}</strong> at <strong>{confirmedApt.timeSlot}</strong>
              </div>
              <div className="text-slate-500 text-[11px]">
                {confirmedApt.consultationType === 'in-clinic'
                  ? `In-Clinic at ${confirmedApt.doctor.address}`
                  : 'Online Video Room (link active 15 mins prior)'}
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveSlipAppointment(confirmedApt)}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-blue-600" />
              <span>Download / Print Slip</span>
            </button>
            <button
              onClick={() => navigateTo('my-appointments')}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View in My Appointments</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('dashboard')}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl transition-colors cursor-pointer"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
