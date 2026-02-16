import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Order } from '@/types';

export const useOrders = () => {
  const { user, isLoaded: userLoaded } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/user-orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    if (userLoaded && user) {
      fetchOrders();
    } else if (userLoaded && !user) {
      setLoading(false);
    }
  }, [user, userLoaded]);

  return { orders, loading: !userLoaded || loading, user };
};