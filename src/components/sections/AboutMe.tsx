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
    // تغییرات حیاتی:
    // 1. بازگشت به top-1/2 و -translate-y-1/2 برای قرارگیری دقیق در مرکز (رفع مشکل A12)
    // 2. استفاده از max-h-[75dvh] (dvh ارتفاع داینامیک است و با نوار آدرس گوشی تداخل نمی‌کند)
    // 3. حذف کلاس justify-center از کانتینر اصلی تا در زمان اسکرول، بالای عکس بریده نشود!
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-105 bg-white/3 max-h-[75dvh] overflow-y-auto flex flex-col items-center px-5 py-6 rounded-3xl backdrop-blur-[5px] shadow-lg custom-scrollbar"
>
    {/* بخش تصویر */}
    <div
        ref={imageRef}
        // shrink-0 بسیار مهم است تا عکس فشرده نشود
        className="w-full flex justify-center shrink-0 mb-4"
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
            // سایز عکس ریسپانسیو شد: در گوشی‌های کوچک w-28 و در صفحات بزرگتر w-36
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl object-cover object-top shrink-0"
        />
    </div>

    {/* بخش متن و دکمه */}
    <div className="w-full flex flex-col items-center shrink-0">
        <p 
            ref={textRef} 
            // متن text-justify شد تا مثل یک بلوک تمیز در بیاید و از حاشیه‌ها بیرون نزند
            className="text-white text-[13px] sm:text-sm leading-7 sm:leading-8 text-justify px-1"
        >
            توسعه‌دهنده فرانت‌اند با تمرکز بر کارایی (Performance) و تجربه کاربری. اولویت من در توسعه، فراتر از ظاهر و متمرکز بر مهندسی بهینه‌ی رابط کاربری است. با تحلیل و بهبود Core Web Vitals و مدیریت دقیق Bundle Size، شکاف میان طراحی بصری و سرعت اجرای فنی را پر می‌کنم. تخصص من در اکوسیستم Next.Js بر پیاده‌سازی رابط‌های واکنش‌گرا و Performance-Centric استوار است؛ جایی که سرعت لود و روانی تعامل، مستقیماً بر موفقیت تجاری محصول اثر می‌گذارد.
        </p>

        <div ref={btnRef} className="mt-5 mb-2 w-max shrink-0">
            <Button link={true} href="/contact-me" className="drop-shadow-[0_0_7px_#ad3bff]">
                بیاید صحبت کنیم
            </Button>
        </div>
    </div>
</div>
        </section>
    );
}