import { GestureResponderEvent } from "react-native";
import { CommentProps } from "../screens/post-detail/types";
import { PostProps } from "../screens/posts/types";
import { NavigationProps } from "../screens/posts/types";



export type CommentCardProps = {
  comment: CommentProps
};


export interface PostCardProps {
  post: PostProps;
  nav: NavigationProps;
}

export interface AddCommentModalProps {
    postId: number;
    visible: boolean;
    onClose: (event?: GestureResponderEvent) => void;
}


export interface AddPostModalProps {
  visible: boolean;
  onClose: (event?: GestureResponderEvent) => void;
}

