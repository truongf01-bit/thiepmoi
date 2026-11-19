import React, { useState } from 'react';
import { Heart, Sparkles, Share2, Mail, Check, ShieldCheck } from 'lucide-react';

export default function FinalMessage({ onReopenEnvelope, onOpenAdmin }) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'Đặng Phương Thanh – Lễ Tốt Nghiệp 2027',
      text: 'Thiệp mời Lễ Tốt Nghiệp của Đặng Phương Thanh – A Beautiful Chapter of Youth (14.02.2027)',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or not supported
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <footer className="relative pt-16 pb-24 px-4 sm:px-6 max-w-xl mx-auto text-center">
      {/* Decorative Divider */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="w-12 h-[1px] bg-vintage-border" />
        <Heart className="w-4 h-4 text-wax-red fill-wax-red opacity-80" />
        <span className="w-12 h-[1px] bg-vintage-border" />
      </div>

      {/* Main Closing Title */}
      <h3 className="font-serif text-2xl sm:text-3.5xl md:text-4xl text-vintage-dark font-medium tracking-tight uppercase leading-snug mb-3">
        Thank You For Being Part Of My Youth
      </h3>

      <p className="font-serif italic text-base sm:text-lg text-vintage-sepia max-w-md mx-auto leading-relaxed mb-6">
        “Cảm ơn bạn đã luôn là một phần dịu dàng và đáng nhớ trong những năm tháng thanh xuân tươi đẹp của mình.”
      </p>

      {/* Signature Flourish */}
      <div className="my-6">
        <p className="font-script text-4xl sm:text-5xl text-vintage-brown font-normal select-none">
          Phương Thanh
        </p>
        <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-vintage-muted mt-1">
          THPT Trần Quang Khải • Niên Khóa 2024 – 2027
        </p>
      </div>

      {/* Action Buttons: Share & Reopen */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-cream-100 text-vintage-espresso font-sans text-xs font-medium border border-vintage-border shadow-sm transition-all duration-200"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Đã sao chép link thiệp!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-sage-600" />
              <span>Chia sẻ thiệp mời</span>
            </>
          )}
        </button>

        <button
          onClick={onReopenEnvelope}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-cream-100 text-vintage-sepia font-sans text-xs font-medium border border-vintage-border shadow-sm transition-all duration-200"
        >
          <Mail className="w-3.5 h-3.5 text-vintage-muted" />
          <span>Xem lại phong bì thư</span>
        </button>
      </div>

      {/* Admin Link at the very bottom */}
      <div className="mt-12 pt-6 border-t border-vintage-border/40 text-center">
        <button
          onClick={onOpenAdmin}
          className="inline-flex items-center gap-1.5 text-[11px] font-sans text-vintage-muted/70 hover:text-vintage-dark transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Quản trị viên (Danh sách RSVP)</span>
        </button>
      </div>
    </footer>
  );
}
