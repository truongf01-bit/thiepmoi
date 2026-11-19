import React from 'react';
import { ChevronLeft, ChevronRight, Disc, Flower2, Music, Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function StorybookNavigation({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  onSelectPage,
  isPlaying,
  onToggleMusic,
  petalsEnabled,
  onTogglePetals,
}) {
  const pageTitles = [
    'The Envelope',
    'My Youth',
    'Invitation',
    'Event Details',
    'Our Location',
    'Countdown',
    'RSVP',
    'Final Memory',
  ];

  const handlePrev = () => {
    sounds.playPaperTurn();
    onPrev();
  };

  const handleNext = () => {
    sounds.playPaperTurn();
    onNext();
  };

  return (
    <>
      {/* Top Floating Utility Bar (Audio, Petals, Chapter info) */}
      <header className="fixed top-4 inset-x-4 z-40 flex items-center justify-between max-w-xl mx-auto pointer-events-none">
        {/* Current Chapter Label */}
        <div className="pointer-events-auto bg-[#FCFAF6]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-vintage-border shadow-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sage-500 animate-pulse" />
          <span className="text-[11px] font-sans font-medium text-vintage-dark tracking-wide">
            {currentPage} / {totalPages} • {pageTitles[currentPage - 1]}
          </span>
        </div>

        {/* Right Controls: Music & Petals */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Petal toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              onTogglePetals();
            }}
            title={petalsEnabled ? 'Tắt hoa rơi' : 'Bật hoa rơi'}
            className={`p-2 rounded-full border border-vintage-border bg-[#FCFAF6]/90 backdrop-blur-md shadow-sm transition-all hover:scale-105 active:scale-95 ${
              petalsEnabled ? 'text-sage-700' : 'text-vintage-muted'
            }`}
          >
            <Flower2 className={`w-3.5 h-3.5 ${petalsEnabled ? 'animate-pulse' : 'opacity-40'}`} />
          </button>

          {/* Music Play/Pause with spinning vinyl */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleMusic();
            }}
            title={isPlaying ? 'Tạm dừng nhạc nền' : 'Phát nhạc nền'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-vintage-border bg-[#FCFAF6]/90 backdrop-blur-md shadow-sm transition-all hover:scale-105 active:scale-95 text-vintage-dark"
          >
            <Disc
              className={`w-3.5 h-3.5 text-vintage-sepia transition-transform ${
                isPlaying ? 'animate-spin-slow text-sage-600' : 'text-vintage-muted'
              }`}
            />
            <span className="text-[10px] font-serif font-medium uppercase tracking-wider text-vintage-espresso">
              {isPlaying ? 'Nhạc: Bật' : 'Nhạc: Tắt'}
            </span>
          </button>
        </div>
      </header>

      {/* Bottom Floating Navigation Bar (PREV, Dots, NEXT) */}
      <footer className="fixed bottom-4 inset-x-4 z-40 flex items-center justify-between max-w-xl mx-auto select-none">
        {/* PREV Button */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          aria-label="Trang trước"
          className={`flex items-center gap-1 px-4 py-2.5 rounded-full border border-vintage-border bg-[#FCFAF6]/95 backdrop-blur-md shadow-md text-vintage-dark font-serif text-xs tracking-wider uppercase transition-all active:scale-95 ${
            currentPage === 1
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-cream-100 hover:border-vintage-muted'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">BACK</span>
        </button>

        {/* 8 Clickable Progress Dots */}
        <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#FCFAF6]/95 backdrop-blur-md border border-vintage-border shadow-md">
          {Array.from({ length: totalPages }, (_, idx) => {
            const pageNum = idx + 1;
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                onClick={() => {
                  sounds.playPaperTurn();
                  onSelectPage(pageNum);
                }}
                title={`Chuyển tới Trang ${pageNum}: ${pageTitles[idx]}`}
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-6 h-2 bg-sage-600'
                    : 'w-2 h-2 bg-vintage-border hover:bg-vintage-muted'
                }`}
              />
            );
          })}
        </div>

        {/* NEXT Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Trang tiếp theo"
          className={`flex items-center gap-1 px-4 py-2.5 rounded-full border border-vintage-border bg-vintage-espresso text-cream-50 font-serif text-xs tracking-wider uppercase shadow-md transition-all active:scale-95 ${
            currentPage === totalPages
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-vintage-brown'
          }`}
        >
          <span className="hidden sm:inline">NEXT</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </>
  );
}
