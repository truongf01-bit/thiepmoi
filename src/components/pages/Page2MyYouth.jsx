import React, { useState, useEffect } from 'react';
import { Sparkles, Maximize2, Heart } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export default function Page2MyYouth({ onOpenLightbox }) {
  const [typedTitle, setTypedTitle] = useState('');
  const fullTitle = 'MY BEAUTIFUL YOUTH';
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Character typewriter effect for title
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullTitle.length) {
        setTypedTitle(fullTitle.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 90);
    return () => clearInterval(interval);
  }, []);

  // Parallax effect on mouse move
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 16;
    const y = (e.clientY / window.innerHeight - 0.5) * 16;
    setMouseOffset({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none"
    >
      {/* Decorative Washi Tape & Stamp Top */}
      <div className="text-center mb-4 sm:mb-6">
        <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-sage-600 bg-sage-100/80 px-3 py-1 rounded-full font-medium inline-block mb-1">
          Memory Chapter 01
        </span>
        <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium text-vintage-dark tracking-wider h-8">
          {typedTitle}
          <span className="animate-pulse text-amber-500">|</span>
        </h2>
        <p className="font-serif italic text-xs sm:text-sm text-vintage-sepia">
          Khoảnh khắc nụ cười tuổi học trò rực rỡ nhất
        </p>
      </div>

      {/* Scrapbook Polaroid Photo Card with Parallax */}
      <div
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative max-w-xs sm:max-w-sm w-full mx-auto group cursor-pointer"
        onClick={() => {
          sounds.playClick();
          onOpenLightbox('/portrait.jpg', 'Đặng Phương Thanh – Niên khóa 2024–2027');
        }}
      >
        {/* Washi Tape Accent on Top Left & Top Right */}
        <div className="absolute -top-3 left-4 z-20 w-20 h-5 bg-[#E8DFD0]/90 backdrop-blur-sm border-t border-b border-vintage-border shadow-sm rotate-[-4deg]" />
        <div className="absolute -top-2 right-4 z-20 w-16 h-5 bg-[#DCE4D8]/90 backdrop-blur-sm border-t border-b border-sage-300 shadow-sm rotate-[5deg]" />

        {/* Polaroid Frame */}
        <div className="polaroid-frame rounded-md transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02]">
          <div className="relative overflow-hidden rounded bg-[#EDE8E0] aspect-[3/4]">
            <img
              src="/portrait.jpg"
              alt="Đặng Phương Thanh"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Subtle vintage warm tint gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-vintage-dark/25 via-transparent to-amber-100/10 pointer-events-none" />

            {/* Tap to expand hint badge */}
            <div className="absolute bottom-3 right-3 bg-white/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-sans font-medium text-vintage-dark shadow flex items-center gap-1 group-hover:bg-white">
              <Maximize2 className="w-3 h-3 text-sage-600" />
              <span>Chạm để phóng to</span>
            </div>
          </div>

          {/* Polaroid Hand-Written Caption */}
          <div className="pt-3 pb-1 text-center">
            <p className="font-serif italic text-sm text-vintage-dark font-medium">
              Đặng Phương Thanh
            </p>
            <p className="text-[10px] font-sans tracking-widest text-vintage-muted uppercase mt-0.5">
              THPT Trần Quang Khải • Nam Định
            </p>
          </div>
        </div>

        {/* Vintage Post-it Note Scrap on bottom right */}
        <div className="absolute -bottom-4 -right-2 bg-[#FFFBEA] p-2 sm:p-2.5 rounded shadow-md border border-amber-200/80 rotate-[-3deg] max-w-[130px] z-20">
          <p className="font-serif italic text-[11px] text-amber-900 leading-tight">
            “Tuổi 18 dịu dàng như một khúc ca.” 🌸
          </p>
        </div>
      </div>

      <p className="text-[11px] font-sans text-vintage-muted mt-8 tracking-wide">
        Nhấn vào ảnh để xem khung hình lớn mỹ thuật
      </p>
    </div>
  );
}
