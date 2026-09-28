import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  User,
  Stethoscope,
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, login, showToast } = useApp();

  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [phone, setPhone] = useState('9876543210');
  const [name, setName] = useState('Rahul Verma');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');

  if (!authModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'warning');
      return;
    }
    setOtpStep(true);
    setOtp('5284'); // Pre-fill mock OTP for smooth verification
    showToast('OTP sent to +91 ' + phone + ' (Code: 5284)', 'info');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '5284' || otp.length === 4) {
      const displayName = role === 'doctor' ? 'Dr. Rajesh Sharma' : name || 'Rahul Verma';
      login(role, displayName);
      setOtpStep(false);
    } else {
      showToast('Please enter the 4-digit OTP (5284)', 'warning');
    }
  };

  const handleQuickPatient = () => {
    login('patient', 'Rahul Verma');
  };

  const handleQuickDoctor = () => {
    login('doctor', 'Dr. Rajesh Sharma');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {mode === 'login' ? 'Welcome to MediBook' : 'Create Your Health Account'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Secure access to appointments & medical history
            </p>
          </div>
          <button
            onClick={() => {
              setAuthModalOpen(false);
              setOtpStep(false);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Toggle */}
        <div className="mt-4 grid grid-cols-2 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setRole('patient');
              setName('Rahul Verma');
            }}
            className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              role === 'patient'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>I am a Patient</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setRole('doctor');
              setName('Dr. Rajesh Sharma');
            }}
            className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              role === 'doctor'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>I am a Doctor</span>
          </button>
        </div>

        {/* 1-Click Quick Demo Login Pill */}
        <div className="mt-4 p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
          <div className="text-[11px] font-semibold text-blue-900 uppercase tracking-wider mb-2 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Instant Demo Profile</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickPatient}
              className="py-1.5 px-2 bg-white border border-blue-200 hover:border-blue-400 text-blue-700 font-semibold rounded-lg text-xs text-center transition-colors cursor-pointer"
            >
              Sign in as Patient
            </button>
            <button
              type="button"
              onClick={handleQuickDoctor}
              className="py-1.5 px-2 bg-white border border-blue-200 hover:border-blue-400 text-blue-700 font-semibold rounded-lg text-xs text-center transition-colors cursor-pointer"
            >
              Sign in as Doctor
            </button>
          </div>
        </div>

        <div className="relative my-4 flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-2 text-[10px] uppercase font-semibold text-slate-600 absolute">
            Or with Mobile / OTP
          </span>
        </div>

        {!otpStep ? (
          <form onSubmit={handleSendOtp} className="space-y-3">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Number (+91)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-xs font-semibold text-slate-500">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-xs pl-11 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-sm shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Get Verification OTP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-3">
            <div className="text-center">
              <span className="text-xs text-slate-600">Enter the 4-digit code sent to</span>
              <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">+91 {phone}</div>
            </div>

            <div>
              <input
                type="text"
                required
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="5284"
                className="w-full text-center text-xl font-mono tracking-widest py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 font-bold"
              />
              <span className="block text-[11px] text-center text-slate-400 mt-1">
                Demo code: <span className="font-mono font-bold text-blue-600">5284</span>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-sm shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify & Continue</span>
            </button>

            <button
              type="button"
              onClick={() => setOtpStep(false)}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-medium py-1"
            >
              Change Mobile Number
            </button>
          </form>
        )}

        <div className="mt-4 pt-3 border-t border-slate-100 text-center text-xs text-slate-600">
          {mode === 'login' ? (
            <span>
              New to MediBook?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Create Account
              </button>
            </span>
          ) : (
            <span>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Log In
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
