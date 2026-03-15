import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PostProps, PostQueryParams, PostState } from "../types";


const initialState: PostState = {
  posts: [],
  selectedPost: null,
  isLoading: false,
  error: null,
};


const fetchPostsSlice = createSlice({
    name: "fetchPosts",
    initialState,

    reducers: {
        fetchPostsRequested(state, _action: PayloadAction<PostQueryParams | undefined>) {
            state.isLoading = true
            state.error = null
        },
        fetchPostsSucceeded(state, action: PayloadAction<PostProps[]>) {
            state.posts = action.payload
            state.isLoading = false
            state.error = null
        },
        fetchPostsFailed(state, action: PayloadAction<string>) {
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


export const {
    fetchPostsRequested,
    fetchPostsSucceeded,
    fetchPostsFailed,
    selectPost,
} = fetchPostsSlice.actions;

export default fetchPostsSlice.reducer;
