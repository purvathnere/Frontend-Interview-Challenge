/**
 * DoctorSelector Component
 *
 * Dropdown to select which doctor's schedule to view.
 * For front desk staff (can see all doctors).
 *
 * TODO for candidates:
 * 1. Fetch list of all doctors
 * 2. Display in a dropdown/select
 * 3. Show doctor name and specialty
 * 4. Handle selection change
 * 5. Consider using a custom dropdown or native select
 */
'use client';

import React, { useEffect, useState } from 'react';
import type { Doctor } from '@/types';
import { appointmentService } from '@/services/appointmentService';

interface DoctorSelectorProps {
  selectedDoctorId: string;
  onDoctorChange: (id: string) => void;
}

// Custom CSS styles
const styles = {
  select: {
    display: 'block',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
    width: '220px',
    transition: 'box-shadow 0.2s',
  } as React.CSSProperties,
  selectFocus: {
    boxShadow: '0 0 0 2px #3b82f6', // Blue glow on focus
    borderColor: '#3b82f6',
  } as React.CSSProperties,
};

export function DoctorSelector({ selectedDoctorId, onDoctorChange }: DoctorSelectorProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setDoctors(appointmentService.getAllDoctors());
  }, []);

  return (
    <select
      value={selectedDoctorId}
      onChange={(e) => onDoctorChange(e.target.value)}
      style={{
        ...styles.select,
        ...(isFocused ? styles.selectFocus : {}),
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <option value="">-- Select doctor --</option>
      {doctors.map((d) => (
        <option key={d.id} value={d.id}>
          Dr. {d.name} — {d.specialty}
        </option>
      ))}
    </select>
  );
}
