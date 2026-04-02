import Link from "next/link";
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";

interface BaseProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}


interface ButtonModeProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  link?: false;
  href?: never;
}


interface LinkModeProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  link: true;
  href: string;
}


type ButtonProps = BaseProps & (ButtonModeProps | LinkModeProps);



const variants: Record<Variant, string> = {
  primary: "bg-purple-600 hover:bg-purple-700 px-12 py-2 shadow-lg hover:shadow-purple-500/30",
  secondary: `
    relative group overflow-hidden
    backdrop-blur-lg
    bg-white/5 backdrop-blur-md
    px-5 w-64 py-3 sm:px-14 sm:py-3 cursor-pointer
    border border-white/10
    transition-transform duration-300 ease-in-out
    
    hover:scale-105 hover:bg-white/10 hover:border-white/30 
  
    shadow-[inset_1px_1px_6px_0_rgba(255,255,255,0.2),inset_-1px_-1px_6px_0_rgba(255,255,255,0.1)]
    hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.2),0_0_15px_rgba(255,255,255,0.1)]
    
    before:absolute before:inset-0 before:-translate-x-full before:skew-x-12
    hover:before:translate-x-full 
    before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent 
    before:transition-transform before:duration-700 before:ease-in-out before:z-0
  `,
};

const base =
  "inline-flex items-center justify-center rounded-2xl font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none z-50 text-white ";


const cn = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");



export const Button = (props: ButtonProps) => {
  const { 
    variant = "primary", 
    className, 
    children, 
    link, 
    ...rest 
  } = props;

  
  const combinedClasses = cn(base, variants[variant], className);


  if (link) {
   
    const { href, ...linkAttrs } = rest as LinkModeProps;
    
    return (
      <Link href={href} className={combinedClasses} {...linkAttrs}>
        {children}
      </Link>
    );
  }

 
  return (
    <button className={combinedClasses} {...(rest as ButtonModeProps)}>
      {children}
    </button>
  );
};

export default Button;