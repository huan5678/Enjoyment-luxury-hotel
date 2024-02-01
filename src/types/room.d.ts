export type IItem = {
  title: string;
  isProvide: boolean;
};

export interface IRoom {
  name: string;
  description: string;
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  price: number;
  status: number;
  layoutInfo: IItem[];
  facilityInfo: IItem[];
  amenityInfo: IItem[];
  _id?: string;
}

type RoomInfoSchema = {
  title: string;
  isProvide: boolean;
};

type RoomTypeSchema = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  status: number;
  layoutInfo: RoomInfoSchema[];
  facilityInfo: RoomInfoSchema[];
  amenityInfo: RoomInfoSchema[];
  createdAt?: string;
  updatedAt?: string;
};

type RoomTypeResponseData = {
  status: boolean;
  result: RoomTypeSchema[];
};
