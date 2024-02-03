import { apiGetRoomType } from '@/assets/api';
import RoomTypes from './RoomTypes';
import { IRoom } from '@/types';

export default async function Page() {
  const res = await apiGetRoomType();
  return <RoomTypes data={res.result as IRoom[]} />;
}
