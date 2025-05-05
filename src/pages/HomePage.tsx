import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedWhiskeys from '../components/FeaturedWhiskeys';
import TopRatedCarousel from '../components/TopRatedCarousel';
import CategoryFilters from '../components/CategoryFilters';
import WhiskeyCarousel from '../components/WhiskeyCarousel';
import { supabase } from '../lib/supabase';
import { Whiskey } from '../types/whiskey';

const HomePage: React.FC = () => {
  const [whiskeys, setWhiskeys] = useState<Whiskey[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWhiskeys = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('whiskeys')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        setWhiskeys(data.map(w => ({
          ...w,
          imageUrl: w.image_url,
        })));
      }
      setLoading(false);
    };
    fetchWhiskeys();
  }, []);

  // Filter whiskeys with rating 80 and above for the top rated carousel
  const highRatedWhiskeys = whiskeys.filter(whiskey => whiskey.rating >= 80);

  // Değişiklik burada: slice(0, 4) kısmını kaldırıyoruz, böylece tüm viskiler gösterilecek
  const filteredWhiskeys = selectedCategory === 'Tümü'
    ? whiskeys
    : whiskeys.filter(whiskey => whiskey.type === selectedCategory);

  return (
    <div>
      <HeroSection />
      <FeaturedWhiskeys whiskeys={whiskeys} loading={loading} />
      <TopRatedCarousel whiskeys={highRatedWhiskeys} loading={loading} />
      <section className="py-8 bg-whiskey-dark">
        <CategoryFilters 
          whiskeys={whiskeys}
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
        <div className="container-custom">
          <WhiskeyCarousel 
            whiskeys={filteredWhiskeys} 
            loading={loading} 
            title="Kategoriler" 
          />
        </div>
      </section>
      <div className="mb-8"></div>
    </div>
  );
};

export default HomePage;