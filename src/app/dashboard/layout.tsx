import Sidebar from '@/components/dashboard/sidebar';
import React from 'react';

// export interface LayoutProps {}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none overflow-y-auto md:w-60">
        <Sidebar />
      </div>

      <main className="ml-0 px-3 py-4 md:px-2">{children}</main>
    </div>
  );
}
