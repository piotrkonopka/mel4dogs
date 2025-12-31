/**
 * Utility function to merge Tailwind CSS classes with proper precedence
 * Prevents style conflicts when combining conditional classes
 *
 * @example
 * cn("px-2 py-1", condition && "px-4") // later px-4 takes precedence
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
