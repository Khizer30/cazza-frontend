import { cn } from "@/lib/utils";
import logoWhite from "@/assets/imgs/logoWhite.png";
import logoBlack from "@/assets/imgs/logoBlack.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  invert?: boolean;
}

const sizeConfig = {
  sm: "w-[80px]",
  md: "w-[120px]",
  lg: "w-[160px]",
  xl: "w-[200px]",
};

export const Logo = ({ className, size = "md", invert }: LogoProps) => {
  const sizeClass = sizeConfig[size];

  return (
    <div className={cn("flex items-center", className)}>
      <img
        src={logoWhite}
        alt="Cazza"
        className={cn(
          sizeClass,
          `${invert ? "block dark:hidden" : "hidden dark:block"}`
        )}
      />
      <img
        src={logoBlack}
        alt="Cazza"
        className={cn(
          sizeClass,
          `${invert ? "hidden dark:block" : "block dark:hidden"}`
        )}
      />
    </div>
  );
};
