import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  Home: undefined;
  Posts: { itemId: number };
  UserDetail: { id: number };
};

type PostScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Posts'
>;

type PostScreenRouteProp = RouteProp<RootStackParamList, 'Posts'>;

export type NavigationProps = {
  navigation: PostScreenNavigationProp;
};

type UserDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserDetail'
>;

type UserDetailRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;

export type UserDetailProps = {
  navigation: UserDetailNavigationProp;
  route: UserDetailRouteProp;
};




export interface PostProps {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface PostListProps {
  posts: PostProps[];
};

export interface PostQueryParams {
  userId?: number;
}



export interface CommentProps {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentListProps {
  comments: CommentProps[];
}

export interface CommentQueryParams {
  postId?: number;
}

export interface UserProps {
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
  }
}


export interface ToastProps { 
  id: string;
  title: string;
  description: string;
}
