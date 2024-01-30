import { getRoomTypes } from './_infrastructure/api';
import RoomTypes from './RoomTypes';

export default async function Page() {
  const res = await getRoomTypes();
  return <RoomTypes data={res.data} />;
}
