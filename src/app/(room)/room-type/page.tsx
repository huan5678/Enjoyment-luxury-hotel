import { apiGetRoomType } from '@/assets/api';
import RoomTypes from './RoomTypes';
import { RoomInfo } from './_domain';

export default async function Page() {
  const res = await apiGetRoomType();
  return <RoomTypes data={res.result as RoomInfo[]} />;
}
