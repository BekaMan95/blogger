type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface IMakeCall {
    method: Method;
    url: string;
    body?: any;
    headers?: Record<string, string>;
}


export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  },
}


export interface Post {
    id: number
    userId:number
    title: string
    body: string
}

export interface Comment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
}


export interface UserQueryParams {
  id: string
}

export interface PostQueryParams {
  id?: string
  userId?: string
  start?: string
  limit?: string
}

export interface CommentQueryParams {
  postId?: string
}