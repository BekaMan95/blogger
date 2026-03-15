import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  addPostRequested,
  addPostSucceeded,
  addPostFailed,

} from './slices/add-post-slice';

import { postApi } from '../../services/api';
import { type Post } from '../../services/types';
import { pushToast } from '../../slices/toast-slice';



function* addPostWorker(action: ReturnType<typeof addPostRequested>) {
  try {
    const response: Post = yield call(postApi.addPost, action.payload)
    yield put(addPostSucceeded(response))
    yield put(
      pushToast({
        title: 'Success',
        description: `${response.title} added.`,
      })
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Add Post failed'
    yield put(pushToast({ title: 'Error', description: message }))
  }
}




export default function* addPostSaga() {
  yield all([
    takeLatest(addPostRequested.type, addPostWorker),
  ])
}
