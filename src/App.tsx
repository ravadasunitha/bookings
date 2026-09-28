/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { FindDoctorsPage } from './pages/FindDoctorsPage';
import { DoctorProfilePage } from './pages/DoctorProfilePage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { MyAppointmentsPage } from './pages/MyAppointmentsPage';
import { PatientDashboardPage } from './pages/PatientDashboardPage';
import { RescheduleModal } from './components/RescheduleModal';
import { CancelModal } from './components/CancelModal';
import { AppointmentSlipModal } from './components/AppointmentSlipModal';
import { VideoConsultationModal } from './components/VideoConsultationModal';
import { AuthModal } from './components/AuthModal';
import { Toast } from './components/Toast';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'find-doctors' && <FindDoctorsPage />}
        {currentPage === 'doctor-profile' && <DoctorProfilePage />}
        {currentPage === 'book-appointment' && <BookAppointmentPage />}
        {currentPage === 'my-appointments' && <MyAppointmentsPage />}
        {currentPage === 'dashboard' && <PatientDashboardPage />}
      </main>

      <Footer />

      {/* Global Modals & Notifications */}
      <RescheduleModal />
      <CancelModal />
      <AppointmentSlipModal />
      <VideoConsultationModal />
      <AuthModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
