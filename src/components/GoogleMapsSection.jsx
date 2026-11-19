import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, ExternalLink } from 'lucide-react';

export default function GoogleMapsSection() {
  const [copied, setCopied] = useState(false);
  const targetMapUrl = 'https://www.google.com/maps/search/?api=1&query=Truong+THPT+Tran+Quang+Khai%2C+Ngo+176+Phan+Dinh+Phung%2C+Nam+Dinh%2C+Ninh+Binh';
  const fullAddress = 'Ngõ 176 Phan Đình Phùng, Nam Định, Ninh Bình, Việt Nam';
  const embedMapUrl = 'https://maps.google.com/maps?q=Truong+THPT+Tran+Quang+Khai%2C+Ngo+176+Phan+Dinh+Phung%2C+Nam+Dinh%2C+Ninh+Binh&t=&z=16&ie=UTF8&iwloc=&output=embed';

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative py-12 px-4 sm:px-6 max-w-xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-sans tracking-[0.3em] uppercase text-sage-600 font-medium">
          Location & Direction
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-vintage-dark font-medium mt-1">
          Bản Đồ Đến Trường
        </h2>
        <div className="w-12 h-[1px] bg-vintage-border mx-auto mt-3" />
      </div>

      <div className="bg-[#FCFAF6] rounded-2xl border border-vintage-border shadow-photobook overflow-hidden">
        {/* Interactive Map Embed */}
        <div className="relative w-full h-72 sm:h-80 bg-cream-200">
          <iframe
            title="Bản đồ THPT Trần Quang Khải"
            src={embedMapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full filter saturate-[0.85] contrast-[1.05]"
          />

          {/* Floating Location Badge */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-vintage-border shadow-md flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-sans font-medium text-vintage-espresso">
              THPT Trần Quang Khải
            </span>
          </div>
        </div>

        {/* Location Details & Actions */}
        <div className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="w-5 h-5 text-wax-red shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-serif text-lg text-vintage-dark font-medium">
                Trường THPT Trần Quang Khải
              </h4>
              <p className="text-xs sm:text-sm text-vintage-sepia mt-0.5 leading-relaxed">
                {fullAddress}
              </p>
            </div>
          </div>

          {/* Action Buttons: Xem đường đi & Copy địa chỉ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Primary CTA: Xem đường đi */}
            <a
              href={targetMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sage-600 hover:bg-sage-700 active:scale-[0.98] text-white font-sans text-xs sm:text-sm font-medium tracking-wide shadow-md transition-all duration-200"
            >
              <Navigation className="w-4 h-4" />
              <span>XEM ĐƯỜNG ĐI</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* Secondary CTA: Sao chép địa chỉ */}
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-cream-100 active:scale-[0.98] text-vintage-espresso font-sans text-xs sm:text-sm font-medium border border-vintage-border transition-all duration-200 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Đã sao chép địa chỉ!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-vintage-sepia" />
                  <span>Sao chép địa chỉ</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] font-sans text-center text-vintage-muted mt-3">
            Gợi ý: Nhấn “Xem đường đi” để mở ứng dụng Google Maps trực tiếp trên điện thoại của bạn.
          </p>
        </div>
      </div>
    </section>
  );
}
