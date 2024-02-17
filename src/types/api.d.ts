import { MemberData } from './user';

type Result<T> = {
  result: T | null;
};

export interface StatusCode {
  statusCode?: 200 | 201 | 400 | 401 | 403 | 404 | 500 | 502 | 503 | 504 | number;
}

export type BaseResponse = StatusCode & {
  status: boolean;
  message?: string;
};

export type ApiResponse<T> = BaseResponse & Result<T>;

export type AuthResponse = BaseResponse & {
  token: string;
  result: MemberData;
};

export type CheckResponse = BaseResponse & {
  token?: string;
};
