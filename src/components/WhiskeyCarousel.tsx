import React, { useRef, useEffect, useState } from 'react';
import { Whiskey } from '../types/whiskey';
import WhiskeyCard from './WhiskeyCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WhiskeyCarouselProps {
  whiskeys: Whiskey[];
  loading: boolean;
  title?: string;
}

const WhiskeyCarousel: React.FC<WhiskeyCarouselProps> = ({ whiskeys, loading, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  
  // Ekran boyutuna göre görünür kart sayısını ayarla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(4); // Desktop için 4 kart göster
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Otomatik kaydırma
  useEffect(() => {
    if (whiskeys.length <= visibleCount) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex, whiskeys.length, visibleCount]);
  
  const nextSlide = () => {
    if (whiskeys.length <= visibleCount) return;
    
    setActiveIndex((prev) => 
      prev === whiskeys.length - visibleCount ? 0 : prev + 1
    );
  };
  
  const prevSlide = () => {
    if (whiskeys.length <= visibleCount) return;
    
    setActiveIndex((prev) => 
      prev === 0 ? whiskeys.length - visibleCount : prev - 1
    );
  };
  
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-whiskey-dark-lighter rounded w-1/4 mb-6"></div>
        <div className="flex justify-center gap-6">
          {Array(Math.min(visibleCount, 4)).fill(0).map((_, i) => (
            <div key={i} className="w-[280px] h-[400px] bg-whiskey-dark-lighter rounded"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (whiskeys.length === 0) {
    return null;
  }
  
  // 4 veya daha az viski varsa, carousel yerine flex kullan
  if (whiskeys.length <= visibleCount) {
    return (
      <div>
        {title && <h2 className="text-2xl font-heading font-bold mb-6">{title}</h2>}
        <div className="flex justify-center flex-wrap gap-6">
          {whiskeys.map((whiskey) => (
            <div key={whiskey.id} className="w-[280px]">
              <WhiskeyCard whiskey={whiskey} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div>
      {title && <h2 className="text-2xl font-heading font-bold mb-6">{title}</h2>}
      
      <div className="relative group">
        <div className="overflow-hidden">
          <div className="flex justify-center">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${activeIndex * (100 / Math.min(whiskeys.length, visibleCount))}%)`,
                width: `${Math.min(whiskeys.length, visibleCount) * 280 + (Math.min(whiskeys.length, visibleCount) - 1) * 24}px`
              }}
            >
              {whiskeys.map((whiskey) => (
                <div 
                  key={whiskey.id} 
                  className="carousel-item flex-shrink-0 w-[280px] mx-3"
                >
                  <WhiskeyCard whiskey={whiskey} />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide} 
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-whiskey-dark/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-4 z-10"
          aria-label="Previous"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={nextSlide} 
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-whiskey-dark/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mr-4 z-10"
          aria-label="Next"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Carousel Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: Math.max(1, whiskeys.length - visibleCount + 1) }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === activeIndex ? 'bg-whiskey-amber' : 'bg-whiskey-amber/30 hover:bg-whiskey-amber/50'
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default WhiskeyCarousel;