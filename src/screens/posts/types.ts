import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../type";



type PostScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Posts'
>;

type PostScreenRouteProp = RouteProp<RootStackParamList, 'Posts'>;

export type NavigationProps = {
  navigation: PostScreenNavigationProp;
};


export interface PostState {
  posts: PostProps[];
  start: number;
  limit: number;
  selectedPost: PostProps | null;
  isLoading: boolean;
  error: string | null;
}


export interface PostProps {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface PostListProps {
  posts: PostProps[];
};

