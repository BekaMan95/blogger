import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PostProps, PostState } from "../../posts/types";



const initialState: PostState = {
  posts: [],
  selectedPost: null,
  isLoading: false,
  error: null,
};


const addPostSlice = createSlice({
    name: "addPost",
    initialState,

    reducers: {
        addPostRequested(state, action: PayloadAction<Omit<PostProps, 'id'>>) {
            state.isLoading = true
            state.error = null
        },
        addPostSucceeded(state, action: PayloadAction<PostProps>) {
            /* Add Post API response gives a default id 101, to fix duplicate id issue, 
            we assign a new id based on current posts length */
            /* Made the ID negative to avoid fetching comments of existing posts comments
            stored on the JSON server (no post with negative id).  */
            action.payload.id = -state.posts.length;
            state.posts.unshift(action.payload)
            state.isLoading = false
            state.error = null
        },
        addPostFailed(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = "Failed to add posts"
        }
    }
});


export const {
    addPostRequested,
    addPostSucceeded,
    addPostFailed,
} = addPostSlice.actions;

export default addPostSlice.reducer;
