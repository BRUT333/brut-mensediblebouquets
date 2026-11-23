import { MotionConfig } from "framer-motion";
import { FloatingActions } from "./components/FloatingActions";
import { OrderModal } from "./components/OrderModal";
import { Grain, ScrollProgress, Toast } from "./components/Overlays";
import { AnnouncementBar } from "./components/sections/AnnouncementBar";
import { Benefits } from "./components/sections/Benefits";
import { Catalog } from "./components/sections/Catalog";
import { Constructor } from "./components/sections/Constructor";
import { FAQ } from "./components/sections/FAQ";
import { Features } from "./components/sections/Features";
import { FinalCTA } from "./components/sections/FinalCTA";
import { Footer } from "./components/sections/Footer";
import { ForWhom } from "./components/sections/ForWhom";
import { Hero } from "./components/sections/Hero";
import { Navbar } from "./components/sections/Navbar";
import { Pricing } from "./components/sections/Pricing";
import { Process } from "./components/sections/Process";
import { SocialProof } from "./components/sections/SocialProof";
import { Testimonials } from "./components/sections/Testimonials";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cream focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink-950"
        >
          Перейти к содержимому
        </a>
        <ScrollProgress />

        <div className="relative overflow-x-clip">
          <AnnouncementBar />
          <Navbar />
          <main id="main">
            <Hero />
            <SocialProof />
            <Benefits />
            <Features />
            <Catalog />
            <Constructor />
            <ForWhom />
            <Process />
            <Testimonials />
            <Pricing />
            <FAQ />
            <FinalCTA />
          </main>
          <Footer />
        </div>

        <FloatingActions />
        <OrderModal />
        <Toast />
        <Grain />
      </AppProvider>
    </MotionConfig>
  );
}
