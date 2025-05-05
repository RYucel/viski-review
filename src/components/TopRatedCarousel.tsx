import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import WhiskeyCard from './WhiskeyCard';

interface TopRatedCarouselProps {
  whiskeys: any[];
  loading: boolean;
}

const TopRatedCarousel: React.FC<TopRatedCarouselProps> = ({ whiskeys, loading }) => {
  const topRatedWhiskeys = [...whiskeys].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  };
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let interval: number | undefined;
    if (autoplay) {
      interval = window.setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentIndex, autoplay, topRatedWhiskeys.length, itemsPerView]);

  // Eğer hiç viski yoksa veya topRatedWhiskeys.length === 0 ise alanı gizle
  if (!whiskeys || whiskeys.length === 0 || topRatedWhiskeys.length === 0) {
    return null;
  }
  // Eğer hiç kart yoksa veya loading ise, carousel alanı render edilmesin
  if (loading || topRatedWhiskeys.length === 0) {
    return null;
  }

  const totalSlides = Math.ceil(topRatedWhiskeys.length / itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  return (
    <section className="py-8 md:py-12 bg-grain-texture bg-cover bg-center bg-opacity-10 relative">
      <div className="absolute inset-0 bg-whiskey-dark/95"></div>
      <div className="container-custom relative">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">En Yüksek Puanlı Viskiler</h2>
          <p className="text-whiskey-light/70 text-sm md:text-base">Damak tadınızı etkileyecek seçkin tadımlar</p>
        </div>
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button 
            onClick={prevSlide} 
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-whiskey-dark/80 hover:bg-whiskey-dark text-whiskey-light p-1 md:p-2 rounded-full"
            aria-label="Previous slide"
            style={{width: 32, height: 32}}
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={nextSlide} 
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-whiskey-dark/80 hover:bg-whiskey-dark text-whiskey-light p-1 md:p-2 rounded-full"
            aria-label="Next slide"
            style={{width: 32, height: 32}}
          >
            <ChevronRight size={18} />
          </button>
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div 
                  key={slideIndex} 
                  className="min-w-full flex gap-3 md:gap-6 items-stretch"
                >
                  {topRatedWhiskeys
                    .slice(
                      slideIndex * itemsPerView, 
                      slideIndex * itemsPerView + itemsPerView
                    )
                    .map(whiskey => (
                      <div key={whiskey.id} className="flex-1 flex flex-col">
                        <div className="card flex-1 flex flex-col p-2 md:p-4 justify-between">
                          <div className="flex flex-col items-center">
                            <img 
                              src={whiskey.imageUrl} 
                              alt={whiskey.name} 
                              className="w-auto h-32 md:h-40 object-contain mb-2"
                              style={{maxHeight: '10rem'}}
                            />
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-whiskey-amber uppercase tracking-wider">
                                {whiskey.type}
                              </span>
                              <span className="text-xs text-whiskey-light/50">
                                {whiskey.origin}
                              </span>
                            </div>
                            <div className="font-heading text-base md:text-lg font-bold text-center mb-1 line-clamp-2">
                              {whiskey.name}
                            </div>
                            <div className="text-xs text-whiskey-light/70 text-center mb-2 line-clamp-2">
                              {whiskey.excerpt}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-auto pt-2">
                            <div className="flex items-center">
                              <div className="w-14 rating-bar mr-2">
                                <div className="rating-fill" style={{ width: `${whiskey.rating}%` }}></div>
                              </div>
                              <span className="text-xs font-medium">{whiskey.rating}/100</span>
                            </div>
                            <span className="text-whiskey-gold font-medium text-xs">
                              {whiskey.price} ₺
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center space-x-2 mt-4 md:mt-6">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index ? 'w-6 bg-whiskey-amber' : 'w-2 bg-whiskey-light/20'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopRatedCarousel;