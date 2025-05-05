import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { Whiskey } from '../types/whiskey';

const DashboardPage: React.FC = () => {
  const [whiskeys, setWhiskeys] = useState<Whiskey[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchWhiskeys();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/login');
    }
  };

  const fetchWhiskeys = async () => {
    try {
      const { data, error } = await supabase
        .from('whiskeys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWhiskeys(data || []);
    } catch (error: any) {
      toast.error('Viskiler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error: any) {
      toast.error('Çıkış yapılırken bir hata oluştu');
    }
  };

  return (
    <div className="min-h-screen bg-whiskey-dark">
      <div className="container-custom py-8">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-heading font-bold">Viski İncelemeleri</h1>
            <button
              onClick={handleLogout}
              className="btn-outline"
            >
              Çıkış Yap
            </button>
          </div>
          <button
            onClick={() => navigate('/dashboard/new')}
            className="btn-primary w-full md:w-auto py-3 text-lg font-bold"
          >
            + Yeni İnceleme
          </button>
        </div>
        {loading ? (
          <div className="text-center py-8">Yükleniyor...</div>
        ) : (
          <div className="bg-whiskey-dark-lighter rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-whiskey-gold/10">
                  <th className="px-6 py-4 text-left">İsim</th>
                  <th className="px-6 py-4 text-left">Tür</th>
                  <th className="px-6 py-4 text-left">Puan</th>
                  <th className="px-6 py-4 text-left">Fiyat</th>
                  <th className="px-6 py-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {whiskeys.map((whiskey) => (
                  <tr
                    key={whiskey.id}
                    className="border-b border-whiskey-gold/10 hover:bg-whiskey-dark/50"
                  >
                    <td className="px-6 py-4">{whiskey.name}</td>
                    <td className="px-6 py-4">{whiskey.type}</td>
                    <td className="px-6 py-4">{whiskey.rating}</td>
                    <td className="px-6 py-4">{whiskey.price} ₺</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => navigate(`/dashboard/edit/${whiskey.id}`)}
                          className="p-2 text-whiskey-amber hover:text-whiskey-gold"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => {/* Handle delete */}}
                          className="p-2 text-red-400 hover:text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;