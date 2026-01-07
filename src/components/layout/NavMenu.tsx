import React from 'react';
import Link from 'next/link';
import UserIco from '../module/UserIco';
import CpuIco from '../module/CpuIco';
import FolderIco from '../module/FolderIco';
import MailIco from '../module/MailIco';
import HomeIco from '../module/HomeIco';

interface NavItems {
    label: string;
    href: string;
    icon: React.ReactNode;
}
const MenuItems: NavItems[] = [
    { label: "خانه", href: "/", icon: <HomeIco /> },
    { label: "درباره من", href: "/", icon: <UserIco /> },
    { label: "مهارت ها", href: "/", icon: <CpuIco/> },
    { label: "پروژه ها", href: "/", icon: <FolderIco /> },
    { label: "تماس با من", href: "/", icon: <MailIco /> },
]
function NavMenu() {
    return (
        <>

            <header className='hidden md:flex'>
                <nav className="nav-menu ">
                    <ul className="flex justify-between text-white font-bold ">
                        {MenuItems.map((item) => (
                            <li key={item.label} className='cursor-pointer hover:text-[#A855F7]  hover:scale-[1.2] transition-all ease-in-out duration-300'><Link href={item.href}>{item.label}</Link></li>
                        ))}
                    </ul>
                </nav>
            </header>
            <nav className='md:hidden fixed bottom-5 left-0 w-[90%] translate-x-[5%]  text-white z-50 inset-shadow-[3px_3px_6px_rgba(255,255,255,0.2),-3px_-3px_6px_rgba(255,255,255,0.2)] items-center rounded-2xl backdrop-blur-xl' style={{paddingBlock:"0.7rem"}}>
                <ul className='flex justify-around '>
                    {MenuItems.map((item) => (

                        <li key={item.label} className='inline'>{item.icon}</li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default NavMenu;