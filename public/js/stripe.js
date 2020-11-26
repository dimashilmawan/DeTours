/* eslint-disable */
import { showAlert } from './alert';
import axios from 'axios';

const stripe = Stripe(
  'pk_test_51HZnyzAPu1NQnXrM53nTSQ05eVkOLEhGDlYfVsaL359XhcH61GpD2SxOeRAqYjkWmYXOlvbF55d1Ur3BEcBE9rqQ00ZxnjsAHs'
);

export const bookTour = async tourId => {
  try {
    // 1. Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    showAlert('error', err);
  }
};
