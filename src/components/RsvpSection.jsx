import React, { useState } from 'react';
import { Heart, XCircle, Send, CheckCircle2, AlertCircle, MessageSquareHeart, User, Phone, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RsvpSection({ onRsvpSuccess }) {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('yes'); // 'yes' or 'no'
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', text: '' }
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    // Validation
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setFeedback({
        type: 'error',
        text: 'Vui lòng nhập họ và tên của bạn (tối thiểu 2 ký tự).'
      });
      return;
    }

    if (!attending) {
      setFeedback({
        type: 'error',
        text: 'Vui lòng chọn xác nhận bạn sẽ đến hoặc không thể đến.'
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          attending,
          message: message.trim(),
          phone: phone.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setFeedback({
          type: 'success',
          text: data.message || 'Xác nhận tham dự thành công!'
        });

        // Trigger celebratory confetti if attending
        if (attending === 'yes') {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.7 },
            colors: ['#8A2534', '#C59E3F', '#6C8666', '#FAF7F2']
          });
        }

        if (onRsvpSuccess) {
          onRsvpSuccess();
        }
      } else {
        setFeedback({
          type: 'error',
          text: data.error || 'Có lỗi xảy ra khi gửi xác nhận. Vui lòng thử lại.'
        });
      }
    } catch (err) {
      console.error('RSVP submit error:', err);
      setFeedback({
        type: 'error',
        text: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp-section" className="relative py-14 px-4 sm:px-6 max-w-xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-sans tracking-[0.3em] uppercase text-sage-600 font-medium">
          RSVP & Guestbook
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-3.5xl text-vintage-dark font-medium mt-1">
          Will You Join My Special Day?
        </h2>
        <p className="text-sm font-serif italic text-vintage-sepia mt-1">
          Bạn sẽ đến chung vui cùng mình chứ?
        </p>
        <div className="w-12 h-[1px] bg-vintage-border mx-auto mt-3" />
      </div>

      <div className="bg-[#FCFAF6] rounded-2xl border border-vintage-border shadow-photobook p-6 sm:p-8">
        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-sage-100 text-sage-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="font-serif text-2xl text-vintage-espresso font-medium">
              Đã Nhận Phản Hồi!
            </h3>

            <p className="font-serif text-base text-vintage-sepia leading-relaxed max-w-md mx-auto">
              {feedback?.text}
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setName('');
                  setMessage('');
                  setPhone('');
                  setFeedback(null);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-vintage-border text-vintage-brown hover:bg-cream-100 font-sans text-xs tracking-wider uppercase transition-colors"
              >
                <span>Gửi phản hồi khác</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Feedback Alert if any */}
            {feedback && (
              <div
                className={`p-4 rounded-xl flex items-start gap-3 text-xs sm:text-sm ${
                  feedback.type === 'error'
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                {feedback.type === 'error' ? (
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                )}
                <span>{feedback.text}</span>
              </div>
            )}

            {/* Attendance Choice Buttons (Two choices) */}
            <div>
              <label className="block text-xs font-sans uppercase tracking-[0.15em] text-vintage-muted font-medium mb-3">
                Xác nhận tham dự <span className="text-wax-red">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Option 1: Will attend */}
                <button
                  type="button"
                  onClick={() => setAttending('yes')}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3.5 focus:outline-none ${
                    attending === 'yes'
                      ? 'border-wax-red bg-red-50/50 shadow-sm'
                      : 'border-vintage-border bg-white hover:border-vintage-muted/50'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      attending === 'yes'
                        ? 'bg-wax-red text-white'
                        : 'bg-cream-200 text-vintage-muted'
                    }`}
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <span className="font-serif text-base font-semibold text-vintage-espresso block">
                      Mình sẽ đến ❤️
                    </span>
                    <span className="text-[11px] font-sans text-vintage-sepia block">
                      Có mặt chụp ảnh cùng Thanh
                    </span>
                  </div>
                </button>

                {/* Option 2: Cannot attend */}
                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3.5 focus:outline-none ${
                    attending === 'no'
                      ? 'border-vintage-sepia bg-amber-50/50 shadow-sm'
                      : 'border-vintage-border bg-white hover:border-vintage-muted/50'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      attending === 'no'
                        ? 'bg-vintage-sepia text-white'
                        : 'bg-cream-200 text-vintage-muted'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif text-base font-medium text-vintage-espresso block">
                      Rất tiếc, mình không thể đến.
                    </span>
                    <span className="text-[11px] font-sans text-vintage-sepia block">
                      Gửi lời chúc tốt nghiệp từ xa
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Input: Full Name */}
            <div>
              <label
                htmlFor="guest-name"
                className="block text-xs font-sans uppercase tracking-[0.15em] text-vintage-muted font-medium mb-1.5"
              >
                Họ và tên của bạn <span className="text-wax-red">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-vintage-muted">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="guest-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Hoàng Mai, Minh Anh..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-vintage-border bg-white text-vintage-dark placeholder:text-vintage-muted/60 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Input: Phone Number (Optional) */}
            <div>
              <label
                htmlFor="guest-phone"
                className="block text-xs font-sans uppercase tracking-[0.15em] text-vintage-muted font-medium mb-1.5"
              >
                Số điện thoại <span className="text-vintage-muted text-[10px] lowercase">(không bắt buộc)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-vintage-muted">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="guest-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Để Thanh tiện liên lạc khi cần..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-vintage-border bg-white text-vintage-dark placeholder:text-vintage-muted/60 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Input: Message (Optional) */}
            <div>
              <label
                htmlFor="guest-message"
                className="block text-xs font-sans uppercase tracking-[0.15em] text-vintage-muted font-medium mb-1.5"
              >
                Lời chúc / Lời nhắn gửi Thanh
              </label>
              <div className="relative">
                <textarea
                  id="guest-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Gửi một lời chúc mừng tốt nghiệp hoặc kỷ niệm thanh xuân..."
                  className="w-full p-3.5 rounded-xl border border-vintage-border bg-white text-vintage-dark placeholder:text-vintage-muted/60 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all shadow-inner resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-vintage-espresso hover:bg-vintage-brown active:scale-[0.99] text-white font-sans text-sm font-medium tracking-wider uppercase shadow-md transition-all duration-200 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vintage-espresso"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang gửi xác nhận...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Gửi Xác Nhận Tham Dự</span>
                </>
              )}
            </button>

            <p className="text-[11px] font-sans text-center text-vintage-muted">
              Thông tin của bạn sẽ được chuyển thẳng tới sổ lưu niệm của Đặng Phương Thanh.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
