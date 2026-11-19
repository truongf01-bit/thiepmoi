import React, { useState, useEffect } from 'react';
import { Clock, Heart, Sparkles } from 'lucide-react';

export default function Page6Countdown() {
  const TARGET_DATE = new Date('2027-02-14T09:00:00+07:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isCompleted: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [TARGET_DATE]);

  const units = [
    { label: 'DAYS', value: timeLeft.days, sub: 'Ngày' },
    { label: 'HOURS', value: String(timeLeft.hours).padStart(2, '0'), sub: 'Giờ' },
    { label: 'MINUTES', value: String(timeLeft.minutes).padStart(2, '0'), sub: 'Phút' },
    { label: 'SECONDS', value: String(timeLeft.seconds).padStart(2, '0'), sub: 'Giây' },
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden">
      {/* Chapter Badge */}
      <div className="text-center mb-5 sm:mb-7">
        <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-sage-600 bg-sage-100/80 px-3 py-1 rounded-full font-medium inline-block mb-1">
          Memory Chapter 05
        </span>
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-vintage-dark tracking-wide">
          The Day Is Coming
        </h2>
        <p className="font-serif italic text-xs sm:text-sm text-vintage-sepia">
          Từng nhịp đập đếm ngược đến khoảnh khắc chia tay mái trường
        </p>
      </div>

      {/* Main Countdown Display Card */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#FCFAF6] rounded-2xl border border-vintage-border shadow-photobook p-6 sm:p-8 text-center animate-pulse-subtle">
        {/* Heartbeat Icon */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Heart className="w-5 h-5 text-wax-red fill-wax-red animate-pulse" />
          <span className="text-xs font-sans tracking-widest text-vintage-sepia uppercase font-medium">
            Waiting For 14.02.2027
          </span>
          <Heart className="w-5 h-5 text-wax-red fill-wax-red animate-pulse" />
        </div>

        {timeLeft.isCompleted ? (
          <div className="py-6">
            <p className="font-serif text-2xl text-sage-700 font-medium">
              Buổi lễ tốt nghiệp đã chính thức bắt đầu! 🎉
            </p>
            <p className="text-xs font-sans text-vintage-sepia mt-2">
              Hân hạnh được đón tiếp bạn cùng chung vui với Phương Thanh.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {units.map((unit, index) => (
              <div
                key={index}
                className="relative bg-white rounded-xl border border-vintage-border shadow-sm p-3 sm:p-4 flex flex-col items-center justify-center transition-all hover:border-amber-400 group"
              >
                {/* Vintage Card Top Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3.5 h-1 bg-vintage-border rounded-b-sm" />

                {/* Flip / Soft Glow Digits */}
                <span className="font-serif text-2xl sm:text-4xl font-semibold text-vintage-dark tracking-tight drop-shadow-sm group-hover:text-amber-700">
                  {unit.value}
                </span>

                {/* English Label */}
                <span className="text-[9px] sm:text-[10px] font-sans font-bold tracking-widest text-sage-700 uppercase mt-1">
                  {unit.label}
                </span>

                {/* Vietnamese Sublabel */}
                <span className="text-[8px] font-sans text-vintage-muted">
                  {unit.sub}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-5 border-t border-dashed border-vintage-border flex items-center justify-center gap-2 text-xs font-sans text-vintage-muted">
          <Clock className="w-3.5 h-3.5 text-sage-600" />
          <span>09:00 AM • 14/02/2027 • Giờ Việt Nam (UTC+7)</span>
        </div>
      </div>

      <p className="text-[11px] font-sans text-vintage-muted mt-6 tracking-wide">
        Mỗi giây trôi qua đều lưu dấu thêm một kỷ niệm đẹp
      </p>
    </div>
  );
}
