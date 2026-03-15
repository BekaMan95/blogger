import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CommentProps, CommentsState } from "../types";
import { CommentQueryParams } from "../../../services/types";


const initialState: CommentsState = {
  comments: [],
  isLoadingComments: false,
  error: null,
};


const fetchCommentSlice = createSlice({
    name: "fetchComments",
    initialState,

    reducers: {
        fetchCommentsRequested(state, _action: PayloadAction<CommentQueryParams | undefined>) {
            state.isLoadingComments = true
            state.error = null
        },
        fetchCommentsSucceeded(state, action: PayloadAction<CommentProps[]>) {
            state.comments = action.payload
            state.isLoadingComments = false
            state.error = null
        },
        fetchCommentsFailed(state, action: PayloadAction<string>) {
            state.isLoadingComments = false
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
