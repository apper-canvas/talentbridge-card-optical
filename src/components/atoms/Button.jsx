import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "default", 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-secondary text-white hover:bg-secondary/90 hover:scale-[1.02] active:scale-[0.98]",
    outline: "border border-primary text-primary bg-transparent hover:bg-primary hover:text-white hover:scale-[1.02] active:scale-[0.98]",
    ghost: "hover:bg-gray-100 hover:text-gray-900 hover:scale-[1.02] active:scale-[0.98]",
    success: "bg-success text-white hover:bg-success/90 hover:scale-[1.02] active:scale-[0.98]",
  };
  
  const sizes = {
    sm: "h-9 px-3 text-sm",
    default: "h-10 px-4 py-2",
    lg: "h-11 px-8",
    xl: "h-12 px-10 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;