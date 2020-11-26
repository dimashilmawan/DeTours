/* eslint-disable */
import { showAlert } from './alert';
import axios from 'axios';

export const signup = async data => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Thanks For Signing Up');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
