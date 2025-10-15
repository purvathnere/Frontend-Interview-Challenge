// app/hooks/useAppointments.ts
import { useState, useEffect, useMemo } from 'react';
import type { Appointment, Doctor, PopulatedAppointment } from '@/types';
import { appointmentService } from '@/services/appointmentService';

interface UseAppointmentsParams {
  doctorId?: string;
  date: Date; // main date (day view)
  startDate?: Date; // optional range (week view)
  endDate?: Date;
}

interface UseAppointmentsReturn {
  appointments: PopulatedAppointment[];
  doctor: Doctor | undefined;
  loading: boolean;
  error: Error | null;
}

export function useAppointments(params: UseAppointmentsParams): UseAppointmentsReturn {
  const { doctorId, date, startDate, endDate } = params;

  const [appointments, setAppointments] = useState<PopulatedAppointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const doctor = useMemo(() => {
    if (!doctorId) return undefined;
    return appointmentService.getDoctorById(doctorId);
  }, [doctorId]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        if (!doctorId) {
          if (mounted) {
            setAppointments([]);
            setLoading(false);
          }
          return;
        }

        let raw: Appointment[] = [];
        if (startDate && endDate) {
          raw = appointmentService.getAppointmentsByDoctorAndDateRange(doctorId, startDate, endDate);
        } else {
          raw = appointmentService.getAppointmentsByDoctorAndDate(doctorId, date);
        }

        raw = appointmentService.sortAppointmentsByStartTime(raw);
        const populated = appointmentService.getPopulatedAppointments(raw);
        if (mounted) {
          setAppointments(populated);
          setLoading(false);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err);
          setLoading(false);
        }
      }
    }
    load();
    return () => { mounted = false; };
  }, [doctorId, date, startDate, endDate]);

  return { appointments, doctor, loading, error };
}
