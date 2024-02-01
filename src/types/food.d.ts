export interface ICulinary {
  title: string;
  description: string;
  diningTime: string;
  image: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type FoodTypeSchema = {
  _id: string;
  title: string;
  description: string;
  diningTime: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
};

export type FoodTypeResponseData = {
  status: boolean;
  result: FoodTypeSchema[];
};
