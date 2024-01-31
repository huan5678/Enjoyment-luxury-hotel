import { getRoomDetail } from '@/assets/api';
import RoomInfoDetail from './RoomInfoDetail';

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getRoomDetail(params.id);

  return <RoomInfoDetail data={data} />;
}
