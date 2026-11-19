import React from 'react';
import { Sparkles, Heart, Quote } from 'lucide-react';

export default function MainInvitation() {
  return (
    <section className="relative pt-12 pb-16 px-4 sm:px-6 max-w-xl mx-auto text-center">
      {/* Decorative Top Flourish */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="w-8 h-[1px] bg-vintage-border" />
        <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-sage-600 font-medium">
          Graduation Celebration
        </span>
        <span className="w-8 h-[1px] bg-vintage-border" />
      </div>

      {/* Main English Headline */}
      <h2 className="font-serif text-xs sm:text-sm tracking-[0.35em] text-vintage-muted uppercase mb-2">
        A Beautiful Chapter of Youth
      </h2>

      {/* Main Name */}
      <h1 className="font-serif text-3xl sm:text-4.5xl md:text-5xl text-vintage-dark font-medium tracking-tight mb-2">
        Đặng Phương Thanh
      </h1>

      <p className="font-serif italic text-base sm:text-lg text-vintage-sepia mb-8">
        Lễ Tốt Nghiệp THPT Trần Quang Khải • 2027
      </p>

      {/* Central Portrait Photo Card - Korean Vintage Photobook Frame */}
      <div className="relative mx-auto my-6 group max-w-sm sm:max-w-md">
        {/* Decorative Tape / Clip on top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-24 h-6 bg-[#EBE3D5]/80 backdrop-blur-sm border-t border-b border-vintage-border/80 shadow-sm rotate-[-1.5deg]" />

        {/* Polaroid / Fine Art Frame Container */}
        <div className="polaroid-frame rounded-md transition-all duration-700 transform hover:shadow-2xl">
          <div className="relative overflow-hidden rounded bg-[#F0ECE4] aspect-[3/4]">
            {/* The Original Portrait Image - FACE AND IDENTITY UNALTERED */}
            <img
              src="/portrait.jpg"
              alt="Đặng Phương Thanh - Lễ Tốt Nghiệp"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              loading="eager"
            />

            {/* Subtle vintage warm tint gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-vintage-dark/20 via-transparent to-amber-100/10 pointer-events-none mix-blend-multiply" />

            {/* Corner vintage photo corners */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/60 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/60 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/60 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/60 pointer-events-none" />
          </div>

          {/* Polaroid Bottom Caption */}
          <div className="pt-4 pb-1 text-center">
            <p className="font-serif italic text-sm text-vintage-sepia">
              “Nụ cười rực rỡ dưới khoảng trời thanh xuân”
            </p>
            <p className="text-[10px] font-sans tracking-[0.25em] text-vintage-muted uppercase mt-1">
              Nam Định • 14.02.2027
            </p>
          </div>
        </div>

        {/* Soft shadow backing card effect */}
        <div className="absolute -inset-1 bg-vintage-border/30 rounded-lg -z-10 rotate-1 transform scale-98" />
      </div>

      {/* Heartfelt Message Box */}
      <div className="relative mt-10 p-6 sm:p-8 rounded-2xl bg-cream-50/80 border border-vintage-border shadow-sm text-center">
        {/* Quote Icon */}
        <div className="w-8 h-8 rounded-full bg-sage-100 text-sage-600 flex items-center justify-center mx-auto mb-4">
          <Quote className="w-4 h-4 rotate-180" />
        </div>

        <p className="font-serif text-base sm:text-lg text-vintage-espresso leading-relaxed italic mb-4">
          “Đây là ngày mà mình muốn lưu lại những khoảnh khắc đẹp đẽ nhất của thời học sinh. Hy vọng bức ảnh thanh xuân tươi đẹp của mình sẽ có sự tham gia của bạn!”
        </p>

        <div className="flex items-center justify-center gap-2 text-xs font-sans text-vintage-sepia font-medium">
          <span className="w-4 h-[1px] bg-vintage-border" />
          <span>Thân thương, Phương Thanh</span>
          <Heart className="w-3.5 h-3.5 text-wax-red fill-wax-red inline" />
          <span className="w-4 h-[1px] bg-vintage-border" />
        </div>
      </div>
    </section>
  );
}
