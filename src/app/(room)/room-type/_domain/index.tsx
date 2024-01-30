interface sortInfo {
  title: string;
  isProvide: boolean;
}

interface RoomInfo {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  price: number;
  layoutInfo: sortInfo[];
  facilityInfo: sortInfo[];
  amenityInfo: sortInfo[];
  status: number;
  createdAt: string;
  updatedAt: string;
}

type RoomTypeCardProps = Pick<
  RoomInfo,
  '_id' | 'name' | 'description' | 'price' | 'imageUrl' | 'imageUrlList' | 'areaInfo' | 'bedInfo' | 'maxPeople'
>;

export type { RoomTypeCardProps, RoomInfo };
