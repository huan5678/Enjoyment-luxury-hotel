'use client';
import { Suspense } from 'react';
import GetCodeForm from './form';

export default function GetCodePage() {
  return (
    <Suspense>
      <GetCodeForm />
    </Suspense>
  );
}
