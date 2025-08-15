import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre a Loja */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">G</span>
              </div>
              <h3 className="text-xl font-bold">Lojinha das Graças</h3>
            </div>
            <p className="text-background/80 mb-4">
              Produtos artesanais brasileiros feitos com carinho e ingredientes de qualidade. 
              Levamos o melhor do Brasil até você.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 hover:text-primary-light cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 hover:text-primary-light cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-background/80 hover:text-primary-light transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#produtos" className="text-background/80 hover:text-primary-light transition-colors">
                  Produtos
                </a>
              </li>
              <li>
                <a href="#sobre" className="text-background/80 hover:text-primary-light transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#contato" className="text-background/80 hover:text-primary-light transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div id="contato">
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-light" />
                <span className="text-background/80">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-light" />
                <span className="text-background/80">contato@lojinhadasgracas.com.br</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-light" />
                <span className="text-background/80">São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/60">
            © 2024 Lojinha das Graças. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
