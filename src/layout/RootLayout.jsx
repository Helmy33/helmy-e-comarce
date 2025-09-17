
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

export default function RootLayout() {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="container mx-auto px-3 sm:px-4 md:px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}