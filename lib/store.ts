import { create } from "zustand";

export interface CartItem {
  title: string;
  format: string;
  qty: number;
  price: number; // in paise
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (title: string) => void;
  updateQty: (title: string, qty: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (item, qty = 1) => {
    const items = get().items;
    const existing = items.find(
      (i) => i.title === item.title && i.format === item.format
    );
    if (existing) {
      set({
        items: items.map((i) =>
          i.title === item.title && i.format === item.format
            ? { ...i, qty: Math.min(i.qty + qty, 5) }
            : i
        ),
      });
    } else {
      set({ items: [...items, { ...item, qty }] });
    }
  },
  removeItem: (title) => {
    set({ items: get().items.filter((i) => i.title !== title) });
  },
  updateQty: (title, qty) => {
    if (qty <= 0) {
      get().removeItem(title);
      return;
    }
    set({
      items: get().items.map((i) =>
        i.title === title ? { ...i, qty: Math.min(qty, 5) } : i
      ),
    });
  },
  clearCart: () => set({ items: [] }),
  toggleCart: () => set({ isOpen: !get().isOpen }),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
}));
