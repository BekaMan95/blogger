export type RootStackParamList = {
  Home: undefined;
  Posts: { itemId: number };
  UserDetail: { id: number };
};




export interface ToastProps { 
  id: string;
  title: string;
  description: string;
}
