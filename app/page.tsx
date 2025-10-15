/**
 * Home Page
 *
 * This is the landing page. Navigate users to the schedule page.
 */
// app/page.tsx (HomePage)
// app/page.tsx
// app/page.tsx
// app/page.tsx
import Link from 'next/link';
import './HomePage.css'; // custom CSS import

export default function HomePage() {
  return (
    <main className="home-container">
      <div className="home-card">
        <h1 className="home-title">Hospital Appointment Scheduler</h1>
        <p className="home-subtitle">
          Welcome to the appointment scheduling system. View and manage doctor schedules
          for our hospital.
        </p>

        <Link href="/schedule" className="home-button">
          Go to Schedule
        </Link>

        <div className="home-doctors">
          <h2>Available Doctors:</h2>
          <table>
            <tbody>
              <tr>
                <td><strong>Dr. Sarah Chen</strong></td>
                <td>Cardiology</td>
              </tr>
              <tr>
                <td><strong>Dr. Michael Rodriguez</strong></td>
                <td>Pediatrics</td>
              </tr>
              <tr>
                <td><strong>Dr. Emily Johnson</strong></td>
                <td>General Practice</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
