import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CommentProps, AddCommentState } from "../types";


const initialState: AddCommentState = {
  comment: null,
  isLoading: false,
  error: null,
};


const addCommentSlice = createSlice({
    name: "addComment",
    initialState,

    reducers: {
        addCommentRequested(state, action: PayloadAction<Omit<CommentProps, 'id'>>) {
            state.isLoading = true
            state.error = null
        },
        addCommentSucceeded: (state, action: PayloadAction<CommentProps>) => {
            state.comment = action.payload;
            state.isLoading = false
            state.error = null
        },
        addCommentFailed(state, action: PayloadAction<string>) {
            state.isLoading = false
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
