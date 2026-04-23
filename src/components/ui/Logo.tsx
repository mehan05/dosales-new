interface LogoProps {
  variant?: "full" | "icon" | "wordmark" | "stacked";
  theme?: "light" | "dark";
  className?: string;
}

export default function Logo({ variant = "full", theme = "dark", className = "" }: LogoProps) {
  const barColor = theme === "dark" ? "#ffffff" : "#0F172A";
  const arcColor = theme === "dark" ? "#38BDF8" : "#0EA5E9";
  const textColor = theme === "dark" ? "#ffffff" : "#0F172A";

  const Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" className="h-full w-auto">
      <rect x="8" y="8" width="6" height="32" rx="3" fill={barColor} />
      <path
        d="M18 12 C30 12, 38 18, 38 24 C38 30, 30 36, 18 36"
        stroke={arcColor}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M18 18 C26 18, 32 21, 32 24 C32 27, 26 30, 18 30"
        stroke={arcColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M18 23 C22 23, 26 23.5, 26 24 C26 24.5, 22 25, 18 25"
        stroke={arcColor}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
  const Wordmark = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 32" fill="none" className="h-full w-auto">
      <text
        x="0"
        y="26"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="28"
        fontWeight="700"
        fill={textColor}
        letterSpacing="-0.02em"
      >
        DoSales
      </text>
    </svg>
  );
  if (variant === "icon") {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <Icon />
      </div>
    );
  }
  if (variant === "wordmark") {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <Wordmark />
      </div>
    );
  }
  if (variant === "stacked") {
    return (
      <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
        <div className="h-12">
          <Icon />
        </div>
        <div className="h-6">
          <Wordmark />
        </div>
      </div>
    );
  }
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="h-full">
        <Icon />
      </div>
      <div className="h-full">
        <Wordmark />
      </div>
    </div>
  );
}
