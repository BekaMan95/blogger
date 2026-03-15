import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchPostsRequested,
  fetchPostsSucceeded,
  fetchPostsFailed,
} from './slices/fetch-posts-slice';

import { postApi } from '../../services/api';

import {
  type Post,
  type PostQueryParams,
} from '../../services/types';

import { pushToast } from '../../slices/toast-slice';


function* fetchPostWorker(action: ReturnType<typeof fetchPostsRequested>) {
  try {
    const params: PostQueryParams = action.payload || {}
    const response: Post[] = yield call(postApi.getPost, params)

    yield put(fetchPostsSucceeded(response))
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load post'
    yield put(fetchPostsFailed(message))
    yield put(pushToast({ title: 'Error', description: message }))
  }
}

// function* deletePostWorker(action: ReturnType<typeof deletePostRequested>) {
//   try {
//     const { id } = action.payload
//     if (!id) throw new Error('Post ID is required for deletion')

//     yield call(postApi.deletePost, id)
//     yield put(pushToast({ title: 'Success', description: 'Post deleted.' }))
//     yield put(fetchPostRequested(undefined))
//   } catch (error) {
//     const message = error instanceof Error ? error.message : 'Failed to delete post!'
//     yield put(pushToast({ title: 'Error', description: message }))
//   }
// }



export default function* fetchPostSaga() {
  yield all([
    takeLatest(fetchPostsRequested.type, fetchPostWorker),
    // takeLatest(deletePostRequested.type, deletePostWorker),
  ])
}
