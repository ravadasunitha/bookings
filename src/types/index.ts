export type Page = 'home' | 'find-doctors' | 'doctor-profile' | 'book-appointment' | 'my-appointments' | 'dashboard' | 'login';

export type ConsultationType = 'in-clinic' | 'video';

export type AppointmentStatus = 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';

export interface Doctor {
  id: string;
  name: string;
  title: string;
  degrees: string;
  specialization: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  videoFee: number;
  availableToday: boolean;
  nextSlotTime: string;
  hospital: string;
  hospitalBranch: string;
  city: string;
  address: string;
  photo: string;
  gender: 'male' | 'female';
  languages: string[];
  about: string;
  services: string[];
  awards: string[];
  registrations: string;
  clinicTimings: {
    days: string;
    morning: string;
    evening: string;
  };
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  condition?: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctor: Doctor;
  patientName: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  patientPhone: string;
  patientEmail: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:30 AM"
  consultationType: ConsultationType;
  symptoms: string;
  status: AppointmentStatus;
  totalFee: number;
  paymentStatus: 'paid_online' | 'pay_at_clinic';
  paymentMethod: string;
  cancellationReason?: string;
  createdAt: string;
  notes?: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  city: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  allergies: string[];
  chronicConditions: string[];
}

export interface VitalSign {
  id: string;
  name: string;
  value: string;
  unit: string;
  status: 'normal' | 'attention' | 'optimal';
  recordedAt: string;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  diagnosis: string;
  medicines: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  instructions: string;
}

export interface FilterState {
  searchQuery: string;
  specialty: string;
  city: string;
  maxFee: number;
  availability: 'all' | 'today' | 'tomorrow';
  consultationType: 'all' | 'in-clinic' | 'video';
  minRating: number;
  gender: 'all' | 'male' | 'female';
  sortBy: 'recommended' | 'rating' | 'experience' | 'fee_low' | 'fee_high';
}
