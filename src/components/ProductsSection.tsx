import ProductCard from "./ProductCard";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import productMug from "@/assets/product-mug.jpg";
import productJewelry from "@/assets/product-jewelry.jpg";
import productSoap from "@/assets/product-soap.jpg";

const products = [
  {
    id: 1,
    name: "Caneca Artesanal Brasileira",
    price: 45.90,
    image: productMug,
    description: "Linda caneca de cerâmica com padrões brasileiros tradicionais"
  },
  {
    id: 2,
    name: "Colar com Pedras Naturais",
    price: 89.90,
    image: productJewelry,
    description: "Colar artesanal com pedras naturais brasileiras"
  },
  {
    id: 3,
    name: "Sabonetes Naturais Kit",
    price: 32.90,
    image: productSoap,
    description: "Kit com 3 sabonetes artesanais com ingredientes naturais"
  },
  {
    id: 4,
    name: "Caneca Premium",
    price: 65.90,
    image: productMug,
    description: "Versão premium da nossa caneca mais vendida"
  },
  {
    id: 5,
    name: "Conjunto de Joias",
    price: 159.90,
    image: productJewelry,
    description: "Conjunto completo: colar, brincos e pulseira"
  },
  {
    id: 6,
    name: "Sabonetes Premium",
    price: 54.90,
    image: productSoap,
    description: "Kit premium com 5 sabonetes de ingredientes especiais"
  }
];

const ProductsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<string>("");
  const { toast } = useToast();

  const handleAddToCart = (productId: number, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setLastAddedProduct(product.name);
      setIsModalOpen(true);
      toast({
        title: "Produto adicionado!",
        description: `${quantity}x ${product.name} foi adicionado ao carrinho.`,
      });
    }
  };

  const continueShopping = () => {
    setIsModalOpen(false);
  };

  const goToCart = () => {
    setIsModalOpen(false);
    // Implementar navegação para o carrinho quando tiver backend
    toast({
      title: "Redirecionando...",
      description: "Funcionalidade do carrinho será implementada com a integração Supabase.",
    });
  };

  return (
    <section className="py-16 bg-muted/30" id="produtos">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nossos Produtos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubra nossa coleção especial de produtos artesanais brasileiros, 
            feitos com carinho e ingredientes de qualidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      {/* Modal de Confirmação */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-primary">
              Produto adicionado com sucesso!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <p className="text-foreground">
              <strong>{lastAddedProduct}</strong> foi adicionado ao seu carrinho.
            </p>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={continueShopping} className="w-full sm:w-auto">
              Continuar Comprando
            </Button>
            <Button onClick={goToCart} className="w-full sm:w-auto bg-gradient-primary">
              Ir para o Carrinho
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductsSection;