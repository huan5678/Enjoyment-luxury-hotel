interface RoomTypeCardProps {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
}

interface SquareCardProps {
  title: string | number;
  children: React.ReactNode;
}

export type { RoomTypeCardProps, SquareCardProps };
