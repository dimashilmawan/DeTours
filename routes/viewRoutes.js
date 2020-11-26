const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');

const router = express.Router();

router.use(viewController.alert);
router.get('/', authController.isLoggedIn, viewController.getIndex);
router.get('/tours', authController.isLoggedIn, viewController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);
router.get('/my-tours', authController.protect, bookingController.getMyTours);
router.get('/login', authController.isLogIn, viewController.getLogin);
router.get('/signup', authController.isLogIn, viewController.getSignup);
router.get(
  '/forgot-password',
  authController.isLogIn,
  viewController.forgotPassword
);
router.get(
  '/reset-password/:token',
  authController.isLogIn,
  viewController.resetPassword
);

// ADMIN
router.get(
  '/admin',
  authController.protect,
  authController.restrictTo('admin'),
  viewController.getDashboard
);
router.get(
  '/admin/users',
  authController.protect,
  authController.restrictTo('admin'),
  viewController.getUsers
);
router.get(
  '/admin/tours',
  authController.protect,
  authController.restrictTo('admin'),
  viewController.getTours
);
router.get(
  '/admin/bookings',
  authController.protect,
  authController.restrictTo('admin'),
  viewController.getBookings
);
router.get(
  '/admin/users/add',
  authController.protect,
  authController.restrictTo('admin'),
  viewController.getAddUser
);
router.get(
  '/admin/users/edit/:id',
  authController.protect,
  authController.restrictTo('admin'),
  viewController.getEditUser
);
router.get(
  '/admin/tours/add',
  authController.protect,
  authController.restrictTo('admin'),
  viewController.getAddTour
);
router.get(
  '/admin/tours/edit/:id',
  authController.protect,
  authController.restrictTo('admin'),
  viewController.getEditTour
);
router.get(
  '/admin/bookings/add',
  authController.protect,
  authController.restrictTo('admin'),
  viewController.getAddBooking
);
module.exports = router;
