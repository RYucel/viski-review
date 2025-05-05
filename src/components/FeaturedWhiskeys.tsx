import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhiskeyCard from './WhiskeyCard';

interface FeaturedWhiskeysProps {
  whiskeys: any[];
  loading: boolean;
}

const FeaturedWhiskeys: React.FC<FeaturedWhiskeysProps> = ({ whiskeys, loading }) => {
  const featuredWhiskeys = whiskeys.filter(whiskey => whiskey.featured).slice(0, 3);
  return (
    <section className="py-16 bg-whiskey-dark relative">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">Öne Çıkan İncelemeler</h2>
            <p className="text-whiskey-light/70">Dikkatimizi çeken ve sizi etkileyecek viskiler</p>
          </div>
          <Link 
            to="/catalog" 
            className="flex items-center mt-4 md:mt-0 text-whiskey-amber hover:text-whiskey-gold transition-colors group"
          >
            <span className="mr-2">Tümünü Görüntüle</span>
            <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8">
          {loading ? (
            <div className="text-center py-8">Yükleniyor...</div>
          ) : featuredWhiskeys.length > 0 ? (
            featuredWhiskeys.map((whiskey) => (
              <WhiskeyCard key={whiskey.id} whiskey={whiskey} featured={true} />
            ))
          ) : (
            <div className="text-center py-8 text-whiskey-light/70">Öne çıkan viski bulunamadı.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWhiskeys;