import React, { useState } from 'react';
import { Heart, XCircle, Send, CheckCircle2, AlertCircle, User, MessageSquare, Phone, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/soundEffects';

export default function Page7Rsvp() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('yes');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSelectOption = (choice) => {
    setAttending(choice);
    if (choice === 'yes') {
      sounds.playHeartChime();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#8A2534', '#C59E3F', '#FAF7F2', '#6C8666'],
      });
    } else {
      sounds.playPaperTurn();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setFeedback({
        type: 'error',
        text: 'Vui lòng nhập họ và tên của bạn (tối thiểu 2 ký tự).'
      });
      return;
    }

    setLoading(true);
    sounds.playClick();

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          attending,
          phone: phone.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        sounds.playSparkleChime();
        if (attending === 'yes') {
          confetti({
            particleCount: 80,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#8A2534', '#C59E3F', '#6C8666', '#FAF7F2'],
          });
        }
      } else {
        setFeedback({
          type: 'error',
          text: data.error || 'Có lỗi xảy ra khi lưu xác nhận.'
        });
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        text: 'Không thể kết nối máy chủ. Vui lòng kiểm tra lại mạng.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-y-auto">
      {/* Chapter Badge */}
      <div className="text-center mb-4 sm:mb-5">
        <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-sage-600 bg-sage-100/80 px-3 py-1 rounded-full font-medium inline-block mb-1">
          Memory Chapter 06
        </span>
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-vintage-dark tracking-wide">
          Will You Join My Special Day?
        </h2>
        <p className="font-serif italic text-xs sm:text-sm text-vintage-sepia">
          Bạn sẽ đến chung vui cùng mình chứ?
        </p>
      </div>

      <div className="relative w-full max-w-sm sm:max-w-md bg-[#FCFAF6] rounded-2xl border border-vintage-border shadow-photobook p-5 sm:p-7">
        {isSuccess ? (
          /* Thank You Card upon submission */
          <div className="text-center py-6 space-y-3 animate-scale-up">
            <div className="w-14 h-14 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl text-vintage-dark font-medium">
              THANK YOU!
            </h3>

            <p className="font-serif italic text-sm text-vintage-espresso leading-relaxed">
              {attending === 'yes'
                ? 'Phương Thanh đã nhận được xác nhận của bạn! Thật háo hức chờ đón khoảnh khắc được chụp ảnh kỷ niệm cùng bạn ❤️'
                : 'Cảm ơn lời chúc tốt đẹp của bạn! Dù tiếc vì bạn không thể đến, Phương Thanh luôn trân trọng tình bạn này.'}
            </p>

            <div className="pt-3">
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setName('');
                  setMessage('');
                  setPhone('');
                }}
                className="text-xs font-sans text-vintage-muted hover:text-vintage-dark underline underline-offset-4"
              >
                Gửi xác nhận cho người khác
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {feedback && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  feedback.type === 'error'
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{feedback.text}</span>
              </div>
            )}

            {/* Attendance Buttons: 2 choices */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleSelectOption('yes')}
                className={`p-3 rounded-xl border-2 text-center transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                  attending === 'yes'
                    ? 'border-wax-red bg-red-50/60 shadow-sm scale-[1.02]'
                    : 'border-vintage-border bg-white hover:border-vintage-muted/50'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    attending === 'yes' ? 'fill-wax-red text-wax-red' : 'text-vintage-muted'
                  }`}
                />
                <span className="font-serif text-xs sm:text-sm font-semibold text-vintage-dark">
                  MÌNH SẼ ĐẾN ❤️
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectOption('no')}
                className={`p-3 rounded-xl border-2 text-center transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                  attending === 'no'
                    ? 'border-vintage-sepia bg-amber-50/60 shadow-sm scale-[1.02]'
                    : 'border-vintage-border bg-white hover:border-vintage-muted/50'
                }`}
              >
                <XCircle
                  className={`w-4 h-4 ${
                    attending === 'no' ? 'text-vintage-sepia' : 'text-vintage-muted'
                  }`}
                />
                <span className="font-serif text-xs sm:text-sm font-medium text-vintage-dark">
                  RẤT TIẾC, KHÔNG THỂ
                </span>
              </button>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-[10px] font-sans uppercase tracking-wider text-vintage-muted font-medium mb-1">
                Họ và tên của bạn <span className="text-wax-red">*</span>
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-vintage-muted" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Minh Tuấn, Lan Anh..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-vintage-border bg-white text-xs font-sans text-vintage-dark focus:outline-none focus:ring-1 focus:ring-sage-500 shadow-inner"
                />
              </div>
            </div>

            {/* Phone (Optional) */}
            <div>
              <label className="block text-[10px] font-sans uppercase tracking-wider text-vintage-muted font-medium mb-1">
                Số điện thoại (tùy chọn)
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-vintage-muted" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Để Thanh liên lạc khi cần..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-vintage-border bg-white text-xs font-sans text-vintage-dark focus:outline-none focus:ring-1 focus:ring-sage-500 shadow-inner"
                />
              </div>
            </div>

            {/* Message / Wishes */}
            <div>
              <label className="block text-[10px] font-sans uppercase tracking-wider text-vintage-muted font-medium mb-1">
                Lời nhắn gửi Phương Thanh (tùy chọn)
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Gửi một lời chúc thanh xuân..."
                className="w-full p-2.5 rounded-xl border border-vintage-border bg-white text-xs font-sans text-vintage-dark focus:outline-none focus:ring-1 focus:ring-sage-500 shadow-inner resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-vintage-espresso hover:bg-vintage-brown active:scale-[0.98] text-white font-sans text-xs font-medium uppercase tracking-wider shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <span>Đang gửi xác nhận...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi Xác Nhận Tham Dự</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      <p className="text-[11px] font-sans text-vintage-muted mt-5 tracking-wide">
        Thông tin của bạn được lưu an toàn vào sổ lưu niệm riêng của Phương Thanh
      </p>
    </div>
  );
}
