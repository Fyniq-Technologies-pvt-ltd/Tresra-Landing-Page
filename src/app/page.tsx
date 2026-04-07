"use client";
import { useState } from "react";

export default function Home() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="text-on-surface selection:bg-primary-container selection:text-on-primary-container">

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
      {/* Top Navigation Bar (Anchor) */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-purple-200/15 shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <a href="#hero"><img src="/logo.png" alt="Tresra Logo" className="h-10 w-auto" /></a>
          <div className="hidden md:flex gap-8 items-center">
            <a className="text-slate-600 hover:text-purple-600 transition-colors font-medium" href="#why-tresra">Why Tresra</a>
            <a className="text-slate-600 hover:text-purple-600 transition-colors font-medium" href="#how-it-works">How It Works</a>
            <a className="text-slate-600 hover:text-purple-600 transition-colors font-medium" href="#features">Features</a>
            <a className="text-slate-600 hover:text-purple-600 transition-colors font-medium" href="#reviews">Reviews</a>
          </div>
          <button onClick={() => setShowDialog(true)} className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-semibold scale-95 active:scale-90 transition-transform hover:opacity-80">
            Get Started
          </button>
        </div>
      </nav>

      <main className="overflow-x-hidden pt-20">
        {/* Hero Section */}
        <section id="hero" className="relative min-h-[1000px] flex items-center pt-12 pb-24 hero-gradient">
          <div className="absolute inset-0 z-0 opacity-5 pointer-events-none flex items-center justify-center">
            <span className="text-[40rem] font-black select-none">T</span>
          </div>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Content Left */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary-container/20 px-4 py-2 rounded-full border border-primary-container/30">
                <span className="flex -space-x-2">
                  <img alt="Reviewer 1" className="w-8 h-8 rounded-full border-2 border-surface shadow-sm object-cover" src="/assets/reviewer1.png"/>
                  <img alt="Reviewer 2" className="w-8 h-8 rounded-full border-2 border-surface shadow-sm object-cover" src="/assets/reviewer2.png"/>
                  <img alt="Reviewer 3" className="w-8 h-8 rounded-full border-2 border-surface shadow-sm object-cover" src="/assets/reviewer3.png"/>
                </span>
                <span className="text-sm font-bold text-primary">4.9/5 Rating</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-on-surface leading-[1.1] tracking-tight">
                Book Your Barber. <br />
                <span className="text-primary-dim">Not Just a Slot.</span>
              </h1>
              <p className="text-xl text-on-surface-variant max-w-lg leading-relaxed">
                Stop gambling with your look. Browse top-rated barbers, see real-time availability, and secure your favorite stylist in seconds.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button onClick={() => setShowDialog(true)} className="bg-primary text-white px-8 py-2 rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                  Book Now
                </button>
                <a href="#why-tresra" className="bg-surface-container-lowest text-on-surface border border-outline-variant/30 px-8 py-2 rounded-full font-bold text-lg hover:bg-surface-container transition-all inline-block">
                  Explore
                </a>
              </div>
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
            </div>

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
                  <p className="text-sm font-bold">Arjun is available</p>
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
                      <p className="text-[11px] font-bold">The Fade Lounge</p>
                      <p className="text-[9px] text-on-surface-variant">Koramangala, Bangalore</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded bg-secondary-container/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary text-sm">person</span>
                    </div>
                    <div className="leading-tight">
                      <p className="text-[11px] font-bold">Arjun</p>
                      <p className="text-[9px] text-on-surface-variant">Your Barber</p>
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
                <p className="text-[11px] font-medium italic text-on-surface leading-tight mb-3">&quot;I always book Arjun on Tresra. No more waiting!&quot;</p>
                <div className="flex items-center gap-2">
                  <img alt="Reviewer" className="w-6 h-6 rounded-full" src="/assets/reviewer1.png" />
                  <span className="text-[10px] font-bold text-on-surface-variant">— Rahul S.</span>
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
                  Ever walked into <br className="hidden lg:block"/>
                  a <span className="text-primary tracking-tight">salon</span> and:
                </h2>
                
                <ul className="space-y-6 mb-8 w-full">
                  <li className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#f0eaff] flex items-center justify-center shrink-0 shadow-sm border border-white/50">
                       <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'wght' 300" }}>person</span>
                    </div>
                    <span className="text-base font-bold text-slate-800 leading-snug">Your barber wasn&apos;t available</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#f0eaff] flex items-center justify-center shrink-0 shadow-sm border border-white/50">
                       <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'wght' 300" }}>schedule</span>
                    </div>
                    <span className="text-base font-bold text-slate-800 leading-snug">You had to wait for hours</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#f0eaff] flex items-center justify-center shrink-0 shadow-sm border border-white/50">
                       <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'wght' 300" }}>block</span>
                    </div>
                    <span className="text-base font-bold text-slate-800 leading-snug">You ended up with someone<br className="hidden md:block"/> you didn&apos;t want</span>
                  </li>
                </ul>
                
                <p className="text-slate-500 text-base leading-relaxed mb-6">
                  What should feel easy still feels chaotic. The system is broken because you lose time, control, and confidence all at once.
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
                       <h3 className="text-[1.1rem] font-extrabold text-slate-800 mb-2 leading-tight tracking-tight">Your barber<br className="hidden xl:block"/> wasn&apos;t available</h3>
                       <p className="text-xs text-slate-500 leading-relaxed font-medium">You showed up expecting the person you trust, only to find out they were busy, off, or already booked.</p>
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
                       <h3 className="text-[1.1rem] font-extrabold text-slate-800 mb-2 leading-tight tracking-tight">You had to wait<br className="hidden xl:block"/> for hours</h3>
                       <p className="text-xs text-slate-500 leading-relaxed font-medium">A quick salon visit became an unpredictable queue that consumed the part of the day you had planned.</p>
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
                       <h3 className="text-[1.1rem] font-extrabold text-slate-800 mb-2 leading-tight tracking-tight">You ended up with someone you didn&apos;t want</h3>
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
                         <h4 className="text-[0.95rem] xl:text-[1.1rem] font-extrabold text-slate-800 mb-0.5 leading-tight tracking-tight">People don&apos;t want surprises.</h4>
                         <p className="text-[10px] md:text-xs text-slate-500 font-medium tracking-wide">They want clarity before they leave home.</p>
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
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-on-surface mb-4">Tresra fixes that.</h2>
              <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">Three simple steps to the haircut you actually want, exactly when you want it.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="glass-card p-7 rounded-[1.5rem] relative group hover:-translate-y-2 transition-all duration-500">
                <div className="absolute -top-5 left-7 bg-primary text-white w-10 h-10 rounded-[1rem] flex items-center justify-center text-lg font-black shadow-lg shadow-primary/20">1</div>
                <div className="mb-6"><span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'wght' 300" }}>storefront</span></div>
                <h3 className="text-xl font-extrabold text-on-surface mb-3">Choose your salon</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">Find top-rated spots in your neighborhood. See verified interior photos and client galleries.</p>
              </div>
              <div className="glass-card p-7 rounded-[1.5rem] relative group hover:-translate-y-2 transition-all duration-500">
                <div className="absolute -top-5 left-7 bg-secondary text-white w-10 h-10 rounded-[1rem] flex items-center justify-center text-lg font-black shadow-lg shadow-secondary/20">2</div>
                <div className="mb-6"><span className="material-symbols-outlined text-4xl text-secondary" style={{ fontVariationSettings: "'wght' 300" }}>content_cut</span></div>
                <h3 className="text-xl font-extrabold text-on-surface mb-3">Select your barber</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">Browse individual portfolios. Pick the specific stylist who nails the look you&apos;re after.</p>
              </div>
              <div className="glass-card p-7 rounded-[1.5rem] relative group hover:-translate-y-2 transition-all duration-500">
                <div className="absolute -top-5 left-7 bg-tertiary text-white w-10 h-10 rounded-[1rem] flex items-center justify-center text-lg font-black shadow-lg shadow-tertiary/20">3</div>
                <div className="mb-6"><span className="material-symbols-outlined text-4xl text-tertiary" style={{ fontVariationSettings: "'wght' 300" }}>event_available</span></div>
                <h3 className="text-xl font-extrabold text-on-surface mb-3">Book your exact slot</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">See real-time schedules. Pick your time, confirm, and just walk in. No waiting required.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden" id="how-it-works-steps">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-on-surface mb-4">How It Works</h2>
              <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">Experience the future of grooming in three seamless steps.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 glass-card rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-primary/5 transition-transform hover:scale-110 duration-500">
                  <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'wght' 500" }}>search</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface">1. Find your salon</h3>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 glass-card rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-secondary/5 transition-transform hover:scale-110 duration-500">
                  <span className="material-symbols-outlined text-3xl text-secondary" style={{ fontVariationSettings: "'wght' 500" }}>face_6</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface">2. Pick your barber</h3>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 glass-card rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-tertiary/5 transition-transform hover:scale-110 duration-500">
                  <span className="material-symbols-outlined text-3xl text-tertiary" style={{ fontVariationSettings: "'wght' 500" }}>touch_app</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface">3. Book your time</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section id="features" className="py-16 md:py-24 bg-[#fcf4ff] relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-on-surface mb-4">Key Features</h2>
              <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">Designed for your convenience.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="glass-card p-6 rounded-[2rem] flex flex-col items-center text-center group hover:bg-white/80 transition-all duration-500">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl text-primary" style={{ fontVariationSettings: "'wght' 500" }}>radar</span>
                </div>
                <h3 className="text-base font-extrabold text-on-surface mb-2 leading-tight">Real-time barber availability</h3>
              </div>
              <div className="glass-card p-6 rounded-[2rem] flex flex-col items-center text-center group hover:bg-white/80 transition-all duration-500">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl text-secondary" style={{ fontVariationSettings: "'wght' 500" }}>auto_awesome</span>
                </div>
                <h3 className="text-base font-extrabold text-on-surface mb-2 leading-tight">Smart scheduling</h3>
              </div>
              <div className="glass-card p-6 rounded-[2rem] flex flex-col items-center text-center group hover:bg-white/80 transition-all duration-500">
                <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl text-tertiary" style={{ fontVariationSettings: "'wght' 500" }}>account_circle</span>
                </div>
                <h3 className="text-base font-extrabold text-on-surface mb-2 leading-tight">Personalized experience</h3>
              </div>
              <div className="glass-card p-6 rounded-[2rem] flex flex-col items-center text-center group hover:bg-white/80 transition-all duration-500">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl text-primary" style={{ fontVariationSettings: "'wght' 500" }}>speed</span>
                </div>
                <h3 className="text-base font-extrabold text-on-surface mb-2 leading-tight">No waiting time</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section id="reviews" className="py-16 md:py-24 bg-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-on-surface mb-3">What our community says</h2>
              <div className="w-16 h-1.5 bg-primary/20 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
                  &quot;Finally I can book my barber directly. No more phone calls or guessing who is working.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <img alt="Ajay Singh." className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="/assets/reviewer2.png" />
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
            </div>
          </div>
        </section>

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
               Join thousands of men who have upgraded their haircut experience. No more lines, no more waiting, just perfect style on your schedule.
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
    </div>
  );
}
