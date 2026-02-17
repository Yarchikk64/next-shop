export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Order {
  id?: string;
  clerkId?: string | null;
  customerName: string;
  email: string;
  total: number;
  items: CartItem[]; 
  status: string;
  createdAt?: string;
}

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CartFooterProps {
  totalPrice: number;
  onCheckout: () => void;
  onClose: () => void;
}