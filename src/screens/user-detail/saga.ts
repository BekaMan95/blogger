import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchUserRequested, 
  fetchUserSucceeded, 
  fetchUserFailed 
} from './slices/fetch-user-slice';

import { userApi } from '../../services/api';
import { type User, type UserQueryParams } from '../../services/types';
import { pushToast } from '../../slices/toast-slice';



function* fetchUserWorker(action: ReturnType<typeof fetchUserRequested>) {
  try {
    const params: UserQueryParams = action.payload || {}
    const response: User[] = yield call(userApi.getUser, params)

    yield put(fetchUserSucceeded(response))
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load user!'
    yield put(fetchUserFailed(message))
    yield put(pushToast({ title: 'Error', description: message }))
  }
}


export default function* fetchUserSaga() {
  yield all([
    takeLatest(fetchUserRequested.type, fetchUserWorker),
  ])
}
