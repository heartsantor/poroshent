import { toast } from 'react-toastify';

const position = {
  theme: 'light',
  position: 'top-right',
  autoClose: 2000
};

// alert message
export const toastAlert = (type, value) => {
  if (type === 'success') {
    toast.success(value, position);
  } else if (type === 'error') {
    toast.error(value, position);
  } else if (type === 'warning') {
    toast.warning(value, position);
  }
};
