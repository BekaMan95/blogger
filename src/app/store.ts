import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../slices/post-slice";
import commentReducer from "../slices/comment-slice";
import userReducer from "../slices/user-slice";
import toastReducer from "../slices/toast-slice";
import createSagaMiddleware from 'redux-saga';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import rootSaga from '../saga/rootSaga';



const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        post: postReducer,
        comment: commentReducer,
        user: userReducer,
        toast: toastReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false, serializableCheck: false })
    .concat(sagaMiddleware),
});


sagaMiddleware.run(rootSaga)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
