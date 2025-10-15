/**
 * WeekView Component
 *
 * Displays appointments for a week (Monday - Sunday) in a grid format.
 *
 * TODO for candidates:
 * 1. Generate a 7-day grid (Monday through Sunday)
 * 2. Generate time slots for each day
 * 3. Position appointments in the correct day and time
 * 4. Make it responsive (may need horizontal scroll on mobile)
 * 5. Color-code appointments by type
 * 6. Handle overlapping appointments
 */

 'use client';
'use client';

import type { PopulatedAppointment, Doctor, TimeSlot } from '@/types';
import { format, addDays, addMinutes, isSameDay } from 'date-fns';
import { APPOINTMENT_TYPE_CONFIG } from '@/types';

interface WeekViewProps {
  appointments: PopulatedAppointment[];
  doctor?: Doctor;
  weekStartDate: Date;
}

function getWeekDays(start: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => addDays(new Date(start), i));
}

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
  weekView: { padding: '8px', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' },
  header: { marginBottom: '12px' },
  weekTitle: { fontSize: '18px', fontWeight: 600, margin: 0 },
  doctorInfo: { fontSize: '14px', color: '#555' },
  tableContainer: { overflowX: 'auto', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' },
  table: { borderCollapse: 'collapse', minWidth: '100%' },
  th: { padding: '6px', fontSize: '12px', backgroundColor: '#FFEB3B', position: 'sticky', top: 0 },
  timeTh: { width: '90px', left: 0, position: 'sticky', backgroundColor: '#FFEB3B' },
  td: { padding: '4px', borderLeft: '1px solid #eee', verticalAlign: 'top', minHeight: '56px' },
  appointmentCard: {
    borderRadius: '6px',
    padding: '4px 6px',
    color: '#fff',
    fontSize: '12px',
    marginBottom: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  patientName: { fontWeight: 600 },
  appointmentTime: { fontSize: '10px' },
  emptySlot: { height: '32px' },
};

export function WeekView({ appointments, doctor, weekStartDate }: WeekViewProps) {
  const weekDays = getWeekDays(weekStartDate);
  const timeSlots = generateTimeSlots(new Date(weekStartDate));

  const getAppointmentsForDayAndSlot = (day: Date, slotStart: Date, slotEnd: Date) =>
    appointments.filter((a) => {
      const s = new Date(a.startTime);
      const e = new Date(a.endTime);
      return isSameDay(s, day) && overlaps(s, e, slotStart, slotEnd);
    });

  return (
    <div style={styles.weekView}>
      <div style={styles.header}>
        <h3 style={styles.weekTitle}>
          {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
        </h3>
        {doctor && <p style={styles.doctorInfo}>Dr. {doctor.name} — {doctor.specialty}</p>}
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, ...styles.timeTh }}>Time</th>
              {weekDays.map((d, i) => (
                <th key={i} style={styles.th}>
                  <div style={{ fontWeight: 600 }}>{format(d, 'EEE')}</div>
                  <div style={{ fontSize: '10px', color: '#555' }}>{format(d, 'MMM d')}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, si) => (
              <tr key={si}>
                <td style={{ ...styles.td, ...styles.timeTh }}>{slot.label}</td>
                {weekDays.map((day, di) => {
                  const slotStart = new Date(day);
                  slotStart.setHours(slot.start.getHours(), slot.start.getMinutes(), 0, 0);
                  const slotEnd = new Date(slotStart);
                  slotEnd.setMinutes(slotStart.getMinutes() + 30);

                  const slotApts = getAppointmentsForDayAndSlot(day, slotStart, slotEnd);

                  return (
                    <td key={di} style={styles.td}>
                      {slotApts.length === 0 ? (
                        <div style={styles.emptySlot}></div>
                      ) : (
                        slotApts.map((apt) => {
                          const cfg = APPOINTMENT_TYPE_CONFIG[apt.type];
                          return (
                            <div
                              key={apt.id}
                              style={{ ...styles.appointmentCard, backgroundColor: cfg.color }}
                            >
                              <div style={styles.patientName}>{apt.patient.name}</div>
                              <div style={styles.appointmentTime}>
                                {format(new Date(apt.startTime), 'h:mm a')}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
