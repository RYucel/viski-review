import React from 'react';

interface AromaItem {
  name: string;
  strength: number;
}

interface AromaProfileProps {
  aromas: AromaItem[];
}

const AromaProfile: React.FC<AromaProfileProps> = ({ aromas }) => {
  // Eğer hiç aroma yoksa, hiç bar ve kategori göstermeyelim, sadece uyarı gösterelim
  if (!aromas || aromas.length === 0) {
    return (
      <div className="bg-whiskey-dark-lighter rounded-lg p-6">
        <h3 className="font-heading text-xl font-bold mb-4">Aroma Profili</h3>
        <div className="mt-6 pt-6 border-t border-whiskey-gold/10">
          <h4 className="text-lg font-medium mb-3">Aroma Yoğunluğu</h4>
          <div className="w-full h-4 bg-whiskey-dark rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-whiskey-amber to-whiskey-caramel w-0"></div>
          </div>
          <div className="flex justify-between text-xs mt-1 text-whiskey-light/70">
            <span>Hafif</span>
            <span>Orta</span>
            <span>Yoğun</span>
          </div>
          <div className="text-center text-xs text-whiskey-light/50 mt-2">Aroma verisi yok</div>
        </div>
      </div>
    );
  }

  // Group aromas by their general categories
  const categories = {
    'Meyvemsi': ['elma', 'armut', 'çilek', 'muz', 'kiraz', 'üzüm', 'portakal', 'limon'],
    'Baharatlı': ['tarçın', 'karabiber', 'zencefil', 'karanfil', 'muskat'],
    'Odunsu': ['meşe', 'sedir', 'sandal', 'tütün', 'deri'],
    'Tatlı': ['karamel', 'vanilya', 'bal', 'çikolata', 'şeker'],
    'Botanik': ['çimen', 'çiçek', 'ot', 'nane', 'adaçayı'],
    'Diğer': [],
  };

  // Function to get the category of an aroma
  const getCategory = (aromaName: string): string => {
    const normalizedName = aromaName.toLowerCase();
    for (const [category, items] of Object.entries(categories)) {
      if (items.some(item => normalizedName.includes(item))) {
        return category;
      }
    }
    return 'Diğer';
  };

  // Group aromas by category
  const groupedAromas = aromas.reduce((acc, aroma) => {
    const category = getCategory(aroma.name);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(aroma);
    return acc;
  }, {} as Record<string, AromaItem[]>);

  // Color mapping for categories
  const categoryColors: Record<string, string> = {
    'Meyvemsi': 'bg-yellow-500',
    'Baharatlı': 'bg-red-500',
    'Odunsu': 'bg-amber-700',
    'Tatlı': 'bg-orange-400',
    'Botanik': 'bg-green-500',
    'Diğer': 'bg-blue-500',
  };

  // Ortalama aroma yoğunluğu hesaplama
  const avgStrength = aromas.length > 0
    ? aromas.reduce((sum, item) => sum + item.strength, 0) / aromas.length
    : 0;
  const avgPercent = Math.round((avgStrength / 10) * 100);

  return (
    <div className="bg-whiskey-dark-lighter rounded-lg p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Aroma Profili</h3>
      
      {Object.entries(groupedAromas).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h4 className="text-lg font-medium mb-3">{category}</h4>
          <div className="space-y-3">
            {items.map((aroma) => (
              <div key={aroma.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{aroma.name}</span>
                  <span className="text-whiskey-light/70">{aroma.strength}/10</span>
                </div>
                <div className="w-full h-2 bg-whiskey-dark rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${categoryColors[category]}`}
                    style={{ width: `${aroma.strength * 10}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="mt-6 pt-6 border-t border-whiskey-gold/10">
        <h4 className="text-lg font-medium mb-3">Aroma Yoğunluğu</h4>
        <div className="w-full h-4 bg-whiskey-dark rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-whiskey-amber to-whiskey-caramel"
            style={{ width: `${avgPercent}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs mt-1 text-whiskey-light/70">
          <span>Hafif</span>
          <span>Orta</span>
          <span>Yoğun</span>
        </div>
        {aromas.length === 0 && (
          <div className="text-center text-xs text-whiskey-light/50 mt-2">Aroma verisi yok</div>
        )}
      </div>
    </div>
  );
};

export default AromaProfile;