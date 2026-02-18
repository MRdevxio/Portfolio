"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Button from "../module/Button";

const PixelBlast = dynamic(() => import("../PixelBlast"), {
    ssr: false,
    loading: () => <div className="bg-[#060010] w-full h-screen absolute inset-0" />
});
function AboutMe() {
    return (
        <section className="w-full h-screen relative bg-[#060010]">
            <PixelBlast variant="square"
                pixelSize={4}
                color="#A855F7"
                patternScale={1}
                patternDensity={1}
                pixelSizeJitter={0}
                enableRipples
                rippleSpeed={0.4}
                rippleThickness={0.12}
                rippleIntensityScale={1.5}
                liquid={false}
                liquidStrength={0.12}
                liquidRadius={1.2}
                liquidWobbleSpeed={5}
                speed={0.5}
                edgeFade={0.25}
                transparent />
            <div className="absolute w-250 bg-white/3 h-110 flex justify-around items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-14  rounded-3xl backdrop-blur-[5px]">
                <div className="text-white " style={{
                    maskImage: "radial-gradient(ellipse 100% 90% at center, black 30%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 100% 90% at center, black 30%, transparent 100%)",
                }}>
                    <Image src={"/me_no_watermark.webp"} alt="my picture" width={1000} height={1000} className="w-[260px] rounded-4xl object-cover " />

                </div>
                <div>
                <p className="text-white w-130 leading-8">توسعه‌دهنده فرانت‌اند با تمرکز بر کارایی (Performance) و تجربه کاربری. اولویت من در توسعه، فراتر از ظاهر و متمرکز بر مهندسی بهینه‌ی رابط کاربری است. با تحلیل و بهبود Core Web Vitals و مدیریت دقیق Bundle Size، شکاف میان طراحی بصری و سرعت اجرای فنی را پر می‌کنم. تخصص من در اکوسیستم Next.Js بر پیاده‌سازی رابط‌های واکنش‌گرا و Performance-Centric استوار است؛ جایی که سرعت لود و روانی تعامل، مستقیماً بر موفقیت تجاری محصول اثر می‌گذارد.</p>
                <Button link={true} href="/contact-me" className="mt-5 drop-shadow-[0_0_7px_#ad3bff]">بیاید صحبت کنیم</Button>
                </div>
            </div>
        </section>
    )
}

export default AboutMe