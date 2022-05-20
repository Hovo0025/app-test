import { Post } from '@core/models/index';

export interface User {
  _id: number;
  picture: UserImage;
  age: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  posts: Post[];
  phone: string;
  address: string;
  about: string;
  registered: number;
}

export interface UserImage {
  large: string;
  medium: string;
  thumbnail: string;
}
