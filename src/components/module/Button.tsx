type variant = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: variant;
  link: boolean;
  className?: string;
}

const base = "inline-flex items-center justify-center rounded-2xl font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none z-50 text-white ";
const variants: Record<variant, string> = {
  primary: "bg-purple-600 hover:bg-purple-700 px-12 py-2 ",
  secondary: "bg-white/5  px-14 py-2 cursor-pointer border border-white/20 hover:scale-110 transition-transform ease-in-out duration-300 shadow-[inset_1px_1px_6px_0_rgba(255,255,255,0.2),inset_-1px_-1px_6px_0_rgba(255,255,255,0.2)]"
}

function Button({ variant = "primary", link, className, children, ...props }: ButtonProps) {
  return (
    <button className={`${variants[variant]} ${className} ${base}`}
    >{children}</button>
  )
}

export default Button