"use client";
import dynamic from "next/dynamic";

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
            <div className="absolute w-250 bg-white/3 h-110 flex justify-between items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-14  rounded-3xl backdrop-blur-[5px]">
                <div className="text-white">lmdklgmdkged</div>
                <p className="text-white w-120">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, accusamus, eveniet ea, quibusdam sint iure aliquid consectetur tempora sit quis et! Vero ipsum deleniti nostrum, voluptate et harum corrupti odit deserunt autem nulla possimus illum modi, id veritatis at! Nam!</p>
            </div>
        </section>
    )
}

export default AboutMe