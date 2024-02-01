import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// cn (clsx + twMerge)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
