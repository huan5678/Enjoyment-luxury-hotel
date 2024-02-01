import { getOrders } from '@/assets/api';
import MemberOrder from './MemberOrder';
import { ApiResponse, IOrder } from '@/types';

export default async function Page() {
  const orderData = (await getOrders()) as ApiResponse<IOrder | IOrder[] | null>;
  let data: IOrder[] = [];
  if (Array.isArray(orderData.result)) {
    data = orderData.result;
  }
  return <MemberOrder data={data} />;
}
