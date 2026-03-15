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


export interface CommentState {
  comments: CommentProps[];
  isLoadingComment: boolean;
  error: string | null;
}