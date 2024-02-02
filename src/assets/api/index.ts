'use server';

import { cookies } from 'next/headers';
import { getCookie, setCookie } from 'cookies-next';
import {
  ApiResponse,
  CheckResponse,
  ICulinary,
  INews,
  IOrder,
  IRoom,
  IUser,
  MemberUpdateData,
  Order,
  OrderPostData,
  UserLoginData,
  UserResponse,
} from '@/types';
import { get, post, put, del, handleApiResponse } from '@/utils';

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

export async function getUser(): Promise<UserResponse> {
  const res = await get<UserResponse>(`${baseUrl}/api/v1/user`, config);
  const { statusCode, status, message, result, token } = res;

  if (statusCode === 403) {
    return {
      statusCode,
      status,
      message,
      result: null,
    };
  }

  if (token) {
    setCookie('token', token, { cookies });
  }

  return {
    statusCode,
    status,
    message,
    result, // 这里的 result 是 MemberData 类型
    token,
  };
}

export async function updateUser(data: MemberUpdateData): Promise<ApiResponse<null>> {
  const res = await put<ApiResponse<null>>(`${baseUrl}/api/v1/user`, data, config);
  const { statusCode, status, message } = res;
  if (statusCode !== undefined && [400, 403, 404].includes(statusCode)) {
    return {
      status,
      message,
      result: null,
    };
  }

  return res;
}

export async function getOrders(id?: string | undefined): Promise<ApiResponse<IOrder[] | IOrder | null>> {
  const res = await get<ApiResponse<IOrder[] | IOrder>>(`${baseUrl}/api/v1/orders${id ? id : ''}`, config);
  const { statusCode, status, message } = res;
  if (statusCode !== undefined && [400, 403, 404].includes(statusCode)) {
    return {
      status,
      message,
      result: null,
    };
  }

  return res;
}

export async function deleteOrder(id?: string | undefined): Promise<ApiResponse<IOrder | null>> {
  const res = await del<ApiResponse<IOrder | null>>(`${baseUrl}/api/v1/orders/${id}`, config);
  const { statusCode, status, message } = res;
  if (statusCode !== undefined && [400, 403, 404].includes(statusCode)) {
    return {
      status,
      message,
      result: null,
    };
  }

  return res;
}

export async function userLogin(data: UserLoginData): Promise<UserResponse> {
  const res = await post<UserResponse>(`${baseUrl}/api/v1/user/login`, data);
  const { statusCode, status, message, token } = res;
  if (statusCode !== undefined && [400, 403, 404].includes(statusCode)) {
    return {
      status,
      message,
      result: null,
    };
  }

  if (token) setCookie('token', token, { cookies });
  return res;
}

export async function userRegister(data: IUser): Promise<UserResponse> {
  const res = await post<UserResponse>(`${baseUrl}/api/v1/user/signup`, data);
  const { token } = res;
  if (token) setCookie('token', token, { cookies });

  return handleApiResponse(res);
}

export async function verifyEmail(email: string): Promise<ApiResponse<{ isEmailExists: boolean } | null>> {
  const res = await post<ApiResponse<{ isEmailExists: boolean }>>(`${baseUrl}/api/v1/verify/email`, { email });
  const { statusCode, status, message, result } = res;

  if (statusCode === 400) {
    return {
      statusCode, // 或其他您希望返回的狀態碼
      status,
      result: null,
      message: 'Email 格式不正確',
    };
  }
  return res;
}

export async function apiCheckUserIsLogin(): Promise<CheckResponse> {
  const res = await get<CheckResponse>(`${baseUrl}/api/v1/user/check`, config);
  const { token } = res;
  if (token) setCookie('token', token, { cookies });
  const result = {
    ...res,
    result: null,
  };
  return handleApiResponse(result);
}

export async function apiGetNews(id?: string | undefined): Promise<ApiResponse<INews[] | INews | null>> {
  const res = await get<ApiResponse<INews[] | INews | null>>(`${baseUrl}/api/v1/home/news/${id ? id : ''}`);

  return handleApiResponse(res);
}

export async function apiGetRoomType(id?: string | undefined): Promise<ApiResponse<IRoom[] | IRoom | null>> {
  const res = await get<ApiResponse<IRoom[] | IRoom | null>>(`${baseUrl}/api/v1/rooms/${id ? id : ''}`);
  return handleApiResponse(res);
}

export async function apiGetCulinary(id?: string | undefined): Promise<ApiResponse<ICulinary[] | ICulinary | null>> {
  const res = await get<ApiResponse<ICulinary[] | ICulinary | null>>(`${baseUrl}/api/v1/home/culinary/${id ? id : ''}`);

  return handleApiResponse(res);
}

export async function getRoomDetail(roomId: string) {
  const res = await fetch(`${baseUrl}/api/v1/rooms/${roomId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  return res;
}

export async function postOrder(data: OrderPostData): Promise<ApiResponse<Order | null>> {
  const res = await post<ApiResponse<Order | null>>(`${baseUrl}/api/v1/orders`, data, config);

  return handleApiResponse(res);
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

  return res;
}
