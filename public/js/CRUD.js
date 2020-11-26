/* eslint-disable */
import { showAlertAdmin, showAlert } from './alert';
import axios from 'axios';

export const addDB = async (data, DB) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/${DB}/`,
      data
    });
    if (res.data.status === 'success') {
      showAlertAdmin('success', `Successfully`);
    }
    window.setTimeout(() => {
      location.reload();
    }, 1000);
  } catch (err) {
    showAlertAdmin('error', err.response.data.message);
  }
};

export const editDB = async (data, DB, id) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/${DB}/${id}`,
      data
    });
    if (res.data.status === 'success') {
      showAlertAdmin('success', `Successfully`);
    }
    window.setTimeout(() => {
      location.assign(`/admin/${DB}/`);
    }, 1000);
  } catch (err) {
    showAlertAdmin('error', err.response.data.message);
  }
};

export const deleteDB = async (ID, DB) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/${DB}/${ID}`
    });
    if (res.status === 204) {
      return 'success';
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
