import { z, ZodType } from 'zod';
import { StatusCode, ApiResponse } from '@/types';

export function formatPhoneNumber(phoneNumber: string | number) {
  // 移除所有非數字字符
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');

  // 分割數字並加入連字符
  const match = cleaned.match(/(\d{1,3})(\d{1,3})?(\d{1,4})?/);
  const formatted = match && match.slice(1).filter(Boolean).join('-');

  return formatted;
}

export function calculateStayDays(checkInDate: string, checkOutDate: string) {
  if (!checkInDate || !checkOutDate) return;
  const checkIn = new Date(checkInDate).getTime();
  const checkOut = new Date(checkOutDate).getTime();
  return (checkOut - checkIn) / (1000 * 60 * 60 * 24); // 將毫秒轉換為天
}

export function formatDate(dateStr: string, timeStr?: string) {
  if (!dateStr) return;
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const date = new Date(dateStr);
  return `${date.getMonth() + 1} 月 ${date.getDate()} 日 ${days[date.getDay()]}${timeStr ? `，${timeStr}` : ''}`;
}

export function formatNTD(num: number) {
  if (!num) return;
  return num.toLocaleString('zh-TW', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function schemaValidate(key: keyof typeof schema.shape) {
  const schema = z.object({
    email: z.string().email('請輸入有效的電子郵件地址'),
    password: z.string().min(1),
    confirmPassword: z.string().min(1),
    name: z.string().min(1, '名字不能為空'),
    city: z.string().min(1, '城市不能為空'),
    phone: z.string().min(1, '電話號碼不能為空'),
    detail: z.string().min(1, '地址詳情不能為空'),
    zipcode: z.number().min(100, '郵政編碼應為有效數值').max(999, '郵政編碼應為有效數值'),
    countryPhoneCode: z.string(),
    birthdayYear: z.number().nonnegative(),
    birthdayMonth: z.number().min(1).max(12),
    birthdayDay: z.number().min(1).max(31),
  });
  return schema.shape[key];
}

async function http<T>(request: Request): Promise<T> {
  const response = await fetch(request);
  const body: T = await response.json();
  return {
    ...body,
    statusCode: response.status,
  };
}

export async function get<T>(path: string, args: RequestInit = { method: 'GET' }): Promise<T> {
  return await http<T>(new Request(path, args));
}

export async function post<T>(path: string, body: any, args: RequestInit = {}): Promise<T> {
  const defaultArgs: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const finalArgs = { ...defaultArgs, ...args, headers: { ...defaultArgs.headers, ...args.headers } };
  return await http<T>(new Request(path, finalArgs));
}

export async function put<T>(path: string, body: any, args: RequestInit = {}): Promise<T> {
  const defaultArgs: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const finalArgs = { ...defaultArgs, ...args, headers: { ...defaultArgs.headers, ...args.headers } };
  return await http<T>(new Request(path, finalArgs));
}
export async function del<T>(path: string, args: RequestInit = { method: 'DELETE' }): Promise<T> {
  return await http<T>(new Request(path, args));
}

export function handleApiResponse<T>(res: ApiResponse<T>): ApiResponse<T | null> {
  const { statusCode, status, message } = res;

  if (statusCode !== undefined && [400, 403, 404].includes(statusCode)) {
    return {
      statusCode,
      status,
      message,
      result: null,
    };
  }

  return res;
}
