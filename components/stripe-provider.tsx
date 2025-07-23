'use client';

import { loadStripe, Stripe } from '@stripe/stripe-js';
import { createContext, useContext, useEffect, useState } from 'react';

const StripeContext = createContext<Stripe | null>(null);

export const StripeProvider = ({ children }: { children: React.ReactNode }) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      const stripePromise = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
      );
      setStripe(stripePromise);
    };

    initializeStripe();
  }, []);

  return (
    <StripeContext.Provider value={stripe}>{children}</StripeContext.Provider>
  );
};

export const useStripe = () => {
  return useContext(StripeContext);
};
