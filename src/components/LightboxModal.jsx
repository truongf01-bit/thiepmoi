import React, { useEffect } from 'react';
import { X, Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function LightboxModal({ isOpen, onClose, imageSrc, caption }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      sounds.playSparkleChime(700);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-vintage-dark/80 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-sm sm:max-w-md w-full bg-[#FAF7F2] p-4 sm:p-6 rounded-2xl shadow-2xl border border-vintage-border text-center transform transition-transform duration-300 scale-100 animate-scale-up"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng xem ảnh"
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-vintage-dark shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Polaroid Style High-Res Presentation */}
        <div className="relative overflow-hidden rounded-xl bg-white p-2 sm:p-3 shadow-md border border-vintage-border/60">
          <img
            src={imageSrc}
            alt="Đặng Phương Thanh - Lễ Tốt Nghiệp"
            className="w-full h-auto max-h-[65vh] object-contain rounded-lg"
          />

          {/* Golden Sparkle accents */}
          <div className="absolute top-4 left-4 text-amber-400 animate-pulse pointer-events-none">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="absolute bottom-6 right-4 text-wax-red animate-bounce pointer-events-none">
            <Heart className="w-5 h-5 fill-current" />
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="font-serif italic text-base sm:text-lg text-vintage-dark font-medium">
            Đặng Phương Thanh
          </p>
          <p className="text-xs font-sans text-vintage-muted mt-0.5">
            {caption || 'A Beautiful Chapter of Youth • 14.02.2027'}
          </p>
          <p className="text-[10px] font-sans text-vintage-sepia/70 mt-2">
            Chạm vào bất kỳ vị trí bên ngoài để đóng
          </p>
        </div>
      </div>
    </div>
  );
}
