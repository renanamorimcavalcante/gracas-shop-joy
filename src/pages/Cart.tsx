"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { Link } from "react-router-dom"
import productMug from "@/assets/product-mug.jpg"
import productJewelry from "@/assets/product-jewelry.jpg"
import productSoap from "@/assets/product-soap.jpg"

const imageMap: { [key: string]: string } = {
  "/src/assets/product-mug.jpg": productMug,
  "/src/assets/product-jewelry.jpg": productJewelry,
  "/src/assets/product-soap.jpg": productSoap,
}

const Cart = () => {
  const { items, loading, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart()

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-lg p-4">
                <div className="flex gap-4">
                  <div className="bg-muted h-20 w-20 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="bg-muted h-4 rounded w-1/2"></div>
                    <div className="bg-muted h-4 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Seu carrinho está vazio</h2>
          <p className="text-muted-foreground mb-6">Adicione alguns produtos incríveis ao seu carrinho!</p>
          <Link to="/">
            <Button className="bg-gradient-primary">Continuar Comprando</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Meu Carrinho</h1>
        <Button variant="outline" onClick={clearCart} className="text-destructive bg-transparent">
          <Trash2 className="w-4 h-4 mr-2" />
          Limpar Carrinho
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={imageMap[item.product.image_url] || productMug}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">R$ {item.product.price.toFixed(2)}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive ml-2"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Itens ({totalItems})</span>
                <span>R$ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span className="text-green-600">Grátis</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">R$ {totalPrice.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-gradient-primary" size="lg">
                Finalizar Compra
              </Button>
              <Link to="/">
                <Button variant="outline" className="w-full bg-transparent">
                  Continuar Comprando
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Cart
