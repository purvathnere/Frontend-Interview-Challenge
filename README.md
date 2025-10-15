# 🏥 Hospital Appointment Scheduler - Frontend Interview Challenge

This project is a **Hospital Appointment Scheduling Interface** built using **Next.js 14**, **React**, and **TypeScript**.  
It allows users to view and manage doctor appointments in **Day** and **Week** calendar views.

---

## 🎯 Assignment Overview

This assignment is part of the **PearlThoughts Frontend Developer Hiring Challenge**.  

You are required to:
- Complete the schedule page with **day and week views**
- Create components for **DayView, WeekView, DoctorSelector**
- Fetch appointment data using a **custom hook** or **API route**

---

## 🌐 Live Demo & API

- **Live App URL:** [https://frontend-interview-challenge-ohza.vercel.app/](https://frontend-interview-challenge-ohza.vercel.app/)  
- **API Endpoint:** [https://frontend-interview-challenge-ohza.vercel.app/api/appointments](https://frontend-interview-challenge-ohza.vercel.app/api/appointments)

> The API endpoint returns a list of appointments in JSON format.

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 |
| Language | TypeScript |
| Library | React 18 |
| Styling | Tailwind CSS |
| UI Components | ShadCN/UI, Lucide Icons |
| Charts / Data | Recharts (optional) |

---

## ⚙️ Project Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/purvathnere/Frontend-Interview-Challenge.git
cd Frontend-Interview-Challenge
 ```
### Install Dependencies
```
npm install

```
### Run the Development Server
```
npm run dev
```


Visit: http://localhost:3000
### Build for Production
```
npm run build
npm start

```

### API Endpoint (Next.js Route)
File path: app/api/appointments/route.ts
```import { NextResponse } from 'next/server';

export async function GET() {
  const appointments = [
    { id: 1, doctor: 'Dr. Sharma', time: '10:00 AM', type: 'checkup' },
    { id: 2, doctor: 'Dr. Mehta', time: '11:30 AM', type: 'consultation' },
    { id: 3, doctor: 'Dr. Iyer', time: '02:00 PM', type: 'follow-up' },
  ];
  return NextResponse.json(appointments);
}
```
### Screencast Submission


-Walkthrough of the UI: Day view, Week view, Doctor filter

- Quick explanation of code structure and API calls


 ### Folder Structure
 app/
├── page.tsx                  # Main page
├── schedule/
│   └── page.tsx              # Schedule page
├── components/
│   ├── DayView.tsx
│   ├── WeekView.tsx
│   ├── DoctorSelector.tsx
│   └── ui/
├── hooks/
│   └── useAppointments.ts
├── services/
│   └── appointmentService.ts
├── domain/
│   ├── Appointment.ts
│   └── TimeSlot.ts
├── types/
│   └── index.ts
└── data/
    └── mockData.ts









