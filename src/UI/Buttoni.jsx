export function Button({ children, variant="primary", className="", ...props }) {
  const base = "px-4 py-2 rounded-xl2 font-medium transition focus-ring";
  const variants = {
    primary: "bg-brand-maroon text-white hover:bg-brand-maroonDark",
    ghost: "border border-brand-maroon text-brand-maroon hover:bg-brand-maroon/10",
    white: "bg-white text-brand-maroon border border-brand-maroon hover:bg-brand-maroon/10",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}