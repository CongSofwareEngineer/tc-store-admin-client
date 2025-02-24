import { toast } from 'react-toastify';

export const copyToClipboard = (text: any) => {
	const tmp = document.createElement('input');
	tmp.value = text;
	document.body.appendChild(tmp);
	tmp.select();
	document.execCommand('copy');
	tmp.remove();
};

export const showNotificationError = (errorMessage = '', autoClose = 5000) => {
	toast.error(errorMessage, {
		position: 'top-right',
		autoClose,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};

export const showNotificationSuccess = (message = '', autoClose = 5000) => {
	toast.success(message, {
		position: 'top-right',
		autoClose,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};
