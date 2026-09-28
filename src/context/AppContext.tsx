import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Page,
  Doctor,
  Appointment,
  PatientProfile,
  FilterState,
  VitalSign,
  Prescription,
  ConsultationType
} from '../types';
import {
  DOCTORS,
  INITIAL_PATIENT,
  INITIAL_APPOINTMENTS,
  INITIAL_VITALS,
  INITIAL_PRESCRIPTIONS
} from '../data/mockData';

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  specialty: 'all',
  city: 'All Cities',
  maxFee: 2000,
  availability: 'all',
  consultationType: 'all',
  minRating: 0,
  gender: 'all',
  sortBy: 'recommended'
};

interface AppContextType {
  currentPage: Page;
  selectedDoctorId: string | null;
  selectedDoctor: Doctor | null;
  bookingConsultationType: ConsultationType;
  appointments: Appointment[];
  patient: PatientProfile;
  vitals: VitalSign[];
  prescriptions: Prescription[];
  filterState: FilterState;
  isLoggedIn: boolean;
  userRole: 'patient' | 'doctor';
  userName: string;
  toast: { message: string; type: 'success' | 'info' | 'warning' } | null;

  // Active Modals state
  activeVideoAppointment: Appointment | null;
  activeSlipAppointment: Appointment | null;
  activeRescheduleAppointment: Appointment | null;
  activeCancelAppointment: Appointment | null;
  authModalOpen: boolean;

  // Navigation & Actions
  navigateTo: (page: Page, doctorId?: string) => void;
  selectDoctorForBooking: (doctorId: string, type?: ConsultationType) => void;
  bookAppointment: (apt: {
    doctorId: string;
    patientName: string;
    patientAge: number;
    patientGender: 'Male' | 'Female' | 'Other';
    patientPhone: string;
    patientEmail: string;
    date: string;
    timeSlot: string;
    consultationType: ConsultationType;
    symptoms: string;
    totalFee: number;
    paymentStatus: 'paid_online' | 'pay_at_clinic';
    paymentMethod: string;
    notes?: string;
  }) => Appointment;
  rescheduleAppointment: (appointmentId: string, newDate: string, newTime: string) => boolean;
  cancelAppointment: (appointmentId: string, reason: string) => boolean;
  addVitalSign: (name: string, value: string, unit: string) => void;
  updateFilters: (partial: Partial<FilterState>) => void;
  resetFilters: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  hideToast: () => void;
  login: (role: 'patient' | 'doctor', name: string) => void;
  logout: () => void;
  setAuthModalOpen: (open: boolean) => void;
  setActiveVideoAppointment: (apt: Appointment | null) => void;
  setActiveSlipAppointment: (apt: Appointment | null) => void;
  setActiveRescheduleAppointment: (apt: Appointment | null) => void;
  setActiveCancelAppointment: (apt: Appointment | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>('doc-1');
  const [bookingConsultationType, setBookingConsultationType] = useState<ConsultationType>('in-clinic');
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTERS);

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('medibook_auth') === 'true';
  });
  const [userRole, setUserRole] = useState<'patient' | 'doctor'>('patient');
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('medibook_username') || 'Rahul Verma';
  });
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  // Modals
  const [activeVideoAppointment, setActiveVideoAppointment] = useState<Appointment | null>(null);
  const [activeSlipAppointment, setActiveSlipAppointment] = useState<Appointment | null>(null);
  const [activeRescheduleAppointment, setActiveRescheduleAppointment] = useState<Appointment | null>(null);
  const [activeCancelAppointment, setActiveCancelAppointment] = useState<Appointment | null>(null);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Appointments in LocalStorage
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('medibook_appointments');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_APPOINTMENTS;
  });

  const [patient] = useState<PatientProfile>(INITIAL_PATIENT);
  const [vitals, setVitals] = useState<VitalSign[]>(INITIAL_VITALS);
  const [prescriptions] = useState<Prescription[]>(INITIAL_PRESCRIPTIONS);

  useEffect(() => {
    try {
      localStorage.setItem('medibook_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.error(e);
    }
  }, [appointments]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const hideToast = () => setToast(null);

  const selectedDoctor = DOCTORS.find((d) => d.id === selectedDoctorId) || DOCTORS[0];

  const navigateTo = (page: Page, doctorId?: string) => {
    if (doctorId) {
      setSelectedDoctorId(doctorId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectDoctorForBooking = (doctorId: string, type: ConsultationType = 'in-clinic') => {
    setSelectedDoctorId(doctorId);
    setBookingConsultationType(type);
    setCurrentPage('book-appointment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bookAppointment = (aptData: {
    doctorId: string;
    patientName: string;
    patientAge: number;
    patientGender: 'Male' | 'Female' | 'Other';
    patientPhone: string;
    patientEmail: string;
    date: string;
    timeSlot: string;
    consultationType: ConsultationType;
    symptoms: string;
    totalFee: number;
    paymentStatus: 'paid_online' | 'pay_at_clinic';
    paymentMethod: string;
    notes?: string;
  }): Appointment => {
    const doc = DOCTORS.find((d) => d.id === aptData.doctorId) || selectedDoctor;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newAppointment: Appointment = {
      ...aptData,
      id: `MDB-2026-${randomSuffix}`,
      doctor: doc,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    showToast(`Appointment confirmed with ${doc.name} on ${newAppointment.date}!`, 'success');
    return newAppointment;
  };

  const rescheduleAppointment = (appointmentId: string, newDate: string, newTime: string): boolean => {
    let updated = false;
    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id === appointmentId) {
          updated = true;
          return {
            ...apt,
            date: newDate,
            timeSlot: newTime,
            status: 'rescheduled'
          };
        }
        return apt;
      })
    );
    if (updated) {
      showToast(`Appointment rescheduled to ${newDate} at ${newTime}`, 'success');
    }
    return updated;
  };

  const cancelAppointment = (appointmentId: string, reason: string): boolean => {
    let updated = false;
    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id === appointmentId) {
          updated = true;
          return {
            ...apt,
            status: 'cancelled',
            cancellationReason: reason
          };
        }
        return apt;
      })
    );
    if (updated) {
      showToast('Appointment cancelled successfully', 'info');
    }
    return updated;
  };

  const addVitalSign = (name: string, value: string, unit: string) => {
    const newVital: VitalSign = {
      id: `v-${Date.now()}`,
      name,
      value,
      unit,
      status: 'normal',
      recordedAt: 'Just now'
    };
    setVitals((prev) => [newVital, ...prev]);
    showToast(`Logged vital sign: ${name} (${value} ${unit})`, 'success');
  };

  const updateFilters = (partial: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...partial }));
  };

  const resetFilters = () => {
    setFilterState(DEFAULT_FILTERS);
  };

  const login = (role: 'patient' | 'doctor', name: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(name);
    localStorage.setItem('medibook_auth', 'true');
    localStorage.setItem('medibook_username', name);
    setAuthModalOpen(false);
    showToast(`Logged in successfully as ${name}`, 'success');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('medibook_auth');
    localStorage.removeItem('medibook_username');
    showToast('You have been logged out', 'info');
    setCurrentPage('home');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        selectedDoctorId,
        selectedDoctor,
        bookingConsultationType,
        appointments,
        patient,
        vitals,
        prescriptions,
        filterState,
        isLoggedIn,
        userRole,
        userName,
        toast,
        activeVideoAppointment,
        activeSlipAppointment,
        activeRescheduleAppointment,
        activeCancelAppointment,
        authModalOpen,
        navigateTo,
        selectDoctorForBooking,
        bookAppointment,
        rescheduleAppointment,
        cancelAppointment,
        addVitalSign,
        updateFilters,
        resetFilters,
        showToast,
        hideToast,
        login,
        logout,
        setAuthModalOpen,
        setActiveVideoAppointment,
        setActiveSlipAppointment,
        setActiveRescheduleAppointment,
        setActiveCancelAppointment
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
