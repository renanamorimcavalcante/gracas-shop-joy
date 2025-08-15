import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import heroBanner from "@/assets/hero-banner.jpg";

const slides = [
  {
    id: 1,
    image: heroBanner,
    title: "Bem-vindos à Lojinha das Graças",
    subtitle: "Produtos artesanais brasileiros com carinho especial",
    cta: "Ver Produtos"
  },
  {
    id: 2,
    image: heroBanner,
    title: "Promoção Especial",
    subtitle: "Até 30% de desconto em produtos selecionados",
    cta: "Aproveitar Oferta"
  },
  {
    id: 3,
    image: heroBanner,
    title: "Novidades da Semana",
    subtitle: "Confira os últimos lançamentos da nossa coleção",
    cta: "Descobrir"
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-full flex-shrink-0 relative"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative h-full flex items-center justify-center text-center">
              <div className="max-w-2xl mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-8">
                  {slide.subtitle}
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-medium"
                >
                  {slide.cta}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30"
        onClick={nextSlide}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
