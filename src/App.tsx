import { useCallback, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { FuturisticBackdrop } from '@/src/components/FuturisticBackdrop';
import { CursorTour } from '@/src/components/CursorTour';
import { CustomCursor } from '@/src/components/CustomCursor';
import { ScrollProgress } from '@/src/components/ScrollProgress';
import { Navbar } from '@/src/components/Navbar';
import { HeroSection } from '@/src/components/HeroSection';
import { KineticMarquee } from '@/src/components/KineticMarquee';
import { AboutSection } from '@/src/components/AboutSection';
import { WorkSection } from '@/src/components/WorkSection';
import { SkillsSection } from '@/src/components/SkillsSection';
import { JourneySection } from '@/src/components/JourneySection';
import { ContactSection } from '@/src/components/ContactSection';

export default function App() {
  const [tourTrigger, setTourTrigger] = useState(0);
  const [tourActive, setTourActive] = useState(false);

  const handleReplayTour = useCallback(() => {
    setTourTrigger((prev) => prev + 1);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#050505] text-[#F5F5F7]">
        <FuturisticBackdrop />
        <ScrollProgress />
        <CursorTour tourTrigger={tourTrigger} onTourActiveChange={setTourActive} />
        <CustomCursor suppressed={tourActive} />
        <Navbar />
        <main className="relative z-10">
          <HeroSection onReplayTour={handleReplayTour} />
          <KineticMarquee />
          <AboutSection />
          <WorkSection />
          <SkillsSection />
          <JourneySection />
        </main>
        <div className="relative z-10">
          <ContactSection />
        </div>
      </div>
    </MotionConfig>
  );
}
