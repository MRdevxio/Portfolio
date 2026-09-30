"use client"
import React from 'react';
import Link from 'next/link';
import UserIco from '../module/UserIco';
import CpuIco from '../module/CpuIco';
import FolderIco from '../module/FolderIco';
import MailIco from '../module/MailIco';
import HomeIco from '../module/HomeIco';
import { usePathname } from 'next/navigation';

interface NavItems {
    label: string;
    href: string;
    icon: React.ReactNode;
    iconComponent: React.ComponentType<{ color?: string }>;
}

const MenuItems: NavItems[] = [
    { label: "خانه", href: "/", icon: <HomeIco />, iconComponent: HomeIco },
    { label: "درباره من", href: "/about-me", icon: <UserIco />, iconComponent: UserIco },
    { label: "مهارت ها", href: "/skills", icon: <CpuIco />, iconComponent: CpuIco },
    { label: "پروژه ها", href: "/projects", icon: <FolderIco />, iconComponent: FolderIco },
    { label: "تماس با من", href: "/contact-me", icon: <MailIco />, iconComponent: MailIco },
]

interface NavMenuProps {
    activeSection?: string;
}

function NavMenu({ activeSection }: NavMenuProps) {
    const pathname = usePathname();
    const currentActive = activeSection || pathname;

    const isActive = (href: string) => {
        return currentActive === href;
    }

    // این تابع کلیک‌ها را مدیریت می‌کند
    const handleLinkClick = (e: React.MouseEvent, href: string) => {
        // چک می‌کنیم آیا کاربر در حال حاضر در صفحه اصلی (که پین شده است) قرار دارد؟
        if (pathname === "/") {
            if (href === "/") {
                e.preventDefault(); // جلوگیری از رفتار پیش‌فرض لینک
                window.scrollTo({ top: 0, behavior: 'smooth' }); // اسکرول به بالای صفحه
            } 
            else if (href === "/about-me") {
                e.preventDefault(); 
                // چون در page.tsx مقدار end را "+=150%" دادیم، 
                // پایان صفحه دقیقا برابر با 1.5 برابر ارتفاع پنجره مرورگر است
                const targetScroll = window.innerHeight * 1.5; 
                window.scrollTo({ top: targetScroll, behavior: 'smooth' });
            }
            // اگر لینک‌های دیگر (مثل مهارت‌ها یا پروژه‌ها) بود، هیچ کاری نمی‌کنیم
            // تا خود Next.js بصورت عادی صفحه رو عوض کنه
        }
    };

    return (
        <>
            <header className='hidden sm:flex opacity-0 invisible translate-x-12 transition-none'>
                <nav className="nav-menu md:-translate-x-75 lg:-translate-x-35 xl:-translate-x-12 2xl:translate-x-9">
                    <ul className="flex justify-between text-white font-bold gap-6">
                        {MenuItems.map((item) => (
                            <li key={item.label} className={`${isActive(item.href) ? 'text-[#A855F7] scale-[1.2]' : ''} cursor-pointer hover:text-[#A855F7] hover:scale-[1.2] transition-all ease-in-out duration-300`}>
                                {/* اضافه کردن رویداد onClick */}
                                <Link href={item.href} onClick={(e) => handleLinkClick(e, item.href)}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
            
            <nav className='opacity-0 invisible translate-y-10 transition-none md:hidden fixed bottom-5 left-0 w-[90%] translate-x-[5%] text-white z-50 inset-shadow-[3px_3px_6px_rgba(255,255,255,0.2),-3px_-3px_6px_rgba(255,255,255,0.2)] items-center rounded-2xl backdrop-blur-xl' style={{ paddingBlock: "1rem" }}>
                <ul className='flex justify-around w-full'>
                    {MenuItems.map((item) => {
                        const Icon = item.iconComponent;
                        return (
                            <li key={item.label} className={`${isActive(item.href) ? 'scale-125 transition-all ease-in-out duration-300' : 'transition-all ease-in-out duration-300'}`}>
                                {/* اضافه کردن رویداد onClick در نسخه موبایل هم لازم است */}
                                <Link href={item.href} onClick={(e) => handleLinkClick(e, item.href)}>
                                    <Icon color={isActive(item.href) ? '#A855F7' : '#ffffff'} />
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    );
}

export default NavMenu;