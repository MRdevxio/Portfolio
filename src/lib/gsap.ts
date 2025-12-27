// src/lib/gsap.ts
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(Observer);
}

export * from 'gsap';
export { Observer };
export {gsap};