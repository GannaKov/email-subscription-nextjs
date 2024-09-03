'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export interface HeaderProps {}
const links = [
  { name: 'Page_1', href: '/' },
  {
    name: 'Page_2',
    href: '/page2',
  },
  { name: 'Page_3', href: '/page3' },
];
export default function Header({}: HeaderProps) {
  const pathname = usePathname();
  return (
    <header className="flex w-full  px-3   justify-center ">
      <nav className="flex w-3/4 justify-between ">
        {links.map((link) => (
          <Link
            className={clsx('py-4', {
              'bg-sky-100 text-blue-600': pathname === link.href,
            })}
            href={link.href}
            key={link.name}
          >
            <p>{link.name}</p>
          </Link>
        ))}
      </nav>
    </header>
  );
}
