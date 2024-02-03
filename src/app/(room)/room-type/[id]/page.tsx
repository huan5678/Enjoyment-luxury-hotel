'use server';

import { apiGetRoomType } from '@/assets/api';
import { IRoom } from '@/types';
import RoomInfoDetail from './RoomInfoDetail';

export default async function Page({ params }: { params: { id: string } }) {
  const res = await apiGetRoomType(params.id);

  return <RoomInfoDetail data={res.result as IRoom} />;
}
