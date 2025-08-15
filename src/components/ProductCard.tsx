import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string, quantity: number) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
  };

  return (
    <Card className="group hover:shadow-medium transition-all duration-300 bg-gradient-card border-border/50">
      <CardContent className="p-0">
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 space-y-3">
        <div className="w-full">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Quantidade
          </label>
          <Select value={quantity.toString()} onValueChange={(value) => setQuantity(parseInt(value))}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
