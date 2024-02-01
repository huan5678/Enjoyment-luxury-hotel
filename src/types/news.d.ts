export interface INews {
  title: string;
  description: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
}

export type NewsSchema = {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
};

export type NewsResponseData = {
  status: boolean;
  result: NewsSchema[];
};
