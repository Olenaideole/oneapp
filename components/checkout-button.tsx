'use client';

import { useStripe } from './stripe-provider';

export const redirectToCheckout = async (stripe: any, priceId: string) => {
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
