import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-soft">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">G</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">Lojinha das Graças</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#inicio" className="text-foreground hover:text-primary transition-colors font-medium">
            Início
          </a>
          <a href="#sobre" className="text-foreground hover:text-primary transition-colors font-medium">
            Sobre Nós
          </a>
          <a href="#contato" className="text-foreground hover:text-primary transition-colors font-medium">
            Contato
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
            <User className="w-4 h-4 mr-2" />
            Entrar
          </Button>
          <Button variant="outline" size="sm" className="relative">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Carrinho
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
              0
            </span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <a href="#inicio" className="text-foreground hover:text-primary transition-colors font-medium">
                Início
              </a>
              <a href="#sobre" className="text-foreground hover:text-primary transition-colors font-medium">
                Sobre Nós
              </a>
              <a href="#contato" className="text-foreground hover:text-primary transition-colors font-medium">
                Contato
              </a>
            </nav>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button variant="ghost" size="sm" className="justify-start">
                <User className="w-4 h-4 mr-2" />
                Entrar
              </Button>
              <Button variant="outline" size="sm" className="justify-start relative">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Carrinho (0)
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;