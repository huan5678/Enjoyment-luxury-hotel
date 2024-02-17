'use client';
import { Suspense } from 'react';
import ForgotForm from './form';

export default function ForgotPage() {
  return (
    <Suspense>
      <ForgotForm />
    </Suspense>
  );
}
