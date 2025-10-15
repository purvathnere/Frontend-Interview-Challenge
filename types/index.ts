/**
 * Type Definitions for Hospital Appointment Scheduler
 *
 * These types define the core domain models for the scheduling system.
 * All these types are provided - you don't need to modify them.
 */

/**
 * Appointment types/categories
 **/
export type AppointmentType = 'checkup' | 'consultation' | 'follow-up' | 'procedure';

export type Specialty =
  | 'cardiology'
  | 'pediatrics'
  | 'general-practice'
  | 'orthopedics'
  | 'dermatology';

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface WorkingHours {
  start: string;
  end: string;
}

export type WeeklySchedule = Partial<Record<DayOfWeek, WorkingHours>>;

export interface Doctor {
  id: string;
  name: string;
  specialty: Specialty;
  email: string;
  phone: string;
  workingHours: WeeklySchedule;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  type: AppointmentType;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  notes?: string;
}

export interface PopulatedAppointment extends Appointment {
  patient: Patient;
  doctor: Doctor;
}

export type CalendarView = 'day' | 'week';

export interface TimeSlot {
  start: Date;
  end: Date;
  label: string;
}

export interface AppointmentTypeInfo {
  type: AppointmentType;
  label: string;
  color: string;
  defaultDuration: number;
}

export const APPOINTMENT_TYPE_CONFIG: Record<AppointmentType, AppointmentTypeInfo> = {
  'checkup': { type: 'checkup', label: 'General Checkup', color: '#3b82f6', defaultDuration: 30 },
  'consultation': { type: 'consultation', label: 'Consultation', color: '#10b981', defaultDuration: 60 },
  'follow-up': { type: 'follow-up', label: 'Follow-up', color: '#f59e0b', defaultDuration: 30 },
  'procedure': { type: 'procedure', label: 'Procedure', color: '#8b5cf6', defaultDuration: 90 },
};

