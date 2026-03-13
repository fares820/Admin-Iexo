import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
export { createClient }

export type Product = {
  id: number
  ProductName: string
  Price: string
  category: string
  servings: string
  description: string
  ProductImages: string
  Simple_Price?: string
  Flavors?: string
}

export type CartItem = {
  id: number
  product: Product
  selectedServing: { label: string; price: string }
  selectedFlavor?: string
  quantity: number
}

export type ServingOption = {
  label: string
  price: string
  stock?: number
}