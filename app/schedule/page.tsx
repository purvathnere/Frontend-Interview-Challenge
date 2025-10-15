/**
 * Schedule Page
 *
 * Main page for the appointment scheduler.
 * This is where candidates will implement the calendar views.
 *
 * TODO for candidates:
 * 1. Import and use the ScheduleView component
 * 2. Set up state for selected doctor and date
 * 3. Handle view switching (day/week)
 */

'use client';

import { useState } from 'react';
import { MOCK_DOCTORS } from '@/data/mockData';
import type { CalendarView } from '@/types';
import { ScheduleView } from '@/components/ScheduleView';

const styles: { [key: string]: React.CSSProperties } = {
  main: { minHeight: '100vh', padding: '32px', backgroundColor: '#fdf6e3', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' },
  container: { maxWidth: '1120px', margin: '0 auto' },
  header: { marginBottom: '32px' },
  title: { fontSize: '28px', fontWeight: 700, marginBottom: '8px' },
  subtitle: { fontSize: '14px', color: '#555' },
};

export default function SchedulePage() {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(MOCK_DOCTORS[0].id);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>('day');

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Appointment Schedule</h1>
          <p style={styles.subtitle}>View and manage doctor appointments</p>
        </header>

        <ScheduleView
          // selectedDoctorId={selectedDoctorId}
          // selectedDate={selectedDate}
          // view={view}
          // onDoctorChange={setSelectedDoctorId}
          // onDateChange={setSelectedDate}
          // onViewChange={setView}
        />
      </div>
    </main>
  );
}
