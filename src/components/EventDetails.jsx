import React from 'react';
import { Calendar, Clock, MapPin, School, CalendarPlus, Check } from 'lucide-react';

export default function EventDetails() {
  // Calendar event details for Google Calendar & iCal
  const eventTitle = encodeURIComponent('Lễ Tốt Nghiệp – Đặng Phương Thanh');
  const eventDetails = encodeURIComponent(
    'Lễ Tốt Nghiệp THPT Trần Quang Khải của Đặng Phương Thanh. Thời gian: 09:00 - 11:00, ngày 14/02/2027. Địa chỉ: Ngõ 176 Phan Đình Phùng, Nam Định, Ninh Bình.'
  );
  const eventLocation = encodeURIComponent('Trường THPT Trần Quang Khải, Ngõ 176 Phan Đình Phùng, Nam Định, Ninh Bình');
  // 14 Feb 2027 from 09:00 to 11:00 UTC+7 => 20270214T020000Z to 20270214T040000Z
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=20270214T020000Z/20270214T040000Z&details=${eventDetails}&location=${eventLocation}`;

  const downloadIcs = () => {
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

  return (
    <section className="relative py-12 px-4 sm:px-6 max-w-xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-sans tracking-[0.3em] uppercase text-sage-600 font-medium">
          Save The Date
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-vintage-dark font-medium mt-1">
          Thông Tin Buổi Lễ
        </h2>
        <div className="w-12 h-[1px] bg-vintage-border mx-auto mt-3" />
      </div>

      {/* Luxury Event Card */}
      <div className="relative bg-[#FCFAF6] rounded-2xl border border-vintage-border shadow-photobook p-6 sm:p-8">
        {/* Corner Ornaments */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-vintage-muted/40 pointer-events-none" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-vintage-muted/40 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-vintage-muted/40 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-vintage-muted/40 pointer-events-none" />

        <div className="space-y-6">
          {/* Item 1: Date */}
          <div className="flex items-start gap-4 pb-5 border-b border-vintage-border/70">
            <div className="w-12 h-12 rounded-xl bg-sage-100/80 text-sage-700 flex items-center justify-center shrink-0 border border-sage-200">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-vintage-muted font-medium">
                Ngày diễn ra
              </p>
              <h3 className="font-serif text-xl sm:text-2xl text-vintage-dark font-medium mt-0.5">
                Chủ Nhật, 14 Tháng 02, 2027
              </h3>
              <p className="text-xs font-sans text-sage-700 mt-1">
                ✦ 14 February 2027 (Valentine's & Graduation Day)
              </p>
            </div>
          </div>

          {/* Item 2: Time */}
          <div className="flex items-start gap-4 pb-5 border-b border-vintage-border/70">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200/60">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-vintage-muted font-medium">
                Thời gian
              </p>
              <h3 className="font-serif text-xl sm:text-2xl text-vintage-dark font-medium mt-0.5">
                09:00 AM – 11:00 AM
              </h3>
              <p className="text-xs font-sans text-vintage-sepia mt-1">
                Chụp ảnh lưu niệm cùng bạn bè & thầy cô
              </p>
            </div>
          </div>

          {/* Item 3: School Location */}
          <div className="flex items-start gap-4 pb-5 border-b border-vintage-border/70">
            <div className="w-12 h-12 rounded-xl bg-cream-200 text-vintage-espresso flex items-center justify-center shrink-0 border border-vintage-border">
              <School className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-vintage-muted font-medium">
                Địa điểm
              </p>
              <h3 className="font-serif text-xl sm:text-2xl text-vintage-dark font-medium mt-0.5">
                THPT Trần Quang Khải
              </h3>
              <p className="text-xs font-sans text-vintage-sepia mt-1">
                Khuôn viên sân trường chính & khu vực chụp hình tốt nghiệp
              </p>
            </div>
          </div>

          {/* Item 4: Full Address */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-wax-red/10 text-wax-red flex items-center justify-center shrink-0 border border-wax-red/20">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-vintage-muted font-medium">
                Địa chỉ chi tiết
              </p>
              <p className="font-serif text-lg text-vintage-espresso font-medium mt-0.5 leading-snug">
                Ngõ 176 Phan Đình Phùng, Nam Định, Ninh Bình, Việt Nam
              </p>
            </div>
          </div>
        </div>

        {/* Add to Calendar Action Bar */}
        <div className="mt-8 pt-6 border-t border-dashed border-vintage-border flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-vintage-espresso font-sans text-xs font-medium tracking-wide border border-vintage-border transition-colors duration-200 shadow-sm"
          >
            <CalendarPlus className="w-4 h-4 text-sage-600" />
            <span>Thêm vào Google Calendar</span>
          </a>

          <button
            onClick={downloadIcs}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-cream-100 text-vintage-sepia font-sans text-xs font-medium tracking-wide border border-vintage-border transition-colors duration-200 shadow-sm"
          >
            <Calendar className="w-4 h-4 text-vintage-muted" />
            <span>Tải file Lịch (.ics cho Apple)</span>
          </button>
        </div>
      </div>
    </section>
  );
}
