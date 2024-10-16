import React from 'react';
import dynamic from 'next/dynamic';
const SkinnedGirl = dynamic(() => import('@/components/page1/SkinnedGirl'), {
  ssr: false,
});
// import SkinnedGirl from '@/components/page1/SkinnedGirl';
import NewGirl from '@/components/page1/NewGirl';
import GirlModel from '@/components/page1/SkinnedPoints';
import VeryNewGirl from '@/components/page1/veryNewGirl';
import NewNewGirl from '@/components/page1/NewNewGirl';
import Exp1 from '@/components/page1/Exp1';

export interface Page2Props {}

export default function Page2({}: Page2Props) {
  return (
    <main className="flex flex-col items-center">
      <h1>Kuku</h1>
      {/* small white */}
      {/* <SkinnedGirl /> */}
      {/* white dance */}
      {/* <NewGirl /> */}
      {/* 3d, looks, not dance */}
      {/* <VeryNewGirl /> */}
      {/* from skinned points,small sch */}
      {/* <GirlModel /> */}
      {/* Hier I thy with Node*/}
      {/* answer from internet_ f lot of errors */}
      {/* <NewNewGirl /> */}
      {/* <Exp1 /> */}
    </main>
  );
}
