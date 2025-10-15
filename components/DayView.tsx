/**
 * DayView Component
 *
 * Displays appointments for a single day in a timeline format.
 *
 * TODO for candidates:
 * 1. Generate time slots (8 AM - 6 PM, 30-minute intervals)
 * 2. Position appointments in their correct time slots
 * 3. Handle appointments that span multiple slots
 * 4. Display appointment details (patient, type, duration)
 * 5. Color-code appointments by type
 * 6. Handle overlapping appointments gracefully
 */
'use client';
'use client';

import type { PopulatedAppointment, Doctor, TimeSlot } from '@/types';
import { format, addMinutes } from 'date-fns';
import { APPOINTMENT_TYPE_CONFIG } from '@/types';

interface DayViewProps {
  appointments: PopulatedAppointment[];
  doctor?: Doctor;
  date: Date;
}

/** generate 30-min slots 8:00-17:30 */
function generateTimeSlots(date: Date): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let hour = 8; hour < 18; hour++) {
    for (let minute of [0, 30]) {
      const start = new Date(date);
      start.setHours(hour, minute, 0, 0);
      const end = addMinutes(start, 30);
      slots.push({ start, end, label: format(start, 'h:mm a') });
    }
  }
  return slots;
}

function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
  return aStart < bEnd && aEnd > bStart;
}

// Custom CSS styles
const styles: { [key: string]: React.CSSProperties } = {
  dayView: {
    padding: '8px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  header: {
    marginBottom: '12px',
  },
  dateTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: 0,
  },
  doctorInfo: {
    fontSize: '14px',
    color: '#555',
  },
  slotContainer: {
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    maxHeight: '70vh',
    overflowY: 'auto',
  },
  slotRow: {
    display: 'flex',
    borderBottom: '1px solid #eee',
  },
  slotTime: {
    width: '90px',
    padding: '6px',
    fontSize: '12px',
    color: '#888',
  },
  slotContent: {
    flex: 1,
    padding: '6px',
    minHeight: '48px',
  },
  emptySlot: {
    color: '#ccc',
    fontSize: '12px',
    height: '32px',
  },
  appointmentCard: {
    borderRadius: '6px',
    padding: '4px 6px',
    color: '#fff',
    fontSize: '12px',
    marginBottom: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  patientName: {
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  appointmentTime: {
    fontSize: '10px',
  },
};

export function DayView({ appointments, doctor, date }: DayViewProps) {
  const timeSlots = generateTimeSlots(new Date(date));

  const getAppointmentsForSlot = (slotStart: Date, slotEnd: Date) =>
    appointments.filter((a) => {
      const s = new Date(a.startTime);
      const e = new Date(a.endTime);
      return overlaps(s, e, slotStart, slotEnd);
    });

  return (
    <div style={styles.dayView}>
      <div style={styles.header}>
        <h3 style={styles.dateTitle}>{format(date, 'EEEE, MMMM d, yyyy')}</h3>
        {doctor && <p style={styles.doctorInfo}>Dr. {doctor.name} — {doctor.specialty}</p>}
      </div>

      <div style={styles.slotContainer}>
        {timeSlots.map((slot, idx) => {
          const slotApts = getAppointmentsForSlot(slot.start, slot.end);
          return (
            <div key={idx} style={styles.slotRow}>
              <div style={styles.slotTime}>{slot.label}</div>
              <div style={styles.slotContent}>
                {slotApts.length === 0 ? (
                  <div style={styles.emptySlot}>—</div>
                ) : (
                  slotApts.map((apt) => {
                    const cfg = APPOINTMENT_TYPE_CONFIG[apt.type];
                    const startLabel = format(new Date(apt.startTime), 'h:mm a');
                    const endLabel = format(new Date(apt.endTime), 'h:mm a');
                    return (
                      <div
                        key={apt.id}
                        style={{ ...styles.appointmentCard, backgroundColor: cfg.color }}
                      >
                        <div style={styles.patientName}>{apt.patient.name}</div>
                        <div style={styles.appointmentTime}>
                          {cfg.label} · {startLabel} - {endLabel}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
