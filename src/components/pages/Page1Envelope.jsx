import React, { useState } from 'react';
import { Mail, Sparkles, Heart } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export default function Page1Envelope({ onNextPage }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    if (isOpen) return;
    setIsOpen(true);
    sounds.playEnvelopeOpen();

    // Sequence timing: flap opens & letter glides up, light bursts, then smoothly transitions to page 2
    setTimeout(() => {
      onNextPage();
    }, 1300);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-8 select-none overflow-hidden">
      {/* Top Header Badge */}
      <div className="text-center mb-6 sm:mb-8 animate-fade-in">
        <span className="inline-block text-[11px] font-sans font-medium uppercase tracking-[0.25em] text-sage-600 bg-sage-100/80 px-3 py-1 rounded-full mb-2">
          Graduation Storybook • 2027
        </span>
        <h2 className="font-serif text-xs sm:text-sm tracking-[0.35em] text-vintage-muted uppercase">
          ✦ You Are Invited ✦
        </h2>
      </div>

      {/* 3D Interactive Envelope Container */}
      <div className="relative w-full max-w-sm sm:max-w-md perspective-1000">
        <div
          onClick={handleOpenLetter}
          className={`relative bg-[#F5EFE6] rounded-2xl shadow-envelope border border-[#E3D7C7] p-6 sm:p-8 cursor-pointer transition-all duration-700 transform-style-preserve-3d ${
            isOpen ? 'scale-105' : 'hover:scale-[1.02] animate-float-slow'
          }`}
        >
          {/* Top Postmark Details */}
          <div className="flex items-start justify-between border-b border-[#E7DDCE] pb-4 mb-5">
            <div className="text-left">
              <span className="text-[10px] font-sans tracking-widest text-vintage-muted uppercase block">
                To My Dear Friend
              </span>
              <p className="font-serif italic text-sm text-vintage-dark font-medium">
                Gửi người bạn trân quý nhất
              </p>
            </div>

            {/* Vintage Postmark Circle */}
            <div className="relative w-14 h-14 rounded-full border border-dashed border-vintage-sepia/50 flex flex-col items-center justify-center text-center p-1 rotate-12">
              <span className="text-[7px] font-mono tracking-tighter text-vintage-sepia">NAM ĐỊNH</span>
              <span className="text-[9px] font-serif font-bold text-vintage-espresso">14.02.27</span>
              <span className="text-[6px] font-mono text-vintage-sepia">THPT TQK</span>
            </div>
          </div>

          {/* Envelope Center & Wax Seal */}
          <div className="text-center py-4">
            <p className="text-[11px] font-sans tracking-[0.25em] text-vintage-muted uppercase mb-1">
              From:
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl text-vintage-dark font-medium tracking-tight mb-1">
              Đặng Phương Thanh
            </h1>
            <p className="font-serif italic text-sm text-vintage-sepia mb-6">
              Lễ Tốt Nghiệp • A Beautiful Chapter of Youth
            </p>

            {/* Rising Letter preview during opening */}
            <div
              className={`absolute left-6 right-6 bottom-16 bg-white p-5 rounded-xl border border-vintage-border shadow-2xl transition-all duration-1000 transform ${
                isOpen
                  ? '-translate-y-28 opacity-100 scale-100 z-30'
                  : 'translate-y-4 opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <p className="font-serif italic text-sm text-vintage-espresso">
                “Thanh xuân sẽ đẹp hơn khi có bạn trong những khoảnh khắc đáng nhớ...”
              </p>
              <div className="flex justify-center mt-2">
                <Heart className="w-4 h-4 text-wax-red fill-wax-red" />
              </div>
            </div>

            {/* Glowing Light Beam Effect when opening */}
            {isOpen && (
              <div className="absolute inset-0 bg-radial-gradient from-amber-300/40 via-amber-100/20 to-transparent animate-ping pointer-events-none z-20" />
            )}

            {/* Wax Seal Button */}
            <div className="relative inline-block my-2">
              <button
                type="button"
                className={`relative z-10 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#A32A3B] via-[#871F2E] to-[#6A1623] text-cream-100 flex flex-col items-center justify-center shadow-wax border-2 border-[#B33547]/50 transition-all duration-500 transform ${
                  isOpen ? 'scale-90 opacity-0 rotate-45' : 'group-hover:scale-105 active:scale-95'
                }`}
              >
                <span className="font-serif text-2xl font-bold tracking-tight text-amber-200/95">
                  PT
                </span>
                <span className="text-[8px] tracking-[0.2em] font-sans uppercase text-amber-100/80 -mt-0.5">
                  2027
                </span>
              </button>

              {/* Pulsing glow */}
              {!isOpen && (
                <div className="absolute -inset-2 rounded-full bg-wax-red/20 animate-ping pointer-events-none" />
              )}
            </div>
          </div>

          {/* Action Button: OPEN MY LETTER */}
          <div className="mt-4 text-center">
            <button
              onClick={handleOpenLetter}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-vintage-espresso text-cream-50 font-serif text-xs sm:text-sm tracking-widest uppercase shadow-md hover:bg-vintage-brown transition-all duration-300 hover:shadow-lg active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isOpen ? 'Đang mở lá thư...' : 'OPEN MY LETTER'}</span>
            </button>
            <p className="text-[11px] font-sans text-vintage-muted mt-2 tracking-wide">
              Chạm vào con dấu hoặc nút để bắt đầu cuốn nhật ký
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
