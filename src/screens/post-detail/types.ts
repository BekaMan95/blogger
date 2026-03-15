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


export interface CommentsState {
  comments: CommentProps[];
  isLoadingComments: boolean;
  error: string | null;
}

export interface AddCommentState {
  comment: CommentProps| null;
  isLoading: boolean;
  error: string | null;
}