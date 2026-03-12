import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/store';
import { removeToast } from '../slices/toast-slice';
import Toast from './theme/themed-toaster';

export default function ToastContainer() {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((s) => s.toast.toasts);

  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          visible={true}
          title={toast.title}
          description={toast.description}
          onHide={() => dispatch(removeToast(toast.id))}
        />
      ))}
    </>
  );
}
