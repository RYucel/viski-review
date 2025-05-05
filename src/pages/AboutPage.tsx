import React from 'react';
import { Instagram, Mail, Server } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Viski Tutkunları, <span className="text-whiskey-amber">Imge ve Rustu</span>
          </h1>
          <p className="text-xl text-whiskey-light/80 leading-relaxed">
            Biz sadece viski içmiyoruz, her şişenin arkasındaki hikayeyi, kültürü ve zanaatı keşfediyoruz.
          </p>
        </div>

        {/* Bizim Hakkımızda - Sade ve Samimi */}
        <div className="bg-whiskey-dark-lighter rounded-lg p-8 mb-16 flex flex-col md:flex-row items-center gap-8">
          <img
            src="/ProfilePhoto.jpeg"
            alt="İmge & Rüştü Profil Fotoğrafı"
            className="w-40 h-40 rounded-full object-cover border-4 border-whiskey-amber shadow-lg mb-6 md:mb-0"
            style={{ minWidth: '10rem' }}
          />
          <div>
            <h2 className="font-heading text-3xl font-bold mb-4 text-whiskey-amber">Bizim Hikayemiz</h2>
            <p className="text-whiskey-light/90 text-lg mb-4">
              İki yıl önce bir arkadaşımızın viski önerisiyle başlayan yolculuğumuzda, içkiyi sadece sarhoş olmak için değil; yeni deneyimler yaşamak, tatları keşfetmek ve öğrendiklerimizi başkalarına aktarmak için seven bir çift olduk. 
            </p>
            <p className="text-whiskey-light/80 text-base">
              Her yudumda yeni bir hikaye, yeni bir keşif arıyoruz. Bu platformda, viskiyle ilgili öğrendiklerimizi ve heyecanımızı sizlerle paylaşmak istiyoruz. Bizimle birlikte bu yolculuğa katılın, sorularınızı ve deneyimlerinizi paylaşın. Çünkü viski, paylaştıkça daha keyifli!
            </p>
            <div className="mt-4 text-whiskey-light/60 italic">İmge & Rüştü</div>
          </div>
        </div>
        
        {/* Methodology */}
        <div className="bg-whiskey-dark-lighter rounded-lg p-8 mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-whiskey-amber h-14 w-14 rounded-full flex items-center justify-center text-whiskey-dark">
              <Server size={28} />
            </div>
            <h2 className="font-heading text-2xl font-bold">Değerlendirme Metodolojimiz</h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-whiskey-light/80">
              Her viski, titiz ve tutarlı bir değerlendirme süreci ile incelenir. Metodolojimiz şu şekildedir:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">1. Kör Tadım</h3>
                <p className="text-whiskey-light/70">
                  Her viski önce "kör" olarak tadılır - yani şişe, marka veya fiyat bilgisi olmadan. Bu, önyargısız bir değerlendirme sağlar.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">2. Çoklu Oturum</h3>
                <p className="text-whiskey-light/70">
                  Her viski, farklı günlerde en az üç ayrı oturumda değerlendirilir. Bu, tutarlılık ve doğruluk sağlar.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">3. 100 Puan Sistemi</h3>
                <p className="text-whiskey-light/70">
                  Viskiler 100 puan üzerinden değerlendirilir: Görünüm (10), Burun (25), Damak (35), Bitiş (20), Karakter ve Denge (10).
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">4. Aroma Haritası</h3>
                <p className="text-whiskey-light/70">
                  Her viskinin detaylı bir aroma profili çıkarılır ve temel tatlar 10 üzerinden puanlanır.
                </p>
              </div>
            </div>
            
            <div className="pt-4">
              <h3 className="text-lg font-medium mb-2">Puan Skalası</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-whiskey-dark p-4 rounded-md">
                  <div className="font-medium">90-100</div>
                  <div className="text-whiskey-light/70 text-sm">Olağanüstü</div>
                </div>
                <div className="bg-whiskey-dark p-4 rounded-md">
                  <div className="font-medium">80-89</div>
                  <div className="text-whiskey-light/70 text-sm">Çok İyi</div>
                </div>
                <div className="bg-whiskey-dark p-4 rounded-md">
                  <div className="font-medium">70-79</div>
                  <div className="text-whiskey-light/70 text-sm">İyi</div>
                </div>
                <div className="bg-whiskey-dark p-4 rounded-md">
                  <div className="font-medium">60-69</div>
                  <div className="text-whiskey-light/70 text-sm">Ortalama</div>
                </div>
                <div className="bg-whiskey-dark p-4 rounded-md">
                  <div className="font-medium">50-59</div>
                  <div className="text-whiskey-light/70 text-sm">Vasat</div>
                </div>
                <div className="bg-whiskey-dark p-4 rounded-md">
                  <div className="font-medium">&lt; 50</div>
                  <div className="text-whiskey-light/70 text-sm">Zayıf</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">Bizimle İletişime Geçin</h2>
          <p className="text-whiskey-light/70 mb-6">
            İş birliği teklifleri, sorular veya sadece merhaba demek için bize yazın.
          </p>
          <a href="mailto:info@whiskeykritigim.com" className="btn-primary">
            E-posta Gönder
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;