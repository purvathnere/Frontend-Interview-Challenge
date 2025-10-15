import { NextResponse } from 'next/server';

export async function GET() {
  const appointments = [
    { id: 1, doctor: 'Dr. Sharma', time: '10:00 AM', type: 'checkup' },
    { id: 2, doctor: 'Dr. Mehta', time: '11:30 AM', type: 'consultation' },
    { id: 3, doctor: 'Dr. Iyer', time: '02:00 PM', type: 'follow-up' },
  ];
  return NextResponse.json(appointments);
}
