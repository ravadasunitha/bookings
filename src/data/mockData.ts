import { Doctor, PatientProfile, Appointment, Prescription, VitalSign } from '../types';

export const HERO_IMAGE_PATH = '/src/assets/images/medibook_hero_clinic_1790585701105.jpg';

export const CITIES = [
  'All Cities',
  'Bengaluru',
  'New Delhi',
  'Mumbai',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Kolkata'
];

export const SPECIALTIES = [
  { id: 'cardiology', name: 'Cardiology', icon: 'HeartPulse', desc: 'Heart care, ECG, hypertension & lipid disorders' },
  { id: 'neurology', name: 'Neurology', icon: 'Brain', desc: 'Brain, migraine, spine, neuropathy & stroke care' },
  { id: 'orthopedics', name: 'Orthopedics', icon: 'Bone', desc: 'Joint replacement, fracture & sports injury care' },
  { id: 'pediatrics', name: 'Pediatrics', icon: 'Baby', desc: 'Child health, infant nutrition & vaccination' },
  { id: 'general-medicine', name: 'General Medicine', icon: 'Stethoscope', desc: 'Fever, diabetes, infections & general health' },
  { id: 'dermatology', name: 'Dermatology', icon: 'Sparkles', desc: 'Skin, acne, hair fall, allergies & cosmetics' },
  { id: 'gynecology', name: 'Gynecology & Obstetrics', icon: 'UserCheck', desc: 'Women’s health, pregnancy & hormonal care' },
  { id: 'ent', name: 'ENT Specialist', icon: 'Ear', desc: 'Ear, nose, throat, sinusitis & hearing health' },
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Rajesh Sharma',
    title: 'Senior Interventional Cardiologist',
    degrees: 'MBBS, MD (Medicine), DM (Cardiology), FACC',
    specialization: 'Cardiology',
    experienceYears: 22,
    rating: 4.9,
    reviewCount: 428,
    consultationFee: 1200,
    videoFee: 900,
    availableToday: true,
    nextSlotTime: '04:30 PM',
    hospital: 'Apollo Hospitals',
    hospitalBranch: 'Bannerghatta Road',
    city: 'Bengaluru',
    address: '154/11, Opp. IIM-B, Bannerghatta Road, Bengaluru, Karnataka 560076',
    photo: '/src/assets/images/doc_rajesh_sharma_1790585716213.jpg',
    gender: 'male',
    languages: ['English', 'Hindi', 'Kannada'],
    about: 'Dr. Rajesh Sharma is a renowned Senior Interventional Cardiologist with over two decades of distinguished clinical practice. Having performed over 7,500 coronary angiographies and angioplasties, his expertise spans complex coronary interventions, heart failure management, and preventive cardiac wellness.',
    services: [
      'Coronary Angiography & Stenting',
      'Hypertension & Dyslipidemia Management',
      'Preventive Cardiac Risk Assessment',
      'Echocardiography (2D & 3D Echo)',
      'Pacemaker Implantation & Follow-up'
    ],
    awards: [
      'Lifetime Achievement Award - Cardiological Society of India (2023)',
      'Best Clinical Researcher in Interventional Cardiology - AIIMS Alumni'
    ],
    registrations: 'KMC-48291 (Karnataka Medical Council, 2004)',
    clinicTimings: {
      days: 'Monday to Saturday',
      morning: '09:30 AM - 01:00 PM',
      evening: '04:00 PM - 07:30 PM'
    }
  },
  {
    id: 'doc-2',
    name: 'Dr. Priya Nair',
    title: 'Senior Consultant Neurologist & Stroke Specialist',
    degrees: 'MBBS, MD (General Medicine), DM (Neurology), DNB',
    specialization: 'Neurology',
    experienceYears: 16,
    rating: 4.8,
    reviewCount: 362,
    consultationFee: 1100,
    videoFee: 850,
    availableToday: true,
    nextSlotTime: '05:15 PM',
    hospital: 'Fortis Hospital',
    hospitalBranch: 'Cunningham Road',
    city: 'Bengaluru',
    address: '14, Cunningham Rd, Vasanth Nagar, Bengaluru, Karnataka 560052',
    photo: '/src/assets/images/doc_priya_nair_1790585729191.jpg',
    gender: 'female',
    languages: ['English', 'Hindi', 'Malayalam', 'Tamil'],
    about: 'Dr. Priya Nair is a dedicated neurologist specializing in acute stroke interventions, chronic migraine therapies, epilepsy care, and neurodegenerative disorders. She is an active speaker at the Indian Academy of Neurology and heads the Comprehensive Stroke Clinic.',
    services: [
      'Comprehensive Stroke Rehabilitation',
      'Refractory Migraine & Cluster Headache Management',
      'Epilepsy & Seizure Disorders Care',
      'Neuropathy & Myasthenia Gravis Evaluation',
      'Parkinson\'s & Movement Disorder Guidance'
    ],
    awards: [
      'Gold Medalist in DM Neurology - NIMHANS',
      'Distinguished Young Neurologist Award (2021)'
    ],
    registrations: 'KMC-59312 (Karnataka Medical Council, 2010)',
    clinicTimings: {
      days: 'Monday to Friday',
      morning: '10:00 AM - 01:30 PM',
      evening: '04:30 PM - 08:00 PM'
    }
  },
  {
    id: 'doc-3',
    name: 'Dr. Arjun Mehta',
    title: 'Chief Joint Replacement & Arthroscopic Surgeon',
    degrees: 'MBBS, MS (Orthopaedics), MCh (Ortho, UK), Fellow AO Trauma',
    specialization: 'Orthopedics',
    experienceYears: 19,
    rating: 4.9,
    reviewCount: 512,
    consultationFee: 1300,
    videoFee: 950,
    availableToday: true,
    nextSlotTime: '03:45 PM',
    hospital: 'Max Super Speciality Hospital',
    hospitalBranch: 'Saket',
    city: 'New Delhi',
    address: '1, 2, Press Enclave Marg, Saket Institutional Area, New Delhi 110017',
    photo: '/src/assets/images/doc_arjun_mehta_1790585739536.jpg',
    gender: 'male',
    languages: ['English', 'Hindi', 'Punjabi'],
    about: 'Dr. Arjun Mehta is an internationally recognized orthopedic surgeon with specialized fellowship training in robotic knee and hip replacements from Leeds, UK. He has conducted more than 6,000 robotic joint reconstructions and sports ligament reconstructions.',
    services: [
      'Robotic Total Knee & Hip Replacement',
      'Sports Arthroscopy (ACL/PCL Reconstructions)',
      'Degenerative Osteoarthritis Therapy',
      'Complex Fracture & Trauma Surgery',
      'Spine Pain Management & Ergonomics'
    ],
    awards: [
      'Pioneer in Robotic Joint Reconstructions - North India Award (2024)',
      'Best Orthopedic Clinical Fellow - Leeds General Infirmary'
    ],
    registrations: 'DMC-23491 (Delhi Medical Council, 2007)',
    clinicTimings: {
      days: 'Monday to Saturday',
      morning: '09:00 AM - 12:30 PM',
      evening: '03:30 PM - 07:00 PM'
    }
  },
  {
    id: 'doc-4',
    name: 'Dr. Ananya Reddy',
    title: 'Senior Pediatrician & Neonatologist',
    degrees: 'MBBS, MD (Pediatrics), Fellowship in Neonatal Intensive Care',
    specialization: 'Pediatrics',
    experienceYears: 13,
    rating: 4.9,
    reviewCount: 489,
    consultationFee: 800,
    videoFee: 650,
    availableToday: true,
    nextSlotTime: '02:00 PM',
    hospital: 'Manipal Hospital',
    hospitalBranch: 'Old Airport Road',
    city: 'Bengaluru',
    address: '98, HAL Old Airport Rd, Kodihalli, Bengaluru, Karnataka 560017',
    photo: '/src/assets/images/doc_ananya_reddy_1790585752835.jpg',
    gender: 'female',
    languages: ['English', 'Hindi', 'Telugu', 'Kannada'],
    about: 'Dr. Ananya Reddy is a compassionate pediatrician loved by children and trusted by parents across South India. With deep expertise in child growth milestones, adolescent medicine, newborn intensive care, and vaccination regimes, she prioritizes gentle, evidence-based care.',
    services: [
      'Newborn & Infant Development Tracking',
      'Complete Pediatric Vaccination Schedule',
      'Childhood Asthma & Allergy Clinic',
      'Nutrition & Pediatric Growth Assessment',
      'Acute Childhood Fevers & Infections'
    ],
    awards: [
      'Best Pediatric Practitioner - Karnataka Health Summit (2022)',
      'Excellence in Neonatal Care - IAP'
    ],
    registrations: 'KMC-68420 (Karnataka Medical Council, 2013)',
    clinicTimings: {
      days: 'Monday to Saturday',
      morning: '10:00 AM - 02:00 PM',
      evening: '04:00 PM - 07:00 PM'
    }
  },
  {
    id: 'doc-5',
    name: 'Dr. Vikramaditya Sen',
    title: 'Principal Consultant - Internal Medicine & Diabetology',
    degrees: 'MBBS, MD (General Medicine), FRCP (Glasgow)',
    specialization: 'General Medicine',
    experienceYears: 24,
    rating: 4.8,
    reviewCount: 640,
    consultationFee: 900,
    videoFee: 700,
    availableToday: false,
    nextSlotTime: 'Tomorrow at 10:00 AM',
    hospital: 'Apollo Hospitals',
    hospitalBranch: 'Indraprastha',
    city: 'New Delhi',
    address: 'Sarita Vihar, Delhi Mathura Road, New Delhi 110076',
    photo: '/src/assets/images/doc_rajesh_sharma_1790585716213.jpg', // High-fidelity portrait
    gender: 'male',
    languages: ['English', 'Hindi', 'Bengali'],
    about: 'Dr. Vikramaditya Sen has treated over 45,000 patients with complex multi-system disorders, adult lifestyle diseases, chronic type-2 diabetes, infectious viral syndromes, and geriatric health concerns over his 24 years at premier tertiary hospitals.',
    services: [
      'Advanced Glycemic & Diabetes Care',
      'Tropical & Infectious Fevers (Dengue, Typhoid)',
      'Hypertension & Metabolic Syndrome',
      'Executive Comprehensive Health Check',
      'Geriatric Healthcare & Polypharmacy Review'
    ],
    awards: [
      'Distinguished Physician Citation - Association of Physicians of India',
      'Fellow of Royal College of Physicians (FRCP, Glasgow)'
    ],
    registrations: 'DMC-19842 (Delhi Medical Council, 2002)',
    clinicTimings: {
      days: 'Monday to Friday',
      morning: '09:00 AM - 01:00 PM',
      evening: '03:00 PM - 06:30 PM'
    }
  },
  {
    id: 'doc-6',
    name: 'Dr. Sunita Kulkarni',
    title: 'Senior Obstetrician, Gynecologist & Laparoscopic Surgeon',
    degrees: 'MBBS, MS (Obstetrics & Gynaecology), FICOG, DGO',
    specialization: 'Gynecology & Obstetrics',
    experienceYears: 17,
    rating: 4.9,
    reviewCount: 395,
    consultationFee: 1000,
    videoFee: 800,
    availableToday: true,
    nextSlotTime: '06:00 PM',
    hospital: 'Fortis Hospital',
    hospitalBranch: 'Mulund',
    city: 'Mumbai',
    address: 'Mulund Goregaon Link Rd, Industrial Area, Bhandup West, Mumbai 400078',
    photo: '/src/assets/images/doc_priya_nair_1790585729191.jpg',
    gender: 'female',
    languages: ['English', 'Hindi', 'Marathi', 'Gujarati'],
    about: 'Dr. Sunita Kulkarni is renowned for her empathetic approach to women\'s wellness across all life stages. She specializes in high-risk pregnancy management, PCOS & hormonal rebalancing, painless normal delivery counseling, and minimally invasive laparoscopic surgeries.',
    services: [
      'High-Risk Pregnancy & Antenatal Care',
      'PCOS, PCOD & Irregular Cycle Therapy',
      'Advanced Laparoscopic Gynae Surgery',
      'Menopause & Bone Density Counseling',
      'Pre-conceptional Counseling & Screenings'
    ],
    awards: [
      'Best Gynecological Surgeon - Maharashtra Medical Association (2023)',
      'Fellow of Indian College of Obstetricians and Gynaecologists'
    ],
    registrations: 'MMC-2009/04/1821 (Maharashtra Medical Council)',
    clinicTimings: {
      days: 'Monday to Saturday',
      morning: '10:30 AM - 02:00 PM',
      evening: '05:00 PM - 08:30 PM'
    }
  },
  {
    id: 'doc-7',
    name: 'Dr. Rohan Desai',
    title: 'Consultant Dermatologist, Dermatosurgeon & Aesthetic Specialist',
    degrees: 'MBBS, MD (Dermatology, Venereology & Leprosy), DVD',
    specialization: 'Dermatology',
    experienceYears: 12,
    rating: 4.7,
    reviewCount: 290,
    consultationFee: 850,
    videoFee: 650,
    availableToday: true,
    nextSlotTime: '01:30 PM',
    hospital: 'Apollo Hospitals',
    hospitalBranch: 'Jubilee Hills',
    city: 'Hyderabad',
    address: 'Road No. 72, Opp. Bharatiya Vidya Bhavan, Jubilee Hills, Hyderabad 500033',
    photo: '/src/assets/images/doc_arjun_mehta_1790585739536.jpg',
    gender: 'male',
    languages: ['English', 'Hindi', 'Telugu'],
    about: 'Dr. Rohan Desai combines clinical dermatology rigor with state-of-the-art aesthetic care. He treats stubborn acne, pigmentation, psoriasis, vitiligo, hair thinning (PRP therapy), and autoimmune dermatological conditions using global protocols.',
    services: [
      'Cystic Acne & Scar Revision Therapy',
      'PRP & Mesotherapy for Hair Restoration',
      'Eczema, Psoriasis & Chronic Allergies',
      'Laser Skin Rejuvenation & Pigmentation',
      'Mole Mapping & Skin Cancer Screenings'
    ],
    awards: [
      'Young Dermatologist of the Year - IADVL Telangana',
      'Best Clinical Paper in Trichology (2020)'
    ],
    registrations: 'TSMC-39102 (Telangana State Medical Council, 2014)',
    clinicTimings: {
      days: 'Tuesday to Sunday',
      morning: '10:00 AM - 01:30 PM',
      evening: '04:00 PM - 07:30 PM'
    }
  },
  {
    id: 'doc-8',
    name: 'Dr. Meera Nambiar',
    title: 'Senior ENT Specialist & Cochlear Implant Surgeon',
    degrees: 'MBBS, MS (ENT), DNB (Otorhinolaryngology), FICS',
    specialization: 'ENT Specialist',
    experienceYears: 15,
    rating: 4.8,
    reviewCount: 310,
    consultationFee: 950,
    videoFee: 750,
    availableToday: true,
    nextSlotTime: '04:15 PM',
    hospital: 'Aster CMI Hospital',
    hospitalBranch: 'Hebbal',
    city: 'Bengaluru',
    address: 'No. 43/42, NH 44, Sahakar Nagar, Hebbal, Bengaluru, Karnataka 560092',
    photo: '/src/assets/images/doc_ananya_reddy_1790585752835.jpg',
    gender: 'female',
    languages: ['English', 'Hindi', 'Malayalam', 'Kannada'],
    about: 'Dr. Meera Nambiar brings extensive surgical experience in microscopic ear surgeries, endoscopic sinus surgery (FESS), voice restoration, and snoring/sleep apnea management. She has helped hundreds of pediatric and adult patients recover full sensory health.',
    services: [
      'Functional Endoscopic Sinus Surgery (FESS)',
      'Tympanoplasty & Mastoid Micro-Surgery',
      'Snoring & Obstructive Sleep Apnea Clinic',
      'Allergy, Rhinitis & Voice Disorder Treatment',
      'Pediatric Adenoid & Tonsil Care'
    ],
    awards: [
      'Award for Excellence in Otology - Association of Otolaryngologists of India',
      'Senior Surgical Fellow - Royal College of Surgeons, Edinburgh'
    ],
    registrations: 'KMC-54019 (Karnataka Medical Council, 2011)',
    clinicTimings: {
      days: 'Monday to Saturday',
      morning: '09:30 AM - 01:00 PM',
      evening: '03:30 PM - 06:30 PM'
    }
  }
];

export const INITIAL_PATIENT: PatientProfile = {
  id: 'pat-101',
  name: 'Rahul Verma',
  email: 'rahul.verma@example.com',
  phone: '+91 98765 43210',
  age: 32,
  gender: 'Male',
  bloodGroup: 'O+',
  city: 'Bengaluru',
  emergencyContact: {
    name: 'Sneha Verma',
    relation: 'Spouse',
    phone: '+91 98765 88990'
  },
  allergies: ['Penicillin', 'Sulfa Drugs'],
  chronicConditions: ['Mild Asthma', 'Seasonal Rhinitis']
};

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'MDB-2026-8941',
    doctorId: 'doc-1',
    doctor: DOCTORS[0],
    patientName: 'Rahul Verma',
    patientAge: 32,
    patientGender: 'Male',
    patientPhone: '+91 98765 43210',
    patientEmail: 'rahul.verma@example.com',
    date: '2026-10-02',
    timeSlot: '11:00 AM',
    consultationType: 'in-clinic',
    symptoms: 'Mild chest tightness after running, routine annual cardiac ECG checkup',
    status: 'confirmed',
    totalFee: 1200,
    paymentStatus: 'paid_online',
    paymentMethod: 'UPI (Google Pay)',
    createdAt: '2026-09-27T10:14:00Z',
    notes: 'Please bring previous lipid panel and ECG reports if available.'
  },
  {
    id: 'MDB-2026-7412',
    doctorId: 'doc-2',
    doctor: DOCTORS[1],
    patientName: 'Rahul Verma',
    patientAge: 32,
    patientGender: 'Male',
    patientPhone: '+91 98765 43210',
    patientEmail: 'rahul.verma@example.com',
    date: '2026-10-05',
    timeSlot: '05:30 PM',
    consultationType: 'video',
    symptoms: 'Frequent morning tension headaches and neck stiffness after screen work',
    status: 'confirmed',
    totalFee: 850,
    paymentStatus: 'paid_online',
    paymentMethod: 'Credit Card (HDFC Bank)',
    createdAt: '2026-09-26T14:30:00Z',
    notes: 'Video room link will activate 15 minutes before the session.'
  },
  {
    id: 'MDB-2026-6109',
    doctorId: 'doc-4',
    doctor: DOCTORS[3],
    patientName: 'Aarav Verma (Son)',
    patientAge: 5,
    patientGender: 'Male',
    patientPhone: '+91 98765 43210',
    patientEmail: 'rahul.verma@example.com',
    date: '2026-09-15',
    timeSlot: '10:30 AM',
    consultationType: 'in-clinic',
    symptoms: 'Annual pediatric booster vaccine & growth milestone assessment',
    status: 'completed',
    totalFee: 800,
    paymentStatus: 'paid_online',
    paymentMethod: 'UPI (PhonePe)',
    createdAt: '2026-09-12T09:00:00Z',
    notes: 'Booster dose administered successfully. Next checkup due September 2027.'
  }
];

export const INITIAL_VITALS: VitalSign[] = [
  { id: 'v-1', name: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'optimal', recordedAt: '2 days ago' },
  { id: 'v-2', name: 'Resting Heart Rate', value: '72', unit: 'bpm', status: 'normal', recordedAt: 'Today, 8:00 AM' },
  { id: 'v-3', name: 'Blood Oxygen (SpO2)', value: '99', unit: '%', status: 'optimal', recordedAt: 'Today, 8:00 AM' },
  { id: 'v-4', name: 'Body Weight', value: '71.5', unit: 'kg', status: 'normal', recordedAt: 'Last week' },
  { id: 'v-5', name: 'Fasting Blood Sugar', value: '94', unit: 'mg/dL', status: 'optimal', recordedAt: '15 Sep 2026' }
];

export const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'RX-2026-4421',
    appointmentId: 'MDB-2026-6109',
    doctorName: 'Dr. Ananya Reddy',
    doctorSpecialty: 'Pediatrics',
    date: '15 Sep 2026',
    diagnosis: 'Routine Pediatric Wellness & Immunization Booster',
    medicines: [
      { name: 'Multivitamin Pediatric Syrup', dosage: '5 ml', frequency: 'Once daily after breakfast', duration: '30 days' },
      { name: 'Vitamin D3 Drops (400 IU)', dosage: '4 drops', frequency: 'Daily with milk', duration: '60 days' }
    ],
    instructions: 'Normal healthy growth parameters. Adequate hydration and outdoor physical activity advised.'
  },
  {
    id: 'RX-2026-3108',
    appointmentId: 'MDB-2026-5501',
    doctorName: 'Dr. Vikramaditya Sen',
    doctorSpecialty: 'General Medicine',
    date: '10 Aug 2026',
    diagnosis: 'Acute Viral Rhinitis & Seasonal Bronchospasm',
    medicines: [
      { name: 'Montelukast + Levocetirizine (10/5 mg)', dosage: '1 tablet', frequency: 'At bedtime', duration: '7 days' },
      { name: 'Fluticasone Propionate Nasal Spray', dosage: '1 spray per nostril', frequency: 'Twice daily', duration: '14 days' },
      { name: 'Paracetamol 650 mg', dosage: '1 tablet', frequency: 'As needed for fever > 100°F', duration: '3 days' }
    ],
    instructions: 'Avoid cold beverages, steam inhalation twice a day. Follow up if fever persists beyond 3 days.'
  }
];

export const DOCTOR_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Sunil Krishnan',
    rating: 5,
    date: '24 Sep 2026',
    comment: 'Dr. Rajesh Sharma is exceptional. He patiently answered all my questions regarding my stent and adjusted my medication smoothly. The clinic staff at Apollo was very prompt.',
    verified: true,
    condition: 'Cardiac Evaluation'
  },
  {
    id: 'rev-2',
    author: 'Meenakshi Sundaram',
    rating: 5,
    date: '18 Sep 2026',
    comment: 'Very thorough clinical diagnosis. Dr. Sharma did not prescribe unnecessary tests. Highly recommended for any heart-related consultation.',
    verified: true,
    condition: 'High Blood Pressure'
  },
  {
    id: 'rev-3',
    author: 'Amitabh Bansal',
    rating: 4.8,
    date: '05 Sep 2026',
    comment: 'Doctor is extremely knowledgeable and reassuring. Booking through MediBook was seamless and didn\'t have to wait more than 10 minutes at the hospital desk.',
    verified: true,
    condition: 'Preventive Health Check'
  }
];

export const HOSPITAL_PARTNERS = [
  { name: 'Apollo Hospitals', logo: '🏥', tag: 'Accredited JCI & NABH', locations: 'Bengaluru, Delhi, Hyderabad, Chennai' },
  { name: 'Fortis Healthcare', logo: '🏥', tag: 'Super Speciality Centers', locations: 'Mumbai, Delhi NCR, Bengaluru' },
  { name: 'Max Healthcare', logo: '🏥', tag: 'Excellence in Tertiary Care', locations: 'Delhi NCR, Dehradun, Mohali' },
  { name: 'Manipal Hospitals', logo: '🏥', tag: 'Leading Hospital Network', locations: 'Bengaluru, Goa, Jaipur, Mangaluru' },
  { name: 'Aster CMI Hospital', logo: '🏥', tag: 'Quaternary Healthcare', locations: 'Bengaluru, Kochi, Calicut' },
  { name: 'Narayana Health', logo: '🏥', tag: 'Affordable World-Class Care', locations: 'Bengaluru, Kolkata, Ahmedabad' }
];
