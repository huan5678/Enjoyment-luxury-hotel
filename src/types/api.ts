import { MemberData } from './user';

export interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export type ApiResponse<T> = {
  status: boolean;
  result: T | null;
  message: string;
};

export type AuthResponse = {
  status: boolean;
  token: string;
  result: MemberData;
};

export type CheckResponse = {
  status: boolean;
  token?: string;
  message: string;
};
