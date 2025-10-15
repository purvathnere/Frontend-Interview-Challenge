/**
 * ScheduleView Component
 *
 * Main component that orchestrates the schedule display.
 * This component should compose smaller components together.
 *
 * TODO for candidates:
 * 1. Create the component structure (header, controls, calendar)
 * 2. Compose DoctorSelector, DayView, WeekView together
 * 3. Handle view switching (day vs week)
 * 4. Manage state or use the useAppointments hook
 * 5. Think about component composition and reusability
 */
'use client';

import React, { useState } from 'react';
import type { CalendarView } from '@/types';
import { DoctorSelector } from './DoctorSelector';
import { DayView } from './DayView';
import { WeekView } from './WeekView';
import { useAppointments } from '@/hooks/useAppointments';
import { startOfWeek } from 'date-fns';

// Custom styles object
const styles: { [key: string]: React.CSSProperties } = {
  scheduleCard: {
    backgroundColor: '#fff8f0', // cream background
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '900px',
    margin: '20px auto',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  scheduleHeader: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    paddingBottom: '15px',
    marginBottom: '20px',
  },
  scheduleTitle: {
    fontSize: '24px',
    fontWeight: 700,
    margin: 0,
  },
  scheduleDoctor: {
    fontSize: '14px',
    fontWeight: 600,
    marginTop: '5px',
  },
  scheduleSelectDoctor: {
    fontSize: '14px',
    color: '#666',
    marginTop: '5px',
  },
  scheduleControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  scheduleDateInput: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
    transition: 'box-shadow 0.2s',
  },
  scheduleViewButtons: {
    display: 'flex',
    gap: '6px',
  },
  viewBtn: {
    padding: '6px 14px',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    border: '1px solid #ccc',
    backgroundColor: '#eee',
    transition: 'all 0.2s',
  },
  viewBtnActive: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: '1px solid #3b82f6',
  },
  scheduleBody: {
    marginTop: '10px',
  },
  scheduleMessage: {
    fontSize: '14px',
    color: '#555',
    padding: '10px 0',
  },
};

export function ScheduleView() {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>('day');

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const { appointments, doctor, loading } = useAppointments({
    doctorId: selectedDoctorId || undefined,
    date: selectedDate,
    startDate: view === 'week' ? weekStart : undefined,
    endDate: view === 'week' ? weekEnd : undefined,
  });

  return (
    <div style={styles.scheduleCard}>
      <div style={styles.scheduleHeader}>
        <div>
          <h2 style={styles.scheduleTitle}>Doctor Schedule</h2>
          {doctor ? (
            <p style={styles.scheduleDoctor}>Dr. {doctor.name} — {doctor.specialty}</p>
          ) : (
            <p style={styles.scheduleSelectDoctor}>Select a doctor</p>
          )}
        </div>

        <div style={styles.scheduleControls}>
          <DoctorSelector selectedDoctorId={selectedDoctorId} onDoctorChange={setSelectedDoctorId} />
          <input
            type="date"
            value={selectedDate.toISOString().slice(0, 10)}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            style={styles.scheduleDateInput}
          />
          <div style={styles.scheduleViewButtons}>
            <button
              style={{
                ...styles.viewBtn,
                ...(view === 'day' ? styles.viewBtnActive : {}),
              }}
              onClick={() => setView('day')}
            >
              Day
            </button>
            <button
              style={{
                ...styles.viewBtn,
                ...(view === 'week' ? styles.viewBtnActive : {}),
              }}
              onClick={() => setView('week')}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      <div style={styles.scheduleBody}>
        {loading ? (
          <p style={styles.scheduleMessage}>Loading appointments...</p>
        ) : !selectedDoctorId ? (
          <p style={styles.scheduleMessage}>Please select a doctor to view schedule.</p>
        ) : appointments.length === 0 ? (
          <p style={styles.scheduleMessage}>No appointments for the selected date/range.</p>
        ) : view === 'day' ? (
          <DayView appointments={appointments} doctor={doctor} date={selectedDate} />
        ) : (
          <WeekView appointments={appointments} doctor={doctor} weekStartDate={weekStart} />
        )}
      </div>
    </div>
  );
}
