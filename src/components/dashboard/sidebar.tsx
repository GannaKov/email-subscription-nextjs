import React from 'react';

export interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
  return (
    //<aside className="fixed left-0 top-0 z-40 h-screen w-60">
    <aside>
      <div className="flex h-full flex-col overflow-y-auto bg-gray-900 text-white">
        Sidebar
      </div>
    </aside>
  );
}
