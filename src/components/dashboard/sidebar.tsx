'use client';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
  const pathname = usePathname();
  return (
    //<aside className="fixed left-0 top-0 z-40 h-screen w-60">

    <div className="flex h-full flex-col bg-gray-900 px-3 py-4 text-white md:px-2">
      <Link
        href="dashboard/users"
        className={clsx(
          'h-[48px] rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:px-3',
          {
            'bg-sky-100 text-blue-600': pathname === '/users',
          }
        )}
      >
        Users
      </Link>
    </div>
  );
}
