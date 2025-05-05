import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Whiskey } from '../types/whiskey';
import { supabase } from '../lib/supabase';

interface WhiskeyCardProps {
  whiskey: Whiskey;
  featured?: boolean;
}

const WhiskeyCard: React.FC<WhiskeyCardProps> = ({ whiskey, featured = false }) => {
  const [isEditor, setIsEditor] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsEditor(!!session);
    });
  }, []);

  if (featured) {
    return (
      <div className="card md:flex group">
        <Link 
          to={`/review/${whiskey.id}`}
          className="relative overflow-hidden md:w-1/2 block focus:outline-none"
          tabIndex={0}
        >
          <img 
            src={whiskey.imageUrl} 
            alt={whiskey.name} 
            className="w-full h-64 md:h-72 object-contain object-center bg-whiskey-dark-lighter transition-transform duration-700 group-hover:scale-105"
            style={{maxHeight: '18rem'}}
            loading="lazy"
          />
          <div className="absolute top-4 right-4 bg-whiskey-dark/90 rounded-full px-3 py-1 flex items-center text-sm font-medium">
            <Star size={14} className="text-whiskey-amber mr-1" />
            <span>{whiskey.rating}</span>
          </div>
        </Link>
        <div className="md:w-1/2 md:p-6 p-4">
          <div className="flex items-center mb-2">
            <span className="text-xs text-whiskey-amber uppercase tracking-wider mr-2">
              {whiskey.type}
            </span>
            <span className="text-xs text-whiskey-light/50">
              {whiskey.origin}
            </span>
          </div>
          <Link to={`/review/${whiskey.id}`} className={`font-heading text-2xl md:text-3xl font-bold mb-2 block text-whiskey-light hover:text-whiskey-amber transition-colors`} tabIndex={0}>
            {whiskey.name}
          </Link>
          <p className="text-whiskey-light/70 mb-4 line-clamp-3">
            {whiskey.excerpt}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-20 rating-bar mr-3">
                <div className="rating-fill" style={{ width: `${whiskey.rating}%` }}></div>
              </div>
              <span className="text-sm font-medium">{whiskey.rating}/100</span>
            </div>
            <span className="text-whiskey-gold font-medium">
              {whiskey.price} ₺
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card group block relative">
      <Link to={`/review/${whiskey.id}`} className="block">
        <div className="relative overflow-hidden aspect-[3/4] bg-whiskey-dark-lighter">
          <img 
            src={whiskey.imageUrl} 
            alt={whiskey.name} 
            className="w-full h-56 sm:h-64 md:h-72 object-contain object-center transition-transform duration-700 group-hover:scale-105"
            style={{maxHeight: '18rem'}}
            loading="lazy"
          />
          <div className="absolute top-4 right-4 bg-whiskey-dark/90 rounded-full px-3 py-1 flex items-center text-sm font-medium">
            <Star size={14} className="text-whiskey-amber mr-1" />
            <span>{whiskey.rating}</span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-2">
            <span className="text-xs text-whiskey-amber uppercase tracking-wider mr-2">
              {whiskey.type}
            </span>
            <span className="text-xs text-whiskey-light/50">
              {whiskey.origin}
            </span>
          </div>
          <h3 className="font-heading text-xl font-bold mb-2">
            {whiskey.name}
          </h3>
          <p className="text-whiskey-light/70 mb-4 line-clamp-3">
            {whiskey.excerpt}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-20 rating-bar mr-3">
                <div className="rating-fill" style={{ width: `${whiskey.rating}%` }}></div>
              </div>
              <span className="text-sm font-medium">{whiskey.rating}/100</span>
            </div>
            <span className="text-whiskey-gold font-medium">
              {whiskey.price} ₺
            </span>
          </div>
        </div>
      </Link>
      {isEditor && (
        <Link
          to={`/dashboard/edit/${whiskey.id}`}
          className="absolute top-2 left-2 bg-whiskey-amber text-whiskey-dark px-3 py-1 rounded text-xs font-bold shadow hover:bg-whiskey-gold transition-colors z-10"
          style={{ textDecoration: 'none' }}
        >
          Düzenle
        </Link>
      )}
    </div>
  );
};

export default WhiskeyCard;