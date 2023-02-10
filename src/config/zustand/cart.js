import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import storageKeys from '../constants/storageKeys';

const useCart = create(
    persist((set, get) => ({
        products: [],
        addProduct: (product) => set(state => {
            const index = state.products.findIndex(p => p.id === product.id);
            if (index >= 0) {
                const products = [...state.products];
                products[index].quantity++;
                return { products };
            }
            return {
                products: [...state.products, { ...product, quantity: 1 }]
            }
        }),
        removeProduct: (product) => set(state => ({ products: state.products.filter(p => p.id !== product.id) })),
        modifyQuantity: (product, quantity) => set(state => {
            const index = state.products.findIndex(p => p.id === product.id);
            if (index >= 0) {
                const products = [...state.products];
                products[index].quantity = quantity;
                if (quantity === 0) return { products: state.products.filter(p => p.id !== product.id) };
                return { products };
            }
            return {
                products: [...state.products, { ...product, quantity }]
            }
        }),
        clear: () => set({ products: [] })
    }),
        {
            name: storageKeys.CART,
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export default useCart