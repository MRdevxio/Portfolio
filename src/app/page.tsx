"use client";

import { useRef, useEffect } from "react";
import NavMenu from "@/components/layout/NavMenu";
import Intro from "@/components/sections/Intro";
import { gsap } from "@/lib/gsap";
import AboutMe from "@/components/sections/AboutMe";

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const navWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let triggered = false;

    const showMenuAndButtons = () => {
      if (triggered) return;
      triggered = true;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 }
      });


      tl.to(navWrapperRef.current, {
        autoAlpha: 1,
        duration: 0.3
      });


      const desktopHeader = navWrapperRef.current?.querySelector('header');
      const mobileNav = navWrapperRef.current?.querySelector('nav.md\\:hidden');

      if (desktopHeader) {
        tl.to(desktopHeader, {
          autoAlpha: 1,
          x: 0,
          duration: 1
        }, "-=0.2");
      }
      if (mobileNav) {
        tl.to(mobileNav, {
          autoAlpha: 1,
          y: 0,
          duration: 1
        }, "<");
      }


      const buttons = document.querySelectorAll('.intro-btn');
      if (buttons.length) {
        tl.to(buttons, {
          autoAlpha: 1,
          y: 0,
          stagger: 0.15,
          ease: "back.out(1.7)"
        }, "-=0.6");
      }
    };

    const onInteraction = () => showMenuAndButtons();

    window.addEventListener('wheel', onInteraction, { passive: true });
    window.addEventListener('touchstart', onInteraction, { passive: true });
    window.addEventListener('keydown', onInteraction, { passive: true });

    return () => {
      window.removeEventListener('wheel', onInteraction);
      window.removeEventListener('touchstart', onInteraction);
      window.removeEventListener('keydown', onInteraction);
    };
  }, []);

  return (
    <main ref={mainRef} className="relative min-h-screen bg-[#060010] overflow-x-hidden">

      <div
        ref={navWrapperRef}
        className="fixed top-0 right-0 w-full z-100 pointer-events-none opacity-0 invisible"
      >
        <div className="pointer-events-auto">
          <NavMenu />
        </div>
      </div>

      <Intro />
      <AboutMe />
    </main>
  );
}