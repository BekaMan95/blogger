import { configureStore } from "@reduxjs/toolkit";
import addPostReducer from "../screens/home/slices/add-post-slice";
import fetchPostsReducer from "../screens/posts/slices/fetch-posts-slice";
import addCommentReducer from "../screens/post-detail/slices/add-comment-slice";
import fetchCommentReducer from "../screens/post-detail/slices/fetch-comments-slice";
import fetchUserReducer from "../screens/user-detail/slices/fetch-user-slice";
import toastReducer from "../slices/toast-slice";
import createSagaMiddleware from 'redux-saga';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import addPostSaga from "../screens/home/saga";
import fetchPostSaga from "../screens/posts/saga";
import commentSaga from "../screens/post-detail/saga";
import fetchUserSaga from "../screens/user-detail/saga";



const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        addPost: addPostReducer,
        fetchPosts: fetchPostsReducer,
        addComment: addCommentReducer,
        fetchComment: fetchCommentReducer,
        fetchUser: fetchUserReducer,
        toast: toastReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false, serializableCheck: false })
    .concat(sagaMiddleware),
});


sagaMiddleware.run(addPostSaga);
sagaMiddleware.run(fetchPostSaga);
sagaMiddleware.run(commentSaga);
sagaMiddleware.run(fetchUserSaga);


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
