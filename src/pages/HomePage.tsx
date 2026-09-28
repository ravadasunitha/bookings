import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DOCTORS, SPECIALTIES, CITIES, HERO_IMAGE_PATH, HOSPITAL_PARTNERS } from '../data/mockData';
import { DoctorCard } from '../components/DoctorCard';
import {
  Search,
  MapPin,
  Calendar,
  ShieldCheck,
  Award,
  Video,
  Building2,
  Clock,
  ArrowRight,
  HeartPulse,
  Brain,
  Bone,
  Baby,
  Stethoscope,
  Sparkles,
  UserCheck,
  Ear,
  Star,
  CheckCircle2
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, updateFilters, selectDoctorForBooking } = useApp();

  const [searchCity, setSearchCity] = useState('Bengaluru');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({
      city: searchCity,
      searchQuery: searchQuery,
      specialty: selectedSpecialty
    });
    navigateTo('find-doctors');
  };

  const handleSpecialtyClick = (specialtyName: string) => {
    updateFilters({
      specialty: specialtyName,
      searchQuery: ''
    });
    navigateTo('find-doctors');
  };

  const getSpecialtyIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-rose-600" />;
      case 'Brain': return <Brain className="w-6 h-6 text-indigo-600" />;
      case 'Bone': return <Bone className="w-6 h-6 text-amber-600" />;
      case 'Baby': return <Baby className="w-6 h-6 text-sky-600" />;
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-blue-600" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-purple-600" />;
      case 'UserCheck': return <UserCheck className="w-6 h-6 text-emerald-600" />;
      case 'Ear': return <Ear className="w-6 h-6 text-teal-600" />;
      default: return <Stethoscope className="w-6 h-6 text-blue-600" />;
    }
  };

  const featuredDoctors = DOCTORS.slice(0, 4);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-10 sm:pt-16 pb-12 sm:pb-20 border-b border-slate-200/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-800 bg-blue-100/70 px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>India’s Leading Healthcare Appointment Network</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Book Top Doctors & <br />
                <span className="text-blue-600">Hospitals In Minutes</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Connect with board-certified physicians, surgeons, and specialists at Apollo, Fortis,
                Max, and Manipal hospitals. Zero booking fees, instant confirmation slips.
              </p>

              {/* Instant Search Bar Card */}
              <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-xl shadow-blue-500/5 border border-slate-200/90 max-w-2xl">
                <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3">
                  {/* City Selector */}
                  <div className="sm:col-span-4 relative flex items-center">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                    <select
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      className="w-full text-xs font-medium text-slate-800 bg-slate-50 hover:bg-slate-100 pl-9 pr-7 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 cursor-pointer appearance-none"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Doctor or Specialty Search Input */}
                  <div className="sm:col-span-5 relative flex items-center">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Doctor name, specialty, hospital..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs text-slate-800 bg-slate-50 hover:bg-slate-100 pl-9 pr-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* CTA Submit Button */}
                  <div className="sm:col-span-3">
                    <button
                      type="submit"
                      className="w-full h-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Find Doctors</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>

                {/* Popular searches quick pills */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
                  <span className="text-[11px] font-medium text-slate-400">Popular:</span>
                  {['Cardiology', 'Pediatrics', 'Orthopedics', 'Dermatology'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleSpecialtyClick(tag)}
                      className="text-xs text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trust Metric Badges */}
              <div className="grid grid-cols-3 gap-4 pt-2 max-w-lg">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">15,000+</div>
                  <div className="text-xs text-slate-500 mt-0.5">Verified Doctors</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">120+</div>
                  <div className="text-xs text-slate-500 mt-0.5">Premier Hospitals</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">4.9 ★</div>
                  <div className="text-xs text-slate-500 mt-0.5">Patient Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img
                  src={HERO_IMAGE_PATH}
                  alt="Modern Consultation at MediBook Partner Hospital"
                  className="w-full h-[380px] sm:h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating Info Badge on image */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        Need Same-Day Clinical Care?
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Over 240+ verified specialists available today in Bengaluru & NCR
                      </div>
                    </div>
                    <button
                      onClick={() => navigateTo('find-doctors')}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shrink-0 cursor-pointer"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600">
              Clinical Departments
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Consult Top Specialists by Department
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select a clinical domain to view verified doctors, consultation fees, and available slots.
            </p>
          </div>
          <button
            onClick={() => navigateTo('find-doctors')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group cursor-pointer"
          >
            <span>Explore All 25+ Specialties</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SPECIALTIES.map((spec) => (
            <button
              key={spec.id}
              onClick={() => handleSpecialtyClick(spec.name)}
              className="text-left p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors mb-3">
                  {getSpecialtyIcon(spec.icon)}
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {spec.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {spec.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-medium">
                <span>View Doctors</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600">
              Verified Doctors
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Top Rated Senior Practitioners
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Consult with board-certified chiefs of departments and distinguished surgeons.
            </p>
          </div>
          <button
            onClick={() => navigateTo('find-doctors')}
            className="px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
          >
            View All Doctors
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredDoctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      </section>

      {/* How Booking Works */}
      <section className="bg-blue-50/70 border-y border-blue-100/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600">
              Seamless Healthcare Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              How Booking Works On MediBook
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Book a doctor consultation in under 2 minutes with guaranteed slot priority at hospital receptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-blue-200/60 shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-base flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Find Your Doctor</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filter by medical specialty, premier hospital network, city location, and patient reviews.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-blue-200/60 shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-base flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Pick Date & Time</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Select from real-time available morning, afternoon, or evening clinic and video consultation slots.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-blue-200/60 shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-base flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Enter Patient Info</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide patient details, primary symptoms, and optional past health records securely.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-blue-200/60 shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-base flex items-center justify-center mb-4">
                4
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Instant Pass & Confirmation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive instant confirmation with a QR booking pass for quick hospital reception verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Ways to Consult: In-Clinic vs Video */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: In-Clinic */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">In-Clinic Hospital Consultations</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Walk in with your digital MediBook pass. Skip the regular manual registration queues at top private hospitals.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Comprehensive physical clinical examination & diagnostics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>On-site ECG, blood collection & pharmacy fulfillment</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Priority token at hospital reception desks</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  updateFilters({ consultationType: 'in-clinic' });
                  navigateTo('find-doctors');
                }}
                className="w-full py-2.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer text-center"
              >
                Book Clinic Visit
              </button>
            </div>
          </div>

          {/* Card 2: Video Consult */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Online Telemedicine & Follow-ups</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Consult top specialists from home across India over secure HD encrypted video calls with digital e-prescriptions.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Instant verified digital prescription valid across all pharmacies</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Ideal for follow-ups, second opinions, and routine reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero travel fatigue for elderly patients and busy professionals</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  updateFilters({ consultationType: 'video' });
                  navigateTo('find-doctors');
                }}
                className="w-full py-2.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer text-center"
              >
                Book Video Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-wider font-bold text-blue-600">
            Real Patient Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Trusted by Thousands of Families Across India
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                “Booking an appointment for my mother with Dr. Rajesh Sharma at Apollo took less than 2 minutes. The digital pass allowed us to walk straight in without waiting in the billing queues.”
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                SK
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Sunil Krishnan</div>
                <div className="text-[11px] text-slate-500">Cardiology Patient · Bengaluru</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                “Dr. Ananya Reddy is amazing with kids! My son felt completely comfortable during his vaccination. Being able to access past digital prescriptions from the dashboard is super convenient.”
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center">
                PR
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Pooja Raghuram</div>
                <div className="text-[11px] text-slate-500">Pediatric Care · Bengaluru</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                “Consulted Dr. Arjun Mehta from Delhi via video call for my knee replacement second opinion. Thorough explanation and clear treatment roadmap. MediBook made healthcare truly accessible.”
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">
                VG
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Virendra Gupta</div>
                <div className="text-[11px] text-slate-500">Orthopedic Consult · New Delhi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl shadow-blue-600/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Book Your Next Consultation?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Find verified doctors across Bengaluru, New Delhi, Mumbai, Hyderabad, and Pune.
              Zero cancellation penalties when rescheduled 2 hours prior.
            </p>
          </div>
          <button
            onClick={() => navigateTo('find-doctors')}
            className="px-6 py-3.5 bg-white text-blue-700 hover:bg-blue-50 active:bg-blue-100 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer"
          >
            Find a Doctor Now
          </button>
        </div>
      </section>
    </div>
  );
};
