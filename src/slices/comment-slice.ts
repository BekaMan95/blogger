import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CommentProps, CommentQueryParams } from "../type";

interface CommentState {
  comments: CommentProps[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  isLoading: false,
  error: null,
};


const commentSlice = createSlice({
    name: "comment",
    initialState,

    reducers: {
        addCommentRequested(state, action: PayloadAction<CommentProps>) {
            state.isLoading = true
            state.error = null
        },
        addCommentSucceeded: (state, action: PayloadAction<CommentProps>) => {
            state.comments.unshift(action.payload);
            state.isLoading = false
            state.error = null
        },
        addCommentFailed(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = "Failed to add comment"
        },
        fetchCommentsRequested(state, _action: PayloadAction<CommentQueryParams | undefined>) {
            state.isLoading = true
            state.error = null
        },
        fetchCommentsSucceeded(state, action: PayloadAction<CommentProps[]>) {
            state.comments = action.payload
            state.isLoading = false
            state.error = null
        },
        fetchCommentsFailed(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = "Failed to fetch comments"
        },
    }
});


export const { addCommentRequested, addCommentSucceeded, addCommentFailed, fetchCommentsRequested, fetchCommentsSucceeded, fetchCommentsFailed } = commentSlice.actions;
export default commentSlice.reducer;
