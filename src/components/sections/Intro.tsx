"use client"

import dynamic from "next/dynamic"
import { useInView } from "react-intersection-observer"
import IntroText from "../module/IntroText";
const LiquidEther = dynamic(() => import("../LiquidEther"), {
    
    loading: () => <div className="bg-neutral-950" />
});
function Intro() {

    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.05
    });
    return (
        <section ref={ref} className="w-full h-[100vh] relative bg-[#060010]">
            {inView &&
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
                    className="absolute inset-0 w-full h-full"
                />
            }
            <div className="absolute inset-0 flex items-center justify-center z-50">
                <div className="flex flex-col items-center justify-center">

                    <div className="flex justify-end items-start w-full">
                        <IntroText width={"300"} height={"35"} />
                    </div>


                    <p className="text-white text-sm mt-6 text-center max-w-2xl px-4">یک توسعه‌دهنده وب و  فرانت اند  که تمرکزم ساخت محصولاتی تمیز ، ایمن ، سریع و کاربردی‌ هستن.</p>
                </div>
            </div>

        </section>
    )
}

export default Intro