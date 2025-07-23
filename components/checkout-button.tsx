'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Button } from './ui/button';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export function CheckoutButton({ priceId }: { priceId: string }) {
  const handleClick = async () => {
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

  return <Button onClick={handleClick}>Buy Now</Button>;
}
