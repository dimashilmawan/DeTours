/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { signup } from './signup';
import { forgotPassword, resetPassword } from './resetPassword';
import { bookTour } from './stripe';
import { showAlert } from './alert';
// ADMIN
import { addDB, editDB, deleteDB } from './CRUD';

// DOM ELEMENTS
const loginForm = document.querySelector('#login');
const logOutBtn = document.querySelector('#logout');
const forgotPasswordForm = document.querySelector('#forgot-password');
const signupForm = document.querySelector('#signup');
const resetPasswordForm = document.querySelector('#reset-password');
const bookBtn = document.getElementById('book-tour');

// ADMIN
const userForm = document.querySelector('#user-form');
const tourForm = document.querySelector('#tour-form');
const bookingForm = document.querySelector('#booking-form');
const deleteBtn = document.querySelectorAll('.btn-delete');

window.addEventListener('scroll', () => {
  document
    .querySelector('.navbar')
    .classList.toggle('sticky', window.scrollY > 0);
});

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn-forgot').textContent = 'Sending...';
    const email = document.getElementById('email');
    await forgotPassword(email.value);
    document.querySelector('.btn-forgot').textContent = 'Send';
    email.value = '';
  });
}

if (resetPasswordForm) {
  resetPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('#resetPassword').textContent = 'Reset Password...';
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('confirmPassword').value;
    const token = document.getElementById('resetPassword').dataset.token;
    await resetPassword(password, passwordConfirm, token);
    document.querySelector('#resetPassword').textContent = 'Reset Password';
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup({ name, email, password, passwordConfirm });
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', async e => {
    e.target.textContent = 'Processing';
    const { tourId } = e.target.dataset;
    await bookTour(tourId);
    e.target.textContent = 'Book tour now!';
  });
}

// ADMIN

// Add AND EDIT
if (userForm) {
  userForm.addEventListener('submit', async e => {
    e.preventDefault();
    let userId = document.querySelector('.userEdit');
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let passwordConfirm;
    let role = document.getElementById('role');
    if (userId) {
      userId = userId.value;
      name = name.value;
      email = email.value;
      role = role.value;
      return editDB({ name, email, role }, 'users', userId);
    }
    name = name.value;
    email = email.value;
    password = password.value;
    passwordConfirm = password;
    role = role.value;
    addDB({ name, email, password, passwordConfirm, role }, 'users');
  });
}

if (tourForm) {
  tourForm.addEventListener('submit', async e => {
    e.preventDefault();
    let tourId = document.querySelector('.tourEdit');
    // const imageArray = [...document.querySelectorAll('#image')];
    // const images = imageArray.map(i => i.files[0]);
    const images = document.querySelector('#images').files;
    const imageCover = document.querySelector('#imageCover').files[0];
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('description', document.getElementById('description').value);
    form.append('price', document.getElementById('price').value);
    form.append('duration', document.getElementById('duration').value);
    form.append('maxGroupSize', document.getElementById('maxGroupSize').value);
    form.append('startLoc', document.getElementById('startLoc').value);
    form.append('location', document.getElementById('location').value);
    form.append('startDate', document.getElementById('startDate').value);
    if (imageCover) form.append('imageCover', imageCover);
    if (images[0]) form.append('images', images[0]);
    if (images[1]) form.append('images', images[1]);
    if (images[2]) form.append('images', images[2]);
    if (tourId) {
      tourId = tourId.value;
      return editDB(form, 'tours', tourId);
    }
    addDB(form, 'tours');
  });
}

if (bookingForm) {
  bookingForm.addEventListener('submit', async e => {
    e.preventDefault();
    const tourElement = document.getElementById('tour');
    const user = document.getElementById('user').value;
    const tour = tourElement.value;
    const { price } = tourElement.options[tourElement.selectedIndex].dataset;
    addDB({ user, price, tour }, 'bookings');
  });
}
// Delete
if (deleteBtn) {
  deleteBtn.forEach(el => {
    el.addEventListener('click', async e => {
      const element = e.currentTarget;
      const parentElement = element.closest('tr');
      const { data } = element.dataset;
      const ID = data.split('-')[0];
      const DB = data.split('-')[1];
      const deleteResult = await deleteDB(ID, DB);
      if (deleteResult === 'success') {
        parentElement.parentNode.removeChild(parentElement);
      }
    });
  });
}

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage);
