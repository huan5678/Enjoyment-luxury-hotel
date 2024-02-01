'use server';

import { cookies } from 'next/headers';
import { getCookie, setCookie } from 'cookies-next';
import {
  ApiResponse,
  AuthResponse,
  CheckResponse,
  ICulinary,
  INews,
  IOrder,
  IOrderRequest,
  IRoom,
  IUser,
  MemberData,
  MemberUpdateData,
  UserLoginData,
} from '@/types';
import { get, post, put, del } from '@/utils';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const token = () => {
  const cookie = getCookie('token', { cookies });
  return cookie || '';
};

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: token(),
  },
};

export async function getUser(): Promise<ApiResponse<null> | AuthResponse> {
  const res = await get<ApiResponse<MemberData | null>>(`${baseUrl}/api/v1/user`, config);

  if (res.status === 403) {
    return {
      status: false,
      result: null,
      message: '請重新登入',
    };
  }
  // next.js 會噴 重複呼喚 res.json() 的錯，所以又再宣告變數了一次
  const response = await res.json();
  if (response.token) setCookie('token', response.token, { cookies });
  return response;
}

export async function updateUser(data: MemberUpdateData): Promise<ApiResponse<null>> {
  const res = await put<ApiResponse<null>>(`${baseUrl}/api/v1/user`, data, config);
  switch (res.status) {
    case 403:
      return {
        status: false,
        result: null,
        message: '請重新登入',
      };
    case 400:
      return {
        status: false,
        result: null,
        message: '更新失敗',
      };
    case 404:
      return {
        status: false,
        result: null,
        message: '找不到使用者',
      };
    default:
      break;
  }

  const response = await res.json();
  if (response.token) setCookie('token', response.token, { cookies });
  return response;
}

export async function getOrders(id: string | undefined): Promise<ApiResponse<IOrder[] | IOrder | null>> {
  const res = await get<ApiResponse<IOrder[] | IOrder>>(`${baseUrl}/api/v1/orders${id ? id : null}`, config);

  if (res.status === 403) {
    return {
      status: false,
      result: null,
      message: '請重新登入',
    };
  }

  if (res.status === 404) {
    return {
      status: false,
      result: null,
      message: '此訂單不存在',
    };
  }

  return res.json();
}

export async function deleteOrder(id: string): Promise<ApiResponse<IOrder | null>> {
  const res = await del<ApiResponse<IOrder | null>>(`${baseUrl}/api/v1/orders/${id}`, config);

  if (res.status === 403) {
    return {
      status: false,
      result: null,
      message: '請重新登入',
    };
  }
  if (res.status === 404) {
    return {
      status: false,
      result: null,
      message: '找不到訂單',
    };
  }

  return res.json();
}

export async function userLogin(data: UserLoginData): Promise<ApiResponse<null> | AuthResponse> {
  const res = await post<ApiResponse<null> | AuthResponse>(`${baseUrl}/api/v1/user/login`, data);
  if (res.status === 400) {
    return {
      status: false,
      result: null,
      message: '密碼錯誤',
    };
  }
  if (res.status === 404) {
    return {
      status: false,
      result: null,
      message: '找不到使用者',
    };
  }
  const response = await res.json();
  if (response.token) setCookie('token', response.token, { cookies });
  return response;
}

export async function userRegister(data: IUser): Promise<ApiResponse<null> | AuthResponse> {
  const res = await post<ApiResponse<null> | AuthResponse>(`${baseUrl}/api/v1/user/signup`, data);
  if (res.status === 400) {
    return {
      status: false,
      result: null,
      message: '此 Email 已註冊',
    };
  }
  const response = await res.json();
  if (response.token) setCookie('token', response.token, { cookies });
  return response;
}

export async function verifyEmail(email: string): Promise<ApiResponse<{ isEmailExists: boolean } | null>>
{
  const res = await post(`${baseUrl}/api/v1/verify/email`, { email });
  if (res.status === 400) {
    return {
      status: false,
      result: null,
      message: 'Email 格式不正確',
    };
  }
  return res.json();
}
export async function apiCheckUserIsLogin(): Promise<CheckResponse>
{
  const res = await get<CheckResponse>(`${baseUrl}/api/v1/user/check`, config);
  if (res.status === 403) {
    return {
      status: false,
      message: '請重新登入',
    };
  }
  const response = await res.json();
  if (response.token) setCookie('token', response.token, { cookies });
  return response;
}

export async function apiGetNews(id: string | undefined): Promise<ApiResponse<INews[] | INews | null>> {
  const res = await get<ApiResponse<INews[] | INews | null>>(`${baseUrl}/api/v1/home/news/${id ? id : null}`);
  if (res.status === 404) {
    return {
      status: false,
      result: null,
      message: '此最新消息不存在',
    };
  }

  return res.json();
}

export async function apiGetRoomType(id: string | undefined): Promise<ApiResponse<IRoom[] | IRoom | null>> {
  const res = await get<ApiResponse<IRoom[] | IRoom | null>>(`${baseUrl}/api/v1/rooms/${id ? id : null}`);
  if (res.status === 404) {
    return {
      status: false,
      result: null,
      message: '此房型不存在',
    };
  }

  return res.json();
}

export async function apiGetCulinary(id: string | undefined): Promise<ApiResponse<ICulinary[] | ICulinary | null>> {
  const res = await get<ApiResponse<ICulinary[] | ICulinary | null>>(
    `${baseUrl}/api/v1/home/culinary/${id ? id : null}`,
  );
  if (res.status === 404) {
    return {
      status: false,
      result: null,
      message: '此美味佳餚不存在',
    };
  }

  return res.json();
}

export async function getRoomDetail(roomId: string) {
  const res = await fetch(`${baseUrl}/api/v1/rooms/${roomId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    console.error('Failed to fetch data');
  }

  return res.json();
}

export async function postOrder(data: IOrderRequest): Promise<ApiResponse<IOrder | null>> {
  const res = await post<ApiResponse<IOrder | null>>(`${baseUrl}/api/v1/orders`, data, config);
  switch (res.status) {
    case 400:
      return {
        status: false,
        result: null,
        message: 'checkInDate 格式錯誤',
      };
    case 404:
      return {
        status: false,
        result: null,
        message: '此房型不存在',
      };
    case 403:
      return {
        status: false,
        result: null,
        message: '請重新登入',
      };
    default:
      break;
  }

  return res.json();
}

export async function getOrderDetail(orderId: string) {
  const res = await fetch(`${baseUrl}/api/v1/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token(),
    },
  });

  if (!res.ok) {
    console.error('Failed to fetch data');
  }

  return res.json();
}
