"use client"

import ProductCard from "./ProductCard"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { useCart } from "@/hooks/useCart"
import { useNavigate } from "react-router-dom"
import productMug from "@/assets/product-mug.jpg"
import productJewelry from "@/assets/product-jewelry.jpg"
import productSoap from "@/assets/product-soap.jpg"

interface Product {
  id: string
  name: string
  price: number
  image_url: string
  description: string
  stock_quantity: number
}

const imageMap: { [key: string]: string } = {
  "/src/assets/product-mug.jpg": productMug,
  "/src/assets/product-jewelry.jpg": productJewelry,
  "/src/assets/product-soap.jpg": productSoap,
}

const ProductsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [lastAddedProduct, setLastAddedProduct] = useState<string>("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { user } = useAuth()
  const { fetchCartItems } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os produtos.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async (productId: string, quantity: number) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para adicionar produtos ao carrinho.",
        variant: "destructive",
      })
      return
    }

    const product = products.find((p) => p.id === productId)
    if (!product) return

    try {
      // Verificar se já existe no carrinho
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .single()

      if (existingItem) {
        // Atualizar quantidade
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity + quantity })
          .eq("id", existingItem.id)

        if (error) throw error
      } else {
        // Adicionar novo item
        const { error } = await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: productId,
          quantity,
        })

        if (error) throw error
      }

      await fetchCartItems()

      setLastAddedProduct(product.name)
      setIsModalOpen(true)
      toast({
        title: "Produto adicionado!",
        description: `${quantity}x ${product.name} foi adicionado ao carrinho.`,
      })
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o produto ao carrinho.",
        variant: "destructive",
      })
    }
  }

  const continueShopping = () => {
    setIsModalOpen(false)
  }

  const goToCart = () => {
    setIsModalOpen(false)
    navigate("/cart")
  }

  return (
    <section className="py-16 bg-muted/30" id="produtos">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nossos Produtos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubra nossa coleção especial de produtos artesanais brasileiros, feitos com carinho e ingredientes de
            qualidade.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-lg p-4 animate-pulse">
                <div className="bg-muted h-48 rounded-lg mb-4"></div>
                <div className="bg-muted h-4 rounded mb-2"></div>
                <div className="bg-muted h-4 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: imageMap[product.image_url] || productMug,
                  description: product.description,
                }}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal de Confirmação */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-primary">Produto adicionado com sucesso!</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <p className="text-foreground">
              <strong>{lastAddedProduct}</strong> foi adicionado ao seu carrinho.
            </p>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={continueShopping} className="w-full sm:w-auto bg-transparent">
              Continuar Comprando
            </Button>
            <Button onClick={goToCart} className="w-full sm:w-auto bg-gradient-primary">
              Ir para o Carrinho
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default ProductsSection
