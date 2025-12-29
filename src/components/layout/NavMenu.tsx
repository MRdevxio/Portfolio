import React from 'react';
import { Home} from 'lucide-react';
import Link from 'next/link';

interface NavItems {
    label: string;
    href: string;
    icon: React.ElementType;
}
const MenuItems: NavItems[] = [
    { label: "خانه", href: "/", icon: Home },
    { label: "درباره من", href: "/", icon: Home },
    { label: "مهارت ها", href: "/", icon: Home },
    { label: "پروژه ها", href: "/", icon: Home },
    { label: "تماس با من", href: "/", icon: Home },
]
function NavMenu() {
    return (
        <>
            <nav className="nav-menu ">
                <ul className="flex justify-between text-white font-bold ">
                    {MenuItems.map((item) => (
                        <li key={item.label} className='cursor-pointer hover:text-[#A855F7]  hover:scale-[1.2] transition-all ease-in-out duration-300'><Link href={item.href}>{item.label}</Link></li>
                    ))}
                </ul>
            </nav>


        </>
    );
}

export default NavMenu;