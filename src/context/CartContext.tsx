import React, { createContext, useContext, useState, ReactNode } from 'react'
import { CartItem, Product, ServingOption } from '../lib/supabase'

const CartContext = createContext<any>(undefined)
export const useCart = () => useContext(CartContext)

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (product: Product, selectedServing: ServingOption, quantity: number, selectedFlavor: string = '') => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedServing.label === selectedServing.label && item.selectedFlavor === selectedFlavor)
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + quantity } : item)
      }
      return [...prev, { id: Date.now(), product, selectedServing, selectedFlavor, quantity }]
    })
  }

  const getTotalPrice = () => cartItems.reduce((acc, item) => {
    const priceNum = parseFloat(item.selectedServing.price.replace(/[^\d.]/g, '')) || 0
    return acc + (priceNum * item.quantity)
  }, 0)

  const getTotalItems = () => cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cartItems, addToCart, getTotalPrice, getTotalItems }}>
      {children}
    </CartContext.Provider>
  )
}