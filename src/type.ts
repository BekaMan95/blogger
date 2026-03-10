import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  Home: undefined;
  Posts: { itemId: number };
};

type PostScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Posts'
>;

type PostScreenRouteProp = RouteProp<RootStackParamList, 'Posts'>;

export type NavigationProps = {
  navigation: PostScreenNavigationProp;
};
