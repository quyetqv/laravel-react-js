import React from 'react';
import Navibar from '@/components/Navibar';
import Footer from '@/components/Footer';
import AdminSidebar from '@/components/AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => (
  <>
    <Navibar />
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
    <Footer />
  </>
);

export default AdminLayout;
