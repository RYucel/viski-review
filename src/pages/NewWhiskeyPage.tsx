import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const NewWhiskeyPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    origin: '',
    price: '',
    rating: '',
    age: '',
    abv: '',
    image_url: '',
    excerpt: '',
    full_review: '',
    character: '',
    complexity: '',
    balance: '',
    finish: '',
    featured: false
  });
  const [aromas, setAromas] = useState([{ name: '', strength: 5 }]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/login');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleAromaChange = (idx: number, field: 'name' | 'strength', value: string | number) => {
    setAromas(prev => prev.map((aroma, i) => i === idx ? { ...aroma, [field]: value } : aroma));
  };

  const addAroma = () => setAromas(prev => [...prev, { name: '', strength: 5 }]);

  const removeAroma = (idx: number) => setAromas(prev => prev.length === 1 ? prev : prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const numericFields = {
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
        abv: parseFloat(formData.abv),
        character: parseFloat(formData.character),
        complexity: parseFloat(formData.complexity),
        balance: parseFloat(formData.balance),
        finish: parseFloat(formData.finish)
      };

      const { data, error } = await supabase
        .from('whiskeys')
        .insert([{ ...formData, ...numericFields }])
        .select('id')
        .single();

      if (error) throw error;

      if (data && aromas.length > 0) {
        const aromaRows = aromas
          .filter(a => a.name.trim() !== '')
          .map(a => ({ whiskey_id: data.id, name: a.name, strength: Number(a.strength) }));

        if (aromaRows.length > 0) {
          const { error: aromaError } = await supabase.from('aromas').insert(aromaRows);
          if (aromaError) throw aromaError;
        }
      }

      toast.success('İnceleme başarıyla eklendi');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'İnceleme eklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-whiskey-dark py-8">
      <div className="container-custom">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-whiskey-light/70 hover:text-whiskey-amber mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Panele Dön
        </button>

        <h1 className="text-3xl font-heading font-bold mb-8">Yeni Viski İncelemesi</h1>

        <form onSubmit={handleSubmit} className="bg-whiskey-dark-lighter rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Viski Adı</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tür</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="input-field w-full"
              >
                <option value="">Seçiniz</option>
                <option value="İskoç Viskisi">İskoç Viskisi</option>
                <option value="Bourbon">Bourbon</option>
                <option value="Japon Viskisi">Japon Viskisi</option>
                <option value="İrlanda Viskisi">İrlanda Viskisi</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Köken</label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                required
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Fiyat (₺)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Puan (0-100)</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="100"
                required
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Yaş</label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ABV (%)</label>
              <input
                type="number"
                name="abv"
                value={formData.abv}
                onChange={handleChange}
                step="0.1"
                required
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Görsel URL</label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                required
                className="input-field w-full"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Özet</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              className="input-field w-full h-24"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Detaylı İnceleme</label>
            <textarea
              name="full_review"
              value={formData.full_review}
              onChange={handleChange}
              className="input-field w-full h-48"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium mb-2">Karakter (0-100)</label>
              <input
                type="number"
                name="character"
                value={formData.character}
                onChange={handleChange}
                min="0"
                max="100"
                required
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Kompleksite (0-100)</label>
              <input
                type="number"
                name="complexity"
                value={formData.complexity}
                onChange={handleChange}
                min="0"
                max="100"
                required
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Denge (0-100)</label>
              <input
                type="number"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
                min="0"
                max="100"
                required
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bitiş (0-100)</label>
              <input
                type="number"
                name="finish"
                value={formData.finish}
                onChange={handleChange}
                min="0"
                max="100"
                required
                className="input-field w-full"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm">Öne Çıkan İnceleme</span>
            </label>
          </div>

          {/* Aroma Profili Alanı */}
          <div className="mt-8">
            <label className="block text-sm font-medium mb-2">Aroma Profili</label>
            <div className="space-y-4">
              {aromas.map((aroma, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Aroma adı"
                    value={aroma.name}
                    onChange={e => handleAromaChange(idx, 'name', e.target.value)}
                    className="input-field flex-1"
                  />
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={aroma.strength}
                    onChange={e => handleAromaChange(idx, 'strength', Number(e.target.value))}
                    className="input-field w-20"
                  />
                  <button type="button" onClick={() => removeAroma(idx)} className="p-2 text-red-400 hover:text-red-500" disabled={aromas.length === 1}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addAroma} className="btn-outline flex items-center mt-2">
                <Plus size={18} className="mr-1" /> Aroma Ekle
              </button>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-8"
            >
              {loading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewWhiskeyPage;