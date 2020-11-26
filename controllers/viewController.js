const Tour = require('./../models/tourModel');
const User = require('./../models/userModel');
const Booking = require('./../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.alert = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking') res.locals.alert = 'Your booking was successful';
  next();
};

exports.getIndex = catchAsync(async (req, res, next) => {
  res.status(200).render('index', {
    title: 'DeTours'
  });
});

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1. Get tour data from collection
  const tours = await Tour.find();

  // 2. Render that template using tour data from 1.
  res.status(200).render('overview', {
    title: 'All tour',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1. Get data for the requested tour
  const tour = await Tour.findOne({ slug: req.params.slug });
  if (!tour) {
    return next(new AppError('There is no tour with that name', 404));
  }

  // 2. Render that template using tour data from 1.
  res.status(200).render('tour-detail', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getLogin = (req, res, next) => {
  res.status(200).render('login', {
    title: `Login`
  });
};

exports.getSignup = (req, res, next) => {
  res.status(200).render('signup', {
    title: `Signup`
  });
};

exports.forgotPassword = (req, res, next) => {
  res.status(200).render('forgotPassword', {
    title: 'Reset Password'
  });
};

exports.resetPassword = (req, res, next) => {
  const { token } = req.params;
  res.status(200).render('resetPassword', {
    title: 'Reset Password',
    token
  });
};

// ADMIN
exports.getDashboard = catchAsync(async (req, res, next) => {
  const users = await User.find();
  const tours = await Tour.find();
  const bookings = await Booking.find();
  res.status(200).render('admin/dashboard', {
    active: 'dashboard',
    users,
    tours,
    bookings
  });
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).render('admin/users', {
    active: `users`,
    users
  });
});

exports.getTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render('admin/tours', {
    active: `tours`,
    tours
  });
});

exports.getBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find();
  res.status(200).render('admin/bookings', {
    active: `bookings`,
    bookings
  });
});

exports.getAddUser = (req, res, next) => {
  res.status(200).render('admin/addUser', {
    active: `users`
  });
};

exports.getEditUser = catchAsync(async (req, res, next) => {
  const userEdit = await User.findById(req.params.id);
  res.status(200).render('admin/editUser', {
    active: `users`,
    userEdit
  });
});

exports.getAddTour = (req, res, next) => {
  res.status(200).render('admin/addTour', {
    active: `tours`,
    title: `Add Tour`
  });
};

exports.getEditTour = catchAsync(async (req, res, next) => {
  const tourEdit = await Tour.findById(req.params.id);
  res.status(200).render('admin/editTour', {
    active: `tours`,
    tourEdit
  });
});

exports.getAddBooking = catchAsync(async (req, res, next) => {
  const users = await User.find();
  const tours = await Tour.find();
  res.status(200).render('admin/addBooking', {
    active: `bookings`,
    users,
    tours
  });
});
