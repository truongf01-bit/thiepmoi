import React, { useState } from 'react';
import { Heart, RotateCcw, Share2, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export default function Page8FinalMemory({ onReplay, onOpenAdmin, onOpenLightbox }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    sounds.playSparkleChime();
    const shareData = {
      title: 'Đặng Phương Thanh – Lễ Tốt Nghiệp 2027',
      text: 'Interactive Graduation Storybook – Đặng Phương Thanh (14.02.2027 tại THPT Trần Quang Khải)',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden text-center">
      {/* Chapter Badge */}
      <div className="mb-4">
        <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-sage-600 bg-sage-100/80 px-3 py-1 rounded-full font-medium inline-block mb-1">
          Final Chapter
        </span>
      </div>

      {/* Main Closing Card */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#FCFAF6] rounded-2xl border border-vintage-border shadow-photobook p-6 sm:p-8 space-y-4 animate-scale-up">
        {/* Mini Portrait Vignette (Clickable) */}
        <div
          onClick={() => {
            sounds.playClick();
            onOpenLightbox('/portrait.jpg', 'Cảm ơn bạn đã luôn đồng hành cùng Thanh!');
          }}
          className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-vintage-border shadow-md cursor-pointer group hover:scale-105 transition-transform"
        >
          <img
            src="/portrait.jpg"
            alt="Đặng Phương Thanh"
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-amber-500/10 group-hover:bg-transparent transition-colors" />
        </div>

        {/* Title */}
        <h2 className="font-serif text-2xl sm:text-3xl text-vintage-dark font-medium tracking-tight uppercase leading-snug">
          Thank You For Being Part Of My Youth
        </h2>

        {/* Closing Quote */}
        <p className="font-serif italic text-sm sm:text-base text-vintage-espresso leading-relaxed">
          “Thanh xuân sẽ đẹp hơn khi có bạn trong những khoảnh khắc đáng nhớ.”
        </p>

        {/* Signature */}
        <div className="py-2">
          <p className="font-script text-4xl text-vintage-brown font-normal">
            Phương Thanh
          </p>
          <p className="text-[10px] font-sans tracking-widest text-vintage-muted uppercase mt-0.5">
            14.02.2027 • THPT Trần Quang Khải
          </p>
        </div>

        {/* Action Buttons: Replay & Share */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <button
            onClick={() => {
              sounds.playClick();
              onReplay();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-vintage-espresso hover:bg-vintage-brown text-white font-sans text-xs font-medium uppercase tracking-wider shadow-sm transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
            <span>REPLAY STORYBOOK</span>
          </button>

          <button
            onClick={handleShare}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-white hover:bg-cream-100 text-vintage-dark font-sans text-xs font-medium border border-vintage-border shadow-sm transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Đã sao chép link!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-sage-600" />
                <span>SHARE INVITATION</span>
              </>
            )}
          </button>
        </div>

        {/* Admin Link at bottom */}
        <div className="pt-2 border-t border-vintage-border/50">
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1 text-[11px] font-sans text-vintage-muted hover:text-vintage-dark transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Quản trị viên (Danh sách RSVP)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
