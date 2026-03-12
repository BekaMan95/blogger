import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
    addPostRequested,
    addPostSucceeded,
    addPostFailed,
    fetchPostRequested,
    fetchPostSucceeded,
    fetchPostFailed,

} from '../slices/post-slice'

import {
    addCommentRequested,
    addCommentSucceeded,
    addCommentFailed,
    fetchCommentsRequested,
    fetchCommentsSucceeded,
    fetchCommentsFailed,
} from '../slices/comment-slice'

import { 
    fetchUserRequested, 
    fetchUserSucceeded, 
    fetchUserFailed 
} from '../slices/user-slice'

import {
    postApi,
    commentApi,
    userApi,
    type Post,
    type Comment,
    type User,
    type PostQueryParams,
    type CommentQueryParams,
    type UserQueryParams
} from '../services/api'

import { pushToast } from '../slices/toast-slice'


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


function* fetchPostWorker(action: ReturnType<typeof fetchPostRequested>) {
  try {
    const params: PostQueryParams = action.payload || {}
    const response: Post[] = yield call(postApi.getPost, params)

    yield put(fetchPostSucceeded(response))
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load post'
    yield put(fetchPostFailed(message))
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


function* addCommentWorker(action: ReturnType<typeof addCommentRequested>) {
  try {
    const response: Comment = yield call(commentApi.addComment, action.payload)
    yield put(addCommentSucceeded(response))
    yield put(
      pushToast({
        title: 'Success',
        description: `Comment added.`,
      })
    )
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


export default function* rootSaga() {
  yield all([
    // Post
    takeLatest(addPostRequested.type, addPostWorker),
    takeLatest(fetchPostRequested.type, fetchPostWorker),
    // takeLatest(deletePostRequested.type, deletePostWorker),

    // Comment
    takeLatest(addCommentRequested.type, addCommentWorker),
    takeLatest(fetchCommentsRequested.type, fetchCommentWorker),

    // User
    takeLatest(fetchUserRequested.type, fetchUserWorker),
  ])
}
