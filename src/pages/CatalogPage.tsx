import React, { useEffect, useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import WhiskeyCard from '../components/WhiskeyCard';
import { supabase } from '../lib/supabase';
import { Whiskey } from '../types/whiskey';

type SortOption = 'rating-desc' | 'rating-asc' | 'price-desc' | 'price-asc' | 'name-asc';

const CatalogPage: React.FC = () => {
  const [whiskeys, setWhiskeys] = useState<Whiskey[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<SortOption>('rating-desc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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

  const types = ['', ...Array.from(new Set(whiskeys.map(whiskey => whiskey.type)))];
  const origins = ['', ...Array.from(new Set(whiskeys.map(whiskey => whiskey.origin)))];
  const minPrice = whiskeys.length ? Math.min(...whiskeys.map(w => w.price)) : 0;
  const maxPrice = whiskeys.length ? Math.max(...whiskeys.map(w => w.price)) : 5000;

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const filteredWhiskeys = whiskeys.filter(whiskey => {
    const matchesSearch = searchTerm === '' || 
      whiskey.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      whiskey.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || whiskey.type === selectedType;
    const matchesOrigin = selectedOrigin === '' || whiskey.origin === selectedOrigin;
    const matchesPrice = whiskey.price >= priceRange[0] && whiskey.price <= priceRange[1];
    return matchesSearch && matchesType && matchesOrigin && matchesPrice;
  });

  const sortedWhiskeys = [...filteredWhiskeys].sort((a, b) => {
    switch (sortBy) {
      case 'rating-desc':
        return b.rating - a.rating;
      case 'rating-asc':
        return a.rating - b.rating;
      case 'price-desc':
        return b.price - a.price;
      case 'price-asc':
        return a.price - b.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedOrigin('');
    setPriceRange([minPrice, maxPrice]);
    setSortBy('rating-desc');
  };

  const hasActiveFilters = () => {
    return (
      searchTerm !== '' || 
      selectedType !== '' || 
      selectedOrigin !== '' || 
      priceRange[0] > minPrice || 
      priceRange[1] < maxPrice ||
      sortBy !== 'rating-desc'
    );
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <div className="mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Viski Kataloğu</h1>
          <p className="text-whiskey-light/70 md:w-2/3">
            Tüm incelemelerimizi keşfedin. Tercihlerinize göre filtreleyebilir, arama yapabilir ve sıralayabilirsiniz.
          </p>
        </div>
        {/* Search and Filters */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={18} className="text-whiskey-light/50" />
              </div>
              <input
                type="text"
                placeholder="Viski adı veya türü ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field w-full pl-10"
              />
            </div>
            <div className="lg:w-1/3 flex gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="input-field w-full"
              >
                <option value="rating-desc">En Yüksek Puan</option>
                <option value="rating-asc">En Düşük Puan</option>
                <option value="price-desc">En Yüksek Fiyat</option>
                <option value="price-asc">En Düşük Fiyat</option>
                <option value="name-asc">İsme Göre (A-Z)</option>
              </select>
              <button 
                onClick={toggleFilters}
                className="btn-outline flex items-center"
              >
                <Filter size={18} className="mr-2" />
                <span className="hidden sm:inline">Filtreler</span>
              </button>
            </div>
          </div>
          {/* Filters Panel */}
          {isFilterOpen && (
            <div className="bg-whiskey-dark-lighter p-6 rounded-lg mb-6 slide-up">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-xl font-bold">Filtreleme Seçenekleri</h3>
                <button 
                  onClick={toggleFilters}
                  className="text-whiskey-light/70 hover:text-whiskey-light"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Viski Türü</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="input-field w-full"
                  >
                    <option value="">Tüm Türler</option>
                    {types.slice(1).map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Köken</label>
                  <select
                    value={selectedOrigin}
                    onChange={(e) => setSelectedOrigin(e.target.value)}
                    className="input-field w-full"
                  >
                    <option value="">Tüm Kökenler</option>
                    {origins.slice(1).map((origin) => (
                      <option key={origin} value={origin}>{origin}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Fiyat Aralığı: {priceRange[0]} ₺ - {priceRange[1]} ₺
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              {hasActiveFilters() && (
                <div className="mt-6 flex justify-end">
                  <button onClick={resetFilters} className="text-whiskey-amber hover:text-whiskey-gold">
                    Filtreleri Sıfırla
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Active Filters Display */}
          {hasActiveFilters() && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-whiskey-light/70">Aktif Filtreler:</span>
              {searchTerm && (
                <div className="bg-whiskey-dark-lighter rounded-full px-3 py-1 text-sm flex items-center">
                  <span className="mr-2">Arama: {searchTerm}</span>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="text-whiskey-light/50 hover:text-whiskey-light"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              {selectedType && (
                <div className="bg-whiskey-dark-lighter rounded-full px-3 py-1 text-sm flex items-center">
                  <span className="mr-2">Tür: {selectedType}</span>
                  <button 
                    onClick={() => setSelectedType('')}
                    className="text-whiskey-light/50 hover:text-whiskey-light"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              {selectedOrigin && (
                <div className="bg-whiskey-dark-lighter rounded-full px-3 py-1 text-sm flex items-center">
                  <span className="mr-2">Köken: {selectedOrigin}</span>
                  <button 
                    onClick={() => setSelectedOrigin('')}
                    className="text-whiskey-light/50 hover:text-whiskey-light"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
                <div className="bg-whiskey-dark-lighter rounded-full px-3 py-1 text-sm flex items-center">
                  <span className="mr-2">Fiyat: {priceRange[0]} ₺ - {priceRange[1]} ₺</span>
                  <button 
                    onClick={() => setPriceRange([minPrice, maxPrice])}
                    className="text-whiskey-light/50 hover:text-whiskey-light"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              <button 
                onClick={resetFilters}
                className="text-whiskey-amber hover:text-whiskey-gold text-sm ml-auto"
              >
                Tümünü Temizle
              </button>
            </div>
          )}
        </div>
        {/* Results */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-xl font-medium">
              {sortedWhiskeys.length} sonuç bulundu
            </h2>
          </div>
          {loading ? (
            <div className="text-center py-16">Yükleniyor...</div>
          ) : sortedWhiskeys.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedWhiskeys.map(whiskey => (
                <WhiskeyCard key={whiskey.id} whiskey={whiskey} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="font-heading text-xl font-bold mb-2">Sonuç Bulunamadı</h3>
              <p className="text-whiskey-light/70 mb-4">
                Arama kriterlerinize uygun viski bulunamadı.
              </p>
              <button 
                onClick={resetFilters}
                className="btn-primary"
              >
                Filtreleri Temizle
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;