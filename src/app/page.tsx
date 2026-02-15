"use client";

import { useRef, useEffect } from "react";
import NavMenu from "@/components/layout/NavMenu";
import Intro from "@/components/sections/Intro";
import { gsap } from "@/lib/gsap"; // فرض بر این است که ScrollTrigger در این فایل register شده است
import { ScrollTrigger } from "gsap/ScrollTrigger"; // ایمپورت مستقیم برای تایپ‌ها
import { useGSAP } from "@gsap/react";
import AboutMe from "@/components/sections/AboutMe";

// اطمینان از رجیستر شدن پلاگین
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const navWrapperRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // --- 1. لاجیک نمایش منو (کد قبلی شما) ---
  useEffect(() => {
    let triggered = false;

    const showMenuAndButtons = () => {
      if (triggered) return;
      triggered = true;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 },
      });

      tl.to(navWrapperRef.current, {
        autoAlpha: 1,
        duration: 0.3,
      });

      const desktopHeader = navWrapperRef.current?.querySelector("header");
      const mobileNav = navWrapperRef.current?.querySelector("nav.md\\:hidden");

      if (desktopHeader) {
        tl.to(desktopHeader, { autoAlpha: 1, x: 0, duration: 1 }, "-=0.2");
      }
      if (mobileNav) {
        tl.to(mobileNav, { autoAlpha: 1, y: 0, duration: 1 }, "<");
      }

      const buttons = document.querySelectorAll(".intro-btn");
      if (buttons.length) {
        tl.to(
          buttons,
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        );
      }
    };

    const onInteraction = () => showMenuAndButtons();

    window.addEventListener("wheel", onInteraction, { passive: true });
    window.addEventListener("touchstart", onInteraction, { passive: true });
    window.addEventListener("keydown", onInteraction, { passive: true });

    return () => {
      window.removeEventListener("wheel", onInteraction);
      window.removeEventListener("touchstart", onInteraction);
      window.removeEventListener("keydown", onInteraction);
    };
  }, []);

  // --- 2. لاجیک ترنزیشن بین Intro و About (بخش جدید) ---
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current, // تریگر روی کانتینر اصلی
          start: "top top", // شروع وقتی بالای کانتینر به بالای ویوپورت رسید
          end: "+=180%", // طول اسکرول برابر با 100% ارتفاع صفحه
          scrub: 1, // نرم کردن انیمیشن
          pin: true, // پین کردن صفحه برای ایجاد حس "یک واحد"
        },
      });

      // انیمیشن Intro (اختیاری: کمی عقب می‌رود تا عمق ایجاد کند)
      tl.to(introRef.current, {
        scale: 0.95,
        opacity: 0.5, // اگر پس‌زمینه About شفاف نیست، این خط را حذف کنید
        ease: "none",
      }, 0);

      // انیمیشن About Me: بالا آمدن و پوشاندن Intro
      tl.fromTo(
        aboutRef.current,
        { yPercent: 100 }, // حالت اولیه: کاملا پایین صفحه
        { yPercent: 0, ease: "none" }, // حالت نهایی: کاملا روی صفحه
        0 // شروع همزمان با انیمیشن Intro
      );
    },
    { scope: mainRef }
  );

  return (
    // تغییر مهم: h-screen و overflow-hidden برای کنترل دقیق اسکرول
    <main
      ref={mainRef}
      className="relative h-screen w-full bg-[#060010] overflow-hidden"
    >
      {/* منو - z-index بالا (50) برای اینکه همیشه رو باشد */}
      <div
        ref={navWrapperRef}
        className="fixed top-0 right-0 w-full z-50 pointer-events-none opacity-0 invisible"
      >
        <div className="pointer-events-auto">
          <NavMenu />
        </div>
      </div>

      {/* Intro Section - z-index پایین (0) */}
      <div ref={introRef} className="absolute inset-0 z-0 w-full h-full">
        <Intro />
      </div>

      {/* About Me Section - z-index بالاتر (10) */}
      <div ref={aboutRef} className="absolute inset-0 z-10 w-full h-full will-change-transform">
        <AboutMe />
      </div>
    </main>
  );
}