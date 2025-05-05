import React from 'react';
import { GlassWater, Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-whiskey-dark-lighter border-t border-whiskey-gold/10 pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 text-whiskey-amber mb-4">
              <GlassWater size={24} strokeWidth={1.5} />
              <span className="text-xl font-heading font-bold">Whiskey Kritiğim</span>
            </Link>
            <p className="text-whiskey-light/70 mb-4">
              Viski tutkunları Imge ve Rustu'nun profesyonel viski değerlendirme platformu.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-whiskey-light/50 hover:text-whiskey-amber transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-whiskey-light/50 hover:text-whiskey-amber transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-whiskey-light/50 hover:text-whiskey-amber transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-whiskey-light/50 hover:text-whiskey-amber transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading text-lg mb-4">Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-whiskey-light/70 hover:text-whiskey-amber transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-whiskey-light/70 hover:text-whiskey-amber transition-colors">
                  Katalog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-whiskey-light/70 hover:text-whiskey-amber transition-colors">
                  Hakkımızda
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading text-lg mb-4">İletişim</h3>
            <p className="text-whiskey-light/70 mb-2">
              Sorularınız veya iş birliği teklifleri için:
            </p>
            <a 
              href="mailto:info@whiskeykritigim.com" 
              className="text-whiskey-amber hover:underline"
            >
              info@whiskeykritigim.com
            </a>
          </div>
        </div>
        
        <div className="border-t border-whiskey-gold/10 pt-6 text-center text-whiskey-light/50 text-sm">
          <p>© {currentYear} Whiskey Kritiğim. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;