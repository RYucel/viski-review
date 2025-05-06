import React, { useEffect, useState } from 'react';
import { GlassWater, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  // Tema değişikliğini algıla
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    
    checkTheme();
    
    // Tema değişikliğini dinle
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);
  
  // Use the exact Cloudinary URLs provided by the user
  const darkVideoUrl = "https://asset.cloudinary.com/doc39f04b/63fb307205d371fd783bf38145fe58e9";
  const lightVideoUrl = "https://asset.cloudinary.com/doc39f04b/07207c74ae917cfc2647498d315e3d10";
  
  // Temaya göre video URL'ini belirle
  const videoUrl = isDarkMode ? darkVideoUrl : lightVideoUrl;

  // Video yükleme ve hata işleme
  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    console.error("Video yüklenirken hata oluştu:", videoUrl);
    setVideoError(true);
  };
  
  // Statik arka plan resmi (video yüklenemezse)
  const fallbackImage = isDarkMode 
    ? "https://images.pexels.com/photos/5582863/pexels-photo-5582863.jpeg?auto=compress&cs=tinysrgb&w=1920"
    : "https://images.pexels.com/photos/5582861/pexels-photo-5582861.jpeg?auto=compress&cs=tinysrgb&w=1920";
  
  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Video arka plan */}
      {!videoError && (
        <video 
          id="background-video"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 video-background"
          autoPlay 
          muted 
          loop 
          playsInline
          key={videoUrl}
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
      
      {/* Yedek statik arka plan (video yüklenemezse) */}
      {videoError && (
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0 animate-slow-zoom"
          style={{ backgroundImage: `url(${fallbackImage})` }}
        ></div>
      )}
      
      {/* Overlay: dark modda koyu, light modda beyaz tint */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: isDarkMode 
            ? 'rgba(25,24,21,0.85)' 
            : 'rgba(255,255,255,0.65)',
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