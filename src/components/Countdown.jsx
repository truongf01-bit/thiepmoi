import React, { useState, useEffect } from 'react';
import { Clock, Hourglass } from 'lucide-react';

export default function Countdown() {
  // Target: 09:00:00 AM on 14/02/2027 in Vietnam Time UTC+7
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
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isCompleted: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isCompleted: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [TARGET_DATE]);

  const units = [
    { label: 'NGÀY', value: timeLeft.days, sub: 'Days' },
    { label: 'GIỜ', value: String(timeLeft.hours).padStart(2, '0'), sub: 'Hours' },
    { label: 'PHÚT', value: String(timeLeft.minutes).padStart(2, '0'), sub: 'Minutes' },
    { label: 'GIÂY', value: String(timeLeft.seconds).padStart(2, '0'), sub: 'Seconds' },
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6 max-w-xl mx-auto text-center">
      <div className="mb-8">
        <span className="text-xs font-sans tracking-[0.3em] uppercase text-sage-600 font-medium">
          Counting Down To The Moment
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-vintage-dark font-medium mt-1">
          Thời Gian Đếm Ngược
        </h2>
        <p className="text-xs sm:text-sm font-sans text-vintage-sepia mt-1">
          Hẹn gặp bạn tại thời khắc thanh xuân ý nghĩa nhất
        </p>
        <div className="w-12 h-[1px] bg-vintage-border mx-auto mt-3" />
      </div>

      {timeLeft.isCompleted ? (
        <div className="p-8 rounded-2xl bg-[#FCFAF6] border border-vintage-border shadow-photobook">
          <p className="font-serif text-2xl text-sage-700 font-medium">
            Buổi lễ tốt nghiệp đã chính thức bắt đầu! 🎉
          </p>
          <p className="text-sm font-sans text-vintage-sepia mt-2">
            Hân hạnh được đón tiếp bạn cùng chung vui với Phương Thanh.
          </p>
        </div>
      ) : (
        <div className="bg-[#FCFAF6] rounded-2xl border border-vintage-border shadow-photobook p-6 sm:p-8">
          {/* Countdown Grid */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {units.map((unit, index) => (
              <div
                key={index}
                className="relative bg-white rounded-xl border border-vintage-border/80 shadow-sm p-3 sm:p-5 flex flex-col items-center justify-center transition-transform hover:-translate-y-0.5"
              >
                {/* Vintage Card Top Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-vintage-border/60 rounded-b-sm" />

                {/* Digital / Serif Value */}
                <span className="font-serif text-2xl sm:text-4xl lg:text-4.5xl font-semibold text-vintage-espresso tracking-tight">
                  {unit.value}
                </span>

                {/* Label Vietnamese */}
                <span className="text-[11px] sm:text-xs font-sans font-semibold tracking-wider text-sage-700 mt-1">
                  {unit.label}
                </span>

                {/* English Sublabel */}
                <span className="text-[9px] font-sans tracking-widest text-vintage-muted uppercase mt-0.5">
                  {unit.sub}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-sans text-vintage-muted">
            <Clock className="w-3.5 h-3.5 text-sage-600" />
            <span>09:00 AM • Chủ Nhật • 14/02/2027 (Giờ Việt Nam UTC+7)</span>
          </div>
        </div>
      )}
    </section>
  );
}
