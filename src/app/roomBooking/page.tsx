'use client';
import type { NextPage } from 'next';
import { Suspense } from 'react';
import RoomBooking from './RoomBooking';

const page: NextPage = () => {
  return (
    <Suspense>
      <RoomBooking />
    </Suspense>
  );
};

export default page;
