import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@clerk/nextjs';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart } from '@/store/cartSlice';
import { useRouter } from 'next/navigation';
import { checkoutSchema } from '@/lib/validations';
import { CheckoutFormData } from '@/types/index';

export const useCheckout = () => {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      phone: ''
    }
  });

  useEffect(() => {
    if (isLoaded && user) {
      form.setValue('firstName', user.firstName || '');
      form.setValue('lastName', user.lastName || '');
      form.setValue('email', user.primaryEmailAddress?.emailAddress || '');
    }
  }, [user, isLoaded, form]);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const onSubmit: SubmitHandler<CheckoutFormData> = async (data) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          total: totalPrice,
          email: data.email,
          clerkId: user?.id,
          customerName: `${data.firstName} ${data.lastName}`,
          shippingDetails: data,
        }),
      });

      if (response.ok) {
        dispatch(clearCart());
        router.push('/checkout/success');
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  return { items, totalPrice, form, onSubmit, isLoaded, user };
};