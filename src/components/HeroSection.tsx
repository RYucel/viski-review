import React from 'react';
import { GlassWater, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video with Overlay */}
      <video
        id="background-video"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        autoPlay
        loop
        muted
        playsInline
        style={{ opacity: 'var(--hero-video-opacity, 1)' }}
      >
        <source src="/videos/Viski.mp4" type="video/mp4" />
      </video>
      {/* Overlay: dark modda koyu, light modda beyaz tint */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'var(--hero-overlay-bg, rgba(25,24,21,0.85))',
        }}
      ></div>
      
      {/* Content */}
      <div className="container-custom relative z-20 pt-24 pb-16">
        <div className="max-w-2xl slide-up p-0 bg-transparent shadow-none">
          <div className="flex items-center space-x-2 text-whiskey-amber mb-4">
            <GlassWater size={24} strokeWidth={1.5} />
            <h3 className="font-heading font-semibold">Viski Dünyasına Hoş Geldiniz</h3>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Tutkuyla Sunulan <br />
            <span className="text-whiskey-amber">Viski İncelemeleri</span>
          </h1>
          <p className="text-lg text-whiskey-light/80 mb-8 leading-relaxed dark:text-whiskey-light/80 text-whiskey-dark/80">
            KKTC'nin en kapsamlı viski değerlendirme platformuna hoş geldiniz. 
            Her damlanın hikayesini, karakterini ve lezzet profilini keşfedin.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/catalog" className="btn-primary">
              <span>İncelemelere Göz Atın</span>
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to="/about" className="btn-outline">
              Metodolojimizi Keşfedin
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-whiskey-dark to-transparent z-20"></div>
    </section>
  );
};

export default HeroSection;