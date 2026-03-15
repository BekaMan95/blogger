import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../type';



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



type UserDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserDetail'
>;

type UserDetailRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;

export type UserDetailProps = {
  navigation: UserDetailNavigationProp;
  route: UserDetailRouteProp;
};

