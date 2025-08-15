"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "./useAuth"
import { useToast } from "./use-toast"

interface CartItem {
  id: string
  product_id: string
  quantity: number
  product: {
    id: string
    name: string
    price: number
    image_url: string
    description: string
  }
}

interface CartContextType {
  items: CartItem[]
  loading: boolean
  totalItems: number
  totalPrice: number
  fetchCartItems: () => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  clearCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const fetchCartItems = async () => {
    if (!user) {
      setItems([])
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          id,
          product_id,
          quantity,
          product:products (
            id,
            name,
            price,
            image_url,
            description
          )
        `)
        .eq("user_id", user.id)

      if (error) throw error
      setItems(data || [])
    } catch (error) {
      console.error("Erro ao buscar itens do carrinho:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar o carrinho.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(itemId)
      return
    }

    try {
      const { error } = await supabase.from("cart_items").update({ quantity }).eq("id", itemId)

      if (error) throw error
      await fetchCartItems()
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a quantidade.",
        variant: "destructive",
      })
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase.from("cart_items").delete().eq("id", itemId)

      if (error) throw error
      await fetchCartItems()
      toast({
        title: "Item removido",
        description: "Item removido do carrinho com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao remover item:", error)
      toast({
        title: "Erro",
        description: "Não foi possível remover o item.",
        variant: "destructive",
      })
    }
  }

  const clearCart = async () => {
    if (!user) return

    try {
      const { error } = await supabase.from("cart_items").delete().eq("user_id", user.id)

      if (error) throw error
      setItems([])
      toast({
        title: "Carrinho limpo",
        description: "Todos os itens foram removidos do carrinho.",
      })
    } catch (error) {
      console.error("Erro ao limpar carrinho:", error)
      toast({
        title: "Erro",
        description: "Não foi possível limpar o carrinho.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchCartItems()
  }, [user])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        totalItems,
        totalPrice,
        fetchCartItems,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
