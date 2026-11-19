import React, { useState } from 'react';
import { Mail, Sparkles, Heart } from 'lucide-react';

export default function EnvelopeIntro({ onOpen, isOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);
    // Sequence timing: flap opens (600ms), letter slides (700ms), screen reveals (1200ms)
    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  if (isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-b from-cream-100 via-cream-200 to-cream-300 transition-opacity duration-1000 ${
        isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle atmospheric background ornaments */}
      <div className="absolute inset-0 paper-texture opacity-40 pointer-events-none" />
      <div className="absolute top-8 left-8 text-xs font-serif tracking-[0.25em] text-vintage-muted uppercase opacity-70">
        Graduation Invitation • 2027
      </div>
      <div className="absolute bottom-8 right-8 text-xs font-serif tracking-[0.2em] text-vintage-muted opacity-60">
        THPT Trần Quang Khải • Nam Định
      </div>

      <div className="relative w-full max-w-md mx-auto perspective-1000">
        {/* Envelope Container */}
        <div
          className={`relative bg-[#F7F2E8] rounded-xl shadow-envelope border border-[#E3D7C7] p-8 sm:p-10 transition-transform duration-700 ${
            isOpening ? 'scale-105' : 'hover:scale-[1.01]'
          }`}
        >
          {/* Top Postmark & Vintage Air Mail Stamp */}
          <div className="flex items-start justify-between border-b border-[#E7DDCE] pb-5 mb-6">
            <div className="text-left">
              <span className="inline-block text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-sage-600 bg-sage-100/70 px-2.5 py-0.5 rounded-full mb-1">
                Special Delivery
              </span>
              <p className="text-xs font-serif tracking-widest text-vintage-muted uppercase">
                Youth Memories Edition
              </p>
            </div>

            {/* Vintage Postmark Circle */}
            <div className="relative w-16 h-16 rounded-full border border-dashed border-vintage-sepia/40 flex flex-col items-center justify-center text-center p-1 rotate-12">
              <span className="text-[8px] font-mono tracking-tighter text-vintage-sepia">NAM ĐỊNH</span>
              <span className="text-[10px] font-serif font-bold text-vintage-espresso">14.02.27</span>
              <span className="text-[7px] font-mono text-vintage-sepia">T.Q.KHẢI</span>
            </div>
          </div>

          {/* Envelope Center Content */}
          <div className="text-center py-4 sm:py-6">
            <p className="text-xs sm:text-sm font-sans tracking-[0.35em] text-vintage-muted uppercase mb-3">
              ✦ &nbsp; You Are Invited &nbsp; ✦
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl text-vintage-dark font-medium tracking-tight mb-2">
              Đặng Phương Thanh
            </h1>

            <p className="font-serif italic text-base sm:text-lg text-vintage-sepia mb-6">
              Lễ Tốt Nghiệp • A Beautiful Chapter of Youth
            </p>

            <div className="w-16 h-[1px] bg-vintage-border mx-auto mb-8" />

            {/* Wax Seal / Interactive Action Button */}
            <div className="relative inline-block group">
              {/* Wax Seal Element */}
              <button
                onClick={handleOpenClick}
                disabled={isOpening}
                className={`relative z-10 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#A32A3B] via-[#871F2E] to-[#6A1623] text-cream-100 flex flex-col items-center justify-center shadow-wax border-2 border-[#B33547]/50 transition-all duration-300 transform group-hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-wax-red/30 ${
                  isOpening ? 'scale-90 opacity-0 rotate-45' : ''
                }`}
                aria-label="Mở thiệp mời Đặng Phương Thanh"
              >
                {/* Monogram Seal */}
                <span className="font-serif text-2xl font-bold tracking-tight text-amber-200/95 drop-shadow-sm">
                  PT
                </span>
                <span className="text-[8px] tracking-[0.2em] font-sans uppercase text-amber-100/80 -mt-0.5">
                  2027
                </span>

                {/* Subtle shine ring */}
                <div className="absolute inset-1 rounded-full border border-amber-300/20 pointer-events-none" />
              </button>

              {/* Pulsing ring indicator */}
              <div className="absolute -inset-2 rounded-full bg-wax-red/15 animate-ping pointer-events-none" />
            </div>

            {/* Open CTA text */}
            <div className="mt-6">
              <button
                onClick={handleOpenClick}
                disabled={isOpening}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-vintage-espresso text-cream-50 font-serif text-sm tracking-widest uppercase shadow-md hover:bg-vintage-brown transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-vintage-espresso"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{isOpening ? 'Đang mở thiệp...' : 'Open Invitation / Mở Thiệp'}</span>
              </button>
              <p className="text-[11px] font-sans text-vintage-muted mt-2 tracking-wide">
                Chạm vào con dấu hoặc nút để mở thiệp & nghe nhạc
              </p>
            </div>
          </div>

          {/* Envelope Bottom Stitching */}
          <div className="mt-4 pt-4 border-t border-dashed border-[#E3D7C7] flex justify-between items-center text-[11px] font-sans text-vintage-muted/80">
            <span>Nam Định, Việt Nam</span>
            <span>09:00 — 11:00 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
