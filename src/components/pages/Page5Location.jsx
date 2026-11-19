import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, ExternalLink, School, Info, X } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export default function Page5Location() {
  const [copied, setCopied] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const targetMapUrl = 'https://www.google.com/maps/search/?api=1&query=Truong+THPT+Tran+Quang+Khai%2C+Ngo+176+Phan+Dinh+Phung%2C+Nam+Dinh%2C+Ninh+Binh';
  const fullAddress = 'Ngõ 176 Phan Đình Phùng, Nam Định, Ninh Bình, Việt Nam';
  const embedMapUrl = 'https://maps.google.com/maps?q=Truong+THPT+Tran+Quang+Khai%2C+Ngo+176+Phan+Dinh+Phung%2C+Nam+Dinh%2C+Ninh+Binh&t=&z=16&ie=UTF8&iwloc=&output=embed';

  const handleCopy = () => {
    sounds.playClick();
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleMarkerClick = () => {
    sounds.playSparkleChime();
    setShowPopup(true);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden">
      {/* Chapter Badge */}
      <div className="text-center mb-4 sm:mb-5">
        <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-sage-600 bg-sage-100/80 px-3 py-1 rounded-full font-medium inline-block mb-1">
          Memory Chapter 04
        </span>
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-vintage-dark tracking-wide">
          Nơi Lưu Giữ Kỷ Niệm
        </h2>
        <p className="font-serif italic text-xs sm:text-sm text-vintage-sepia">
          Mái trường THPT Trần Quang Khải thân yêu
        </p>
      </div>

      {/* Map Container Card */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#FCFAF6] rounded-2xl border border-vintage-border shadow-photobook overflow-hidden">
        {/* Interactive Map Embed */}
        <div className="relative w-full h-56 sm:h-64 bg-cream-200">
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

          {/* Interactive Pulsing Map Marker */}
          <div
            onClick={handleMarkerClick}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute w-8 h-8 rounded-full bg-red-500/30 animate-ping" />
              <div className="relative z-10 w-8 h-8 rounded-full bg-wax-red text-white flex items-center justify-center shadow-lg border-2 border-white transform transition-transform group-hover:scale-125">
                <MapPin className="w-4 h-4 fill-white" />
              </div>
            </div>
            <div className="bg-white/95 backdrop-blur-md px-2 py-0.5 rounded shadow text-[10px] font-sans font-semibold text-vintage-dark whitespace-nowrap mt-1 text-center">
              THPT Trần Quang Khải ✦
            </div>
          </div>

          {/* Marker Info Popup */}
          {showPopup && (
            <div className="absolute inset-4 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-vintage-border flex flex-col justify-between animate-fade-in z-30">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 text-sage-700">
                  <School className="w-4 h-4" />
                  <span className="font-serif font-semibold text-sm">Điểm Hẹn Tốt Nghiệp</span>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="p-1 rounded text-vintage-muted hover:text-vintage-dark"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-2 text-xs font-sans text-vintage-espresso leading-relaxed">
                <p className="font-medium text-vintage-dark">Trường THPT Trần Quang Khải</p>
                <p className="text-[11px] text-vintage-sepia mt-1">
                  Khuôn viên sân trường rợp bóng cây xanh. Bãi gửi xe ngay cạnh cổng trường.
                </p>
                <p className="text-[11px] text-sage-600 mt-1">
                  Phương Thanh sẽ đón bạn tại khu vực chụp ảnh lưu niệm trung tâm!
                </p>
              </div>

              <button
                onClick={() => setShowPopup(false)}
                className="w-full py-1.5 rounded-lg bg-cream-200 text-vintage-dark text-xs font-sans font-medium"
              >
                Đã hiểu
              </button>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start gap-2.5 mb-3">
            <MapPin className="w-4 h-4 text-wax-red shrink-0 mt-0.5" />
            <p className="font-serif text-xs sm:text-sm text-vintage-dark font-medium leading-snug">
              {fullAddress}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {/* Open Google Maps */}
            <a
              href={targetMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-sans text-xs font-medium tracking-wide shadow-sm transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>OPEN MAPS</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            {/* Get Directions / Copy Address */}
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-cream-100 text-vintage-dark font-sans text-xs font-medium border border-vintage-border shadow-sm transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Đã chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-vintage-sepia" />
                  <span>GET DIRECTIONS</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <p className="text-[11px] font-sans text-vintage-muted mt-5 tracking-wide">
        Chạm vào biểu tượng ghim đỏ trên bản đồ để xem hướng dẫn
      </p>
    </div>
  );
}
