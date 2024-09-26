import Girl from '@/components/page1/girl';
import React from 'react';

export interface Page1Props {}

export default function Page1({}: Page1Props) {
  return (
    <main className="flex flex-col items-center">
      <Girl />
    </main>
  );
}
