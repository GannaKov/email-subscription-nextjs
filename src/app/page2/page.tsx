import React from 'react';

import SkinnedGirl from '@/components/page1/SkinnedGirl';
import NewGirl from '@/components/page1/NewGirl';
import GirlModel from '@/components/page1/SkinnedPoints';
import VeryNewGirl from '@/components/page1/veryNewGirl';
import NewNewGirlWrapper from '@/components/page1/NewNewGirl';

export interface Page2Props {}

export default function Page2({}: Page2Props) {
  return (
    <main className="flex flex-col items-center">
      <h1>Kuku</h1>

      {/* small white */}
      {/* <SkinnedGirl /> */}
      {/* white dance */}
      <NewGirl />
      {/* 3d, looks, not dance */}
      {/* <VeryNewGirl /> */}
      {/* from skinned points,small sch */}
      {/* <GirlModel /> */}
      {/* <NewNewGirlWrapper /> */}
    </main>
  );
}
