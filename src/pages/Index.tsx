import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ProductsSection from "@/components/ProductsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background" id="inicio">
      <Header />
      <main>
        <HeroCarousel />
        <ProductsSection />
        <section className="py-16 bg-background" id="sobre">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Sobre a Lojinha das Graças
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-muted-foreground text-lg mb-6">
                Nascemos do amor pela cultura brasileira e pela arte de criar produtos únicos. 
                Nossa missão é levar até você o melhor do artesanato brasileiro, 
                com produtos feitos à mão por artesãos talentosos de todo o país.
              </p>
              <p className="text-muted-foreground text-lg">
                Cada produto é cuidadosamente selecionado e carrega consigo a história, 
                tradição e o carinho de quem o fez. Valorizamos o trabalho artesanal 
                e acreditamos na beleza das coisas feitas com as mãos.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
