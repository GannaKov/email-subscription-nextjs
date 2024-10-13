import React from 'react';

import SkinnedPoints from '@/components/page1/SkinnedPoints';
import SkinnedGirl from '@/components/page1/SkinnedGirl';
import NewGirl from '@/components/page1/NewGirl';
import GirlModel from '@/components/page1/SkinnedPoints';
import VeryNewGirl from '@/components/page1/veryNewGirl';

export interface Page2Props {}

export default function Page2({}: Page2Props) {
  return (
    <main className="flex flex-col items-center">
      <h1>Kuku</h1>
      {/* <SkinnedPoints /> */}
      {/* <SkinnedGirl /> */}
      {/* <NewGirl /> */}
      <VeryNewGirl />
      {/* <GirlModel /> */}
    </main>
  );
}
