import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { ToastProps } from '../type'

type ToastState = { toasts: ToastProps[] }

const initialState: ToastState = { toasts: [] }

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    pushToast(state, action: PayloadAction<Omit<ToastProps, 'id'>>) {
      state.toasts.push({ id: String(Date.now()), ...action.payload })
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload)
    },
  },
})

export const { pushToast, removeToast } = toastSlice.actions
export default toastSlice.reducer

