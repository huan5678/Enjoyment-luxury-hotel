import { IRoom } from './room';
import { IUser } from './user';

export interface IOrder {
  roomId: IRoom;
  checkInDate: string;
  checkOutDate: string;
  peopleNum: number;
  orderUserId: string;
  userInfo: IUser;
  status: number;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
}

export interface IOrderRequest {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  peopleNum: number;
  userInfo: IUser;
}

type FacilityInfo = {
  title: string;
  isProvide: boolean;
};

type AmenityInfo = {
  title: string;
  isProvide: boolean;
};

type RoomInfo = {
  name: string;
  description: string;
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  price: number;
  status: number;
  facilityInfo: FacilityInfo[];
  amenityInfo: AmenityInfo[];
  _id: string;
  createdAt: string;
  updatedAt: string;
};

type Order = {
  userInfo: UserInfo;
  _id: string;
  roomId: RoomInfo;
  checkInDate: string;
  checkOutDate: string;
  peopleNum: number;
  orderUserId: string;
  status: number;
  createdAt: string;
  updatedAt: string;
};

type Orders = Order[];

type OrderResponseData = {
  status: boolean;
  result: Orders;
};

type OrderPostData = {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  peopleNum: number;
  userInfo: {
    name: string;
    phone: string;
    email: string;
    address: {
      zipcode: number;
      detail: string;
    };
  };
};

type OrderInfo = {
  status: boolean;
  result: {
    userInfo: {
      address: {
        zipcode: number;
        detail: string;
      };
      name: string;
      phone: string;
      email: string;
    };
    _id: string;
    roomId: {
      name: string;
      description: string;
      imageUrl: string;
      imageUrlList: string[];
      areaInfo: string;
      bedInfo: string;
      maxPeople: number;
      price: number;
      status: number;
      layoutInfo: [
        {
          title: string;
          isProvide: boolean;
        },
      ];
      facilityInfo: FacilityInfo[];
      amenityInfo: AmenityInfo[];
      _id: string;
      createdAt: string;
      updatedAt: string;
    };
    checkInDate: string;
    checkOutDate: string;
    peopleNum: number;
    orderUserId: string;
    status: number;
    createdAt: string;
    updatedAt: string;
  };
};
