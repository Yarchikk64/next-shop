import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity } from '@/store/cartSlice';
import { useRouter } from 'next/navigation';

export const useCart = (onClose?: () => void) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items } = useAppSelector((state) => state.cart);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity: Math.max(1, quantity) }));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    if (onClose) onClose();
    router.push('/checkout');
  };

  return {
    items,
    totalPrice,
    handleUpdateQuantity,
    handleRemove,
    handleCheckout,
  };
};