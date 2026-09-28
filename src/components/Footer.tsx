import React from 'react';
import { useApp } from '../context/AppContext';
import { HeartPulse, ShieldCheck, Clock, MapPin, Award } from 'lucide-react';
import { HOSPITAL_PARTNERS } from '../data/mockData';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hospital Partner Badges */}
        <div className="pb-12 border-b border-slate-800">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-6 text-center">
            Integrated With India’s Premier Hospital Networks & Super Speciality Centers
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {HOSPITAL_PARTNERS.map((hosp, idx) => (
              <div
                key={idx}
                className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60 flex flex-col items-center text-center justify-center hover:border-blue-500/40 transition-colors"
              >
                <div className="text-xl mb-1">{hosp.logo}</div>
                <div className="text-xs font-semibold text-white">{hosp.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{hosp.tag}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12 border-b border-slate-800">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Medi<span className="text-blue-400">Book</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              India’s trusted digital healthcare network connecting patients with board-certified
              doctors across 25+ specializations at verified clinics and hospitals.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>NABH Verified</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-blue-400" />
                <span>100% Verified Doctors</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-4">
              Specialties
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => navigateTo('find-doctors')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Cardiologists & Heart Specialists
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('find-doctors')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Orthopedic & Joint Surgeons
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('find-doctors')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Neurologists & Stroke Specialists
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('find-doctors')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Pediatricians & Child Health
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('find-doctors')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Dermatologists & Hair Specialists
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('find-doctors')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Gynecology & Obstetricians
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-4">
              Patient Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => navigateTo('find-doctors')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Book In-Clinic Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('find-doctors')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Online Video Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('my-appointments')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Reschedule / Cancel Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('dashboard')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Download Medical Slips & Prescriptions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('dashboard')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Vitals & Health Tracking
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-4">
              National Health Helpline
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Emergency Services</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Ambulance: 108 · National: 112</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Covered Cities</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Bengaluru, New Delhi, Mumbai, Hyderabad, Pune, Chennai
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} MediBook Healthcare Technologies Pvt Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>Doctor Code of Conduct</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
