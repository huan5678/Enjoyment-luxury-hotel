import { Suspense } from 'react';
import BookingSuccess from './BookingSuccess';

function page() {
  return (
    <Suspense>
      <BookingSuccess />
    </Suspense>
  );
}

export default page;
