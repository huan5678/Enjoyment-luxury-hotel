export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: Date;
  address: {
    zipcode: number;
    detail: string;
    county: string;
    city: string;
  };
  verificationToken: string;
}

export type Address = {
  zipcode: number;
  detail: string;
};

export type UserInfo = {
  address: Address;
  name: string;
  phone: string;
  email: string;
};

export type MemberData = UserInfo & {
  _id?: string;
  password: string;
  birthday: string;
  verificationToken?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type MemberResponseData = {
  status: boolean;
  token: string;
  result: MemberData;
};

export type MemberPassword = {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  password?: string;
};

export type MemberUpdateData = UserInfo &
  MemberPassword & {
    _id?: string;
    address?: Address;
    birthday?: string;
  };

export type UserLoginData = {
  email: string | null;
  password: string;
};

export type MemberEditData = MemberUpdateData & {
  city: string;
  countryPhoneCode: string;
  birthdayYear: number;
  birthdayMonth: number;
  birthdayDay: number;
  check?: boolean;
};

export type UserRegisterData = UserInfo & {
  password?: string;
  birthday?: string;
};

export type CheckLoginSchema = {
  status: boolean;
  token: string;
};
