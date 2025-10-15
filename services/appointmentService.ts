// app/services/appointmentService.ts
import type { Appointment, Doctor, Patient, PopulatedAppointment } from '@/types';
import {
  MOCK_APPOINTMENTS,
  MOCK_DOCTORS,
  MOCK_PATIENTS,
  getDoctorById,
  getPatientById,
} from '@/data/mockData';

/**
 * AppointmentService - data access layer (mock-backed)
 */
export class AppointmentService {
  // Return all doctors
  getAllDoctors(): Doctor[] {
    return MOCK_DOCTORS;
  }

  // Find doctor by id
  getDoctorById(id: string): Doctor | undefined {
    return getDoctorById(id);
  }

  // Return appointments for a doctor (no date filtering)
  getAppointmentsByDoctor(doctorId: string): Appointment[] {
    return MOCK_APPOINTMENTS.filter((a) => a.doctorId === doctorId);
  }

  // Return appointments for a doctor on a single date (day)
  getAppointmentsByDoctorAndDate(doctorId: string, date: Date): Appointment[] {
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    return MOCK_APPOINTMENTS.filter((a) => {
      if (a.doctorId !== doctorId) return false;
      const s = new Date(a.startTime);
      return s.getFullYear() === y && s.getMonth() === m && s.getDate() === d;
    });
  }

  // Return appointments for a doctor within a start/end date-time range
  getAppointmentsByDoctorAndDateRange(
    doctorId: string,
    startDate: Date,
    endDate: Date
  ): Appointment[] {
    const sT = startDate.getTime();
    const eT = endDate.getTime();
    return MOCK_APPOINTMENTS.filter((a) => {
      if (a.doctorId !== doctorId) return false;
      const s = new Date(a.startTime).getTime();
      return s >= sT && s <= eT;
    });
  }

  // Populate an appointment with patient & doctor objects
  getPopulatedAppointment(appointment: Appointment): PopulatedAppointment | null {
    const doctor = getDoctorById(appointment.doctorId);
    const patient = getPatientById(appointment.patientId);
    if (!doctor || !patient) return null;
    return { ...appointment, doctor, patient };
  }

  // Map and return populated appointments for a list
  getPopulatedAppointments(appointments: Appointment[]): PopulatedAppointment[] {
    return appointments
      .map((a) => this.getPopulatedAppointment(a))
      .filter((p): p is PopulatedAppointment => p !== null);
  }

  // Sort helper
  sortAppointmentsByStartTime(appointments: Appointment[]): Appointment[] {
    return [...appointments].sort(
      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
  }
}

export const appointmentService = new AppointmentService();
