import React, { useState, useEffect, useRef } from 'react';
import StorybookNavigation from './components/StorybookNavigation';
import Page1Envelope from './components/pages/Page1Envelope';
import Page2MyYouth from './components/pages/Page2MyYouth';
import Page3Invitation from './components/pages/Page3Invitation';
import Page4EventDetails from './components/pages/Page4EventDetails';
import Page5Location from './components/pages/Page5Location';
import Page6Countdown from './components/pages/Page6Countdown';
import Page7Rsvp from './components/pages/Page7Rsvp';
import Page8FinalMemory from './components/pages/Page8FinalMemory';
import FallingPetals from './components/FallingPetals';
import ClickSparkleLayer from './components/ClickSparkleLayer';
import LightboxModal from './components/LightboxModal';
import AdminModal from './components/AdminModal';
import { sounds } from './utils/soundEffects';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8;
  const [isPlaying, setIsPlaying] = useState(false);
  const [petalsEnabled, setPetalsEnabled] = useState(true);
  const [lightboxData, setLightboxData] = useState({ isOpen: false, src: '', caption: '' });
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const audioRef = useRef(null);

  // Touch Swipe navigation for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 60; // minimum distance for swipe
    if (diff > threshold && currentPage < totalPages) {
      // Swipe left -> Next
      sounds.playPaperTurn();
      setCurrentPage((prev) => prev + 1);
    } else if (diff < -threshold && currentPage > 1) {
      // Swipe right -> Prev
      sounds.playPaperTurn();
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'ArrowRight' && currentPage < totalPages) {
        sounds.playPaperTurn();
        setCurrentPage((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentPage > 1) {
        sounds.playPaperTurn();
        setCurrentPage((prev) => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // Audio Play / Pause handler
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      sounds.setMuted(true);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        sounds.setMuted(false);
      }).catch((e) => console.log('Audio autoplay prevented:', e));
    }
  };

  // When Envelope is opened in Page 1 -> auto play music & advance to Page 2
  const handleEnvelopeNext = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        sounds.setMuted(false);
      }).catch(() => {});
    }
    setCurrentPage(2);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-screen h-screen overflow-hidden bg-cream-100 text-vintage-dark select-none paper-texture flex flex-col justify-between"
    >
      {/* Background Music Element */}
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      {/* Atmospheric Falling Sakura Petals & Sun Dust Canvas */}
      <FallingPetals isEnabled={petalsEnabled} />

      {/* Global Interactive Click Sparkle Particle Layer */}
      <ClickSparkleLayer />

      {/* Floating Storybook Navigation (Top & Bottom bars) */}
      <StorybookNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
        onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        onSelectPage={(pageNum) => setCurrentPage(pageNum)}
        isPlaying={isPlaying}
        onToggleMusic={toggleMusic}
        petalsEnabled={petalsEnabled}
        onTogglePetals={() => setPetalsEnabled(!petalsEnabled)}
      />

      {/* MAIN STORYBOOK STAGE (FULL SCREEN CONTAINER) */}
      <div className="relative w-full h-full flex items-center justify-center pt-14 pb-16 px-2 sm:px-4">
        {/* PAGE 1: THE ENVELOPE */}
        {currentPage === 1 && (
          <Page1Envelope onNextPage={handleEnvelopeNext} />
        )}

        {/* PAGE 2: MY YOUTH */}
        {currentPage === 2 && (
          <Page2MyYouth
            onOpenLightbox={(src, caption) =>
              setLightboxData({ isOpen: true, src, caption })
            }
          />
        )}

        {/* PAGE 3: A SPECIAL INVITATION */}
        {currentPage === 3 && <Page3Invitation />}

        {/* PAGE 4: EVENT DETAILS */}
        {currentPage === 4 && <Page4EventDetails />}

        {/* PAGE 5: OUR LOCATION */}
        {currentPage === 5 && <Page5Location />}

        {/* PAGE 6: COUNTDOWN */}
        {currentPage === 6 && <Page6Countdown />}

        {/* PAGE 7: RSVP */}
        {currentPage === 7 && <Page7Rsvp />}

        {/* PAGE 8: FINAL MEMORY */}
        {currentPage === 8 && (
          <Page8FinalMemory
            onReplay={() => setCurrentPage(1)}
            onOpenAdmin={() => setIsAdminOpen(true)}
            onOpenLightbox={(src, caption) =>
              setLightboxData({ isOpen: true, src, caption })
            }
          />
        )}
      </div>

      {/* Lightbox Zoom Modal */}
      <LightboxModal
        isOpen={lightboxData.isOpen}
        onClose={() => setLightboxData({ ...lightboxData, isOpen: false })}
        imageSrc={lightboxData.src}
        caption={lightboxData.caption}
      />

      {/* Admin Guest List Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
