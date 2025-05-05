import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Calendar, Tag, Bookmark } from 'lucide-react';
import AromaProfile from '../components/AromaProfile';
import { supabase } from '../lib/supabase';

const ReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [whiskey, setWhiskey] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWhiskey = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('whiskeys')
        .select('*')
        .eq('id', id)
        .single();
      if (data) {
        // Map DB fields to frontend fields
        setWhiskey({
          ...data,
          imageUrl: data.image_url,
          fullReview: data.full_review,
          reviewDate: data.review_date,
          aromas: [], // Optionally fetch aromas separately
        });
      } else {
        setWhiskey(null);
      }
      setLoading(false);
    };
    fetchWhiskey();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Yükleniyor...</div>;
  }

  if (!whiskey) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold mb-4">İnceleme bulunamadı</h2>
          <p className="mb-6 text-whiskey-light/70">Aradığınız viski incelemesi mevcut değil.</p>
          <button 
            onClick={() => navigate(-1)} 
            className="btn-primary"
          >
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Back Link */}
        <Link 
          to="/catalog" 
          className="inline-flex items-center text-whiskey-light/70 hover:text-whiskey-amber mb-8 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          <span>Tüm İncelemeler</span>
        </Link>
        
        {/* Review Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-start gap-2 mb-4">
            <span className="bg-whiskey-dark-lighter text-whiskey-amber px-3 py-1 rounded-full text-sm">
              {whiskey.type}
            </span>
            <span className="bg-whiskey-dark-lighter text-whiskey-light/70 px-3 py-1 rounded-full text-sm">
              {whiskey.origin}
            </span>
          </div>
          
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {whiskey.name}
          </h1>
          
          <p className="text-xl text-whiskey-light/80 md:w-3/4 leading-relaxed">
            {whiskey.excerpt}
          </p>
        </div>
        
        {/* Review Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image */}
            <div className="mb-10 bg-whiskey-dark-lighter rounded-lg overflow-hidden">
              <img 
                src={whiskey.imageUrl} 
                alt={whiskey.name} 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            
            {/* Rating */}
            <div className="bg-whiskey-dark-lighter rounded-lg p-6 mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-whiskey-amber text-whiskey-dark h-12 w-12 rounded-full flex items-center justify-center">
                  <Star size={24} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold">Genel Değerlendirme</h3>
                  <p className="text-whiskey-light/70">100 üzerinden puanlama</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="text-4xl font-bold">{whiskey.rating}</div>
                <div className="w-full h-3 rounded-full bg-whiskey-dark overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-whiskey-amber to-whiskey-gold"
                    style={{ width: `${whiskey.rating}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-whiskey-light/70 mb-1">Karakter</h4>
                  <div className="h-2 w-full bg-whiskey-dark rounded-full overflow-hidden mb-1">
                    <div 
                      className="h-full bg-whiskey-amber"
                      style={{ width: `${whiskey.character}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-whiskey-light/50">
                    <span>Hafif</span>
                    <span>Yoğun</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-whiskey-light/70 mb-1">Kompleksite</h4>
                  <div className="h-2 w-full bg-whiskey-dark rounded-full overflow-hidden mb-1">
                    <div 
                      className="h-full bg-whiskey-amber"
                      style={{ width: `${whiskey.complexity}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-whiskey-light/50">
                    <span>Basit</span>
                    <span>Kompleks</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-whiskey-light/70 mb-1">Denge</h4>
                  <div className="h-2 w-full bg-whiskey-dark rounded-full overflow-hidden mb-1">
                    <div 
                      className="h-full bg-whiskey-amber"
                      style={{ width: `${whiskey.balance}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-whiskey-light/50">
                    <span>Dengesiz</span>
                    <span>Dengeli</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-whiskey-light/70 mb-1">Bitiş</h4>
                  <div className="h-2 w-full bg-whiskey-dark rounded-full overflow-hidden mb-1">
                    <div 
                      className="h-full bg-whiskey-amber"
                      style={{ width: `${whiskey.finish}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-whiskey-light/50">
                    <span>Kısa</span>
                    <span>Uzun</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Review Text */}
            <div className="mb-10">
              <h2 className="font-heading text-2xl font-bold mb-6">İnceleme</h2>
              
              <div className="prose prose-invert max-w-none prose-p:text-whiskey-light/90 prose-headings:font-heading prose-headings:text-whiskey-light prose-strong:text-whiskey-amber">
                <p>
                  {whiskey.fullReview || `${whiskey.name}, ${whiskey.origin} bölgesinden gelen, ${whiskey.age} yıllık olgunlaşma süreciyle dikkat çeken bir ${whiskey.type}. İlk bakışta, şişesinin zarif tasarımı ve amber rengindeki sıvısı, içindeki kaliteyi yansıtıyor.`}
                </p>
                
                <h3>Görünüm</h3>
                <p>
                  Derin amber tonları, kadehte ışığı mükemmel şekilde yansıtıyor. Yavaşça çevirdiğinizde, kadeh kenarlarında oluşan "bacaklar" yağlı ve kaliteli bir içime işaret ediyor.
                </p>
                
                <h3>Burun</h3>
                <p>
                  İlk koklamada, vanilya ve karamel tonları öne çıkıyor. Ardından meşe fıçıların verdiği ahşap notaları ve hafif baharatlı dokunuşlar hissediliyor. Derinliklerinde, kuru meyve notaları sezilebiliyor.
                </p>
                
                <h3>Damak</h3>
                <p>
                  İlk yudumda tatlı bir giriş yaparak damağı karşılıyor. Orta kısımda baharat ve meşe tonları belirginleşiyor. Her yudumla farklı katmanlar açılıyor: önce bal ve karamel tatlılığı, ardından hafif narenciye ve bitkisel notalar.
                </p>
                
                <h3>Bitiş</h3>
                <p>
                  Uzun ve sıcak bir bitişe sahip. Baharatlı notalar ve hafif bir tütsülenmiş karakter, bitişte belirginleşiyor ve damakta kalıcı bir iz bırakıyor.
                </p>
                
                <h3>Değerlendirme</h3>
                <p>
                  {whiskey.name}, fiyat-performans oranı göz önüne alındığında koleksiyonunuzda bulunması gereken bir viski. Karakteri, kompleksitesi ve dengesi ile öne çıkan bu viski, hem yeni başlayanlar hem de tecrübeli viski severler için ideal bir seçim.
                </p>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Info Card */}
            <div className="bg-whiskey-dark-lighter rounded-lg p-6 mb-8">
              <h3 className="font-heading text-xl font-bold mb-4">Ürün Bilgileri</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-whiskey-amber mr-3 mt-1">
                    <Tag size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium">Fiyat</h4>
                    <p className="text-whiskey-light/70">{whiskey.price} ₺</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-whiskey-amber mr-3 mt-1">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium">Yaş</h4>
                    <p className="text-whiskey-light/70">{whiskey.age || 'Belirtilmemiş'}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-whiskey-amber mr-3 mt-1">
                    <Bookmark size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium">Alkol Oranı</h4>
                    <p className="text-whiskey-light/70">{whiskey.abv}%</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-whiskey-amber mr-3 mt-1">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium">İnceleme Tarihi</h4>
                    <p className="text-whiskey-light/70">{whiskey.reviewDate || '12 Mayıs 2023'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Aroma Profile */}
            <AromaProfile aromas={whiskey.aromas} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;