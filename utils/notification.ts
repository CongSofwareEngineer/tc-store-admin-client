import { message, notification } from 'antd'
import { toast } from 'react-toastify'

export const copyToClipboard = (text: any) => {
  const tmp = document.createElement('input')
  tmp.value = text
  document.body.appendChild(tmp)
  tmp.select()
  document.execCommand('copy')
  tmp.remove()
  message.success({
    type: 'success',
    content: 'Copied',
  })
}

export const showNotification = (title = null, description = '') => {
  const params: any = {
    placement: 'bottomRight',
    className: 'notification-class',
    bottom: 54,
    duration: 5,
  }
  if (title) {
    params.message = title
  }
  if (description) {
    params.description = description
  }
  notification.open(params)
}

export const showNotificationError = (errorMessage = '', autoClose = 5000) => {
  toast.error(errorMessage, {
    position: 'top-right',
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

export const showNotificationSuccess = (message = '', autoClose = 5000) => {
  toast.success(message, {
    position: 'top-right',
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}
