import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  addCommentRequested,
  addCommentSucceeded,
  addCommentFailed,
} from './slices/add-comment-slice';

import {
  fetchCommentsRequested,
  fetchCommentsSucceeded,
  fetchCommentsFailed,
} from './slices/fetch-comments-slice';


import { commentApi } from '../../services/api';

import {
  type Comment,
  type CommentQueryParams
} from '../../services/types';

import { pushToast } from '../../slices/toast-slice';



function* addCommentWorker(action: ReturnType<typeof addCommentRequested>) {
  try {
    const response: Comment = yield call(commentApi.addComment, action.payload)
    yield put(addCommentSucceeded(response))
    // Refetch comments after a successfull add
    yield put(fetchCommentsRequested({ postId: response.postId.toString() }))
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Add Comment failed!'
    yield put(pushToast({ title: 'Error', description: message }))
  }
}


function* fetchCommentWorker(action: ReturnType<typeof fetchCommentsRequested>) {
  try {
    const params: CommentQueryParams = action.payload || {}
    const response: Comment[] = yield call(commentApi.getComment, params)

    yield put(fetchCommentsSucceeded(response))
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load comments!'
    yield put(fetchCommentsFailed(message))
    yield put(pushToast({ title: 'Error', description: message }))
  }
}


export default function* commentSaga() {
  yield all([
    takeLatest(addCommentRequested.type, addCommentWorker),
    takeLatest(fetchCommentsRequested.type, fetchCommentWorker),
  ])
}
