import Sidebar from '@/components/dashboard/sidebar';
import React from 'react';

// export interface LayoutProps {}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className="ml-60">{children}</main>
    </>
  );
}
