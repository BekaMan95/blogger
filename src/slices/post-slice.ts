import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PostProps, PostQueryParams } from "../type";

interface PostState {
  posts: PostProps[];
  selectedPost: PostProps | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  isLoading: false,
  error: null,
};


const postSlice = createSlice({
    name: "post",
    initialState,

    reducers: {
        addPostRequested(state, action: PayloadAction<Omit<PostProps, 'id'>>) {
            state.isLoading = true
            state.error = null
        },
        addPostSucceeded(state, action: PayloadAction<PostProps>) {
            /* Add Post API response gives a default id 101, to fix duplicate id issue, 
            we assign a new id based on current posts length */
            action.payload.id = state.posts.length;
            state.posts.unshift(action.payload)
            state.isLoading = false
            state.error = null
        },
        addPostFailed(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = "Failed to add posts"
        },
        fetchPostRequested(state, _action: PayloadAction<PostQueryParams | undefined>) {
            state.isLoading = true
            state.error = null
        },
        fetchPostSucceeded(state, action: PayloadAction<PostProps[]>) {
            state.posts = action.payload
            state.isLoading = false
            state.error = null
        },
        fetchPostFailed(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = "Failed to fetch posts"
        },
        selectPost(state, action: PayloadAction<PostProps>) {
            state.selectedPost = action.payload
            state.error = null
            console.log('selected now: ', state.selectedPost)
        },
    }
});


export const { addPostRequested, addPostSucceeded, addPostFailed, fetchPostRequested, fetchPostSucceeded, fetchPostFailed, selectPost } = postSlice.actions;
export default postSlice.reducer;
