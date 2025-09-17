
import { Outlet } from 'react-router-dom';
import AuthNavbar from '../components/AuthNavbar.jsx';

export default function AuthLayout() {
  return (
    <div className="min-h-dvh bg-white">
      <AuthNavbar />
      <main className="container mx-auto px-3 sm:px-4 md:px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}