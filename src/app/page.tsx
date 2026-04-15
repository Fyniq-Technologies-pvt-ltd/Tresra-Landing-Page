"use client";
import { useState, useEffect } from "react";
import { motion, Variants, MotionConfig, useScroll, useTransform } from "framer-motion";

// ── UIBlockify-style animation variants ─────────────────────────────────────
// Spring physics for a "physical", snappy feel instead of ease curves
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
};
const staggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

// Wrapper: spring fade-up on scroll into view
const FadeUp = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    variants={{
      hidden: fadeUpVariants.hidden,
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 80, damping: 20, delay },
      },
    }}
  >
    {children}
  </motion.div>
);

// Wrapper: stagger children on scroll into view
const Stagger = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    variants={staggerVariants}
  >
    {children}
  </motion.div>
);

// Stagger child — spring-powered fade-up
const StaggerItem = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div className={className} variants={fadeUpVariants}>
    {children}
  </motion.div>
);

// Hover-lift card — subtle 2% scale + shadow lift on hover, spring snap-back on tap
const HoverCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={className}
    variants={fadeUpVariants}
    whileHover={{ y: -6, scale: 1.02, boxShadow: "0px 20px 50px rgba(101,47,231,0.12)" }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 18 }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const [showDialog, setShowDialog] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [renderSplash, setRenderSplash] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Fade IN shortly after mount
    const fadeIn = setTimeout(() => setShowSplash(true), 100);
    // Fade OUT after 2.5 seconds
    const fadeOut = setTimeout(() => {
      setShowSplash(false);
      setIsReady(true);
    }, 2500);
    // Unmount completely after fade out completes
    const unmount = setTimeout(() => setRenderSplash(false), 3500);

    return () => {
      clearTimeout(fadeIn);
      clearTimeout(fadeOut);
      clearTimeout(unmount);
    };
  }, []);

  // Scroll-aware nav — UIBlockify pattern
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(255,255,255,0.85)"]);
  const navBlur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(14px)"]);
  const navShadow = useTransform(scrollY, [0, 80], ["0 0 0 rgba(0,0,0,0)", "0 1px 24px rgba(101,47,231,0.08)"]);

  return (
    <MotionConfig transition={{ type: "spring", damping: 20 }}>
      <div className="text-on-surface selection:bg-primary-container selection:text-on-primary-container">

        {/* Splash Screen */}
        {renderSplash && (
          <div className={`fixed inset-0 z-[9999] bg-[#fcf4ff] flex items-center justify-center transition-opacity duration-1000 ${showSplash ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            {/* Tresra Logo / Text in Bricolage Grotesque */}
            <div className={`text-transparent bg-clip-text bg-gradient-to-r from-[#652fe7] to-[#a98fff] text-6xl md:text-8xl font-black tracking-tight transform transition-all duration-1000 ease-out ${showSplash ? 'opacity-100 scale-100 blur-none' : 'opacity-0 scale-95 blur-md'}`}>
              Tresra
            </div>
            {/* Floating soft light blobs behind */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#dfc8ff]/60 blur-[100px] rounded-full mix-blend-multiply transition-opacity duration-1000 delay-100 ${showSplash ? 'opacity-100' : 'opacity-0'}`}></div>
          </div>
        )}

        {/* Coming Soon Dialog */}
        {showDialog && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setShowDialog(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

            {/* Dialog Card */}
            <div
              className="relative z-10 bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[2rem] shadow-2xl shadow-primary/20 max-w-md w-full p-8 flex flex-col items-center text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow blob */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/20 rounded-full blur-[60px] pointer-events-none" />

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[#a78bfa] flex items-center justify-center mb-5 shadow-lg shadow-primary/30">
                <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
              </div>

              {/* Badge */}
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase mb-4">
                Coming Soon
              </div>

              <h2 className="text-2xl font-black text-on-surface mb-3 tracking-tight">
                We&apos;re launching soon! 🚀
              </h2>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-7">
                Tresra is gearing up to go live. We&apos;re putting the finishing touches on something amazing — real-time barber booking, right at your fingertips.
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-outline-variant/20 mb-6" />

              {/* Close button */}
              <button
                onClick={() => setShowDialog(false)}
                className="w-full bg-primary text-white py-3 rounded-full font-bold text-sm shadow-lg shadow-primary/30 hover:opacity-90 active:scale-95 transition-all"
              >
                Got it, can&apos;t wait!
              </button>

              <button
                onClick={() => setShowDialog(false)}
                className="mt-3 text-xs text-on-surface-variant hover:text-primary transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {isReady && (
          <>
            {/* Top Navigation Bar (Anchor) */}
            <motion.nav
              style={{ backgroundColor: navBg, backdropFilter: navBlur, WebkitBackdropFilter: navBlur, boxShadow: navShadow }}
              className="fixed top-0 w-full z-50 border-b border-purple-200/15"
            >
              <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
                <a href="#hero"><img src="/logo.png" alt="Tresra Logo" className="h-10 w-auto" /></a>
                <div className="hidden md:flex gap-8 items-center">
                  <a className="text-slate-600 hover:text-purple-600 transition-colors font-medium" href="#why-tresra">Why Tresra</a>
                  <a className="text-slate-600 hover:text-purple-600 transition-colors font-medium" href="#how-it-works">How It Works</a>
                  <a className="text-slate-600 hover:text-purple-600 transition-colors font-medium" href="#features">Features</a>
                  <a className="text-slate-600 hover:text-purple-600 transition-colors font-medium" href="#categories">Categories</a>
                  <a className="text-slate-600 hover:text-purple-600 transition-colors font-medium" href="#reviews">Reviews</a>
                </div>
                <button onClick={() => setShowDialog(true)} className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-semibold scale-95 active:scale-90 transition-transform hover:opacity-80">
                  Get Started
                </button>
              </div>
            </motion.nav>

            <main className="overflow-x-hidden pt-20">
              {/* Hero Section */}
              <section id="hero" className="relative min-h-[1000px] flex items-center pt-12 pb-24 hero-gradient">
                <div className="absolute inset-0 z-0 opacity-5 pointer-events-none flex items-center justify-center">
                  <span className="text-[40rem] font-black select-none">T</span>
                </div>
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                  {/* Content Left */}
                  <Stagger className="space-y-8">
                    <StaggerItem>
                      <div className="inline-flex items-center gap-2 bg-primary-container/20 px-4 py-2 rounded-full border border-primary-container/30">
                        <span className="flex -space-x-2">
                          <img alt="Reviewer 1" className="w-8 h-8 rounded-full border-2 border-surface shadow-sm object-cover" src="/assets/reviewer1.png" />
                          <img alt="Reviewer 2" className="w-8 h-8 rounded-full border-2 border-surface shadow-sm object-cover" src="/assets/reviewer2.png" />
                          <img alt="Reviewer 3" className="w-8 h-8 rounded-full border-2 border-surface shadow-sm object-cover" src="/assets/reviewer3.png" />
                        </span>
                        <span className="text-sm font-bold text-primary">4.9/5 Rating</span>
                      </div>
                    </StaggerItem>
                    <StaggerItem>
                      <h1 className="text-5xl lg:text-7xl font-extrabold text-on-surface leading-[1.1] tracking-tight">
                        Book Your Stylist. <br />
                        <span className="text-primary-dim">Not Just a Slot.</span>
                      </h1>
                    </StaggerItem>
                    <StaggerItem>
                      <p className="text-xl text-on-surface-variant max-w-lg leading-relaxed">
                        Discover top-rated salons, stylists, and grooming experts near you. Choose your professional. Pick your time. Walk in with zero waiting.
                      </p>
                    </StaggerItem>
                    <StaggerItem>
                      <p className="text-base text-on-surface-variant/80 max-w-lg leading-relaxed -mt-2 italic">
                        From haircuts to styling, grooming to self-care — everything, on your schedule.
                      </p>
                    </StaggerItem>
                    <StaggerItem>
                      <div className="flex flex-wrap gap-4 pt-4">
                        <button onClick={() => setShowDialog(true)} className="bg-primary text-white px-8 py-2 rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                          Book Now
                        </button>
                        <a href="#why-tresra" className="bg-surface-container-lowest text-on-surface border border-outline-variant/30 px-8 py-2 rounded-full font-bold text-lg hover:bg-surface-container transition-all inline-block">
                          Explore Services
                        </a>
                      </div>
                    </StaggerItem>
                    <StaggerItem>
                      <div className="flex items-center gap-6 pt-12 border-t border-outline-variant/10">
                        <div className="flex flex-col">
                          <span className="text-2xl font-extrabold text-on-surface">10K+</span>
                          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">Happy Clients</span>
                        </div>
                        <div className="h-10 w-px bg-outline-variant/20"></div>
                        <div className="flex flex-col">
                          <span className="text-2xl font-extrabold text-on-surface">450+</span>
                          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">Top Barbers</span>
                        </div>
                        <div className="h-10 w-px bg-outline-variant/20"></div>
                        <div className="flex flex-col">
                          <span className="text-2xl font-extrabold text-on-surface">15+</span>
                          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">Cities</span>
                        </div>
                      </div>
                    </StaggerItem>
                  </Stagger>

                  {/* Visuals Right (Enhanced Mockup and Floating Cards) — hidden below lg */}
                  <div className="relative hidden lg:flex justify-center items-center h-full min-h-[300px]">
                    {/* Central Mobile Mockup */}
                    <div className="relative z-20 scale-100 md:scale-125 lg:scale-[1.4] transition-transform duration-500 origin-center">
                      <img alt="Tresra mobile app mockup" className="w-full max-w-[240px] md:max-w-[500px] h-auto object-contain drop-shadow-[0_45px_55px_rgba(101,47,231,0.25)]" src="/phn.png" />
                    </div>

                    {/* Floating UI Elements — hidden on mobile */}
                    {/* 1. Live Availability */}
                    <div className="hidden md:flex absolute top-[5%] -left-[5%] z-30 animate-float glass-card p-4 rounded-2xl items-start gap-3 w-48">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 mt-1.5 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Live Availability</p>
                        <p className="text-sm font-bold">Priya is available</p>
                        <p className="text-[11px] text-primary font-medium">Today, 5:00 PM</p>
                      </div>
                    </div>

                    {/* 2. Your Booking */}
                    <div className="hidden md:block absolute top-[20%] -right-[15%] z-30 animate-float-delayed glass-card p-5 rounded-2xl w-56 shadow-xl">
                      <h5 className="text-xs font-extrabold text-on-surface mb-3">Your Booking</h5>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded bg-primary-container/30 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-sm">home_work</span>
                          </div>
                          <div className="leading-tight">
                            <p className="text-[11px] font-bold">The Glow Studio</p>
                            <p className="text-[9px] text-on-surface-variant">Koramangala, Bangalore</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded bg-secondary-container/30 flex items-center justify-center">
                            <span className="material-symbols-outlined text-secondary text-sm">person</span>
                          </div>
                          <div className="leading-tight">
                            <p className="text-[11px] font-bold">Priya</p>
                            <p className="text-[9px] text-on-surface-variant">Your Stylist</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded bg-tertiary-container/30 flex items-center justify-center">
                            <span className="material-symbols-outlined text-tertiary text-sm">calendar_today</span>
                          </div>
                          <div className="leading-tight">
                            <p className="text-[11px] font-bold">Today, 5:00 PM</p>
                            <p className="text-[9px] text-on-surface-variant">Wed, 15 May 2024</p>
                          </div>
                        </div>
                      </div>
                      <button className="w-full bg-primary text-white py-2 rounded-lg text-[11px] font-bold shadow-lg shadow-primary/20">Confirm Booking</button>
                    </div>

                    {/* 3. Booking Confirmed! */}
                    <div className="hidden md:flex absolute bottom-[25%] -right-[10%] z-30 animate-float glass-card px-4 py-3 rounded-full items-center gap-3 shadow-lg border-green-200/50">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-xs font-bold">check</span>
                      </div>
                      <div className="leading-tight">
                        <p className="text-[11px] font-bold">Booking Confirmed!</p>
                        <p className="text-[9px] text-on-surface-variant">See you at 5:00 PM</p>
                      </div>
                    </div>

                    {/* 4. 10K+ Happy Customers */}
                    <div className="hidden md:flex absolute bottom-[5%] left-[0%] z-30 animate-float-slow glass-card p-4 rounded-2xl items-center gap-4 w-52">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'wght' 600" }}>content_cut</span>
                      </div>
                      <div>
                        <p className="text-lg font-black text-on-surface">10K+</p>
                        <p className="text-[11px] font-bold text-on-surface-variant">Happy Customers</p>
                      </div>
                    </div>

                    {/* 5. 5-star Review */}
                    <div className="hidden md:block absolute top-0 right-[10%] z-30 animate-float-slow glass-card p-4 rounded-2xl w-52">
                      <div className="flex gap-0.5 text-yellow-500 mb-2">
                        <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                      <p className="text-[11px] font-medium italic text-on-surface leading-tight mb-3">&quot;I always book Dharam on Tresra. No more waiting!&quot;</p>
                      <div className="flex items-center gap-2">
                        <img alt="Reviewer" className="w-6 h-6 rounded-full" src="/assets/reviewer1.png" />
                        <span className="text-[10px] font-bold text-on-surface-variant">— Ajay Singh.</span>
                      </div>
                    </div>

                    {/* Decorative Background Shapes */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10"></div>
                  </div>
                </div>
              </section>

              {/* Trusted Logos */}
              {/* <div className="w-full bg-surface-container-low/50 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-on-surface-variant/50 mb-8">Featured on</p>
            <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-30 grayscale contrast-125">
              <span className="text-2xl font-black italic">Inc.</span>
              <span className="text-xl font-bold">YourStory</span>
              <span className="text-2xl font-serif font-extrabold tracking-tighter">Entrepreneur</span>
              <span className="text-xl font-bold tracking-tight">TechCrunch</span>
              <span className="text-2xl font-bold tracking-tighter">MINT</span>
            </div>
          </div>
        </div> */}

              {/* Features Section - Responsive Redesign */}
              <section id="why-tresra" className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-[#f8f5fe] via-[#fbfcff] to-[#f4effc]">
                {/* Decorative Background Swirls */}
                <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-primary/5 rounded-[100%] blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-secondary/5 rounded-[100%] blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

                <div className="max-w-[1100px] mx-auto px-6 relative z-10">
                  <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                    {/* Left Column (Text Content) */}
                    <div className="w-full lg:w-[35%] flex flex-col items-start pt-4 lg:pt-8 shrink-0">
                      <div className="bg-[#ede8fc] text-[#6b47dc] px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase mb-6">
                        Relatable Pain
                      </div>
                      <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-on-surface mb-8 tracking-tight leading-[1.1]">
                        Ever walked into <br className="hidden lg:block" />
                        a <span className="text-primary tracking-tight">salon or studio</span> and:
                      </h2>

                      <ul className="space-y-6 mb-8 w-full">
                        <li className="flex items-center gap-4">
                          <div className="w-9 h-9 rounded-full bg-[#f0eaff] flex items-center justify-center shrink-0 shadow-sm border border-white/50">
                            <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'wght' 300" }}>person</span>
                          </div>
                          <span className="text-base font-bold text-slate-800 leading-snug">Your preferred stylist wasn&apos;t available</span>
                        </li>
                        <li className="flex items-center gap-4">
                          <div className="w-9 h-9 rounded-full bg-[#f0eaff] flex items-center justify-center shrink-0 shadow-sm border border-white/50">
                            <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'wght' 300" }}>schedule</span>
                          </div>
                          <span className="text-base font-bold text-slate-800 leading-snug">You had to wait without clarity</span>
                        </li>
                        <li className="flex items-center gap-4">
                          <div className="w-9 h-9 rounded-full bg-[#f0eaff] flex items-center justify-center shrink-0 shadow-sm border border-white/50">
                            <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'wght' 300" }}>block</span>
                          </div>
                          <span className="text-base font-bold text-slate-800 leading-snug">You settled for someone<br className="hidden md:block" /> you didn&apos;t choose</span>
                        </li>
                      </ul>

                      <p className="text-slate-500 text-base leading-relaxed mb-6">
                        Grooming should feel controlled. Not random. You deserve clarity before you even leave home.
                      </p>

                      <div className="bg-[#ede8fc] text-[#6b47dc] px-5 py-2 rounded-full font-bold text-xs shadow-sm transition-transform hover:scale-105 cursor-pointer">
                        That&apos;s broken.
                      </div>
                    </div>

                    {/* Right Column (Cards) */}
                    <div className="w-full lg:w-[65%] flex flex-col gap-8 relative z-10">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-stretch">

                        {/* Card 1 */}
                        <div className="bg-white/70 backdrop-blur-xl rounded-[1.5rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col h-full relative group hover:-translate-y-1 transition-all duration-300">
                          <div className="w-8 h-8 rounded-full bg-[#f0eaff] flex items-center justify-center mb-3 shrink-0">
                            <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'wght' 300" }}>person</span>
                          </div>
                          <div className="mb-4 h-[120px] flex justify-center items-center relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-transparent to-black/5 shrink-0">
                            <img src="/assets1.png" alt="Barber missing visual" className="object-cover w-full h-full scale-[1.15] group-hover:scale-[1.20] transition-transform duration-500 origin-center mix-blend-multiply" />
                          </div>
                          <div className="flex flex-col flex-1">
                            <h3 className="text-[1.1rem] font-extrabold text-slate-800 mb-2 leading-tight tracking-tight">Your preferred stylist<br className="hidden xl:block" /> wasn&apos;t available</h3>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">You showed up expecting the professional you trust, only to find out they were busy, off, or already booked.</p>
                          </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white/70 backdrop-blur-xl rounded-[1.5rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col h-full relative group hover:-translate-y-1 transition-all duration-300">
                          <div className="w-8 h-8 rounded-full bg-[#f0eaff] flex items-center justify-center mb-3 shrink-0">
                            <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'wght' 300" }}>schedule</span>
                          </div>
                          <div className="mb-4 h-[120px] flex justify-center items-center relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-transparent to-black/5 shrink-0">
                            <img src="/assets2.png" alt="Waiting visual" className="object-cover w-full h-full scale-[1.15] group-hover:scale-[1.20] transition-transform duration-500 origin-center mix-blend-multiply" />
                          </div>
                          <div className="flex flex-col flex-1">
                            <h3 className="text-[1.1rem] font-extrabold text-slate-800 mb-2 leading-tight tracking-tight">You had to wait<br className="hidden xl:block" /> without clarity</h3>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">A quick visit became an unpredictable queue that consumed the part of the day you had planned.</p>
                          </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white/70 backdrop-blur-xl rounded-[1.5rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col h-full relative group hover:-translate-y-1 transition-all duration-300">
                          <div className="w-8 h-8 rounded-full bg-[#f0eaff] flex items-center justify-center mb-3 shrink-0">
                            <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'wght' 300" }}>block</span>
                          </div>
                          <div className="mb-4 h-[120px] flex justify-center items-center relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-transparent to-black/5 shrink-0">
                            <img src="/asset3.png" alt="Wrong barber visual" className="object-cover w-full h-full scale-[1.25] group-hover:scale-[1.3] transition-transform duration-500 origin-center mix-blend-multiply" />
                          </div>
                          <div className="flex flex-col flex-1">
                            <h3 className="text-[1.1rem] font-extrabold text-slate-800 mb-2 leading-tight tracking-tight">You settled for someone you didn&apos;t choose</h3>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">When choice disappears, the result feels random and the whole experience stops feeling personal.</p>
                          </div>
                        </div>

                      </div>

                      {/* Bottom Bar */}
                      <div className="bg-white/80 backdrop-blur-2xl border border-white rounded-[1.5rem] p-4 lg:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_15px_40px_rgb(0,0,0,0.06)] relative z-10 w-full mx-auto">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                          <div className="w-10 h-10 bg-[#744fe3] text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-[#744fe3]/40">
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                          </div>
                          <div className="flex flex-col">
                            <h4 className="text-[0.95rem] xl:text-[1.1rem] font-extrabold text-slate-800 mb-0.5 leading-tight tracking-tight">Grooming should feel controlled. Not random.</h4>
                            <p className="text-[10px] md:text-xs text-slate-500 font-medium tracking-wide">You deserve clarity before you leave home.</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-center md:justify-end gap-1.5 text-[#6b47dc] font-extrabold text-xs md:text-sm whitespace-nowrap bg-[#f4f0fd] px-4 py-2 rounded-xl shrink-0">
                          Waiting is not premium.
                          <span className="text-lg leading-none">✨</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* Solution Section */}
              <section id="how-it-works" className="py-16 md:py-24 hero-gradient relative overflow-hidden border-b border-outline-variant/10">
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                  <div className="text-center mb-14">
                    <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-on-surface mb-4">Tresra gives you full control.</h2>
                    <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">Three simple steps to the grooming experience you actually want, exactly when you want it.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    <div className="glass-card p-7 rounded-[1.5rem] relative group hover:-translate-y-2 transition-all duration-500">
                      <div className="absolute -top-5 left-7 bg-primary text-white w-10 h-10 rounded-[1rem] flex items-center justify-center text-lg font-black shadow-lg shadow-primary/20">1</div>
                      <div className="mb-6"><span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'wght' 300" }}>storefront</span></div>
                      <h3 className="text-xl font-extrabold text-on-surface mb-3">Choose your salon or studio</h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed">Find top-rated spots in your neighborhood. See verified photos, services, and client galleries.</p>
                    </div>
                    <div className="glass-card p-7 rounded-[1.5rem] relative group hover:-translate-y-2 transition-all duration-500">
                      <div className="absolute -top-5 left-7 bg-secondary text-white w-10 h-10 rounded-[1rem] flex items-center justify-center text-lg font-black shadow-lg shadow-secondary/20">2</div>
                      <div className="mb-6"><span className="material-symbols-outlined text-4xl text-secondary" style={{ fontVariationSettings: "'wght' 300" }}>content_cut</span></div>
                      <h3 className="text-xl font-extrabold text-on-surface mb-3">Select your stylist or expert</h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed">Browse individual profiles and portfolios. Pick the professional who nails exactly what you&apos;re after.</p>
                    </div>
                    <div className="glass-card p-7 rounded-[1.5rem] relative group hover:-translate-y-2 transition-all duration-500">
                      <div className="absolute -top-5 left-7 bg-tertiary text-white w-10 h-10 rounded-[1rem] flex items-center justify-center text-lg font-black shadow-lg shadow-tertiary/20">3</div>
                      <div className="mb-6"><span className="material-symbols-outlined text-4xl text-tertiary" style={{ fontVariationSettings: "'wght' 300" }}>event_available</span></div>
                      <h3 className="text-xl font-extrabold text-on-surface mb-3">Book your exact time</h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed">See real-time schedules. Pick your slot, confirm, and walk in ready. No waiting. No surprises.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* How It Works Section */}
              <section className="py-16 md:py-24 bg-white relative overflow-hidden" id="how-it-works-steps">
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                  <FadeUp className="text-center mb-14">
                    <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-on-surface mb-4">How It Works</h2>
                    <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">Experience the future of grooming in three seamless steps.</p>
                  </FadeUp>
                  <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StaggerItem className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 glass-card rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-primary/5 transition-transform hover:scale-110 duration-500">
                        <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'wght' 500" }}>search</span>
                      </div>
                      <h3 className="text-xl font-bold text-on-surface">1. Find your salon or studio</h3>
                    </StaggerItem>
                    <StaggerItem className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 glass-card rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-secondary/5 transition-transform hover:scale-110 duration-500">
                        <span className="material-symbols-outlined text-3xl text-secondary" style={{ fontVariationSettings: "'wght' 500" }}>face_6</span>
                      </div>
                      <h3 className="text-xl font-bold text-on-surface">2. Pick your stylist or expert</h3>
                    </StaggerItem>
                    <StaggerItem className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 glass-card rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-tertiary/5 transition-transform hover:scale-110 duration-500">
                        <span className="material-symbols-outlined text-3xl text-tertiary" style={{ fontVariationSettings: "'wght' 500" }}>touch_app</span>
                      </div>
                      <h3 className="text-xl font-bold text-on-surface">3. Book your exact time</h3>
                    </StaggerItem>
                  </Stagger>
                </div>
              </section>

              {/* Key Features Section */}
              <section id="features" className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-white via-[#faf5ff] to-white">
                {/* Subtle atmospheric glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-[1000px] rounded-full bg-gradient-to-br from-[#f3e8ff]/80 via-[#fdf4ff]/80 to-[#e0e7ff]/50 blur-[100px] pointer-events-none"></div>

                <div className="max-w-5xl mx-auto px-6 relative z-10">
                  <FadeUp className="text-center mb-16">
                    <div className="inline-block text-[#9254f3] text-[10px] font-extrabold tracking-[0.2em] uppercase mb-4">
                      Platform Features
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-[#37274d] mb-4">
                      Built for people who value their time.
                    </h2>
                    <p className="text-lg text-slate-500 max-w-xl mx-auto font-medium">
                      Efficiency at its core. Everything structured to get you the booking you need right now.
                    </p>
                  </FadeUp>

                  <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    {/* Card 1: Full Width */}
                    <HoverCard className="bg-white/60 backdrop-blur-2xl border border-white p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_8px_30px_rgb(146,84,243,0.04)] relative overflow-hidden group transition-all duration-300 md:col-span-2 flex flex-col justify-center min-h-[220px]">
                      <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-500 pointer-events-none">
                        <span className="material-symbols-outlined text-[#9254f3] text-[180px]" style={{ fontVariationSettings: "'wght' 200" }}>bolt</span>
                      </div>
                      <div className="w-12 h-12 bg-white rounded-[1rem] shadow-sm border border-purple-50 flex items-center justify-center mb-6 shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <span className="material-symbols-outlined text-[#9254f3] text-xl" style={{ fontVariationSettings: "'wght' 300" }}>bolt</span>
                      </div>
                      <div className="relative z-10 md:max-w-lg">
                        <h3 className="text-xl font-extrabold text-slate-800 mb-2 tracking-tight">Real-Time Availability</h3>
                        <p className="text-[14px] text-slate-500 leading-relaxed font-medium">Know instantly when your preferred professional is free. No guessing, no phone calls.</p>
                      </div>
                    </HoverCard>

                    {/* Card 2: Half */}
                    <HoverCard className="bg-white/60 backdrop-blur-2xl border border-white p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_8px_30px_rgb(146,84,243,0.04)] relative overflow-hidden group transition-all duration-300 flex flex-col justify-start min-h-[260px]">
                      <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-500 pointer-events-none">
                        <span className="material-symbols-outlined text-[#9254f3] text-[140px]" style={{ fontVariationSettings: "'wght' 200" }}>account_circle</span>
                      </div>
                      <div className="w-12 h-12 bg-white rounded-[1rem] shadow-sm border border-purple-50 flex items-center justify-center mb-6 shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <span className="material-symbols-outlined text-[#9254f3] text-xl" style={{ fontVariationSettings: "'wght' 300" }}>account_circle</span>
                      </div>
                      <div className="relative z-10 w-full pr-4">
                        <h3 className="text-xl font-extrabold text-slate-800 mb-2 tracking-tight">Stylist Profiles</h3>
                        <p className="text-[14px] text-slate-500 leading-relaxed font-medium">Portfolios, specializations, and honest ratings — everything you need to choose with confidence.</p>
                      </div>
                    </HoverCard>

                    {/* Card 3: Half */}
                    <HoverCard className="bg-white/60 backdrop-blur-2xl border border-white p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_8px_30px_rgb(146,84,243,0.04)] relative overflow-hidden group transition-all duration-300 flex flex-col justify-start min-h-[260px]">
                      <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-500 pointer-events-none">
                        <span className="material-symbols-outlined text-[#9254f3] text-[140px]" style={{ fontVariationSettings: "'wght' 200" }}>event_available</span>
                      </div>
                      <div className="w-12 h-12 bg-white rounded-[1rem] shadow-sm border border-purple-50 flex items-center justify-center mb-6 shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <span className="material-symbols-outlined text-[#9254f3] text-xl" style={{ fontVariationSettings: "'wght' 300" }}>event_available</span>
                      </div>
                      <div className="relative z-10 w-full pr-4">
                        <h3 className="text-xl font-extrabold text-slate-800 mb-2 tracking-tight">Zero Wait, Every Time</h3>
                        <p className="text-[14px] text-slate-500 leading-relaxed font-medium">Your appointment starts exactly when scheduled.</p>
                      </div>
                    </HoverCard>

                    {/* Card 4: Half */}
                    <HoverCard className="bg-white/60 backdrop-blur-2xl border border-white p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_8px_30px_rgb(146,84,243,0.04)] relative overflow-hidden group transition-all duration-300 flex flex-col justify-start min-h-[260px]">
                      <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-500 pointer-events-none">
                        <span className="material-symbols-outlined text-[#9254f3] text-[140px]" style={{ fontVariationSettings: "'wght' 200" }}>edit_calendar</span>
                      </div>
                      <div className="w-12 h-12 bg-white rounded-[1rem] shadow-sm border border-purple-50 flex items-center justify-center mb-6 shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <span className="material-symbols-outlined text-[#9254f3] text-xl" style={{ fontVariationSettings: "'wght' 300" }}>edit_calendar</span>
                      </div>
                      <div className="relative z-10 w-full pr-4">
                        <h3 className="text-xl font-extrabold text-slate-800 mb-2 tracking-tight">Seamless Rescheduling</h3>
                        <p className="text-[14px] text-slate-500 leading-relaxed font-medium">Plans change. Adjusting your booking takes seconds — not calls back and forth.</p>
                      </div>
                    </HoverCard>

                    {/* Card 5: Half */}
                    <HoverCard className="bg-white/60 backdrop-blur-2xl border border-white p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_8px_30px_rgb(146,84,243,0.04)] relative overflow-hidden group transition-all duration-300 flex flex-col justify-start min-h-[260px]">
                      <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-500 pointer-events-none">
                        <span className="material-symbols-outlined text-[#9254f3] text-[140px]" style={{ fontVariationSettings: "'wght' 200" }}>notifications</span>
                      </div>
                      <div className="w-12 h-12 bg-white rounded-[1rem] shadow-sm border border-purple-50 flex items-center justify-center mb-6 shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <span className="material-symbols-outlined text-[#9254f3] text-xl" style={{ fontVariationSettings: "'wght' 300" }}>notifications</span>
                      </div>
                      <div className="relative z-10 w-full pr-4">
                        <h3 className="text-xl font-extrabold text-slate-800 mb-2 tracking-tight">Smart Reminders</h3>
                        <p className="text-[14px] text-slate-500 leading-relaxed font-medium">Automated alerts before every appointment. Never miss a session.</p>
                      </div>
                    </HoverCard>

                    {/* Card 6: Full Width */}
                    <HoverCard className="bg-white/60 backdrop-blur-2xl border border-white p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_8px_30px_rgb(146,84,243,0.04)] relative overflow-hidden group transition-all duration-300 md:col-span-2 flex flex-col justify-center min-h-[220px]">
                      <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-500 pointer-events-none">
                        <span className="material-symbols-outlined text-[#9254f3] text-[180px]" style={{ fontVariationSettings: "'wght' 200" }}>verified_user</span>
                      </div>
                      <div className="w-12 h-12 bg-white rounded-[1rem] shadow-sm border border-purple-50 flex items-center justify-center mb-6 shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <span className="material-symbols-outlined text-[#9254f3] text-xl" style={{ fontVariationSettings: "'wght' 300" }}>verified_user</span>
                      </div>
                      <div className="relative z-10 md:max-w-lg">
                        <h3 className="text-xl font-extrabold text-slate-800 mb-2 tracking-tight">Verified Professionals</h3>
                        <p className="text-[14px] text-slate-500 leading-relaxed font-medium">Every listed professional is verified. Honest reviews from real clients only.</p>
                      </div>
                    </HoverCard>
                  </Stagger>
                </div>
              </section>

              {/* Category Expansion Section (Services) */}
              <section id="categories" className="py-24 md:py-32 bg-[#fcf4ff] relative overflow-hidden">
                {/* Subtle 'T' watermarks per design system */}
                <div className="absolute inset-0 pointer-events-none flex flex-wrap gap-24 justify-center items-center opacity-[0.03] select-none text-[#37274d] mix-blend-multiply flex-col sm:flex-row">
                  <span className="text-[25rem] font-serif leading-none mt-[-10%] ml-[-10%]">T</span>
                  <span className="text-[30rem] font-serif leading-none mt-[20%]">T</span>
                  <span className="text-[25rem] font-serif leading-none mt-[-5%] mr-[-10%]">T</span>
                  <span className="text-[20rem] font-serif leading-none mt-[40%] ml-[10%]">T</span>
                </div>

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                  <FadeUp className="text-center mb-16">
                    <div className="inline-block text-[#652fe7] text-[10px] font-extrabold tracking-[0.2em] uppercase mb-4">
                      Services
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-[#37274d] mb-4">
                      Every service. One platform.
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                      From everyday grooming to complete transformations —<br className="hidden md:block" /> all under Tresra.
                    </p>
                  </FadeUp>

                  <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <HoverCard className="bg-white/80 backdrop-blur-2xl border border-[#baa4d3]/15 p-7 rounded-[2rem] shadow-[0_10px_40px_rgb(101,47,231,0.05)] relative overflow-hidden group transition-all duration-500 min-h-[310px] flex flex-col justify-end z-10">
                      <div className="absolute top-5 right-5 w-[168px] h-[168px] md:w-40 md:h-40 rounded-[1.5rem] overflow-hidden shadow-lg z-10 group-hover:scale-105 transition-transform duration-700">
                        <img src="https://images.unsplash.com/photo-1759134198561-e2041049419c?q=80&w=400&auto=format&fit=crop" alt="Haircut & Styling" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute top-10 right-0 w-28 h-32 md:w-32 md:h-36 bg-white/40 backdrop-blur-xl border border-[rgba(186,164,211,0.4)] rounded-l-[1rem] z-20 translate-x-2 shadow-[0_8px_32px_rgba(0,0,0,0.05)] group-hover:-translate-x-1 transition-all duration-500"></div>

                      <div className="relative z-30 max-w-[70%] mt-32">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#652fe7] to-[#a98fff] rounded-full flex items-center justify-center mb-3 shadow-[0_0_12px_rgba(101,47,231,0.4)]">
                          <span className="material-symbols-outlined text-white text-[12px] font-bold">content_cut</span>
                        </div>
                        <h3 className="text-lg font-extrabold text-[#37274d] mb-1 tracking-tight">Haircut & Styling</h3>
                        <p className="text-[13px] text-slate-500 font-medium leading-snug">Precision cuts, modern styles</p>
                      </div>
                    </HoverCard>

                    {/* Card 2 */}
                    <HoverCard className="bg-white/80 backdrop-blur-2xl border border-[#baa4d3]/15 p-7 rounded-[2rem] shadow-[0_10px_40px_rgb(101,47,231,0.05)] relative overflow-hidden group transition-all duration-500 min-h-[310px] flex flex-col justify-end z-10">
                      <div className="absolute top-5 right-5 w-[168px] h-[168px] md:w-40 md:h-40 rounded-[1.5rem] overflow-hidden shadow-lg z-10 group-hover:scale-105 transition-transform duration-700">
                        <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400&auto=format&fit=crop" alt="Skincare & Facials" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute top-10 right-0 w-28 h-32 md:w-32 md:h-36 bg-white/40 backdrop-blur-xl border border-[rgba(186,164,211,0.4)] rounded-l-[1rem] z-20 translate-x-2 shadow-[0_8px_32px_rgba(0,0,0,0.05)] group-hover:-translate-x-1 transition-all duration-500"></div>

                      <div className="relative z-30 max-w-[70%] mt-32">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#652fe7] to-[#a98fff] rounded-full flex items-center justify-center mb-3 shadow-[0_0_12px_rgba(101,47,231,0.4)]">
                          <span className="material-symbols-outlined text-white text-[12px] font-bold">spa</span>
                        </div>
                        <h3 className="text-lg font-extrabold text-[#37274d] mb-1 tracking-tight">Skincare & Facials</h3>
                        <p className="text-[13px] text-slate-500 font-medium leading-snug">Professional-grade treatments</p>
                      </div>
                    </HoverCard>

                    {/* Card 3 */}
                    <HoverCard className="bg-white/80 backdrop-blur-2xl border border-[#baa4d3]/15 p-7 rounded-[2rem] shadow-[0_10px_40px_rgb(101,47,231,0.05)] relative overflow-hidden group transition-all duration-500 min-h-[310px] flex flex-col justify-end z-10">
                      <div className="absolute top-5 right-5 w-[168px] h-[168px] md:w-40 md:h-40 rounded-[1.5rem] overflow-hidden shadow-lg z-10 group-hover:scale-105 transition-transform duration-700">
                        <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=400&auto=format&fit=crop" alt="Beauty & Makeup" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute top-10 right-0 w-28 h-32 md:w-32 md:h-36 bg-white/40 backdrop-blur-xl border border-[rgba(186,164,211,0.4)] rounded-l-[1rem] z-20 translate-x-2 shadow-[0_8px_32px_rgba(0,0,0,0.05)] group-hover:-translate-x-1 transition-all duration-500"></div>

                      <div className="relative z-30 max-w-[70%] mt-32">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#652fe7] to-[#a98fff] rounded-full flex items-center justify-center mb-3 shadow-[0_0_12px_rgba(101,47,231,0.4)]">
                          <span className="material-symbols-outlined text-white text-[12px] font-bold">brush</span>
                        </div>
                        <h3 className="text-lg font-extrabold text-[#37274d] mb-1 tracking-tight">Beauty & Makeup</h3>
                        <p className="text-[13px] text-slate-500 font-medium leading-snug">From everyday to editorial.</p>
                      </div>
                    </HoverCard>

                    {/* Card 4 */}
                    <HoverCard className="bg-white/80 backdrop-blur-2xl border border-[#baa4d3]/15 p-7 rounded-[2rem] shadow-[0_10px_40px_rgb(101,47,231,0.05)] relative overflow-hidden group transition-all duration-500 min-h-[310px] flex flex-col justify-end z-10">
                      <div className="absolute top-5 right-5 w-[168px] h-[168px] md:w-40 md:h-40 rounded-[1.5rem] overflow-hidden shadow-lg z-10 group-hover:scale-105 transition-transform duration-700">
                        <img src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=400&auto=format&fit=crop" alt="Grooming" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute top-10 right-0 w-28 h-32 md:w-32 md:h-36 bg-white/40 backdrop-blur-xl border border-[rgba(186,164,211,0.4)] rounded-l-[1rem] z-20 translate-x-2 shadow-[0_8px_32px_rgba(0,0,0,0.05)] group-hover:-translate-x-1 transition-all duration-500"></div>

                      <div className="relative z-30 max-w-[70%] mt-32">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#652fe7] to-[#a98fff] rounded-full flex items-center justify-center mb-3 shadow-[0_0_12px_rgba(101,47,231,0.4)]">
                          <span className="material-symbols-outlined text-white text-[12px] font-bold">check</span>
                        </div>
                        <h3 className="text-lg font-extrabold text-[#37274d] mb-1 tracking-tight">Grooming</h3>
                        <p className="text-[13px] text-slate-500 font-medium leading-snug">Beard, body & beyond</p>
                      </div>
                    </HoverCard>

                    {/* Card 5 */}
                    <HoverCard className="bg-white/80 backdrop-blur-2xl border border-[#baa4d3]/15 p-7 rounded-[2rem] shadow-[0_10px_40px_rgb(101,47,231,0.05)] relative overflow-hidden group transition-all duration-500 min-h-[310px] flex flex-col justify-end z-10">
                      <div className="absolute top-5 right-5 w-[168px] h-[168px] md:w-40 md:h-40 rounded-[1.5rem] overflow-hidden shadow-lg z-10 group-hover:scale-105 transition-transform duration-700">
                        <img src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=400&auto=format&fit=crop" alt="Nails & Wellness" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute top-10 right-0 w-28 h-32 md:w-32 md:h-36 bg-white/40 backdrop-blur-xl border border-[rgba(186,164,211,0.4)] rounded-l-[1rem] z-20 translate-x-2 shadow-[0_8px_32px_rgba(0,0,0,0.05)] group-hover:-translate-x-1 transition-all duration-500"></div>

                      <div className="relative z-30 max-w-[70%] mt-32">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#652fe7] to-[#a98fff] rounded-full flex items-center justify-center mb-3 shadow-[0_0_12px_rgba(101,47,231,0.4)]">
                          <span className="material-symbols-outlined text-white text-[12px] font-bold">water_drop</span>
                        </div>
                        <h3 className="text-lg font-extrabold text-[#37274d] mb-1 tracking-tight">Nails & Wellness</h3>
                        <p className="text-[13px] text-slate-500 font-medium leading-snug">Manicure, pedicure & spa</p>
                      </div>
                    </HoverCard>

                    {/* Card 6 */}
                    <HoverCard className="bg-white/80 backdrop-blur-2xl border border-[#baa4d3]/15 p-7 rounded-[2rem] shadow-[0_10px_40px_rgb(101,47,231,0.05)] relative overflow-hidden group transition-all duration-500 min-h-[310px] flex flex-col justify-end z-10">
                      <div className="absolute top-5 right-5 w-[168px] h-[168px] md:w-40 md:h-40 rounded-[1.5rem] overflow-hidden shadow-lg z-10 group-hover:scale-105 transition-transform duration-700">
                        <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=400&auto=format&fit=crop" alt="Color & Treatment" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute top-10 right-0 w-28 h-32 md:w-32 md:h-36 bg-white/40 backdrop-blur-xl border border-[rgba(186,164,211,0.4)] rounded-l-[1rem] z-20 translate-x-2 shadow-[0_8px_32px_rgba(0,0,0,0.05)] group-hover:-translate-x-1 transition-all duration-500"></div>

                      <div className="relative z-30 max-w-[70%] mt-32">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#652fe7] to-[#a98fff] rounded-full flex items-center justify-center mb-3 shadow-[0_0_12px_rgba(101,47,231,0.4)]">
                          <span className="material-symbols-outlined text-white text-[12px] font-bold">palette</span>
                        </div>
                        <h3 className="text-lg font-extrabold text-[#37274d] mb-1 tracking-tight">Color & Treatment</h3>
                        <p className="text-[13px] text-slate-500 font-medium leading-snug">Bold transformations, precise results</p>
                      </div>
                    </HoverCard>
                  </Stagger>

                  <FadeUp>
                    <p className="text-center text-sm font-bold text-slate-500 mt-16 tracking-wide">
                      More categories coming soon — wellness, tattoo, lashes &amp; more.
                    </p>
                  </FadeUp>
                </div>
              </section>

              {/* Social Proof Section */}
              <section id="reviews" className="py-16 md:py-24 bg-white relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                  <FadeUp className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-on-surface mb-3">What our community says</h2>
                    <div className="w-16 h-1.5 bg-primary/20 mx-auto rounded-full"></div>
                  </FadeUp>
                  <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* Testimonial 1 */}
                    <div className="glass-card p-6 md:p-8 rounded-[2rem] border-primary/10 hover:-translate-y-1 transition-transform duration-300">
                      <div className="flex gap-1 text-yellow-500 mb-4">
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                      <p className="text-lg md:text-xl font-semibold text-on-surface leading-snug mb-6">
                        &quot;Finally I can book my stylist directly. No more phone calls or guessing who is available.&quot;
                      </p>
                      <div className="flex items-center gap-3">
                        <img alt="Vivek" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="/assets/reviewer2.png" />
                        <div>
                          <p className="font-bold text-on-surface text-sm">Vivek.</p>
                          <p className="text-xs text-on-surface-variant font-medium">Regular User</p>
                        </div>
                      </div>
                    </div>
                    {/* Testimonial 2 */}
                    <div className="glass-card p-6 md:p-8 rounded-[2rem] border-secondary/10 hover:-translate-y-1 transition-transform duration-300">
                      <div className="flex gap-1 text-yellow-500 mb-4">
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                      <p className="text-lg md:text-xl font-semibold text-on-surface leading-snug mb-6">
                        &quot;No more waiting at salons. Total game changer. I walk in and my chair is ready instantly.&quot;
                      </p>
                      <div className="flex items-center gap-3">
                        <img alt="Divyam Kashyap." className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="/assets/reviewer3.png" />
                        <div>
                          <p className="font-bold text-on-surface text-sm">Divyam Kashyap.</p>
                          <p className="text-xs text-on-surface-variant font-medium">Monthly Member</p>
                        </div>
                      </div>
                    </div>
                  </Stagger>
                </div>
              </section>

              {/* Pricing Section */}
              {/* <section id="pricing" className="py-24 md:py-32 relative overflow-hidden bg-[#fcf4ff]">
                
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-full bg-gradient-to-b from-white via-[#faf5ff] to-[#fcf4ff] opacity-80 pointer-events-none"></div>
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-[#f3e8ff]/60 via-[#fdf4ff]/40 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                  <FadeUp className="text-center mb-12">
                    <div className="inline-block text-[#9254f3] text-[10px] font-extrabold tracking-[0.2em] uppercase mb-4">
                      Pricing
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-[#37274d] mb-4">
                      Simple, transparent pricing.
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                      Start for free. Upgrade when you&apos;re ready.
                    </p>
                  </FadeUp>

                 
                  <div className="flex justify-center mb-16">
                    <div className="bg-[#f0e6ff]/50 backdrop-blur-md p-1.5 rounded-full flex items-center border border-[#baa4d3]/20 shadow-inner">
                      <button className="bg-white text-[#37274d] px-6 py-2 rounded-full font-bold text-sm shadow-[0_2px_10px_rgba(101,47,231,0.1)] transition-colors">
                        Monthly
                      </button>
                      <button className="text-[#37274d]/70 hover:text-[#37274d] px-6 py-2 rounded-full font-bold text-sm transition-colors flex items-center gap-2">
                        Annual
                        <span className="bg-white/60 text-[#9254f3] px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase">20% off</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">

                   
                    <div className="bg-white/60 backdrop-blur-2xl border border-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(146,84,243,0.04)] hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                      <h3 className="text-2xl font-extrabold text-[#37274d] mb-2 tracking-tight">Essential</h3>
                      <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-8">Start discovering and booking instantly.</p>
                      <div className="mb-8">
                        <span className="text-4xl font-extrabold text-[#37274d]">Free</span>
                      </div>
                      <ul className="space-y-4 mb-10 flex-1">
                        {['Browse all professionals', '2 bookings per month', 'View ratings & reviews', 'Basic appointment reminders', 'Email support'].map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-[#9254f3] text-[16px] font-bold mt-0.5">check</span>
                            <span className="text-[14px] text-slate-700 font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button className="w-full bg-[#f4effc] hover:bg-[#ebe1f8] text-[#37274d] py-3.5 rounded-[1rem] font-bold text-sm transition-colors shadow-sm">
                        Get Started
                      </button>
                    </div>

                   
                    <div className="bg-gradient-to-br from-[#e4ccff] to-[#f6edff] border border-white p-8 rounded-[2rem] shadow-[0_15px_40px_rgb(101,47,231,0.15)] relative flex flex-col md:-translate-y-4">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#9254f3] text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg shadow-[#9254f3]/30">
                        Most Popular
                      </div>
                      <h3 className="text-2xl font-extrabold text-[#37274d] mb-2 tracking-tight mt-2">Plus</h3>
                      <p className="text-[13px] text-[#37274d]/70 font-medium leading-relaxed mb-8">For those who take their look seriously.</p>
                      <div className="mb-8 flex items-end gap-1">
                        <span className="text-4xl font-extrabold text-[#9254f3] tracking-tight">$9.99</span>
                        <span className="text-[13px] text-[#37274d]/60 font-bold mb-1">/ month</span>
                      </div>
                      <ul className="space-y-4 mb-10 flex-1">
                        {['Unlimited bookings', 'Priority time slots', 'Smart reminders & alerts', 'Reschedule anytime', 'Stylist personal notes', 'Chat support'].map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-[#9254f3] text-[16px] font-bold mt-0.5">check</span>
                            <span className="text-[14px] text-[#37274d]/90 font-bold">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button className="w-full bg-gradient-to-r from-[#652fe7] to-[#a98fff] text-white py-3.5 rounded-[1rem] font-bold text-sm shadow-lg shadow-[#652fe7]/30 hover:opacity-90 transition-opacity">
                        Start Free Trial
                      </button>
                    </div>

                    
                    <div className="bg-white/60 backdrop-blur-2xl border border-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(146,84,243,0.04)] hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                      <h3 className="text-2xl font-extrabold text-[#37274d] mb-2 tracking-tight">Pro</h3>
                      <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-8">The complete premium experience.</p>
                      <div className="mb-8 flex items-end gap-1">
                        <span className="text-4xl font-extrabold text-[#37274d] tracking-tight">$19.99</span>
                        <span className="text-[13px] text-slate-500 font-bold mb-1">/ month</span>
                      </div>
                      <ul className="space-y-4 mb-10 flex-1">
                        {['Everything in Plus', 'Early access to new features', 'VIP priority support', 'Exclusive pre-launch slots', 'Dedicated account manager', 'Multiple profile management'].map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-[#9254f3] text-[16px] font-bold mt-0.5">check</span>
                            <span className="text-[14px] text-slate-700 font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button className="w-full bg-[#f4effc] hover:bg-[#ebe1f8] text-[#37274d] py-3.5 rounded-[1rem] font-bold text-sm transition-colors shadow-sm">
                        Go Pro
                      </button>
                    </div>

                  </div>
                </div>
              </section> */}

              
              {/* <section id="mobile-app" className="py-24 md:py-32 relative overflow-hidden bg-white">
                
                <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex flex-wrap content-start z-0 overflow-hidden">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div key={i} className="w-[20%] lg:w-[10%] aspect-square flex items-center justify-center">
                      <span className="text-4xl md:text-7xl font-serif text-[#37274d]">T</span>
                    </div>
                  ))}
                </div>

                <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                  
                  <FadeUp className="flex-1 text-center lg:text-left">
                    <h2 className="text-4xl lg:text-[3.5rem] leading-[1.1] font-extrabold tracking-tight text-[#37274d] mb-6">
                      Control your <span className="text-[#652fe7]">grooming experience</span> from your pocket.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                      Book, reschedule, and track appointments from anywhere. Tresra&apos;s mobile app puts your style routine in your hands — always.
                    </p>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                      
                      <button className="bg-white/90 backdrop-blur-md border border-[#baa4d3]/20 shadow-[0_8px_30px_rgb(146,84,243,0.08)] px-5 py-3 rounded-2xl flex items-center gap-3 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgb(146,84,243,0.12)] transition-all group">
                        <span className="text-3xl text-[#37274d]">
                          <svg viewBox="0 0 384 512" width="24" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
                        </span>
                        <div className="text-left leading-tight">
                          <div className="text-[10px] text-slate-500 font-bold mb-0.5">Download on the</div>
                          <div className="text-lg font-extrabold text-[#37274d]">App Store</div>
                        </div>
                      </button>

                      
                      <button className="bg-white/90 backdrop-blur-md border border-[#baa4d3]/20 shadow-[0_8px_30px_rgb(146,84,243,0.08)] px-5 py-3 rounded-2xl flex items-center gap-3 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgb(146,84,243,0.12)] transition-all group">
                        <span className="text-3xl text-slate-700">
                          <svg viewBox="0 0 512 512" width="24" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" /></svg>
                        </span>
                        <div className="text-left leading-tight">
                          <div className="text-[10px] text-slate-500 font-bold mb-0.5">GET IT ON</div>
                          <div className="text-lg font-extrabold text-[#37274d]">Google Play</div>
                        </div>
                      </button>
                    </div>
                  </FadeUp>

                  
                  <div className="flex-1 w-full flex justify-center lg:justify-end relative">
                   
                    <div className="relative w-[300px] sm:w-[320px] aspect-[390/844] bg-[#1a1a1a] rounded-[3.5rem] p-3 shadow-[0_30px_80px_rgba(30,10,60,0.15)] border-4 border-slate-800 z-20 overflow-hidden transform lg:rotate-2 hover:rotate-0 transition-transform duration-700">
                      
                      <div className="bg-[#111116] w-full h-full rounded-[2.5rem] overflow-hidden relative flex flex-col">
                        
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[7rem] h-[1.75rem] bg-black rounded-full z-50"></div>

                        
                        <img src="/mock-app.png" alt="Tresra Discover Salons App Interface" className="w-full h-full object-cover object-top z-0" />
                      </div>
                    </div>

                    
                    <div className="absolute top-1/4 -right-10 w-64 h-64 bg-gradient-to-bl from-[#dfc8ff]/60 to-[#fdf4ff]/20 blur-[80px] rounded-full z-10 pointer-events-none"></div>
                    <div className="absolute bottom-1/4 -left-10 w-64 h-64 bg-gradient-to-tr from-[#dfc8ff]/60 to-[#fcf4ff] blur-[80px] rounded-full z-10 pointer-events-none"></div>
                  </div>

                </div>
              </section> */}

              {/* Final CTA Section */}
              <section id="get-started" className="py-16 md:py-24 bg-surface-container-low relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
                <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
                  <div className="inline-block p-1 px-3 mb-5 rounded-full bg-white/50 backdrop-blur-sm border border-primary/10">
                    <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Join the revolution</span>
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-on-surface mb-6">
                    Take control of your <span className="text-primary italic">grooming.</span>
                  </h2>
                  <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
                    From quick trims to full styling sessions — people trust Tresra to plan their time better. No more lines, no more waiting, just your look, on your schedule.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                    <button onClick={() => setShowDialog(true)} className="group bg-primary text-white px-8 py-4 rounded-full font-black text-lg shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                      Get Started with Tresra
                    </button>
                    <p className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-green-500 text-base" style={{ fontVariationSettings: "'wght' 700" }}>check_circle</span>
                      Free to join for clients
                    </p>
                  </div>
                </div>
                {/* Decorative blobs */}
                <div className="absolute top-1/2 -left-16 -translate-y-1/2 w-48 h-48 bg-primary/10 rounded-full blur-[60px] pointer-events-none"></div>
                <div className="absolute top-1/2 -right-16 -translate-y-1/2 w-48 h-48 bg-secondary/10 rounded-full blur-[60px] pointer-events-none"></div>
              </section>
            </main>

            {/* Footer (Anchor) */}
            <footer className="w-full rounded-t-xl mt-20 bg-purple-50 font-['Plus_Jakarta_Sans']">
              <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 w-full max-w-7xl mx-auto">
                <div className="mb-8 md:mb-0">
                  <img src="/logo.png" alt="Tresra Logo" className="h-8 w-auto mb-3" />
                  <p className="text-slate-500 text-sm">© 2026 Tresra. All rights reserved.</p>
                </div>
                <div className="flex gap-8 text-sm">
                  <a className="text-slate-500 hover:text-purple-500 transition-colors" href="#">Privacy Policy</a>
                  <a className="text-slate-500 hover:text-purple-500 transition-colors" href="#">Terms of Service</a>
                  <a className="text-slate-500 hover:text-purple-500 transition-colors" href="#">Contact</a>
                  <a className="text-slate-500 hover:text-purple-500 transition-colors" href="#">Support</a>
                </div>
              </div>
            </footer>
          </>
        )}
      </div>
    </MotionConfig>
  );
}
