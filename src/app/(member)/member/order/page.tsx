import { getOrders } from '@/assets/api';

import MemberOrder from './MemberOrder';
import { ApiResponse, IOrder } from '@/types';

export default async function Page() {
  const orderData = (await getOrders()) as ApiResponse<IOrder | IOrder[] | null>;
  return <MemberOrder data={orderData.result as IOrder[]} />;
}
