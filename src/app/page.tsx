"use client";

import { useRef, useState } from "react";
import NavMenu from "@/components/layout/NavMenu";
import Intro from "@/components/sections/Intro";
import AboutMe from "@/components/sections/AboutMe";
import { gsap } from "@/lib/gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger"; 
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const navWrapperRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState("/"); 
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [isAboutActive, setIsAboutActive] = useState(false);

  // یک پرچم (Flag) برای اینکه انیمیشن دکمه‌ها و منو فقط یکبار اجرا شود
  const uiRevealedRef = useRef(false);

  useGSAP(() => {
    // --- ۱. انیمیشن منو و دکمه‌ها (در حالت پیش‌فرض PAUSED است) ---
    // با حذف delay و اضافه کردن paused: true منتظر دستور ما می‌ماند
    const showTl = gsap.timeline({ paused: true, defaults: { ease: "power3.out", duration: 0.8 } });

    showTl.to(navWrapperRef.current, { autoAlpha: 1, duration: 0.3 });

    const desktopHeader = navWrapperRef.current?.querySelector("header");
    const mobileNav = navWrapperRef.current?.querySelector("nav:not(.nav-menu)");
    const buttons = gsap.utils.toArray(".intro-btn"); 

    if (desktopHeader) {
        showTl.fromTo(desktopHeader, { x: 50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1 }, "-=0.2");
    }
    if (mobileNav) {
        showTl.fromTo(mobileNav, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, "<");
    }
    if (buttons.length) {
        showTl.fromTo(buttons, { y: 30, autoAlpha: 0 }, { autoAlpha: 1, y: 0, stagger: 0.15, ease: "back.out(1.7)" }, "-=0.6");
    }

    // --- ۲. لاجیک اسکرول اصلی ---
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "+=150%", 
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
            // جادوی درخواست شما اینجاست: 
            // اگر اسکرول از 0.005 (همان 0.5 درصد) بیشتر شد و قبلاً انیمیشن پخش نشده بود
            if (self.progress > 0.005 && !uiRevealedRef.current) {
                uiRevealedRef.current = true; // پرچم را می‌بندیم که دفعه بعد اجرا نشود
                showTl.play(); // انیمیشن دکمه‌ها و منو را پلی می‌کنیم
            }

            // لاجیک تغییر صفحات (کدهای قبلی)
            if (self.progress > 0.4) {
                setActiveSection("/about-me");
                setIsAboutActive(true);
                setIsIntroActive(false); 
            } else {
                setActiveSection("/");
                setIsAboutActive(false);
                setIsIntroActive(true); 
            }
        }      
      },
    });

    scrollTl.to(introRef.current, {
      scale: 0.9, opacity: 0, filter: "blur(10px)", ease: "power2.inOut",
    }, 0);

    scrollTl.fromTo(aboutRef.current,
      { yPercent: 100 },
      { yPercent: 0, ease: "power2.inOut" },
      0
    );
  }, { scope: mainRef });

  return (
    <main ref={mainRef} className="relative h-screen w-full bg-[#060010] overflow-hidden">
      
      {/* منو */}
      <div ref={navWrapperRef} className="fixed top-0 right-0 w-full z-50 pointer-events-none opacity-0 invisible">
        <div className="pointer-events-auto">
          <NavMenu activeSection={activeSection} />
        </div>
      </div>

      {/* Intro Section */}
      <div ref={introRef} className={`absolute inset-0 z-0 w-full h-full ${!isIntroActive ? 'pointer-events-none' : ''}`}>
        <Intro isActive={isIntroActive} />
      </div>

      {/* About Me Section */}
      <div ref={aboutRef} className="absolute inset-0 z-10 w-full h-full will-change-transform">
        <AboutMe isActive={isAboutActive} />
      </div>
    </main>
  );
}