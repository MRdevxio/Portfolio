"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import IntroText from "../module/IntroText";
import Button from "../module/Button";

const LiquidEther = dynamic(() => import("../LiquidEther"), {
    ssr: false,
    loading: () => <div className="bg-[#060010] w-full h-screen absolute inset-0" />
});

export default function Intro() {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const textWrapperRef = useRef<HTMLDivElement>(null);
    const subTextRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(bgRef.current, {
            opacity: 1,
            duration: 2.5,
            ease: "power1.inOut"
        })
            .fromTo(textWrapperRef.current,
                { scale: 10, opacity: 0, filter: "blur(10px)" },
                { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.8 },
                "<+0.5"
            )
            .fromTo(subTextRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                "-=0.8"
            );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="w-full h-screen relative bg-[#060010] overflow-hidden px-5">
            <div ref={bgRef} className="absolute inset-0 opacity-0 transition-opacity will-change-opacity ">
                <LiquidEther
                    colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                    mouseForce={15}
                    cursorSize={100}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={20}
                    iterationsPoisson={20}
                    BFECC={false}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo={true}
                    autoSpeed={0.5}
                    autoIntensity={2.0}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                    className="absolute inset-0 w-full h-full "
                />
            </div>
            <div className="w-full absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
                <div className="flex flex-col items-center justify-center px-4 content-center gap-4 ">
                    <div
                        ref={textWrapperRef}
                        className="flex justify-center items-center will-change-transform opacity-0 mx-auto text-center"
                    >
                        <IntroText />
                    </div>
                    <p ref={subTextRef} className="text-white text-base text-center font-light opacity-0 leading-relaxed sm:text-lg">
                        یک توسعه‌دهنده وب و فرانت‌اند که تمرکزم ساخت محصولاتی تمیز، ایمن، سریع و کاربردی‌ هستن.
                    </p>
                    <div className="pointer-events-auto">
                        
                    <Button link={false}
                    variant="secondary"
                    className="pointer-events-auto">درباره من</Button>
                    </div>
                </div>
            </div>
        </section>

    );
}