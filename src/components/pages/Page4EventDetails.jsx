import React, { useState } from 'react';
import { Calendar, Clock, MapPin, School, CalendarPlus, Check, Sparkles } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export default function Page4EventDetails() {
  const [isFlippingCalendar, setIsFlippingCalendar] = useState(false);
  const [isTickingClock, setIsTickingClock] = useState(false);

  // Calendar Links
  const eventTitle = encodeURIComponent('Lễ Tốt Nghiệp – Đặng Phương Thanh');
  const eventDetails = encodeURIComponent(
    'Lễ Tốt Nghiệp THPT Trần Quang Khải của Đặng Phương Thanh. Thời gian: 09:00 - 11:00, ngày 14/02/2027. Địa chỉ: Ngõ 176 Phan Đình Phùng, Nam Định, Ninh Bình.'
  );
  const eventLocation = encodeURIComponent('Trường THPT Trần Quang Khải, Ngõ 176 Phan Đình Phùng, Nam Định, Ninh Bình');
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=20270214T020000Z/20270214T040000Z&details=${eventDetails}&location=${eventLocation}`;

  const downloadIcs = () => {
    sounds.playSparkleChime();
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Dang Phuong Thanh Graduation//VN',
      'BEGIN:VEVENT',
      'SUMMARY:Lễ Tốt Nghiệp – Đặng Phương Thanh',
      'DESCRIPTION:Lễ tốt nghiệp THPT Trần Quang Khải của Đặng Phương Thanh',
      'LOCATION:THPT Trần Quang Khải, Ngõ 176 Phan Đình Phùng, Nam Định, Ninh Bình',
      'DTSTART:20270214T020000Z',
      'DTEND:20270214T040000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Le-Tot-Nghiep-Phuong-Thanh.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCalendarClick = () => {
    sounds.playPaperTurn();
    setIsFlippingCalendar(true);
    setTimeout(() => setIsFlippingCalendar(false), 800);
  };

  const handleClockClick = () => {
    sounds.playClick();
    setIsTickingClock(true);
    setTimeout(() => setIsTickingClock(false), 800);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden">
      {/* Chapter Badge */}
      <div className="text-center mb-4 sm:mb-6">
        <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-sage-600 bg-sage-100/80 px-3 py-1 rounded-full font-medium inline-block mb-1">
          Memory Chapter 03
        </span>
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-vintage-dark tracking-wide">
          Thông Tin Buổi Lễ
        </h2>
        <p className="font-serif italic text-xs sm:text-sm text-vintage-sepia">
          Tấm vé thanh xuân đặc biệt dành riêng cho bạn
        </p>
      </div>

      {/* Luxury Boarding Pass / Vintage Ticket */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#FCFAF6] rounded-2xl border border-vintage-border shadow-photobook overflow-hidden">
        {/* Decorative Ticket Header Band */}
        <div className="bg-gradient-to-r from-vintage-espresso via-vintage-brown to-vintage-espresso px-5 py-3 text-cream-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <School className="w-4 h-4 text-amber-300" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-wider">
              Graduation Ticket • 2027
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-amber-200">
            NO. 140227
          </span>
        </div>

        {/* Ticket Details Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Date Row (Clickable flip) */}
          <div
            onClick={handleCalendarClick}
            className={`p-3 rounded-xl border border-vintage-border/70 bg-white/70 hover:bg-cream-50 cursor-pointer transition-all duration-300 flex items-start gap-3.5 ${
              isFlippingCalendar ? 'scale-105 rotate-1 bg-amber-50/80' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-sage-100 text-sage-700 flex items-center justify-center shrink-0 border border-sage-200">
              <Calendar className={`w-5 h-5 ${isFlippingCalendar ? 'animate-bounce' : ''}`} />
            </div>
            <div className="flex-1">
              <span className="text-[9px] font-sans uppercase tracking-widest text-vintage-muted font-medium block">
                Ngày diễn ra (Chạm để xem lịch)
              </span>
              <p className="font-serif text-lg text-vintage-dark font-medium leading-snug">
                Chủ Nhật, 14 Tháng 02, 2027
              </p>
              <p className="text-[11px] font-sans text-sage-700 mt-0.5">
                ✦ 14 February 2027 • Valentine's & Graduation Day
              </p>
            </div>
          </div>

          {/* Time Row (Clickable clock tick) */}
          <div
            onClick={handleClockClick}
            className={`p-3 rounded-xl border border-vintage-border/70 bg-white/70 hover:bg-cream-50 cursor-pointer transition-all duration-300 flex items-start gap-3.5 ${
              isTickingClock ? 'scale-105 -rotate-1 bg-amber-50/80' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200">
              <Clock className={`w-5 h-5 ${isTickingClock ? 'animate-spin' : ''}`} />
            </div>
            <div className="flex-1">
              <span className="text-[9px] font-sans uppercase tracking-widest text-vintage-muted font-medium block">
                Thời gian đón tiếp
              </span>
              <p className="font-serif text-lg text-vintage-dark font-medium leading-snug">
                09:00 AM – 11:00 AM
              </p>
              <p className="text-[11px] font-sans text-vintage-sepia mt-0.5">
                Chụp ảnh kỷ niệm & trao hoa cùng Phương Thanh
              </p>
            </div>
          </div>

          {/* Venue & Location Row */}
          <div className="p-3 rounded-xl border border-vintage-border/70 bg-white/70 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-wax-red/10 text-wax-red flex items-center justify-center shrink-0 border border-wax-red/20">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <span className="text-[9px] font-sans uppercase tracking-widest text-vintage-muted font-medium block">
                Địa điểm
              </span>
              <p className="font-serif text-base text-vintage-dark font-medium leading-snug">
                THPT Trần Quang Khải
              </p>
              <p className="text-[11px] font-sans text-vintage-sepia mt-0.5 leading-relaxed">
                Ngõ 176 Phan Đình Phùng, Nam Định, Ninh Bình
              </p>
            </div>
          </div>
        </div>

        {/* Perforated Divider Ticket line */}
        <div className="relative flex items-center px-4">
          <div className="w-4 h-4 rounded-full bg-cream-100 -ml-6 border border-vintage-border" />
          <div className="flex-1 border-t-2 border-dashed border-vintage-border" />
          <div className="w-4 h-4 rounded-full bg-cream-100 -mr-6 border border-vintage-border" />
        </div>

        {/* Action Buttons: Add to Calendar */}
        <div className="p-4 sm:p-5 bg-cream-50/50 flex flex-col sm:flex-row items-center gap-2.5">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playSparkleChime()}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-sans text-xs font-medium tracking-wide shadow-sm transition-all"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Thêm Google Calendar</span>
          </a>

          <button
            onClick={downloadIcs}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-cream-100 text-vintage-espresso font-sans text-xs font-medium border border-vintage-border shadow-sm transition-all"
          >
            <Calendar className="w-4 h-4 text-vintage-muted" />
            <span>Tải file Lịch (.ics)</span>
          </button>
        </div>
      </div>

      <p className="text-[11px] font-sans text-vintage-muted mt-6 tracking-wide">
        Chạm vào ngày hoặc giờ để kích hoạt hiệu ứng tương tác
      </p>
    </div>
  );
}
