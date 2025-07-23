'use client';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export const redirectToCheckout = async (priceId: string) => {
  const stripe = await stripePromise;
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ priceId }),
  });
  const { sessionId } = await response.json();
  await stripe?.redirectToCheckout({ sessionId });
};
