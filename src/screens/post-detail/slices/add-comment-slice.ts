import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CommentProps, CommentState } from "../types";


const initialState: CommentState = {
  comments: [],
  isLoadingComment: false,
  error: null,
};


const addCommentSlice = createSlice({
    name: "addComment",
    initialState,

    reducers: {
        addCommentRequested(state, action: PayloadAction<Omit<CommentProps, 'id'>>) {
            state.isLoadingComment = true
            state.error = null
        },
        addCommentSucceeded: (state, action: PayloadAction<CommentProps>) => {
            action.payload.id = -state.comments.length;
            state.comments.unshift(action.payload);
            state.isLoadingComment = false
            state.error = null
        },
        addCommentFailed(state, action: PayloadAction<string>) {
            state.isLoadingComment = false
            state.error = "Failed to add comment"
        }
    }
});


export const {
    addCommentRequested,
    addCommentSucceeded,
    addCommentFailed,
} = addCommentSlice.actions;

export default addCommentSlice.reducer;
