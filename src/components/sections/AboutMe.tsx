"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Button from "../module/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// ثبت پلاگین ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const PixelBlast = dynamic(() => import("../PixelBlast"), {
    ssr: false,
    loading: () => <div className="bg-[#060010] w-full h-screen absolute inset-0" />
});

// تعریف تایپ پراپ برای بهینه‌سازی
interface AboutMeProps {
    isActive?: boolean; // اختیاری کردیم که اگر پراپ پاس داده نشد هم کار کند
}

export default function AboutMe({ isActive = true }: AboutMeProps) {
    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);
    const btnRef = useRef(null);

    useGSAP(() => {
        // دقیقاً کدی که شما درخواست کردید
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 20%", // وقتی بالای سکشن به ۷۵٪ از ارتفاع صفحه رسید شروع می‌شود
                toggleActions: "play none none none", // فقط یک بار اجرا می‌شود (اگر می‌خواهید با هر بار اسکرول اجرا شود: "play none none reverse")
            }
        });

        // ۱. ظاهر شدن کل کارت شیشه‌ای
        tl.from(cardRef.current, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        })
        // ۲. ظاهر شدن عکس با افکت پاپ‌آپ
        .from(imageRef.current, {
            scale: 0.85,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.5)", // حالت فنری و نرم
        }, "-=0.5") 
        // ۳. ظاهر شدن متن با حرکت ملایم به بالا
        .from(textRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
        }, "-=0.4")
        // ۴. ظاهر شدن دکمه
        .from(btnRef.current, {
            y: 15,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
        }, "-=0.3");

    }, { scope: containerRef }); 

    return (
        <section ref={containerRef} className="w-full h-screen relative bg-[#060010] overflow-hidden">
            
            {/* کنترل رندر Canvas برای بهینه‌سازی پرفورمنس (توقف کامل وقتی دیده نمیشه) */}
            <div style={{ display: isActive ? 'block' : 'none', width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
                <PixelBlast
                    variant="square"
                    pixelSize={4}
                    color="#A855F7"
                    patternScale={1}
                    patternDensity={1}
                    pixelSizeJitter={0}
                    enableRipples={isActive}
                    rippleSpeed={0.4}
                    rippleThickness={0.12}
                    rippleIntensityScale={1.5}
                    liquid={false}
                    liquidStrength={0.12}
                    liquidRadius={1.2}
                    liquidWobbleSpeed={5}
                    speed={isActive ? 0.5 : 0}
                    edgeFade={0.25}
                    transparent
                />
            </div>

            {/* کارت شیشه‌ای */}
            <div
                ref={cardRef}
                className="absolute w-250 bg-white/3 h-110 flex justify-around items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-14 rounded-3xl backdrop-blur-[5px]"
            >
                {/* بخش تصویر */}
                <div
                    ref={imageRef}
                    className="text-white"
                    style={{
                        maskImage: "radial-gradient(ellipse 100% 90% at center, black 30%, transparent 100%)",
                        WebkitMaskImage: "radial-gradient(ellipse 100% 90% at center, black 30%, transparent 100%)",
                    }}
                >
                    <Image
                        src={"/me_no_watermark.webp"}
                        alt="my picture"
                        width={1000}
                        height={1000}
                        className="w-65 rounded-4xl object-cover"
                    />
                </div>

                {/* بخش متن و دکمه */}
                <div>
                    <p ref={textRef} className="text-white w-130 leading-8 text-justify">
                        توسعه‌دهنده فرانت‌اند با تمرکز بر کارایی (Performance) و تجربه کاربری. اولویت من در توسعه، فراتر از ظاهر و متمرکز بر مهندسی بهینه‌ی رابط کاربری است. با تحلیل و بهبود Core Web Vitals و مدیریت دقیق Bundle Size، شکاف میان طراحی بصری و سرعت اجرای فنی را پر می‌کنم. تخصص من در اکوسیستم Next.Js بر پیاده‌سازی رابط‌های واکنش‌گرا و Performance-Centric استوار است؛ جایی که سرعت لود و روانی تعامل، مستقیماً بر موفقیت تجاری محصول اثر می‌گذارد.
                    </p>

                    <div ref={btnRef} className="mt-5 w-max">
                        <Button link={true} href="/contact-me" className="drop-shadow-[0_0_7px_#ad3bff]">
                            بیاید صحبت کنیم
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}