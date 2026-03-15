import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CommentProps, CommentQueryParams, CommentState } from "../types";


const initialState: CommentState = {
  comments: [],
  isLoadingComment: false,
  error: null,
};


const fetchCommentSlice = createSlice({
    name: "fetchComments",
    initialState,

    reducers: {
        fetchCommentsRequested(state, _action: PayloadAction<CommentQueryParams | undefined>) {
            state.isLoadingComment = true
            state.error = null
        },
        fetchCommentsSucceeded(state, action: PayloadAction<CommentProps[]>) {
            state.comments = action.payload
            state.isLoadingComment = false
            state.error = null
        },
        fetchCommentsFailed(state, action: PayloadAction<string>) {
            state.isLoadingComment = false
            state.error = "Failed to fetch comments"
        },
    }
});


export const {
    fetchCommentsRequested,
    fetchCommentsSucceeded,
    fetchCommentsFailed
} = fetchCommentSlice.actions;

export default fetchCommentSlice.reducer;
