import React, { useState } from 'react';
import { Heart, Sparkles, Quote, Flower2, Star } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export default function Page3Invitation() {
  const [floatingIcons, setFloatingIcons] = useState([]);

  // Spawn floating heart or star when clicking decorative details
  const triggerDecoration = (e, type = 'heart') => {
    sounds.playHeartChime();
    const id = Date.now() + Math.random();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    setFloatingIcons((prev) => [
      ...prev,
      {
        id,
        x,
        y,
        type,
        color: type === 'heart' ? '#8A2534' : '#F5D061',
      },
    ]);

    setTimeout(() => {
      setFloatingIcons((prev) => prev.filter((item) => item.id !== id));
    }, 1000);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-8 select-none overflow-hidden">
      {/* Floating spawned icons container */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {floatingIcons.map((item) => (
          <div
            key={item.id}
            className="absolute transition-all duration-1000 ease-out transform -translate-y-24 opacity-0 scale-125"
            style={{ left: `${item.x}px`, top: `${item.y}px` }}
          >
            {item.type === 'heart' ? (
              <Heart className="w-6 h-6 fill-wax-red text-wax-red" />
            ) : (
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
            )}
          </div>
        ))}
      </div>

      {/* Decorative Top Flourish */}
      <div className="text-center mb-5">
        <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-sage-600 bg-sage-100/80 px-3 py-1 rounded-full font-medium inline-block mb-1">
          Memory Chapter 02
        </span>
        <h2 className="font-serif text-xs sm:text-sm tracking-[0.35em] text-vintage-muted uppercase">
          A Special Invitation
        </h2>
      </div>

      {/* Luxury Stationery Parchment Card */}
      <div className="relative w-full max-w-md bg-[#FCFAF6] rounded-2xl border border-vintage-border shadow-photobook p-6 sm:p-9 text-center animate-scale-up">
        {/* Scrapbook Paper Clip at top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-10 border-2 border-vintage-muted/50 rounded-full rotate-45 pointer-events-none opacity-60" />

        {/* Vintage Postmark watermark in background */}
        <div className="absolute right-4 top-4 opacity-10 pointer-events-none">
          <Quote className="w-20 h-20 text-vintage-dark" />
        </div>

        {/* Headline */}
        <p className="text-[10px] sm:text-xs font-sans tracking-[0.3em] uppercase text-sage-600 font-semibold mb-1">
          A Beautiful Chapter of Youth
        </p>

        <h1 className="font-serif text-3xl sm:text-4xl text-vintage-dark font-medium tracking-tight mb-2">
          Đặng Phương Thanh
        </h1>

        <div className="flex items-center justify-center gap-3 my-4">
          <span className="w-10 h-[1px] bg-vintage-border" />
          <button
            onClick={(e) => triggerDecoration(e, 'star')}
            title="Nhấn để thả ngôi sao may mắn"
            className="p-1 text-amber-500 hover:scale-125 transition-transform"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <span className="w-10 h-[1px] bg-vintage-border" />
        </div>

        {/* The Heartfelt Quote */}
        <div className="relative py-3">
          <p className="font-serif text-base sm:text-lg text-vintage-espresso leading-relaxed italic">
            “Đây là ngày mà mình muốn lưu lại những khoảnh khắc đẹp đẽ nhất của thời học sinh. Hy vọng bức ảnh thanh xuân tươi đẹp của mình sẽ có sự tham gia của bạn!”
          </p>
        </div>

        {/* Interactive Interactive Hearts / Flowers buttons */}
        <div className="mt-6 pt-5 border-t border-dashed border-vintage-border flex items-center justify-center gap-4">
          <button
            onClick={(e) => triggerDecoration(e, 'heart')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-wax-red text-xs font-sans font-medium hover:bg-red-100 transition-colors border border-red-200"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Thả tim cho Thanh</span>
          </button>

          <button
            onClick={(e) => triggerDecoration(e, 'star')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-sans font-medium hover:bg-amber-100 transition-colors border border-amber-200"
          >
            <Flower2 className="w-3.5 h-3.5" />
            <span>Tặng hoa thanh xuân</span>
          </button>
        </div>
      </div>

      <p className="text-[11px] font-sans text-vintage-muted mt-6 tracking-wide">
        Chạm vào biểu tượng trái tim hoặc ngôi sao để gửi lời chúc tương tác
      </p>
    </div>
  );
}
