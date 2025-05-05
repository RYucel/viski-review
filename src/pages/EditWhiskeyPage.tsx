import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const EditWhiskeyPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
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

  useEffect(() => {
    checkAuth();
    fetchWhiskey();
  }, [id]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/login');
    }
  };

  const fetchWhiskey = async () => {
    try {
      const { data, error } = await supabase
        .from('whiskeys')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setFormData({
          name: data.name,
          type: data.type,
          origin: data.origin,
          price: data.price.toString(),
          rating: data.rating.toString(),
          age: data.age || '',
          abv: data.abv.toString(),
          image_url: data.image_url,
          excerpt: data.excerpt,
          full_review: data.full_review || '',
          character: data.character.toString(),
          complexity: data.complexity.toString(),
          balance: data.balance.toString(),
          finish: data.finish.toString(),
          featured: data.featured || false
        });
      }
    } catch (error: any) {
      toast.error('Viski bilgileri yüklenirken bir hata oluştu');
      navigate('/dashboard');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

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

      const { error } = await supabase
        .from('whiskeys')
        .update({ ...formData, ...numericFields })
        .eq('id', id);

      if (error) throw error;

      toast.success('İnceleme başarıyla güncellendi');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'İnceleme güncellenirken bir hata oluştu');
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

        <h1 className="text-3xl font-heading font-bold mb-8">Viski İncelemesini Düzenle</h1>

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

export default EditWhiskeyPage;